import { NextFunction, Request, Response } from 'express';

import logger from '../logger';
import { InputError, ServerError } from '../_common/errors';
import {
    MessageDocument,
    NewMessageEndpointParams,
    NewMessageInput,
} from './messages';
import { createNewMessage, validateNewMessage } from './messages-services';
import { UserDocument } from '../users/users';
import { getUserByUsername } from '../users/users-services';

export async function sendMessage(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const reqParams: NewMessageEndpointParams = req.params;
        const reqData: NewMessageInput = req.body;
        const { performer } = req;

        validateNewMessage(reqData);

        const { user_name } = reqParams;

        const receiverUser: UserDocument | void = await getUserByUsername(
            user_name,
        );

        if (!receiverUser) {
            return next(new InputError('Receiver not found!'));
        }

        const newMessage: MessageDocument = await createNewMessage({
            message : reqData.message,
            receiver: receiverUser._id,
            sender  : performer._id,
        });

        res.status(201).json(await newMessage.plain());
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
