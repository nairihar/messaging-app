import amqp, { Channel, Connection } from 'amqplib';

import logger from '../../../logger';
import amqpConfig from '../../configs/amqp';

import { wait } from '../../utils/timeout';

const state = new Map();

async function createMQChannel(connection: Connection) {
    try {
        const channel: Channel = await connection.createChannel();

        channel.on('error', (err) => {
            logger.error(err.message);
        });

        channel.on('close', () => {
            logger.info('MQ channel closed!');
        });

        await channel.assertExchange(amqpConfig.exchange, 'direct');

        await channel.assertQueue(amqpConfig.queues.mainServer, { durable: true });

        state.set('channel', channel);
    } catch (err) {
        logger.error(err.message);
    }
}

export async function connectMQ() {
    try {
        const connection = await amqp.connect(amqpConfig.url);

        connection.on('error', (err) => {
            logger.error(err.message);
        });

        connection.on('close', () => {
            logger.info('MQ connection closed');
        });

        logger.info('MQ connected!');

        await createMQChannel(connection);

        state.set('connection', connection);
    } catch (err) {
        logger.error(err.message);

        await wait(amqpConfig.reconnectionTimeout);

        return connectMQ();
    }
}

export function sendMessageToQ(data: object) {
    const channel: Channel = state.get('channel');
    const message = Buffer.from(JSON.stringify(data));

    if (channel) {
        channel.sendToQueue(amqpConfig.queues.mainServer, message);
    }
}

export function disconnectMQ() {
    const connection: Connection = state.get('connection');
    return connection.close();
}
