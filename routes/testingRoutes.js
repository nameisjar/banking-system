const express = require('express');
const router = express.Router();
const {createUsers, getAllUsers, getUsersDetails, createAccount, getAllAccounts, getAccountDetail} = require('../controllers/users.controllers');
const {createTransaction, getAllTransactions, getDetailTransaction} = require('../controllers/transactions.controllers');


router.post('/users', createUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', getUsersDetails);
router.post('/accounts', createAccount);
router.get('/accounts', getAllAccounts);
router.get('/accounts/:id', getAccountDetail);


router.post('/transactions', createTransaction);
router.get('/transactions', getAllTransactions);
router.get('/transactions/:id', getDetailTransaction)






module.exports = router;