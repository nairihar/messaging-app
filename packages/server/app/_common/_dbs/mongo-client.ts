import mongoose from 'mongoose';

import logger from '../../logger';
import configs from '../configs/env';

// TODO :: Improvement :: create a Mongo Pool

export async function connectMongo() {
    mongoose.set('strictQuery', true);
    await mongoose.connect(configs.mongoUrl);

    logger.info('Mongo connected!');

    mongoose.connection.on('error', async (err) => {
        logger.info('Mongo Connection Error', err);
    });
}

export async function disconnectMongo() {
    await mongoose.connection.close();

    logger.info('Mongo disconnected!');
}
