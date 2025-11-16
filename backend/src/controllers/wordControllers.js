import mongoose from 'mongoose';
import Word from '../model/Word.js';
import User from '../model/User.js'; 

// --- 1. TÌM KIẾM GỢI Ý ---
export const suggestWords = async (req, res) => {
// ... existing code ...
    try {
        const keyword = req.query.q; // Lấy từ khóa tìm kiếm (q)
        if (!keyword) {
            return res.json([]); // Nếu không có từ khóa, trả về mảng rỗng
        }

        const suggestions = await Word.aggregate([ // Bắt đầu Aggregation Pipeline
            { /* Giai đoạn 1: Lọc bằng Text Index (Tìm kiếm toàn văn) */
                $match: { $text: { $search: keyword } } 
            },
            { /* Giai đoạn 2: Tính toán điểm liên quan */
                $addFields: { score: { $meta: "textScore" } } 
            },
            { /* Giai đoạn 3: Sắp xếp giảm dần theo điểm liên quan */
                $sort: { score: -1 } 
            },
            { $limit: 10 }, /* Giai đoạn 4: Giới hạn 10 gợi ý */
            {
                $project: { /* Giai đoạn 5: Định hình lại tài liệu */
                    _id: 1, 
                    word: 1, 
                    translation_vi: 1, 
                    first_phonetic: { $arrayElemAt: ["$phonetics.text", 0] } // Lấy phiên âm đầu tiên
                }
            }
        ]);

        res.json(suggestions); // Trả về danh sách gợi ý
    } catch (error) {
        console.error("Lỗi khi tìm kiếm gợi ý:", error); 
        res.status(500).json({ message: "Lỗi Server nội bộ khi tìm kiếm." });
    }
};

// --- 2. HIỂN THỊ TRANG CHI TIẾT TỪ VỰNG (CÓ LƯU LỊCH SỬ) ---
export const getWordDetail = async (req, res) => {
// ... existing code ...
    try {
        const identifier = req.params.identifier; // Lấy ID (hoặc tên từ) từ URL

        const conditions = [
            /* Điều kiện 1: Tìm theo _id nếu hợp lệ */
            mongoose.Types.ObjectId.isValid(identifier) 
                ? { _id: identifier } 
                : null,
            /* Điều kiện 2: Tìm theo trường 'word' */
            { word: identifier } 
        ].filter(Boolean); // Lọc bỏ giá trị null

        const wordDetail = await Word.findOne({ $or: conditions }).lean(); // Tìm kiếm tài liệu

        if (!wordDetail) {
            return res.status(404).json({ message: "Không tìm thấy từ vựng chi tiết." });
        }

        // LOGIC LƯU LỊCH SỬ TRA CỨU
        if (req.user && req.user.id) { /* Kiểm tra người dùng đã đăng nhập */
            const userId = req.user.id; 
            const wordId = wordDetail._id;

            /* TÁC VỤ 1: Xóa bản ghi cũ khỏi lịch sử ($pull) */
            await User.findByIdAndUpdate(userId, {
                $pull: { recentlySearched: { wordId: wordId } },
            });

            /* TÁC VỤ 2: Thêm bản ghi mới vào đầu và giới hạn kích thước */
            await User.findByIdAndUpdate(userId, {
                $push: {
                    recentlySearched: {
                        $each: [{ wordId: wordId, searchedAt: new Date() }], // Dữ liệu cần thêm
                        $position: 0 // Đặt bản ghi mới nhất lên đầu (lịch sử gần đây)
                    }
                },
                $slice: { recentlySearched: 50 } // Giới hạn kích thước mảng (50 mục gần nhất)
            });
        }

        res.json(wordDetail); // Trả về chi tiết từ vựng
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết từ vựng:", error);
        res.status(500).json({ message: "Lỗi Server nội bộ khi lấy chi tiết." });
    }
};

// --- 3. LỌC VÀ HIỂN THỊ TỪ VỰNG (Filter & List) ---
export const filterWords = async (req, res) => {
// ... existing code ...
    try {
        /* Lấy các tham số lọc và phân trang */
        const { topic, partOfSpeech, page = 1, limit = 20 } = req.query;
        
        let query = {}; // Object truy vấn MongoDB

        if (topic) {
            query.topic = topic; /* Thêm điều kiện lọc theo Chủ đề */
        }

        if (partOfSpeech) {
            query['meanings.partOfSpeech'] = partOfSpeech; /* Thêm điều kiện lọc theo Loại từ */
        }

        const currentPage = parseInt(page);
        const wordsPerPage = parseInt(limit);

        const totalCount = await Word.countDocuments(query); // Đếm tổng số từ
        const words = await Word.find(query) 
            .skip((currentPage - 1) * wordsPerPage) /* skip: Bỏ qua các trang trước */
            .limit(wordsPerPage) /* limit: Giới hạn số lượng từ */
            .sort({ word: 1 }) /* Sắp xếp theo bảng chữ cái */
            .select('word translation_vi topic phonetics.0.text'); /* Chọn các trường hiển thị */

        res.json({
            total: totalCount, 
            page: currentPage, 
            limit: wordsPerPage, 
            words: words, /* Danh sách từ vựng của trang hiện tại */
        });
    } catch (error) {
        console.error("Lỗi khi lọc từ vựng:", error);
        res.status(500).json({ message: "Lỗi Server nội bộ khi lọc." });
    }
};

// --- 4. LẤY LỊCH SỬ TRA CỨU VÀ FLASHCARD ---
export const getUserLists = async (req, res) => {
    try {
        /* Dòng console.log này đã hoàn thành nhiệm vụ, có thể xóa đi */
        // console.log("Dữ liệu User từ Token:", req.user); 
        
        const userId = req.user.id; /* Lấy ID người dùng */
        if (!userId) {
            return res.status(401).json({ message: "Vui lòng đăng nhập để xem danh sách cá nhân." });
        }

        const user = await User.findById(userId)
            .select('recentlySearched flashcards') /* Chỉ lấy hai mảng cần thiết */
            .populate({
                path: 'recentlySearched.wordId', /* Populate dữ liệu Word vào lịch sử */
                select: 'word translation_vi phonetics topic' 
            })
            .populate({
                path: 'flashcards.wordId', /* Populate dữ liệu Word vào flashcards */
                select: 'word translation_vi phonetics topic' 
            });
            /* SỬA LỖI: Xóa .lean() khỏi truy vấn này */
            // .lean(); 

        if (!user) {
             return res.status(404).json({ message: "Không tìm thấy thông tin người dùng." });
        }

        /* Tinh chỉnh dữ liệu lịch sử (làm phẳng object) */
        const history = user.recentlySearched
            .filter(item => item.wordId) // Lọc bỏ mục null
            .map(item => ({
                ...item.wordId.toObject(), // Dùng .toObject() vì user không còn là .lean()
                searchedAt: item.searchedAt // Thêm lại trường thời gian riêng
            }));
        
        /* Tinh chỉnh dữ liệu flashcards */
        const flashcards = user.flashcards
            .filter(item => item.wordId)
            .map(item => ({
                ...item.wordId.toObject(), // Dùng .toObject() vì user không còn là .lean()
                savedAt: item.savedAt
            }));

        res.json({
            recentlySearched: history,
            flashcards: flashcards
        });
    } catch (error) {
        console.error("Lỗi khi lấy lịch sử/flashcard:", error);
        res.status(500).json({ message: "Lỗi Server nội bộ khi lấy dữ liệu người dùng." });
    }
};

// --- 5. LƯU/BỎ LƯU VÀO FLASHCARD (Toggle) ---
export const toggleFlashcard = async (req, res) => {
// ... existing code ...
    try {
        const userId = req.user.id; 
        const wordId = req.params.wordId; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        // Kiểm tra trạng thái hiện tại
        const isSaved = user.flashcards.some(f => f.wordId && f.wordId.equals(wordId));

        let update; 
        let action; 

        if (isSaved) {
            /* Nếu đã lưu -> Xóa (pull) */
            update = { $pull: { flashcards: { wordId: wordId } } }; 
            action = "removed";
        } else {
            /* Nếu chưa lưu -> Thêm (push) */
            update = { $push: { flashcards: { wordId: wordId, savedAt: new Date() } } }; 
            action = "saved";
        }

        await User.findByIdAndUpdate(userId, update); /* Thực hiện cập nhật */

        res.json({ 
            message: `Từ đã được ${action === 'saved' ? 'lưu' : 'bỏ lưu'} khỏi Flashcard thành công.`, 
            action: action 
        });
    } catch (error) {
        console.error("Lỗi khi thao tác Flashcard:", error);
        res.status(500).json({ message: "Lỗi Server nội bộ khi thao tác Flashcard." });
    }
};