require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
// const morgan = require('morgan');
const {PORT = 3000} = process.env;
const endpoint = require('./routes/enpoint');
// tsting
const testingRoutes = require('./routes/testingRoutes');
// authenticate
const authRouter = require('./routes/auth.routes');



//untuk menajalankan api dokumentasi
const YAML = require('yaml');
const fs = require("fs");
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());


app.use(logger('dev'));
// app.use(morgan('dev'));
app.use(express.json());
app.use("/api/v1",endpoint);

// dinyalakan ketika testing
// app.use("/api/v1", testingRoutes);

// autentikasi
// app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Welcome",
        error: null,
        data: null
    })
})


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

// dinyalakan ketika testing
// module.exports = app;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});