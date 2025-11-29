/**
 * @file app.js
 * @description Ponto de entrada principal para a aplicação backend NaVaga.
 * Configura o servidor Express, middlewares e rotas da API.
 * texte
 */

// Carrega variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importa os módulos necessários
const express = require("express"); // Framework web para Node.js
const bodyParser = require("body-parser"); // Middleware para parsear corpos de requisição
const cors = require("cors"); // Middleware para habilitar Cross-Origin Resource Sharing

// Importa as rotas da aplicação
const usuariosRouter = require("./routes/usuarios");
const vagasRouter = require("./routes/vagas");
const sensoresRouter = require("./routes/sensores");
const historicoRoutes = require("./routes/historico"); // Importa as rotas de histórico

// Inicializa a aplicação Express
const app = express();

// Configura os middlewares
app.use(cors({
  origin: "*",
  credentials: false
})); // Habilita CORS para permitir requisições de diferentes origens
app.use(bodyParser.json()); // Permite que a aplicação parseie requisições com corpo JSON

// Define as rotas da API
// As requisições para /usuarios serão tratadas por usuariosRouter
app.use("/usuarios", usuariosRouter);
// As requisições para /vagas serão tratadas por vagasRouter
app.use("/vagas", vagasRouter);
// As requisições para /sensores serão tratadas por sensoresRouter
app.use("/sensores", sensoresRouter);
// As requisições para /historico serão tratadas por historicoRoutes
app.use("/historico", historicoRoutes);

// Define a porta do servidor, usando a variável de ambiente PORT ou 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`NaVaga backend running on port ${PORT}`);
});

