import { NextFunction, Request, Response } from 'express';

import {
    createNewUser,
    getUserByUsername,
    validateRegisterUser,
} from './users-services';

import { RegisterUserInput, UserDocument } from './users';
import { ForbiddenError, ServerError } from '../_common/errors';
import logger from '../logger';

export async function registerUser(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const reqData: RegisterUserInput = req.body;

        validateRegisterUser(reqData);

        const { user_name } = reqData;

        const user: UserDocument | void = await getUserByUsername(user_name);

        if (user) {
            return next(new ForbiddenError('Username is already taken!'));
        }

        const newUser: UserDocument = await createNewUser({ user_name });

        res.status(201).json(newUser.plain());
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
