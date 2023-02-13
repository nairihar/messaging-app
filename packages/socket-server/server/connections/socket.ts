import http from 'http';
import { Server, Socket } from 'socket.io';

import app from '../app';
import logger from '../logger';
import httpConfig from '../configs/http';
import socketConfig from '../configs/socket';

import { ConnectionQuery } from '../@types/socket';
import { storeSocketConnection } from '../store/store';

function onConnectMiddleware(socket, next) {
    const query: ConnectionQuery = socket.request._query;

    if (!query.username?.trim()) {
        next('Invalid username!');
    }

    storeSocketConnection(query.username, socket);

    next();
}

function handleConnection(socket: Socket): void {
    logger.info(`Client connected: ${socket.id}`);
}

export default function starSocketServer() {
    const server = http.createServer(app);

    const io = new Server(server, socketConfig.options);

    server.listen(httpConfig.port, () => {
        logger.info(`Socket server listening on ${httpConfig.port} port`);
    });

    io.use(onConnectMiddleware);

    io.on('connection', handleConnection);

    return io;
}
