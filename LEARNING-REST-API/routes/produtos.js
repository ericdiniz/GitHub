const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'rota de produtos usando GET'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'rota de produtos usando POST'
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