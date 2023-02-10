import { createClient } from 'redis';

import logger from '../../logger';
import configs from '../configs/env';

// TODO :: Improvement :: create a Redis Pool

let redisClient = null;

export async function connectRedis() {
    redisClient = createClient({
        url: configs.redisUrl,
    });

    await redisClient.connect();

    logger.info('Redis connected!');

    redisClient.on('error', async (err) => {
        logger.info('Redis Client Error', err);
    });
}

export async function disconnectRedis() {
    await redisClient.disconnect();

    logger.info('Redis disconnected!');
}

export default function getRedisInstance() {
    return redisClient;
}
