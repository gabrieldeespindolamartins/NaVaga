/**
 * @file controllers/historico.js
 * @description Funções controladoras para manipulação do histórico de uso de vagas por usuários.
 */

const db = require("../db");

/**
 * @function addVagaToHistorico
 * @description Adiciona um registro de uso de vaga ao histórico de um usuário.
 * @param {Object} req - Objeto de requisição do Express. Espera `usuario_id` e `vaga_id` no corpo.
 * @param {Object} res - Objeto de resposta do Express.
 */
const addVagaToHistorico = async (req, res) => {
  const { usuario_id, vaga_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO historico (usuario_id, vaga_id) VALUES ($1, $2) RETURNING *",
      [usuario_id, vaga_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao adicionar vaga ao histórico:", err);
    res.status(500).send("Erro do servidor");
  }
};

/**
 * @function getHistoricoByUsuario
 * @description Retorna o histórico de vagas utilizadas por um usuário específico.
 * @param {Object} req - Objeto de requisição do Express. Espera `usuario_id` nos parâmetros da rota.
 * @param {Object} res - Objeto de resposta do Express.
 */

const getHistoricoByUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const result = await db.query(
      "SELECT h.id, h.data_entrada, h.data_saida, v.localizacao, v.status FROM historico h JOIN vagas v ON h.vaga_id = v.id WHERE h.usuario_id = $1 ORDER BY h.data_entrada DESC",
      [usuario_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar histórico do usuário:", err);
    res.status(500).send("Erro do servidor");
  }
};

module.exports = {
  addVagaToHistorico,
  getHistoricoByUsuario,
};

