export default {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

    mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test',
};
