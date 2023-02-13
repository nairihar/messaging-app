import { createClient } from '@redis/client';

import logger from '../../../logger';
import dbConfigs from '../../configs/dbs';

const state = new Map();

export async function connectRedis() {
    const redisClient = createClient({
        url: dbConfigs.redisUrl,
    });

    await redisClient.connect();

    logger.info('Redis connected!');

    redisClient.on('error', async (err) => {
        logger.info('Redis Client Error', err);
    });

    state.set('client', redisClient);
}

export async function disconnectRedis() {
    const redisClient = state.get('client');

    await redisClient.disconnect();

    logger.info('Redis disconnected!');
}

export default function getRedisInstance() {
    return state.get('client');
}
