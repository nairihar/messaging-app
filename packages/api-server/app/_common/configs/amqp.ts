export default {
    url: process.env.CLOUDAMQP_URL || 'amqp://localhost',

    reconnectionTimeout: Number(process.env.CLOUDAMQP_RECONNECTION_TIMEOUT) || 5000,

    exchange: process.env.CLOUDAMQP_EXCHANGE || 'messaging-app-live-messages',

    queues: {
        mainServer: process.env.CLOUDAMQP_MAIN_SERVER_QUEUE || 'socket-q-1',
    },

    prefetch_count: Number(process.env.CLOUDAMQP_PREFETCH) || 10,
};
