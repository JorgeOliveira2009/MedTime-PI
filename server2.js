/*
===============================================
Server com Crud
Create
Update
Read
Delete

Baixar Nodemon
- usar npm run dev
novo
*/


const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CONEXÃO COM O MYSQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // coloca sua senha do MySQL aqui
    database: "medtime"
});

// Teste de conexão
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

// ROTA DE CADASTRO
app.post("/cadastro", (req, res) => {
    const { email, senha } = req.body;

    const sql = "INSERT INTO usuarios (email, senha) VALUES (?, ?)";

    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Erro ao cadastrar");
        }
        res.send("Cadastro realizado com sucesso!");
    });
});


app.get('/Listar', (req, res) => {
    const comandoBanco = `SELECT * FROM usuarios`;  // Verifique se você está consultando a tabela correta
    db.query(comandoBanco, (erro, resultados) => {
        if (erro) {
            return res.status(500).send("Erro ao Listar!");
        }
        return res.status(200).json(resultados);  // Envia os dados como JSON
    });
});

app.get('/Listar/:id', (req, res) => {
    const { id } = req.params; 
    const comandoBanco = `SELECT * FROM usuarios Where id=?`;  // Verifique se você está consultando a tabela correta
    db.query(comandoBanco,[id], (erro, resultados) => {
        if (erro) {
            return res.status(500).send("Erro ao Listar!");
        }
        return res.status(200).json(resultados);  // Envia os dados como JSON
    });
});


// ROTA DE LOGIN
app.post("/login", (req, res) => {
    console.log("Recebi tentativa de login:", req.body); // 👈 ADICIONA ISSO

    const { email, senha } = req.body;

    const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ sucesso: false });
        }

        if (result.length > 0) {
            res.json({ sucesso: true });
        } else {
            res.json({ sucesso: false });
        }
    });
});

app.delete('/deletar/:id', (req, res) => {  // Corrigido para aceitar o id via parâmetro
    const { id } = req.params;
    const comandoBanco = `DELETE FROM usuarios WHERE id = ?`;  // Corrigido a query
    db.query(comandoBanco, [id], (erro) => {
        if (erro) {
            return res.status(500).send("Erro ao Deletar usuario do Banco!");
        }
        return res.status(200).send("Sucesso ao Deletar usuario do Banco!");
    });
});


app.put('/atualizar/:id', (req, res) => {

    // ID vem da URL
    const { id } = req.params

    // Nome e email vêm do body
    const { email,senha} = req.body

    const atualizacao = `
        UPDATE usuarios
        SET email = ?, senha = ?
        WHERE id = ?
    `

    db.query(atualizacao, [email,senha , id], (erro) => {

        if (erro) {
            return res.status(500).send("Erro ao tentar atualizar o usuário")
        }

        res.status(200).send("Usuário atualizado com sucesso!")
    })
})






app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});