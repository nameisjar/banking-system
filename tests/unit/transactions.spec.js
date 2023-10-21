// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const { createTransaction, getAllTransaction, getDetailTransaction } = require('../../libs/transactions.libs.js')

// describe('Transaction Management', () => {

//     test('Test create a transaction with sufficient balance', async () => {
//         try {
//             senderAccountId = 5;
//             recipientAccountId = 4;
//             const amount = 100;
//             const transaction = await createTransaction(senderAccountId, recipientAccountId, amount);
//             expect(transaction).toHaveProperty('id');
//             expect(transaction).toHaveProperty('amount');
//             expect(transaction).toHaveProperty('sourceAccountId');
//             expect(transaction).toHaveProperty('destinationAccountId');
//         } catch (err) {
//             throw err;
//         }
//     });

//     test('Test create a transaction with insufficient balance', async () => {
//         senderAccountId = 5;
//         recipientAccountId = 4;
//         const amount = 1000000;
//         try {
//             const transaction = await createTransaction(senderAccountId, recipientAccountId, amount);
//             expect(transaction).toBe('error');
//         } catch (err) {
//             expect(err).toContain('Saldo pengirim tidak mencukupi');
//         }
//     });

//     test('Test get all transactions', async () => {
//         try {
//             const transactions = await getAllTransaction();
//             expect(transactions).toBeInstanceOf(Array);
//         } catch (err) {
//             throw err;
//         }
//     });

//     test('Test get transaction details', async () => {
//         try {
//             const transactions = await getAllTransaction();
//             if (transactions.length > 0) {
//                 const transactionId = transactions[0].id; // Ambil ID transaksi yang ada
//                 const transaction = await getDetailTransaction(transactionId);
//                 expect(transaction).toHaveProperty('id');
//             }
//         } catch (err) {
//             throw err
//         }
//     });
// });