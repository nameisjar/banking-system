const app = require('../../app');
const request = require('supertest');
let user = {};

describe('Test Post /api/v1/users', () => {
    // beforeAll(async () => {
    //     await prisma.profile.deleteMany();
    // })
    test('Test create a new user', async () => {
        try {
            let name = 'Niko';
            let email = 'tes123@gmail.com';
            let password = '123456';
            let identityType = 'KTP';
            let identityNumber = 'tes12345';
            let address = 'Jakarta';
            let { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password, identityType, identityNumber, address });
            user = body.data;

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    })
    test('Test email already exists', async () => {
        try {
            let name = 'Niko';
            let email = 'tes123@gmail.com';
            let password = '123456';
            let identityType = 'KTP';
            let identityNumber = 'tes12345';
            let address = 'Jakarta';
            const { statusCode, body } = await request(app).post('/api/v1/users').send({ name, email, password, identityType, identityNumber, address });

            expect(statusCode).toBe(400);
            expect(body).toHaveProperty('status', 'error');
            expect(body).toHaveProperty('message', 'Email sudah terdaftar');
        } catch (err) {
            throw err;
        }
    });

});

describe('Test Get /api/v1/users', () => {
    test('Test get all users', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/users');
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('message', 'Users retrieved successfully');
            expect(body).toHaveProperty('data');
            expect(body.data).toBeInstanceOf(Array);
        } catch (err) {
            throw err;
        }
    });
});

describe('Test Get /api/v1/users/:id', () => {
    test('Test get user details by ID', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/users/1');
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('message', 'User retrieved successfully');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id', 1);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
        } catch (err) {
            throw err;
        }
    });
});

describe('Test Create /api/v1/accounts', () => {
    test('Test create a new bank account', async () => {
        try {
            let balance = 100000;
            let bankName = 'Bank XYZ';
            let bankAccountNumber = '98173465432';
            let userId = 25;
            const { statusCode, body } = await request(app)
                .post('/api/v1/accounts')
                .send({ balance, bankName, bankAccountNumber, userId });
            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('message', 'Account Created');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('balance');
            expect(body.data).toHaveProperty('bankName');
            expect(body.data).toHaveProperty('bankAccountNumber');
            expect(body.data).toHaveProperty('users');
            expect(body.data.users).toHaveProperty('id');
            expect(body.data.users.id).toBe(userId);
            expect(body.data.balance).toBe(balance);
            expect(body.data.bankName).toBe(bankName);
            expect(body.data.bankAccountNumber).toBe(bankAccountNumber);            
        } catch (err) {
            throw err;
        }
    });
});

describe('Test Get /api/v1/accounts', () => {
    test('Test get all bank accounts', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/accounts');
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('message', 'Accounts retrieved successfully');
            expect(body).toHaveProperty('data');
            expect(body.data).toBeInstanceOf(Array);
        } catch (err) {
            throw err;
        }
    })
})

describe('Test Get /api/v1/accounts/:id', () => {
    test('Test get bank account details by ID', async () => {
        try {
            const { statusCode, body } = await request(app).get('/api/v1/accounts/1');
            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('status', 'success');
            expect(body).toHaveProperty('message', 'Account retrieved successfully');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id', 1);
            expect(body.data).toHaveProperty('balance', 100000);
            expect(body.data).toHaveProperty('bankName', 'Bank XYZ');
            expect(body.data).toHaveProperty('bankAccountNumber', '98173465432');            
        } catch (err) {
            throw err;
        }
    })
})