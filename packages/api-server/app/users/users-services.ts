import joi, { ValidationError } from 'joi';
import Bluebird from 'bluebird';

import User from './users-model';

import { RegisterUserBody, UserDocument, UserObject } from './users';
import { isUserAvailable } from '../_common/services/availability';
import { Pagination } from '../_common/@types/request';
import { defaultUsersPerPage } from './users-config';
import { InputError } from '../_common/errors';

const registerUserJoiSchema = joi.object({
    username: joi.string().min(3).max(50).required(),
});

export function validateRegisterUserRequestBody(body: RegisterUserBody): InputError | void {
    const result: {
        error: ValidationError;
    } = registerUserJoiSchema.validate(body);

    if (result.error) {
        return new InputError(result.error.details[0].message);
    }
}

export function createNewUser(userData: RegisterUserBody): Promise<UserDocument> {
    const newUser: UserDocument = new User();

    newUser.username = userData.username;

    return newUser.save();
}

export async function getUserByUsername(username: string): Promise<UserDocument | void> {
    return User.findOne({ username });
}

export async function mapUsersAvailability(users): Promise<Array<UserObject>> {
    return Bluebird.mapSeries(users, async (user: UserDocument) => ({
        ...user.plain(),
        available: await isUserAvailable(user.username),
    }));
}

export async function getAllUsers(pagination: Pagination = {}): Promise<Array<UserDocument>> {
    const page = Number(pagination.page) || 1;
    const perPage = Number(pagination.perPage) || defaultUsersPerPage;

    return User.find()
        .skip(Math.max((page - 1) * perPage, 0))
        .limit(perPage);
}
