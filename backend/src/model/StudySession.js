const studySessionSchema = new mongoose.Schema({
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
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, // in seconds
        default: 0
    },
    cardsStudied: {
        type: Number,
        default: 0
    },
    cardsCorrect: {
        type: Number,
        default: 0
    },
    cardsIncorrect: {
        type: Number,
        default: 0
    },
    // Detailed review log
    reviews: [{
        flashcard: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flashcard'
        },
        quality: {
            type: Number,
            min: 0,
            max: 5 // 0-5 for SRS algorithm
        },
        timeSpent: {
            type: Number // seconds
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    completionRate: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes for analytics
studySessionSchema.index({ user: 1, startTime: -1 });
studySessionSchema.index({ topic: 1, startTime: -1 });

const StudySession = mongoose.model('StudySession', studySessionSchema);
export default StudySession;