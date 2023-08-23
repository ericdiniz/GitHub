const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'rota de pedidos usando GET'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'rota de pedidos usando POST'
    })
})

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido
    if (id === '1') {
        res.status(200).send({
            mensagem: 'get pedido exclusivo',
            id: id
        })
    } else {
        res.status(200).send({
            mensagem: 'get pedido normal',
            id: id
        })
    }
})

module.exports = router;