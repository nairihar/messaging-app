export default {
    port: process.env.PORT || 3003,

    logLevel: process.env.LOG_LEVEL || 'dev',

    userInactiveTimeout: process.env.USER_INACTIVE_TIMEOUT || 10 * 60, // 10 minutes
};
