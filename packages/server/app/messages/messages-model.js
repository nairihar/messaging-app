import mongoose from 'mongoose';

export default mongoose.model('Message', {
    content: String,
    contentType: { type: String, default: 'text' },
    senderId: { type: 'ObjectId', ref: 'User' },
    receiverId: { type: 'ObjectId', ref: 'User' },
    created: Date,
});
