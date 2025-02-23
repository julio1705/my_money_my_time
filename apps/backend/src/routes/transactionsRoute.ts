import { Router } from 'express';
import { TransactionRepositoryPrisma } from '../database/transactionRepositoryPrisma';
// import { TransactionRepositoryFakerDB } from '../database/transactionRepositoryFakerDB';
import { TransactionsUseCase } from '../application/transactionsUseCase';

const router = Router();
const transactionsUseCase = new TransactionsUseCase(
  new TransactionRepositoryPrisma()
);

router.post('/', async (req, res) => {
  const input = req.body;
  try {
    const createdTransaction = await transactionsUseCase.createTransaction(input);
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const transactions = await transactionsUseCase.getTransactions()
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const transaction_id = Number(req.params.id)
  try {
    const transaction = await transactionsUseCase.getTransaction(transaction_id)
    res.json(transaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const transaction_id = Number(req.params.id);
  const input = req.body;
  try {
    const updatedTransaction = await transactionsUseCase.updateTransaction(transaction_id, input)
    res.json(updatedTransaction);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const transaction_id = Number(req.params.id);
  try {
    const deletedTransaction = await transactionsUseCase.deleteTransaction(transaction_id)
    res.status(200).json(deletedTransaction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
