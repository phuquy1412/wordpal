import mongoose from "mongoose";
const userStatisticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true
    },
    // Overall statistics
    totalTopics: {
        type: Number,
        default: 0
    },
    totalFlashcards: {
        type: Number,
        default: 0
    },
    totalStudySessions: {
        type: Number,
        default: 0
    },
    totalStudyTime: {
        type: Number, // in seconds
        default: 0
    },
    // Performance metrics
    totalCardsReviewed: {
        type: Number,
        default: 0
    },
    totalCorrectAnswers: {
        type: Number,
        default: 0
    },
    averageAccuracy: {
        type: Number,
        default: 0
    },
    // Streaks
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    lastStudyDate: {
        type: Date
    },
    // Achievements
    achievements: [{
        name: String,
        description: String,
        earnedAt: {
            type: Date,
            default: Date.now
        },
        icon: String
    }],
    // Daily stats for charts (last 30 days)
    dailyStats: [{
        date: {
            type: Date,
            required: true
        },
        cardsStudied: {
            type: Number,
            default: 0
        },
        studyTime: {
            type: Number,
            default: 0
        },
        accuracy: {
            type: Number,
            default: 0
        }
    }]
}, {
    timestamps: true
});

const UserStatistics = mongoose.model('UserStatistics', userStatisticsSchema);
export default UserStatistics;