import './app/env';

import { connectDatabases, disconnectDatabases } from './app/dbs';

async function startApp() {
  await connectDatabases();

  const { default: appServer } = await import('./app/app');

  return appServer;
}

function onSigTermGracefulShutdown(appServer) {
  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received.');

    await appServer.close();

    console.log('HTTP server closed!');

    await disconnectDatabases();

    process.exit(0);
  });
}

(async () => {
  const appServer = await startApp();

  onSigTermGracefulShutdown(appServer);
})();
console.log(process.pid);
