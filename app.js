require('dotenv').config();
const express = require('express');
var logger = require('morgan');
const {PORT = 3000} = process.env;
const endpoint = require('./routes/enpoint');
const testingRoutes = require('./routes/testingRoutes');
const app = express();

app.use(logger('dev'));
app.use(express.json());
// app.use("/api/v1",endpoint);

app.use("/api/v1", testingRoutes);


// app.use( (req, res, next) => {
//     res.status(404).json({
//         status: 404,
//         message: "Not Found",
//         data: null
//     })
// })

// app.use( (err, req, res, next) => {
//     res.status(500).json({
//         status: 500,
//         message: "Internal Server Error",
//         data: err.message
//     })
// })

module.exports = app;

// app.listen(PORT, () => {
//     console.log(`Example app listening at http://localhost:${PORT}`);
// });