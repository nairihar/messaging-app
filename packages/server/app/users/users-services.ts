import joi from 'joi';

import { RegisterUserInput, UserDocument } from './users';
import User from './users-model';

const userRequestJoiSchema = joi.object({
    user_name: joi.string().min(3).max(50).required(),
});

export function validateRegisterUser(user: RegisterUserInput): void {
    const result: {
        error: Error;
        value: RegisterUserInput;
    } = userRequestJoiSchema.validate(user);

    if (result.error) {
        throw result.error;
    }
}

export function createNewUser(
    data: RegisterUserInput,
): Promise<UserDocument> {
    const newUser: UserDocument = new User();

    newUser.user_name = data.user_name;

    return newUser.save();
}

export async function getUserByUsername(
    user_name: string,
): Promise<UserDocument | void> {
    return User.findOne({ user_name });
}
