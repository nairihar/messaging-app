import './server/env';

import logger from './server/logger';

import starSocketServer from './server/connections/socket';
import connectMQ from './server/connections/amqp';

async function onSigTermGracefulShutdown(closeMq, io) {
    process.on('SIGTERM', async () => {
        logger.info('SIGTERM signal received.');

        await closeMq();

        await io.close();

        logger.info('Socket server closed!');

        process.exit(0);
    });
}

(async () => {
    const closeMq = await connectMQ();

    const io = starSocketServer();

    await onSigTermGracefulShutdown(closeMq, io);
})();
