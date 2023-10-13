const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers/pagination');


module.exports = {
    createTransaction: async (req, res, next) => {
        try {
            let { amount, destinationAccountId, sourceAccountId } = req.body;

            await prisma.$transaction(async (tx) => {
                // 1. Jumlah pengurangan dari pengirim.
                let senderAccount = await tx.bankAccounts.findUnique({
                    where: {
                        id: sourceAccountId,
                    },
                });

                if (!senderAccount) {
                    return res.status(400).json({
                        status: false,
                        message: 'Bad Request',
                        data: 'Pengirim tidak ditemukan',
                    });
                }

                if (senderAccount.balance < amount) {
                    return res.status(400).json({
                        status: false,
                        message: 'Bad Request',
                        data: `Saldo pengirim sebesar ${senderAccount.balance} tidak mencukupi`,
                    });
                }

                await tx.bankAccounts.update({
                    where: {
                        id: sourceAccountId,
                    },
                    data: {
                        balance: senderAccount.balance - amount,
                    },
                });

                // 2. Menambah saldo penerima berdasarkan jumlah
                const recipientAccount = await tx.bankAccounts.findUnique({
                    where: {
                        id: destinationAccountId,
                    },
                });

                if (!recipientAccount) {
                    return res.status(400).json({
                        status: false,
                        message: 'Bad Request',
                        data: 'Penerima tidak ditemukan',
                    });
                }

                await tx.bankAccounts.update({
                    where: {
                        id: destinationAccountId,
                    },
                    data: {
                        balance: recipientAccount.balance + amount,
                    },
                });
                // 3. Membuat entri transaksi
                await tx.transactions.create({
                    data: {
                        amount,
                        sourceAccountId,
                        destinationAccountId,
                    },
                });
            });

            res.status(201).json({
                status: true,
                message: "Transaksi Berhasil",
                data: `Transfer Saldo sebesar ${amount} diterima dari ${sourceAccountId} ke ${destinationAccountId}`,
            });
        } catch (err) {
            next(err);
        }
    },
    getAllTransaction: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);
            let transactions = await prisma.transactions.findMany({
                skip: (page - 1) * limit,
                take: limit,
            })
            const { _count } = await prisma.transactions.aggregate({
                _count: { id: true }
            })
            let pagination = getPagination(req, _count.id, page, limit);
            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, transactions }
            })
        } catch (err) {
            next(err);
        }
    },
    getDetailTransaction: async (req, res, next) => {
        try {
            let { id } = req.params;
            let transaction = await prisma.transactions.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!transaction) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'no transaction found with id ' + id
                });
            }
            res.status(200).json({
                status: true,
                message: 'OK',
                data: transaction,
            });
        } catch (err) {
            next(err);
        }
    }
}