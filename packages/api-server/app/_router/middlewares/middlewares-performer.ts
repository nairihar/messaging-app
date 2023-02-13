import { NextFunction, Request, Response } from 'express';

import logger from '../../logger';

import { ForbiddenError, ServerError } from '../../_common/errors';
import { getUserByUsername } from '../../users/users-services';
import { UserDocument } from '../../users/users';

export default async function attachPerformerIntoRequest(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const performerUserName: string = req.header('performer-username');

        if (!performerUserName) {
            return next();
        }

        const performer: UserDocument | void = await getUserByUsername(performerUserName);

        if (!performer) {
            return next(new ForbiddenError('Performer is not found!'));
        }

        req.performer = performer;

        next();
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
