/**
 * @file controllers/usuarios.js
 * @description Controlador para gerenciar operações relacionadas a usuários.
 * Inclui funções para registro, autenticação e recuperação do histórico de vagas de um usuário.
 */

const db = require("../db"); // Importa a conexão com o banco de dados
const bcrypt = require("bcrypt"); // Biblioteca para hash de senhas
const jwt = require("jsonwebtoken"); // Biblioteca para JSON Web Tokens

/**
 * @function registerUser
 * @description Registra um novo usuário no sistema.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 */
const registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body; // Extrai nome, email e senha do corpo da requisição

    // Validação básica dos campos de entrada
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    // Criptografa a senha antes de armazená-la no banco de dados
    const hashed = await bcrypt.hash(senha, 10); // 10 é o saltRounds (custo computacional do hash)

    // Query SQL para inserir o novo usuário
    const insert = `
      INSERT INTO usuarios (nome, email, senha) 
      VALUES ($1,$2,$3) 
      RETURNING id, nome, email
    `;
    const result = await db.query(insert, [nome, email, hashed]);

    // Retorna os dados do usuário recém-criado com status 201 (Created)
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    // Verifica se o erro é de violação de UNIQUE (email duplicado)
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    console.error("Erro em registerUser:", err.message); // Loga o erro no console
    return res.status(500).json({ error: "Erro no servidor" }); // Retorna erro 500 em caso de falha
  }
};

/**
 * @function loginUser
 * @description Autentica um usuário existente e retorna um token JWT.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 */
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body; // Extrai email e senha do corpo da requisição

    // Validação básica dos campos de entrada
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // Busca o usuário pelo email no banco de dados
    const row = await db.query(
      "SELECT id, nome, email, senha FROM usuarios WHERE email = $1",
      [email]
    );

    // Verifica se o usuário foi encontrado
    if (row.rowCount === 0) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const user = row.rows[0];
    // Compara a senha fornecida com o hash armazenado no banco de dados
    const senhaOk = await bcrypt.compare(senha, user.senha);

    // Verifica se a senha está correta
    if (!senhaOk) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Gera um token JWT para o usuário autenticado
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET || "changeme", // Usa a variável de ambiente JWT_SECRET ou um valor padrão
      { expiresIn: "8h" } // Token expira em 8 horas
    );

    return res.json({ token }); // Retorna o token JWT
  } catch (err) {
    console.error("Erro em loginUser:", err.message); // Loga o erro no console
    return res.status(500).json({ error: "Erro no servidor" }); // Retorna erro 500 em caso de falha
  }
};

/**
 * @function getHistorico
 * @description Retorna o histórico de vagas de estacionamento de um usuário específico.
 * Requer autenticação e autorização (o usuário só pode ver seu próprio histórico).
 * @param {object} req - Objeto de requisição do Express, contendo o ID do usuário nos parâmetros e o usuário autenticado em `req.user`.
 * @param {object} res - Objeto de resposta do Express.
 */
const getHistorico = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10); // Converte o ID do usuário para inteiro

    // Valida se o ID do usuário é um número válido
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuário inválido" });
    }

    // Verifica se o usuário autenticado está tentando acessar seu próprio histórico
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Acesso negado" }); // Retorna erro 403 (Forbidden) se não for o próprio usuário
    }

    // Query SQL para buscar o histórico de vagas do usuário, incluindo localização da vaga
    const q = `
      SELECT 
        h.id, 
        h.vaga_id, 
        v.localizacao, 
        h.data_entrada, 
        h.data_saida
      FROM historico h
      JOIN vagas v ON v.id = h.vaga_id
      WHERE h.usuario_id = $1
      ORDER BY h.data_entrada DESC
    `;
    const result = await db.query(q, [userId]);

    return res.json(result.rows); // Retorna o histórico de vagas
  } catch (err) {
    console.error("Erro em getHistorico:", err.message); // Loga o erro no console
    return res.status(500).json({ error: "Erro no servidor" }); // Retorna erro 500 em caso de falha
  }
};

// Exporta as funções do controlador para serem usadas nas rotas
module.exports = { registerUser, loginUser, getHistorico };

