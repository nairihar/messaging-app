import { ICustomError } from './@types/errors';

const INPUT_ERROR_STATUS_CODE = 400;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;
const SERVER_ERROR_STATUS_CODE = 500;

export class InputError extends Error implements ICustomError {
    status: number;

    constructor(message: string) {
        super();

        this.status = INPUT_ERROR_STATUS_CODE;
        this.message = message;
    }
}

export class NotFoundError extends Error implements ICustomError {
    status: number;

    constructor(message: string) {
        super();

        this.status = NOT_FOUND_STATUS_CODE;
        this.message = message;
    }
}

export class ForbiddenError extends Error implements ICustomError {
    status: number;

    constructor(message: string) {
        super();

        this.status = FORBIDDEN_STATUS_CODE;
        this.message = message;
    }
}

export class ServerError extends Error implements ICustomError {
    status: number;

    constructor(message = 'Server error!') {
        super();

        this.status = SERVER_ERROR_STATUS_CODE;
        this.message = message;
    }
}
