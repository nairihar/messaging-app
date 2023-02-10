import express from 'express';

import usersRoutes from '../users/users-routes';
import messagesRoutes from '../messages/messages-routes';
import attachPerformerIntoRequest from './middlewares/middlewares-performer';

const router = express.Router();

// middlewares
router.use(attachPerformerIntoRequest);

// routes
usersRoutes(router);
messagesRoutes(router);

export default router;
