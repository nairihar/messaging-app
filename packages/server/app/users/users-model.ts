import { Schema, model } from 'mongoose';
import { IUser } from './users';

export const userSchema = new Schema({
    user_name: {
        type  : String,
        unique: true,
    },

    createdAt: {
        type   : Date,
        default: Date.now,
    },
});

userSchema.method('plain', function () {
    return {
        user_name: this.user_name,
        createdAt: this.createdAt,
    };
});

const User = model<IUser>('User', userSchema);

export default User;
