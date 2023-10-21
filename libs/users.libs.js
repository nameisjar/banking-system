const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUser: async (name, email, password, identityType, identityNumber, address) => {
        try {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (existingUser) {
                throw 'Email sudah terdaftar';
            }

            const user = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: password,
                    profile: {
                        create: {
                            identityType: identityType,
                            identityNumber: identityNumber,
                            address: address,
                        },
                    },
                },
            });

            return user;
        } catch (err) {
            throw err;
        }
    },

    getAllUsers: async () => {
        try {
            let users = await prisma.user.findMany({

            });
            return users ;
        } catch (err) {
            throw err;
        }
    },
    getUsersDetail: async (userId) => {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw 'user not found';
            }
            return user;
        } catch (err) {
            throw err;
        }
    },
    createAccounts: async (balance, bankName, bankAccountNumber, userId) => {
        try {
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
            let account = await prisma.bankAccounts.findUnique({
                where: {
                    id: newAccount.id,
                },
            })
            if (!account) {
                throw 'account not found';
            }
            return newAccount;
        } catch (err) {
            throw err;
        }
    },
    getAllAccounts: async () => {
        try {
            let accounts = await prisma.bankAccounts.findMany({
            })
            return accounts;

        } catch (err) {
            throw err;
        }
    },
    getDetailAccounts: async (accountid) => {
        try {
            let account = await prisma.bankAccounts.findUnique({
                where: {
                    id: accountid,
                },
            });
            if (!account) {
                throw 'account not found';
            }
            return account;
        } catch (err) {
            throw err;
        }
    }
}
