/**
 * @file controllers/vagas.js
 * @description Funções controladoras para manipulação de vagas de estacionamento.
 */

const db = require("../db");

/**
 * @function listVagas
 * @description Lista todas as vagas de estacionamento disponíveis no banco de dados.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
const listVagas = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM vagas");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao listar vagas:", err);
    res.status(500).send("Erro do servidor");
  }
};

/**
 * @function createVaga
 * @description Cadastra uma nova vaga de estacionamento no banco de dados.
 * @param {Object} req - Objeto de requisição do Express. Espera `localizacao` e opcionalmente `status` no corpo.
 * @param {Object} res - Objeto de resposta do Express.
 */
const createVaga = async (req, res) => {
  const { localizacao, status } = req.body;
  console.log(req.body);
  
  try {
    const result = await db.query(
      "INSERT INTO vagas (localizacao, status) VALUES ($1, $2) RETURNING *",
      [localizacao, status || "livre"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao cadastrar vaga:", err);
    res.status(500).send("Erro do servidor");
  }
};

module.exports = {
  listVagas,
  createVaga,
};

