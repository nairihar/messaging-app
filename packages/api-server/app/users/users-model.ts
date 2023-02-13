import { Schema, model } from 'mongoose';
import { IUser } from './users';

export const userSchema = new Schema({
    username: {
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
        username : this.username,
        createdAt: this.createdAt,
    };
});

const User = model<IUser>('User', userSchema);

export default User;
