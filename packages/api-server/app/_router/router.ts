import express from 'express';

import healthRoutes from './health';
import usersRoutes from '../users/users-routes';
import messagesRoutes from '../messages/messages-routes';
import attachPerformerIntoRequest from './middlewares/middlewares-performer';

const router = express.Router();

healthRoutes(router);

// middlewares
router.use(attachPerformerIntoRequest);

// routes
usersRoutes(router);
messagesRoutes(router);

export default router;
