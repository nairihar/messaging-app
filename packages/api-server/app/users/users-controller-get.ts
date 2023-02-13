import { NextFunction, Request, Response } from 'express';

import { GetUsersQuery, UserDocument } from './users';
import { getAllUsers, mapUsersAvailability } from './users-services';
import { ServerError } from '../_common/errors';
import logger from '../logger';

export async function getUsers(
    req: Request<object, object, object, GetUsersQuery>,
    res: Response,
    next: NextFunction,
) {
    try {
        const { page, perPage } = req.query;

        const users: Array<UserDocument> = await getAllUsers({
            page,
            perPage,
        });

        const mappedUsers = await mapUsersAvailability(users);

        res.status(200).json(mappedUsers);
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
