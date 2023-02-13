import { Socket } from 'socket.io';

const socketStore = new Map<string, Socket>();

export function storeSocketConnection(username: string, socket: Socket): void {
    socketStore.set(username, socket);
}

export function getSocketConnection(username: string): Socket | null {
    return socketStore.get(username) || null;
}
