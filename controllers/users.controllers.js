const { createUser, getAllUsers, getUsersDetail, createAccounts, getDetailAccounts, getAllAccounts } = require('../libs/users.libs');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            let { name, email, password, identityType, identityNumber, address } = req.body;

            const user = await createUser(name, email, password, identityType, identityNumber, address);

            res.status(201).json({
                status: true,
                message: "User Created",
                data: user,
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

            const users = await getAllUsers();

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
            const user = await getUsersDetail(Number(id));
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
            let { balance, bankName, bankAccountNumber, userId } = req.body;

            const newAccount = await createAccounts(balance, bankName, bankAccountNumber, userId);

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

            const accounts = await getAllAccounts();

            const { _count } = await prisma.bankAccounts.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, accounts }
            });
        } catch (err) {
            next(err);
        }
    },
    getDetailAccounts: async (req, res, next) => {
        try {
            let { id } = req.params;
            const account = await getDetailAccounts(Number(id));
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
    },
};