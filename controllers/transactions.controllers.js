const { createTransaction, getAllTransaction, getDetailTransaction } = require('../libs/transactions.libs');



module.exports = {
    createTransaction: async (req, res, next) => {
        try {
            let { amount, destinationAccountId, sourceAccountId } = req.body;

            let result = await createTransaction(sourceAccountId, destinationAccountId, amount);

            res.status(201).json({
                status: true,
                message: "Transaksi Berhasil",
                data: `Transfer Saldo sebesar ${result.amount} diterima dari ${result.sourceAccountId} ke ${result.destinationAccountId}`,
            });
        } catch (err) {
            next(err);
        }
    },
    getAllTransaction: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let transactions = await getAllTransaction();

            let { _count } = await prisma.transactions.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, transactions }
            });
        } catch (err) {
            next(err);
        }
    },
    getDetailTransaction: async (req, res, next) => {
        try {
            let { id } = req.params;
            let transaction = await getDetailTransaction(Number(id));
            if (!transaction) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'no transaction found with id ' + id
                });
            }
            res.status(200).json({
                status: true,
                message: 'OK',
                data: transaction,
            });
        } catch (err) {
            next(err);
        }
    }
};
