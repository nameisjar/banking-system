const { createTransaction, getAllTransaction, getDetailTransaction } = require('../libs/transactions.libs');

module.exports = {
    createTransaction: async (req, res, next) => {
        try {
            const { sourceAccountId, destinationAccountId, amount } = req.body;
            const transaction = await createTransaction(sourceAccountId, destinationAccountId, amount);

            res.status(201).json({
                status: true,
                message: "Transaction Created",
                data: transaction,
            });
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(400).json({
                status: false,
                message: "Failed to create transaction",
                data: null,
            });
        }
    },
    getAllTransactions: async (req, res, next) => {
        try {
            const transactions = await getAllTransaction();

            res.status(200).json({
                status: true,
                message: 'Transactions retrieved successfully',
                data: transactions,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                status: false,
                message: "Failed to retrieve transactions",
                data: null,
            });
        }
    },
    getDetailTransaction: async (req, res, next) => {
        try {
            const { id } = req.params;
            try {
                const transaction = await getDetailTransaction(Number(id));

                res.status(200).json({
                    status: true,
                    message: 'Transaction retrieved successfully',
                    data: transaction,
                });
            } catch (err) {
                res.status(400).json({
                    status: false,
                    message: 'Transaction not found',
                    data: null,
                });
            }
            
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: false,
                message: "Failed to retrieve transaction details",
                data: null,
            });
        }
    },
};
