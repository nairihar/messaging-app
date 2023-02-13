import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import logger from './logger';
import routes from './_router/router';
import configs from './_common/configs/main';

import { serverErrorHandler } from './_common/handlers/server-error';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan(configs.logLevel));

// API V1
app.use('/api', routes);

app.use(serverErrorHandler);

// start the Express server
const appServer = app.listen(configs.port, () => {
    logger.info(`Server started at http://localhost:${configs.port}`);
});

export default appServer;
