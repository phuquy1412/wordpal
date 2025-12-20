import mongoose from "mongoose";
const studyScheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true,
        index: true
    },
    scheduledTime: {
        type: String, // Format: "HH:MM"
        required: true
    },
    duration: {
        type: Number, // in minutes
        default: 30
    },
    reminderBefore: {
        type: Number, // minutes before
        default: 15
    },
    isReminderSent: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    // Recurring schedule
    isRecurring: {
        type: Boolean,
        default: false
    },
    recurrencePattern: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', null],
        default: null
    },
    daysOfWeek: [{
        type: Number,
        min: 0,
        max: 6 // 0 = Sunday, 6 = Saturday
    }],
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Indexes
studyScheduleSchema.index({ user: 1, scheduledDate: 1 });
studyScheduleSchema.index({ user: 1, isCompleted: 1 });

const StudySchedule = mongoose.model('StudySchedule', studyScheduleSchema);
export default StudySchedule;