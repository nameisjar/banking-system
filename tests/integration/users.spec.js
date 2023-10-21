const app = require('../../app');
const request = require('supertest');

describe('User API Integration Tests', () => {
    let createdUserId;

    test('POST /api/v1/users - Create a new user', async () => {
        const userData = {
            name: 'Fajar',
            email: 'fajar01211211@mail.com',
            password: '123456',
            identityType: 'KTP',
            identityNumber: 'fajar01211211',
            address: 'New York',
        };

        const response = await request(app)
            .post('/api/v1/users')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('User Created');
        expect(response.body.data).toHaveProperty('id');
        createdUserId = response.body.data.id;
    });

    test('POST /api/v1/users - Create a user with an existing email', async () => {
        const userData = {
            name: 'fajar',
            email: 'fajar012112@mail.com',
            password: '654321',
            identityType: 'KTP',
            identityNumber: 'fajar012112',
            address: 'Los Angeles',
        };

        const response = await request(app)
            .post('/api/v1/users')
            .send(userData);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('Failed to create user');
    });


    test('GET /api/v1/users - Get all users', async () => {
        const response = await request(app)
            .get('/api/v1/users');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Users retrieved successfully');
        expect(Array.isArray(response.body.data.users)).toBe(true);
    });

    test('GET /api/v1/users/:id - Get user details by ID', async () => {
        const createdUserId = 1; 
        const response = await request(app)
            .get(`/api/v1/users/${createdUserId}`);
    
        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('User retrieved successfully');
        expect(response.body.data.id).toBe(createdUserId);
    });

    test('GET /api/v1/users/:id - Get user details by invalid ID', async () => {
        const invalidUserId = 999999; 
        
        const response = await request(app)
            .get(`/api/v1/users/${invalidUserId}`);
    
        expect(response.status).toBe(400);
        expect(response.body.status).toBe(false);
        expect(response.body.message).toBe('User not found');
        expect(response.body.data).toBe(null);
    });
    
    

    test('POST /api/v1/accounts - Create a new bank account', async () => {
        const accountData = {
            balance: 100000,
            bankName: 'Bank ABC',
            bankAccountNumber: '1234564990005',
            userId: createdUserId, 
        };

        const response = await request(app)
            .post('/api/v1/accounts')
            .send(accountData);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Account Created');
        expect(response.body.data).toHaveProperty('id');
    });

    test('GET /api/v1/accounts - Get all bank accounts', async () => {
        const response = await request(app)
            .get('/api/v1/accounts');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Accounts retrieved successfully');
        expect(Array.isArray(response.body.data.accounts)).toBe(true);
    });

    test('GET /api/v1/accounts/:id - Get bank account details by ID', async () => {
        const response = await request(app)
            .get('/api/v1/accounts/1'); 

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe('Account retrieved successfully');
        expect(response.body.data.id).toBe(1); 
    });
});
