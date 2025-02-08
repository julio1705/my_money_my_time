import { Router } from 'express';
import { TransactionRepositoryPrisma } from '../database/transactionRepository';
import { GetDashboardUseCase } from '../application/getDashboardUseCase';

const router = Router();
const transactionRepositoryPrisma = new TransactionRepositoryPrisma();
const getDashboardUseCase = new GetDashboardUseCase(
  transactionRepositoryPrisma
);

router.get('/', async (req, res) => {
  try {
    const dashboardData = await getDashboardUseCase.execute();
    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
