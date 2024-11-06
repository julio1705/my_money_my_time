import express from 'express';
import cors from 'cors';

import transactionsRoutes from './routes/transactions';

//const host = process.env.HOST ?? '0.0.0.0';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', transactionsRoutes)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
