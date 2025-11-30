/**
 * @file middlewares/auth.js
 * @description Middleware de autenticação para verificar tokens JWT.
 * Garante que apenas usuários autenticados possam acessar certas rotas.
 */

const jwt = require('jsonwebtoken'); // Importa a biblioteca JSON Web Token

/**
 * @function auth
 * @description Middleware que verifica a validade de um token JWT presente no cabeçalho da requisição.
 * Se o token for válido, decodifica o usuário e o anexa ao objeto `req`.
 * @param {object} req - Objeto de requisição do Express.
 * @param {object} res - Objeto de resposta do Express.
 * @param {function} next - Função para passar o controle para o próximo middleware.
 */
const auth = (req, res, next) => {
  // Obtém o cabeçalho de autorização da requisição
  const authHeader = req.headers.authorization;
  console.log(authHeader); // Loga o cabeçalho de autorização para depuração

  // Se não houver cabeçalho de autorização, retorna erro 401 (Unauthorized)
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Divide o cabeçalho para extrair o esquema (Bearer) e o token
  const parts = authHeader.split(' ');
  const [scheme, token] = parts;

  // Verifica se o esquema é 'Bearer'
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    // Verifica a validade do token usando o segredo JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    req.user = decoded; // Anexa as informações decodificadas do usuário à requisição
    return next(); // Passa o controle para o próximo middleware ou rota
  } catch (err) {
    // Se o token for inválido ou expirado, retorna erro 401 (Unauthorized)
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

// Exporta o middleware para ser usado nas rotas
module.exports = auth;

