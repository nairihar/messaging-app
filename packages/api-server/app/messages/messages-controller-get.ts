import { NextFunction, Request, Response } from 'express';

import { ServerError } from '../_common/errors';
import logger from '../logger';

import { GetUserMessagesQuery, MessageObject } from './messages';
import { getUserMessagesByUserId } from './messages-services';

export async function getUserMessages(
    req: Request<object, object, object, GetUserMessagesQuery>,
    res: Response,
    next: NextFunction,
) {
    try {
        const { performer } = req;
        const { page, perPage } = req.query;

        const userId = performer._id.toString();
        const messages: Array<MessageObject> = await getUserMessagesByUserId(userId, {
            page,
            perPage,
        });

        res.status(200).json(messages);
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
