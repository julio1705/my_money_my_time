import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { typeTransition, value, description } = req.body;

    try {
        const transitions = await prisma.transitions.create({
            data: {
                typeTransition,
                value,
                description,
            },
        });
        res.status(201).json(transitions);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar transação' });
    }
});

router.get('/', async (req, res) => {
    try {
        const transitions = await prisma.transitions.findMany();
        res.json(transitions);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar transações' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const transitions = await prisma.transitions.findUnique({
            where: { id: Number(id) },
        });

        if (!transitions) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }

        res.json(transitions);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar transação' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { typeTransition, value, description } = req.body;

    try {
        const updatedTransaction = await prisma.transitions.update({
            where: { id: Number(id) },
            data: {
                typeTransition,
                value,
                description,
            },
        });

        res.json(updatedTransaction);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar transação' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.transitions.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: 'Transação excluída' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir transação' });
    }
});

export default router;