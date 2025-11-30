import mongoose from "mongoose";
const userFavoriteSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});
userFavoriteSchema.index({ user: 1, topic: 1 }, { unique: true });

const UserFavorite = mongoose.model('UserFavorite', userFavoriteSchema);    
  
export default UserFavorite;