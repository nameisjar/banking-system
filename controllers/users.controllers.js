const { createUser, getAllUsers, getUsersDetail, createAccounts, getAllAccounts, getDetailAccounts } = require('../libs/users.libs');
const { getPagination } = require('../helpers/pagination');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUsers: async (req, res, next) => {
        try {
            try {
                const { name, email, password, identityType, identityNumber, address } = req.body;
    
                const user = await createUser(name, email, password, identityType, identityNumber, address);
    
                res.status(201).json({
                    status: true,
                    message: "User Created",
                    data: user,
                });
            } catch (err) {
                res.status(400).json({
                    status: false,
                    message: "Failed to create user",
                    error: err.message, // Provide a more informative error message
                });
            }
        } catch (err) {
            next(err);
        }
        
    },
    getAllUsers: async (req, res, next) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            const parsedLimit = Number(limit);
            const parsedPage = Number(page);

            const users = await getAllUsers();

            const { _count } = await prisma.user.aggregate({
                _count: { id: true }
            });

            const pagination = getPagination(req, _count.id, parsedPage, parsedLimit);

            res.status(200).json({
                status: true,
                message: 'Users retrieved successfully',
                data: { pagination, users }
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: "Failed to fetch users",
                error: err.message,
            });
        }
    },
    getUsersDetails: async (req, res, next) => {
        try {
            const { id } = req.params;
            try {
                const user = await getUsersDetail(Number(id));
                res.status(200).json({
                    status: true,
                    message: 'User retrieved successfully',
                    data: user,
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: 'User not found',
                    data: null,
                });
            }
           
        } catch (err) {
            res.status(500).json({
                status: false,
                message: "Failed to fetch user details",
                error: err.message,
            });
        }
    },
    createAccount: async (req, res, next) => {
        try {
            const { balance, bankName, bankAccountNumber, userId } = req.body;

            const newAccount = await createAccounts(balance, bankName, bankAccountNumber, userId);

            res.status(201).json({
                status: true,
                message: "Account Created",
                data: newAccount,
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: "Failed to create account",
                error: err.message,
            });
        }
    },
    getAllAccounts: async (req, res, next) => {
        try {
            const { limit = 10, page = 1 } = req.query;
            const parsedLimit = Number(limit);
            const parsedPage = Number(page);

            const accounts = await getAllAccounts();

            const { _count } = await prisma.bankAccounts.aggregate({
                _count: { id: true }
            });

            const pagination = getPagination(req, _count.id, parsedPage, parsedLimit);

            res.status(200).json({
                status: true,
                message: 'Accounts retrieved successfully',
                data: { pagination, accounts }
            });
        } catch (err) {
            res.status(400).json({
                status: false,
                message: "Failed to fetch accounts",
                error: err.message,
            })
        }
    },
    getAccountDetail: async (req, res, next) => {
        try {
            const { id } = req.params;
            const account = await getDetailAccounts(Number(id));

            if (!account) {
                return res.status(400).json({
                    status: false,
                    message: 'Account not found',
                    data: null,
                });
            }

            res.status(200).json({
                status: true,
                message: 'Account retrieved successfully',
                data: account,
            });
        } catch (err) {
            next(err);
        }
    },
};
