import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên chủ đề không được để trống'],
        trim: true,
        maxlength: [100, 'Tên chủ đề không quá 100 ký tự']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Mô tả không quá 500 ký tự']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    isPublic: {
        type: Boolean,
        default: false // Private by default
    },
    category: {
        type: String,
        enum: ['language', 'science', 'history', 'math', 'other'],
        default: 'other'
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner'
    },
    thumbnail: {
        type: String,
        default: null
    },
    // Statistics
    totalCards: {
        type: Number,
        default: 0
    },
    totalLearners: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

// Indexes for better query performance
topicSchema.index({ creator: 1, createdAt: -1 });
topicSchema.index({ isPublic: 1, totalLearners: -1 });
topicSchema.index({ tags: 1 });
topicSchema.index({ name: 'text', description: 'text' });

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;