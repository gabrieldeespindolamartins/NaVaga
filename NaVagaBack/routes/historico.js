/**
 * @file routes/historico.js
 * @description Define as rotas da API para operações relacionadas ao histórico de uso de vagas.
 */

const express = require("express");
const router = express.Router();
const { addVagaToHistorico, getHistoricoByUsuario } = require("../controllers/historico");

/**
 * @route POST /
 * @description Rota para adicionar um registro de uso de vaga ao histórico de um usuário.
 * @access Public (pode ser protegido com middleware de autenticação/autorização)
 */
router.post("/", addVagaToHistorico);

/**
 * @route GET /:usuario_id
 * @description Rota para buscar o histórico de vagas utilizadas por um usuário específico.
 * @access Public (pode ser protegido com middleware de autenticação/autorização)
 */
router.get("/:usuario_id", getHistoricoByUsuario);

module.exports = router;

