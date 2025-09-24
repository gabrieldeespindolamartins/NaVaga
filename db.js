/**
 * @file db.js
 * @description Configuração e conexão com o banco de dados PostgreSQL.
 */

// Importa o módulo Pool do pacote pg para gerenciar conexões com o PostgreSQL
const { Pool } = require("pg");
// Carrega variáveis de ambiente do arquivo .env
require("dotenv").config();

// Configurações do banco de dados utilizando variáveis de ambiente
const db = new Pool({
  host: process.env.DB_HOST, // Endereço do host do banco de dados (ex: localhost)
  port: process.env.DB_PORT, // Porta de conexão do banco de dados (ex: 5432)
  user: process.env.DB_USER, // Usuário do banco de dados
  password: process.env.DB_PASSWORD, // Senha do usuário do banco de dados
  database: process.env.DB_NAME, // Nome do banco de dados
});

// Testando a conexão com o banco de dados
db.connect((err, client, release) => {
  if (err) {
    // Se houver um erro na conexão, registra o erro no console
    return console.error("Erro ao conectar ao banco de dados:", err.stack);
  }
  // Se a conexão for bem-sucedida, registra uma mensagem de sucesso no console
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
  // Libera o cliente de volta para o pool de conexões
  release();
});

// Exporta o objeto 'db' (Pool de conexões) para ser utilizado em outros módulos da aplicação
module.exports = db;

