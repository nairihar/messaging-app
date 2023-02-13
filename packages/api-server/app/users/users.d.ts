import { HydratedDocument } from 'mongoose';

export interface IUser {
    username: string;
    createdAt: Date;

    plain(): {
        username: string;
        createdAt: Date;
    };
}

export type UserDocument = HydratedDocument<IUser>;

export type UserObject = {
    username: string;
    createdAt: Date;
    availability?: boolean;
};

export type getAllUsersParams = {
    includeAvailabilityStatus?: boolean;
};

export type GetUsersQuery = {
    page: number;
    perPage: number;
};

export type RegisterUserBody = {
    username: string;
};
