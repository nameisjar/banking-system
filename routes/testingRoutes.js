const express = require('express');
const router = express.Router();
const {createUsers, getAllUsers, getUsersDetail, createAccounts, getAllAccounts, getDetailAccounts} = require('../controllers/users.controllers');

router.post('/users', createUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', getUsersDetail);
router.post('/accounts', createAccounts);
router.get('/accounts', getAllAccounts);
router.get('/accounts/:id', getDetailAccounts);


module.exports = router;