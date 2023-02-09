import mongoose from 'mongoose';

export default mongoose.model('User', {
    username: {
        type: String,
        unique: true,
    },
    created: Date,
});
