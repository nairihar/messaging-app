import { CustomErrorSchema } from '../@types/errors';

// eslint-disable-next-line
export function serverErrorHandler(err: CustomErrorSchema, req, res, next) {
    const { status, message } = err;

    res.status(status).send({
        message,
        status,
    });
}
