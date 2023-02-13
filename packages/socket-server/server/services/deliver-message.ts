import { getSocketConnection } from '../store/store';
import { ExternalMessage } from '../@types/amqp';

export function onNewMessage(data: ExternalMessage) {
    const socket = getSocketConnection(data.receiver_username);

    if (socket) {
        socket.emit('message', data);
    }
}
