import amqp, { Channel, Connection } from 'amqplib';

import logger from '../logger';
import amqpConfig from '../configs/amqp';
import { wait } from '../utils/timeout';
import { onNewMessage } from '../services/deliver-message';

function onQueueMessage(channel: Channel, data) {
    try {
        const message = JSON.parse(data.content.toString());

        onNewMessage(message);

        channel.ack(data);
    } catch (err) {
        logger.error(`Failed to parse received JSON message: ${err.message}`);
    }
}

async function startWorker(connection: Connection) {
    try {
        const channel: Channel = await connection.createChannel();

        channel.on('error', (err) => {
            logger.error(err.message);
        });

        channel.on('close', () => {
            logger.info('MQ channel closed!');
        });

        await channel.prefetch(amqpConfig.prefetch_count);

        await channel.assertExchange(amqpConfig.exchange, 'direct');

        await channel.assertQueue(amqpConfig.queues.mainServer, { durable: true });

        await channel.consume(amqpConfig.queues.mainServer, (data) => {
            onQueueMessage(channel, data);
        });

        logger.info(
            `Listening, exchange: ${amqpConfig.exchange}, queue: ${amqpConfig.queues.mainServer}`,
        );
    } catch (err) {
        logger.error(err.message);
    }
}

export default async function connectMQ() {
    try {
        const connection = await amqp.connect(amqpConfig.url);

        connection.on('error', (err) => {
            logger.error(err.message);
        });

        connection.on('close', () => {
            logger.info('MQ connection closed!');
        });

        logger.info('MQ connected!');

        await startWorker(connection);

        // close connection function
        return () => connection.close();
    } catch (err) {
        logger.error(err.message);

        await wait(amqpConfig.reconnectionTimeout);

        return connectMQ();
    }
}
