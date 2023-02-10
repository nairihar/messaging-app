import { HydratedDocument } from 'mongoose';

export interface IUser {
    user_name: string;
    createdAt: Date;

    plain(): {
        user_name: string;
        createdAt: Date;
    };
}

export type UserDocument = HydratedDocument<IUser>;

export type RegisterUserInput = {
    user_name: string;
};
