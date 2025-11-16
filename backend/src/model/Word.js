import mongoose from "mongoose";

// --- Schema cho Định nghĩa (Definitions) ---
const definitionSchema = new mongoose.Schema({
    definition: {
        type: String,
        required: true,
        trim: true
    },
    definition_vi: {
        type: String,
        trim: true
    },
    example: { 
        type: String, 
        trim: true 
    },
    example_vi: { 
        type: String, 
        trim: true 
    }
}, { _id: false });

// --- Schema cho Ý nghĩa (Meanings) ---
const meaningSchema = new mongoose.Schema({
    partOfSpeech: {
        type: String,
        required: true,
        enum: ['noun', 'verb', 'adjective', 'adverb', 'interjection', 
            'pronoun', 'preposition', 'conjunction'],
    },
    definitions: { 
        type: [definitionSchema], 
        default: [] 
    }
}, { _id: false });

// --- Schema cho Phiên âm (Phonetics) ---
const phoneticSchema = new mongoose.Schema({
    text: { 
        type: String, 
        trim: true 
    },
    audio: { 
        type: String, 
        trim: true
    }
}, { _id: false });

// =========================================================================

// --- Schema Chính cho Từ Vựng (Word) ---
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    translation_vi: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: String,
        trim: true,
        description: "Chủ đề (dùng cho chức năng LỌC)"
    },
    phonetics: { 
        type: [phoneticSchema], 
        default: [] 
    },
    meanings: { 
        type: [meaningSchema], 
        default: [] 
    }
}, {
    collection: 'words',
    timestamps: true
});

// =========================================================================
//                          CẤU HÌNH INDEX (CHỈ MỤC)
// =========================================================================

// 1. Index đơn cho Tìm kiếm Chính xác và Lọc
wordSchema.index({ word: 1 }, { unique: true });
wordSchema.index({ translation_vi: 1 });
wordSchema.index({ topic: 1 });                 // LỌC THEO CHỦ ĐỀ
wordSchema.index({ "meanings.partOfSpeech": 1 }); // LỌC THEO LOẠI TỪ

// 2. Text Index cho Tìm kiếm Toàn văn linh hoạt (Gợi ý)
wordSchema.index(
    {
        word: "text",
        translation_vi: "text"
    },
    {
        weights: {
            word: 5,
            translation_vi: 1
        }
    }
);


const Word = mongoose.model('Word', wordSchema);
export default Word;