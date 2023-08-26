const express = require('express')
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'rota de produtos usando GET'
    })
})

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)'),
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {

            }
    })
    res.status(201).send({
        mensagem: 'rota de produtos usando POST',
        produtoCriado: produto
    })
})

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
    if (id === '1') {
        res.status(200).send({
            mensagem: 'get produto exclusivo',
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: 'get produto normal',
            id: id
        })
    }
})

module.exports = router;