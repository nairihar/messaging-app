import winston from 'winston';

const logConfiguration = {
    transports: [ new winston.transports.Console() ],
};

const logger = winston.createLogger(logConfiguration);

logger.error = function (err) {
    if (err instanceof Error) {
        logger.log({ level: 'error', message: `${err.stack || err}` });
    } else {
        logger.log({ level: 'error', message: err });
    }
};

export default logger;
