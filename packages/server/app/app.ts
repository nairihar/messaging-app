import express from 'express';

import configs from './_common/configs/env';
import routes from './router';

const app = express();

// API V1
app.use('/app', routes);

// start the Express server
const appServer = app.listen(configs.port, () => {
  console.log(`Server started at http://localhost:${configs.port}`);
});

export default appServer;
