import express from 'express';
import cors from 'cors';

import transactionsRoutes from './routes/transactions';
import dashboardRoutes from './routes/dashboard'

const host = process.env.HOST ?? '127.0.0.1';
//const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/transactions', transactionsRoutes)
app.use('/dashboard', dashboardRoutes)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
