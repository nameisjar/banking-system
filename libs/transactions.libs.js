const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createTransaction: async (sourceAccountId, destinationAccountId, amount) => {
        try {
            let result = await prisma.$transaction(async (tx) => {
                // 1. Jumlah pengurangan dari pengirim.
                let senderAccount = await tx.bankAccounts.findUnique({
                    where: {
                        id: sourceAccountId,
                    },
                });

                if (!senderAccount) {
                    throw 'Pengirim tidak ditemukan';
                }

                if (senderAccount.balance < amount) {
                    // throw `Saldo pengirim sebesar ${senderAccount.balance} tidak mencukupi`
                    throw `Saldo pengirim tidak mencukupi`
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
                    throw 'Penerima tidak ditemukan'
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
                const transaction = await tx.transactions.create({
                    data: {
                        amount,
                        sourceAccountId,
                        destinationAccountId,
                    },
                });
                return transaction;
            });
        return result;
        } catch (err) {
            throw err;
        }
    },
    getAllTransaction: async () => {
        try {
            let transactions = await prisma.transactions.findMany({
            })
            return transactions;
        } catch (err) {
            throw err;
        }
    },
    getDetailTransaction: async (id) => {
        try {
            let transaction = await prisma.transactions.findUnique({
                where: {
                    id: id,
                },
            });
            if (!transaction) {
                throw 'no transaction found with id ' + id
            }
            return transaction;
        } catch (err) {
            throw err;
        }
    }
}