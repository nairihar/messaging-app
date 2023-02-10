import { HydratedDocument, Types } from 'mongoose';

export interface IMessage {
    content: string;
    contentType: string; // in case later point we will support images, videos and etc...
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
    createdAt: Date;

    plain(): {
        message: string;
        sender: string;
        date: Date;
    };
}

export type MessageDocument = HydratedDocument<IMessage>;

export type NewMessageInput = {
    message: string;
};

export type NewMessageEndpointParams = {
    user_name: string;
};

export type NewMessageObject = {
    message: string;
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
};
