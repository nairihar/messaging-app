import { sendMessageToQ } from '../connections/mq/amqp-client';

export function sendRealTimeMessage(message) {
    return sendMessageToQ(message);
}
