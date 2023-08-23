const express = require('express')
const morgan = require('morgan')
const app = express();
const produtosRouter = require('./routes/produtos')
const pedidosRouter = require('./routes/pedidos')


app.use(morgan('dev'));
app.use('/teste', (req, res, next) => {
    res.status(200).send('deu bom')
})
app.use('/produtos', produtosRouter);
app.use('/pedidos', pedidosRouter);

//ROTA PARA ERRO
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404
    next(erro);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app;