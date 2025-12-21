import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
        index: true,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    quizType: {
        type: String,
        enum: ['ai-cloze', 'multiple-choice', 'flashcard-review'],
        default: 'ai-cloze',
    }
}, {
    timestamps: true // Tự động thêm createdAt và updatedAt
});

// Thêm plugin phân trang vào schema
quizResultSchema.plugin(mongoosePaginate);

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

export default QuizResult;