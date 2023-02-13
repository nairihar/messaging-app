import { CustomErrorSchema } from '../@types/errors';
import logger from '../../logger';

// eslint-disable-next-line
export function serverErrorHandler(err: CustomErrorSchema, req, res, next) {
    const { status, message } = err;
    // TODO :: remove
    logger.info(status.toString(), message);

    res.status(status).send({
        message,
    });
}
