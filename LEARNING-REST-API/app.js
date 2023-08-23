const express = require('express')
const app = express();
const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/pedidos')

app.use('/teste', (req, res, next) => {
    res.status(200).send('deu bom')
})
app.use('/produtos', produtosRouter);
app.use('/pedidos', pedidosRouter);

module.exports = app;