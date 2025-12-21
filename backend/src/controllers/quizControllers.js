// src/controllers/quizControllers.js
import 'dotenv/config'; // Tải các biến môi trường từ file .env
import { CohereClient } from "cohere-ai";
import Flashcard from '../model/Flashcard.js';
import Topic from '../model/Topic.js';
import QuizResult from '../model/QuizResult.js';

// Khởi tạo Cohere Client với API Key của bạn
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Cấu hình chung
const COHERE_MODEL = "command-r7b-12-2024";
const MAX_QUESTIONS = 10; // Giới hạn số câu hỏi tối đa cho mỗi quiz

// --- Các hàm hỗ trợ tạo quiz (dựa trên file tham khảo) ---

// Hàm fallback trong trường hợp AI gặp lỗi
function getSafeFallback(word, trans) {
  return `The English word for "${trans}" is ______. (Gợi ý: ${trans})`;
}

// Hàm gọi AI để tạo một câu hỏi điền vào chỗ trống
async function getSentenceFromAI(word, trans) {
  if (!process.env.COHERE_API_KEY) {
    console.error("Lỗi: Không tìm thấy COHERE_API_KEY. Vui lòng kiểm tra file .env");
    return getSafeFallback(word, trans);
  }

const prompt = `
You are an English teacher creating vocabulary questions.

Your task is to create ONE clear and natural fill-in-the-blank sentence
to help students learn English vocabulary.

Requirements:
- The sentence must clearly describe the meaning of the word "${word}".
- Use a real-life, everyday context suitable for the word.
- The sentence should match the topic of the vocabulary list (for example: food, animals, daily activities).
- Replace ONLY the word "${word}" with "______".
- Do NOT include the answer.
- Output ONLY the sentence.

Example:
I like to eat ______ with cheese and tomato sauce.

Now generate a sentence for the word "${word}".
`;

  try {
    // Gọi API của Cohere
    const response = await cohere.chat({
      model: COHERE_MODEL,
      message: prompt,
      temperature: 0.7,
    });

    let sentence = response.text.trim();

    // Kiểm tra nếu AI không trả về kết quả như mong đợi
    if (!sentence || !sentence.includes('______')) {
      return getSafeFallback(word, trans);
    }
    
    // Dọn dẹp output
    sentence = sentence.replace(/^["']|["']$/g, ''); // Xóa dấu nháy kép/đơn ở đầu/cuối
    return `${sentence} (Gợi ý: ${trans})`;

  } catch (err) {
    console.error("Lỗi khi gọi Cohere API:", err.message);
    return getSafeFallback(word, trans); // Trả về câu hỏi dự phòng nếu có lỗi
  }
}

// Hàm chính để tạo toàn bộ quiz
async function generateAiQuiz(flashcards) {
  console.log(`[Quiz AI] Bắt đầu tạo câu hỏi cho ${flashcards.length} thẻ...`);

  const letters = ['A', 'B', 'C', 'D'];
  const allWords = flashcards.map(f => f.front); // Lấy tất cả các từ trong bộ thẻ

  // Tạo các câu hỏi một cách đồng thời để tăng tốc độ
  const questionPromises = flashcards.map(async (card) => {
    // 1. Lấy câu hỏi từ AI
    const questionText = await getSentenceFromAI(card.front, card.back);

    // 2. Lấy 3 từ ngẫu nhiên khác làm đáp án sai (distractors)
    let distractors = allWords
      .filter(w => w.toLowerCase() !== card.front.toLowerCase()) // Lọc bỏ đáp án đúng
      .sort(() => 0.5 - Math.random()) // Xáo trộn
      .slice(0, 3); // Lấy 3 từ đầu tiên
    
    // Đảm bảo luôn có đủ 3 đáp án sai
    while (distractors.length < 3) {
      distractors.push("A word"); // Đáp án dự phòng đơn giản
    }

    // 3. Gộp đáp án đúng và sai, sau đó xáo trộn
    const fullOptions = [
      { text: card.front, correct: true },
      ...distractors.map(d => ({ text: d, correct: false }))
    ];
    const shuffledOptions = fullOptions.sort(() => 0.5 - Math.random());

    // 4. Gán key A, B, C, D cho các lựa chọn đã xáo trộn
    const optionsMapped = shuffledOptions.map((opt, i) => ({
      key: letters[i],
      text: opt.text,
    }));
    
    // 5. Tìm ra key của đáp án đúng
    const answerKey = optionsMapped.find((o, i) => shuffledOptions[i].correct).key;

    // 6. Trả về đối tượng câu hỏi hoàn chỉnh
    return {
      question: questionText,
      options: optionsMapped,
      answer: answerKey,
      explanation: `Đáp án đúng là "${card.front}", có nghĩa là "${card.back}".`
    };
  });

  const questions = await Promise.all(questionPromises);
  console.log("[Quiz AI] Tạo câu hỏi hoàn tất!");
  return questions;
}

// --- Hàm Controller chính sẽ được gọi bởi Router ---

export const generateAiQuizForTopic = async (req, res) => {
  try {
    const { topicId } = req.params;
    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Không tìm thấy chủ đề này.' });
    }

    // (Tùy chọn) Bạn có thể thêm logic để kiểm tra người dùng có quyền truy cập chủ đề này không
    // Ví dụ: if (topic.creator.toString() !== req.user.id) { ... }

    // Lấy tất cả flashcard thuộc chủ đề
    let flashcards = await Flashcard.find({ topic: topicId });

    // Yêu cầu tối thiểu 4 thẻ để tạo quiz (1 đáp án đúng, 3 đáp án sai)
    if (flashcards.length < 4) {
        return res.status(400).json({ message: 'Cần ít nhất 4 thẻ trong chủ đề này để tạo quiz.' });
    }

    // Nếu có nhiều thẻ, giới hạn số lượng câu hỏi
    if (flashcards.length > MAX_QUESTIONS) {
      flashcards = flashcards.sort(() => 0.5 - Math.random()).slice(0, MAX_QUESTIONS);
    }

    // Gọi hàm để tạo bộ câu hỏi
    const quizQuestions = await generateAiQuiz(flashcards);

    // Trả về dữ liệu cho client
    res.status(200).json({
      title: `Luyện tập AI cho chủ đề: ${topic.name}`,
      questions: quizQuestions,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ khi tạo câu hỏi AI.' });
  }
};

export const saveQuizResult = async (req, res) => {
  try {
      const { topicId } = req.params;
      // Dữ liệu gửi lên từ frontend
      const { score, correctAnswers, totalQuestions } = req.body;
      const userId = req.user.id; // Lấy từ middleware 'protect'

      // Kiểm tra dữ liệu đầu vào
      if (score === undefined || correctAnswers === undefined || totalQuestions === undefined) {
          return res.status(400).json({ message: 'Thiếu dữ liệu kết quả quiz.' });
      }

      // Tạo một bản ghi kết quả mới
      const newResult = new QuizResult({
          user: userId,
          topic: topicId,
          score,
          correctAnswers,
          totalQuestions,
          quizType: 'ai-cloze' // Ghi rõ đây là loại quiz AI
      });

      await newResult.save();

      res.status(201).json({ message: 'Đã lưu kết quả thành công.', result: newResult });

  } catch (err) {
      console.error("Lỗi khi lưu kết quả quiz:", err);
      res.status(500).json({ message: 'Lỗi máy chủ khi lưu kết quả.' });
  }
};

export const getAllQuizResults = async (req, res) => {
    try {
        const { topicId, userId, page = 1, limit = 10 } = req.query;
        const query = {};

        if (topicId) {
            query.topic = topicId;
        }

        // Chỉ admin hoặc người dùng tự xem lịch sử của mình
        if (req.user.role === 'admin' && userId) {
            query.user = userId;
        } else {
            query.user = req.user.id;
        }

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 },
            populate: [
                { path: 'user', select: 'username email' },
                { path: 'topic', select: 'name description' }
            ]
        };

        const results = await QuizResult.paginate(query, options);

        res.status(200).json(results);

    } catch (err) {
        console.error("Lỗi khi lấy danh sách kết quả quiz:", err);
        res.status(500).json({ message: 'Lỗi máy chủ.' });
    }
};
