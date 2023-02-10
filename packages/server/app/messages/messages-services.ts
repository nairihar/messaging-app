import joi from 'joi';

import { MessageDocument, NewMessageInput, NewMessageObject } from './messages';

import Message from './messages-model';

const userRequestJoiSchema = joi.object({
    message: joi.string().min(1).max(500).required(),
});

export function validateNewMessage(messageObject: NewMessageInput): void {
    const result: {
        error: Error;
        value: NewMessageInput;
    } = userRequestJoiSchema.validate(messageObject);

    if (result.error) {
        throw result.error;
    }
}

export function createNewMessage(
    data: NewMessageObject,
): Promise<MessageDocument> {
    const newMessage: MessageDocument = new Message();

    newMessage.content = data.message;
    newMessage.sender = data.sender;
    newMessage.receiver = data.receiver;

    return newMessage.save();
}
