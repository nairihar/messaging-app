import joi from 'joi';

import Bluebird from 'bluebird';
import {
    MessageDocument, MessageObject, NewMessageObject, SendMessageBody,
} from './messages';

import Message from './messages-model';
import { Pagination } from '../_common/@types/request';
import { defaultMessagesPerPage } from './messages-config';
import { InputError } from '../_common/errors';

const sendMessageJoiSchema = joi.object({
    message: joi.string().min(1).max(500).required(),
});

export function validateSendMessageRequestBody(body: SendMessageBody): InputError | void {
    const result = sendMessageJoiSchema.validate(body);

    if (result.error) {
        return new InputError(result.error.details[0].message);
    }
}

export function createNewMessage(data: NewMessageObject): Promise<MessageDocument> {
    const newMessage: MessageDocument = new Message();

    newMessage.content = data.message;
    newMessage.sender = data.sender;
    newMessage.receiver = data.receiver;

    return newMessage.save();
}

export async function getUserMessagesByUserId(
    userId: string,
    pagination: Pagination = {},
): Promise<Array<MessageObject>> {
    const page = Number(pagination.page) || 1;
    const perPage = Number(pagination.perPage) || defaultMessagesPerPage;

    const messages: Array<MessageDocument> = await Message.find({
        receiver: userId,
    })
        .populate('sender')
        .skip(Math.max((page - 1) * perPage, 0))
        .limit(perPage)
        .sort({ createdAt: -1 });

    return Bluebird.mapSeries(messages, (message: MessageDocument) => message.plain());
}
