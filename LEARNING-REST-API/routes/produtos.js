const express = require('express');
const router = express.Router();
const pool = require('../mysql'); // Aqui você importa o módulo do arquivo db.js

router.post('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
        const values = [req.body.nome, req.body.preco];
        const [rows, fields] = await connection.execute(query, values);
        connection.release();

        res.status(201).send({
            mensagem: 'produto inserido com sucesso',
            id_produto: rows.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error,
            response: null
        });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT * FROM produtos';
        const [rows, fields] = await connection.execute(query);
        connection.release();

        res.status(200).send({
            produtos: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error,
            response: null
        });
    }
});


router.get('/:id_produto', async (req, res, next) => {
    try {
        const id_produto = req.params.id_produto
        const connection = await pool.getConnection();
        const query = `SELECT * FROM produtos WHERE id_produto=${id_produto}`;
        const [rows, fields] = await connection.execute(query);
        connection.release();

        res.status(200).send({
            produtos: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error,
            response: null
        });
    }
})

router.patch('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const query = 'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?';
        const values = [req.body.nome, req.body.preco, req.body.id_produto];
        const [rows, fields] = await connection.execute(query, values);
        connection.release();

        res.status(200).send({
            mensagem: 'Produto atualizado com sucesso',
            produtos: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error,
            response: null
        });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const query = 'DELETE FROM produtos WHERE id_produto = ?';
        const values = [req.body.id_produto];
        const [rows, fields] = await connection.execute(query, values);
        connection.release();

        res.status(202).send({
            mensagem: 'Produto removido com sucesso',
            produtos: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error,
            response: null
        });
    }
});

module.exports = router;