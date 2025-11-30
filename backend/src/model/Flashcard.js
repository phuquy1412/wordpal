import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
        index: true
    },
    front: {
        type: String,
        required: [true, 'Mặt trước thẻ không được để trống'],
        trim: true
    },
    back: {
        type: String,
        required: [true, 'Mặt sau thẻ không được để trống'],
        trim: true
    },
    // For language learning
    pronunciation: {
        type: String,
        trim: true
    },
    example: {
        type: String,
        trim: true
    },
    audioUrl: {
        type: String
    },
    imageUrl: {
        type: String
    },
    // Ordering within topic
    order: {
        type: Number,
        default: 0
    },
    // Difficulty level
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Indexes
flashcardSchema.index({ topic: 1, order: 1 });
flashcardSchema.index({ creator: 1 });
flashcardSchema.index({ front: 'text', back: 'text' });

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

export default Flashcard;