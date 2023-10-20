const app = require('../../app');
const request = require('supertest');
let user = {};

describe('Integration Tests for Transaction API', function () {
    // before(async function () {
    //   // You can perform setup tasks here, e.g., database seeding
    // });
  
    // after(async function () {
    //   // You can perform cleanup tasks here, e.g., database cleanup
    // });
  
    describe('POST /createTransaction', function () {
      it('should create a new transaction', async function () {
        // Your test data
        let sourceAccountId = 1;
        let destinationAccountId = 2;
        let amount = 100;
  
        // Send a request to your Express app
        let response = await request(app).post('/transactions').send({
          sourceAccountId,
          destinationAccountId,
          amount,
        });
        user = response.body.data;
  
        expect(response.status).to.equal(201);
        expect(response.body.status).to.be.true;
        expect(response.body.message).to.equal('Transaksi Berhasil');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data.sourceAccountId).to.equal(sourceAccountId);
        expect(response.body.data.destinationAccountId).to.equal(destinationAccountId);
        expect(response.body.data.amount).to.equal(amount);
      });
    });
  
    describe('GET /getAllTransaction', function () {
      it('should retrieve all transactions', async function () {
        // Send a request to your Express app
        let response = await request(app).get('/transactions');
  
        expect(response.status).to.equal(200);
        expect(response.body.status).to.be.true;
        expect(response.body.message).to.equal('OK');
        expect(response.body.data).to.have.property('pagination');
        expect(response.body.data).to.have.property('transactions');
        expect(response.body.data.transactions).to.be.an('array');
      });
    });
  
    describe('GET /getDetailTransaction/:id', function () {
      it('should retrieve details of a transaction', async function () {
        // Your test data
        let transactionId = 1;
  
        // Send a request to your Express app
        let response = await request(app).get(`/transactions/${transactionId}`);
  
        expect(response.status).to.equal(200);
        expect(response.body.status).to.be.true;
        expect(response.body.message).to.equal('OK');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data.id).to.equal(transactionId);
      });
    });
  });