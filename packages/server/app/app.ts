import express from 'express';
import morgan from 'morgan';

import logger from './logger';
import routes from './_router/router';
import configs from './_common/configs/env';

import { serverErrorHandler } from './_common/handlers/server-error';

const app = express();

app.use(express.json());
app.use(morgan(configs.logLevel));

// API V1
app.use('/app', routes);

app.use(serverErrorHandler);

// start the Express server
const appServer = app.listen(configs.port, () => {
    logger.info(`Server started at http://localhost:${configs.port}`);
});

export default appServer;
