import express from 'express';
import cors from 'cors';

import transactionsRoute from './routes/transactionsRoute';
import dashboardRoute from './routes/dashboardRoute'

const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRoute)
app.use('/api/dashboard', dashboardRoute)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
