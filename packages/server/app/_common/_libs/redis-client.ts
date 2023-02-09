import { createClient } from 'redis';

import configs from '../configs/env';

// TODO :: Improvement :: create a Redis Pool

let redisClient = null;

export async function connectRedis() {
  redisClient = createClient({
    url: configs.redisUrl
  });

  await redisClient.connect();

  console.log('Redis connected!');

  redisClient.on('error', async (err) => {
    console.log('Redis Client Error', err);
  });
}

export async function disconnectRedis() {
  await redisClient.disconnect();

  console.log('Redis disconnected!');
}

export default function getRedisInstance() {
  return redisClient;
}
