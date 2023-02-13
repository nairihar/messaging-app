import { HydratedDocument, Types } from 'mongoose';

export interface IMessage {
    content: string;
    contentType: string; // in case later point we will support images, videos and etc...
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    createdAt: Date;

    plain(): Promise<{
        message: string;
        sender: string;
        date: Date;
    }>;
}

export type MessageDocument = HydratedDocument<IMessage>;

export type NewMessageObject = {
    message: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
};

export type MessageObject = {
    message: string;
    sender: string;
    date: Date;
};

export type GetUserMessagesQuery = {
    page: number;
    perPage: number;
};

export type SendMessageBody = {
    message: string;
};

export type SendMessageParams = {
    username: string;
};
