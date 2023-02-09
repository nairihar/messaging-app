import express from 'express';

import usersRoutes from './users/users-routes';
import messagesRoutes from './messages/messages-routes';

const router = express.Router();

usersRoutes(router);
messagesRoutes(router);

export default router;
