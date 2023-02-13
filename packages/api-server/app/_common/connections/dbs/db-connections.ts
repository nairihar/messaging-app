import { connectRedis, disconnectRedis } from './redis-client';
import { connectMongo, disconnectMongo } from './mongo-client';

export async function connectDatabases() {
    await connectRedis();

    await connectMongo();
}

export async function disconnectDatabases() {
    await disconnectRedis();

    await disconnectMongo();
}
