const app = require('../../app');
const request = require('supertest');

describe('Transaction API Integration Tests', () => {
    test('POST /api/v1/transactions - Create a new transaction', async () => {
        const transactionData = {
            sourceAccountId: 4,
            destinationAccountId: 5,
            amount: 10,
        };
        const transaction = await request(app).post('/api/v1/transactions').send(transactionData);
        expect(transaction.status).toBe(201);
        expect(transaction.body.status).toBe(true);
        expect(transaction.body.message).toBe('Transaction Created');
        expect(transaction.body.data).toHaveProperty('id');
    });

    test('GET /api/v1/transactions - Get all transactions', async () => {
        const transactions = await request(app).get('/api/v1/transactions');
        expect(transactions.status).toBe(200);
        expect(transactions.body.status).toBe(true);
        expect(transactions.body.message).toBe('Transactions retrieved successfully');
        
    });

    test('GET /api/v1/transactions/:id - Get transaction details by ID', async () => {
        const transactionId = 1;
        const transaction = await request(app).get(`/api/v1/transactions/${transactionId}`);
        expect(transaction.status).toBe(200);
        expect(transaction.body.status).toBe(true);
        expect(transaction.body.message).toBe('Transaction retrieved successfully');
        expect(transaction.body.data.id).toBe(transactionId);
    })

    test('GET /api/v1/transactions/:id - Get transaction details by invalid ID', async () => {
        const invalidTransactionId = 999999;
        const transaction = await request(app).get(`/api/v1/transactions/${invalidTransactionId}`);
        expect(transaction.status).toBe(400);
        expect(transaction.body.status).toBe(false);
        expect(transaction.body.message).toBe('Transaction not found');
        expect(transaction.body.data).toBe(null);
    })
    
})

