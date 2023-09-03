const express = require('express');
const router = express.Router();
const pool = require('../mysql'); // Aqui você importa o módulo do arquivo db.js

router.post('/', async (req, res, next) => {
    try {
        const connection = await pool.getConnection();
        const query = 'INSERT INTO produtos (nome, preco) VALUES (?, ?)';
        const values = [req.body.nome, req.body.preco];
        const [rows, _] = await connection.execute(query, values);

        // Consulta separada para obter o último ID inserido
        const [result] = await connection.query('SELECT LAST_INSERT_ID() as id');
        const idProdutoInserido = result[0].id;

        connection.release();
        const response = {
            mensagem: "Produto inserido com sucesso",
            produtoCriado: {
                nome: req.body.nome,
                preco: req.body.preco,
                request: {
                    tipo: 'POST',
                    descricao: 'Breve descrição do ' + req.body.nome,
                    url: 'http://localhost:3000/produtos/' + idProdutoInserido
                }
            }
        }
        return res.status(201).send(response);
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
        const [rows] = await connection.execute(query);
        connection.release();
        const response = {
            "Quantidade Produtos": rows.length,
            produtos: rows.map(prod => {
                return {
                    id_produto: prod.id_produto,
                    nome: prod.nome,
                    preco: prod.preco,
                    request: {
                        tipo: 'GET',
                        descricao: 'breve descrição do ' + prod.nome,
                        url: 'http://localhost:3000/produtos/' + prod.id_produto
                    }
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
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
        const [rows] = await connection.execute(query);
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
        const [rows] = await connection.execute(query, values);
        connection.release();
        const response = {
            mensagem: "Produto atualizado com sucesso",
            produtoCriado: {
                nome: req.body.nome,
                preco: req.body.preco,
                request: {
                    tipo: 'PATCH',
                    descricao: 'Breve descrição do ' + req.body.nome,
                    url: 'http://localhost:3000/produtos/' + req.body.id_produto
                }
            }
        }
        return res.status(200).send(response);
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
        const [rows] = await connection.execute(query, values);
        connection.release();
        const response = {
            mensagem: "Produto deletado com sucesso",
            produtoCriado: {
                nome: req.body.nome,
                preco: req.body.preco,
                request: {
                    tipo: 'DELETE',
                    descricao: 'Breve descrição do ' + req.body.nome,
                    url: 'http://localhost:3000/produtos/' + req.body.id_produto
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: error,
            response: null
        });
    }
});

module.exports = router;