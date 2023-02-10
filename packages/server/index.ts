import './app/env';

import logger from './app/logger';

// in case of other external connections we can combine them with databases
// here in my case I just have database connections
import {
    connectDatabases,
    disconnectDatabases,
} from './app/_common/_dbs/db-connections';

async function startApp() {
    await connectDatabases();

    const { default: appServer } = await import('./app/app');

    return appServer;
}

function onSigTermGracefulShutdown(appServer) {
    process.on('SIGTERM', async () => {
        logger.info('SIGTERM signal received.');

        await appServer.close();

        logger.info('HTTP server closed!');

        await disconnectDatabases();

        process.exit(0);
    });
}

(async () => {
    const appServer = await startApp();

    onSigTermGracefulShutdown(appServer);
})();
