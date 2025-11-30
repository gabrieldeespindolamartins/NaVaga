/**
 * @file routes/vagas.js
 * @description Define as rotas da API para operações relacionadas a vagas de estacionamento.
 */

const express = require("express");
const router = express.Router();
const { listVagas, createVaga } = require("../controllers/vagas");

/**
 * @route GET /
 * @description Rota para listar todas as vagas de estacionamento.
 * @access Public
 */
router.get("/", listVagas);

/**
 * @route POST /
 * @description Rota para cadastrar uma nova vaga de estacionamento.
 * @access Public (pode ser protegido com middleware de autenticação/autorização)
 */
router.post("/criarVaga", createVaga);

module.exports = router;

