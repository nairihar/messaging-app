import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

// health check
app.get('/server/health', (req, res) => {
    res.status(200).send('OK');
});

export default app;
