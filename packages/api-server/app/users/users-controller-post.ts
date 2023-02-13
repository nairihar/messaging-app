import { NextFunction, Request, Response } from 'express';

import {
    createNewUser,
    getUserByUsername,
    validateRegisterUserRequestBody,
} from './users-services';

import { RegisterUserBody, UserDocument } from './users';
import { ForbiddenError, ServerError } from '../_common/errors';
import logger from '../logger';

export async function registerUser(
    req: Request<object, object, RegisterUserBody>,
    res: Response,
    next: NextFunction,
) {
    try {
        const validationMessage = validateRegisterUserRequestBody(req.body);

        if (validationMessage) {
            return next(validationMessage);
        }

        const { username } = req.body;

        const user: UserDocument | void = await getUserByUsername(username);

        if (user) {
            return next(new ForbiddenError('Username is already taken!'));
        }

        const newUser: UserDocument = await createNewUser({ username });

        res.status(201).json(newUser.plain());
    } catch (err) {
        logger.error(err);
        next(new ServerError());
    }
}
