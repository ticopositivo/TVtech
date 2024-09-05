const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Middleware para interpretar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // altere conforme necessário
  password: '', // altere conforme necessário
  database: 'consertos_tv'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL.');
});

// Rota para exibir o formulário HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Rota para processar o formulário e salvar os dados no banco de dados
app.post('/submit', (req, res) => {
  const { nome, telefone, endereco, modelo, defeito, descricao, data, status, orcamento } = req.body;

  const sql = `INSERT INTO consertos 
    (nome_cliente, telefone_cliente, endereco_cliente, modelo_tv, tipo_defeito, descricao_problema, data_entrada, status_conserto, orcamento)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nome, telefone, endereco, modelo, defeito, descricao, data, status, orcamento], (err, result) => {
    if (err) throw err;
    console.log('Dados inseridos no banco de dados.');
    res.send('Dados salvos com sucesso!');
  });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000.');
});
