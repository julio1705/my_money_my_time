import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const sumIncomes = await prisma.transactions.aggregate({
      _sum: {
        value: true,
      },
      where: {
        typeTransaction: 'income',
      },
    });
    const sumExpenses = await prisma.transactions.aggregate({
      _sum: {
        value: true,
      },
      where: {
        typeTransaction: 'expense',
      },
    });

    const dashboardData = {
      incomes: sumIncomes._sum.value.toFixed(2),
      expenses: sumExpenses._sum.value.toFixed(2),
      remaining: (sumIncomes._sum.value - sumExpenses._sum.value).toFixed(2),
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar dashboard.' });
  }
});

export default router;
