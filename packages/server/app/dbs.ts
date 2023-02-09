import { connectRedis, disconnectRedis } from './_common/_libs/redis-client';
import { connectMongo, disconnectMongo } from './_common/_libs/mongo-client';

export async function connectDatabases() {
  await connectRedis();

  await connectMongo();
}

export async function disconnectDatabases() {
  await disconnectRedis();

  await disconnectMongo();
}
