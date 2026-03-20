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
    password: "root", 
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

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});