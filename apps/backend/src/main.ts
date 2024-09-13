import express from 'express';
import cors from 'cors';

import transitionsRoutes from './routes/transitions';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', transitionsRoutes)

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
