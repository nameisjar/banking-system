const express = require('express');
const router = express.Router();
const {createUsers, getAllUsers, getUsersDetail, createAccounts, getAllAccounts, getDetailAccounts} = require('../controllers/users.controllers');
const {createTransaction, getAllTransaction, getDetailTransaction} = require('../controllers/transactions.controllers');


router.post('/users', createUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', getUsersDetail);
router.post('/accounts', createAccounts);
router.get('/accounts', getAllAccounts);
router.get('/accounts/:id', getDetailAccounts);


router.post('/transactions', createTransaction);
router.get('/transactions', getAllTransaction);
router.get('/transactions/:id', getDetailTransaction)






module.exports = router;