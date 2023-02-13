import winston from 'winston';

const logConfiguration = {
    transports: [ new winston.transports.Console() ],
};

const logger = winston.createLogger(logConfiguration);

// improve error methods
logger.error = function (err) {
    return logger.log({ level: 'error', message: `${err.message}: ${err.stack}` });
};

export default logger;
