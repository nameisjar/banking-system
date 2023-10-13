const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {getPagination} = require('../../helpers/pagination');


module.exports = {
    createUsers: async (req, res, next) => {
        try {
            let { name, email, password, identityType, identityNumber, address} = req.body;
            let newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password, 
                    profile: {
                        create: { 
                            identityType: identityType,
                            identityNumber: identityNumber,
                            address: address
                        },
                    },
                },
            });
            res.status(201).json({
                status: true,
                message: "User Created",
                data: newUser,
            });
        } catch (err) {
            next(err);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let users = await prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
            const { _count } = await prisma.user.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, users }
            });
        } catch (err) {
            next(err);
        }
    },   
    getUsersDetail: async (req, res, next) => {
        try {
            let { id } = req.params;
            let user = await prisma.user.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'no user found with id ' + id
                });
            }
            res.status(200).json({
                status: true,
                message: 'OK',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    },
    createAccounts: async (req, res, next) => {
        try {
            let {balance, bankName, bankAccountNumber, userId} = req.body;
            let newAccount = await prisma.bankAccounts.create({
                data: {                    
                    balance: balance,
                    bankName: bankName,
                    bankAccountNumber: bankAccountNumber,
                    users: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            res.status(201).json({
                status: true,
                message: "Account Created",
                data: newAccount,
            });
        } catch (err) {
            next(err);
        }
    },
    getAllAccounts: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);
            let accounts = await prisma.bankAccounts.findMany({
                skip: (page - 1) * limit,
                take: limit,
            })
            const { _count } = await prisma.bankAccounts.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);
            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, accounts }
            })
    }catch (err) {
            next(err);
        }
    },
    getDetailAccounts: async (req, res, next) => {
        try {
            let { id } = req.params;
            let account = await prisma.bankAccounts.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!account) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'no account found with id ' + id
                });
            }
            res.status(200).json({
                status: true,
                message: 'OK',
                data: account,
            });
        } catch (err) {
            next(err);
        }
    }
}