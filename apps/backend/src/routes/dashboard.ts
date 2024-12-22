import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

const calculateSumByType = async (
  typeTransaction: 'income' | 'expense'
): Promise<number> => {
  const result = await prisma.transactions.aggregate({
    _sum: {
      value: true,
    },
    where: {
      typeTransaction,
    },
  });
  return result._sum.value || 0;
};

router.get('/', async (req, res) => {
  try {
    const [sumIncomes, sumExpenses] = await Promise.all([
      calculateSumByType('income'),
      calculateSumByType('expense'),
    ]);

    const dashboardData = {
      incomes: sumIncomes.toFixed(2),
      expenses: sumExpenses.toFixed(2),
      remaining: (sumIncomes - sumExpenses).toFixed(2),
    };

    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar dashboard.' });
  }
});

export default router;
