import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {

    const { typeTransaction, value, description } = req.body;

    try {
        const transactions = await prisma.transactions.create({
            data: {
                typeTransaction,
                value,
                description,
            },
        });
        res.status(201).json(transactions);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar transação.' });
    }
});

router.get('/', async (req, res) => {

    try {
        const transactions = await prisma.transactions.findMany();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar transações.' });
    }

});

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const transactions = await prisma.transactions.findUnique({
            where: { id: Number(id) },
        });

        if (!transactions) {
            return res.status(404).json({ error: 'Transação não encontrada.' });
        }

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar transação.' });
    }

});

router.put('/:id', async (req, res) => {

    const { id } = req.params;
    const { typeTransaction, value, description } = req.body;

    try {
        const updatedTransaction = await prisma.transactions.update({
            where: { id: Number(id) },
            data: {
                typeTransaction,
                value,
                description,
            },
        });

        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar transação.' });
    }

});

router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        await prisma.transactions.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Transação excluída!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir transação.' });
    }
    
});

export default router;