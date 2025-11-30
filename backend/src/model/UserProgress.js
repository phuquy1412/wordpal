import mongoose from "mongoose";
const userProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
        index: true
    },
    flashcard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flashcard',
        required: true,
        index: true
    },
    // Spaced Repetition System (SRS)
    easeFactor: {
        type: Number,
        default: 2.5,
        min: 1.3
    },
    interval: {
        type: Number,
        default: 0 // days
    },
    repetitions: {
        type: Number,
        default: 0
    },
    nextReviewDate: {
        type: Date,
        default: Date.now,
        index: true
    },
    lastReviewDate: {
        type: Date
    },
    // Performance tracking
    totalReviews: {
        type: Number,
        default: 0
    },
    correctCount: {
        type: Number,
        default: 0
    },
    incorrectCount: {
        type: Number,
        default: 0
    },
    // Status
    status: {
        type: String,
        enum: ['new', 'learning', 'reviewing', 'mastered'],
        default: 'new'
    }
}, {
    timestamps: true
});

// Compound indexes
userProgressSchema.index({ user: 1, topic: 1 });
userProgressSchema.index({ user: 1, nextReviewDate: 1 });
userProgressSchema.index({ user: 1, flashcard: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);
export default UserProgress;