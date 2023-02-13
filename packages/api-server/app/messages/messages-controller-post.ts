import { NextFunction, Request, Response } from 'express';

import logger from '../logger';
import { InputError, ServerError } from '../_common/errors';
import { MessageDocument, SendMessageBody, SendMessageParams } from './messages';
import { createNewMessage, validateSendMessageRequestBody } from './messages-services';
import { UserDocument } from '../users/users';
import { getUserByUsername } from '../users/users-services';
import { makeUserAvailable } from '../_common/services/availability';
import { sendRealTimeMessage } from '../_common/services/real-time-messages';

export async function sendMessage(
    req: Request<SendMessageParams, SendMessageBody>,
    res: Response,
    next: NextFunction,
) {
    try {
        const { performer } = req;

        const validationMessage = validateSendMessageRequestBody(req.body);

        if (validationMessage) {
            return next(validationMessage);
        }

        const { username } = req.params;

        const receiverUser: UserDocument | void = await getUserByUsername(username);

        if (!receiverUser) {
            return next(new InputError('Receiver not found!'));
        }

        const newMessage: MessageDocument = await createNewMessage({
            message : req.body.message,
            receiver: receiverUser._id,
            sender  : performer._id,
        });

        await sendRealTimeMessage({
            message          : req.body.message,
            receiver_username: receiverUser.username,
            sender_username  : performer.username,
            date             : newMessage.createdAt,
        });

        await makeUserAvailable(performer.username);

        const message = await newMessage.plain();

        res.status(201).json(message);
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
