/**
 * @file controllers/sensores.js
 * @description Controlador para gerenciar eventos de sensores de estacionamento.
 * Processa a mudança de status de um sensor (livre/ocupada) e atualiza a vaga correspondente
 * e o histórico de uso.
 */

const db = require("../db"); // Importa a conexão com o banco de dados

/**
 * @function sensorEvent
 * @description Processa um evento de sensor, atualizando o status da vaga e o histórico.
 * @param {object} req - Objeto de requisição do Express, contendo `codigo_sensor`, `status` e opcionalmente `usuario_id` no corpo.
 * @param {object} res - Objeto de resposta do Express.
 */
const sensorEvent = async (req, res) => {
  try {
    const { codigo_sensor, status, usuario_id } = req.body; // Extrai dados do corpo da requisição
    console.log(req.body); // Loga o corpo da requisição para depuração

    // Validação básica dos campos obrigatórios
    if (!codigo_sensor || !status) {
      return res.status(400).json({ error: "codigo_sensor e status são obrigatórios" });
    }
    // Validação do valor do status
    if (!["livre", "ocupada"].includes(status)) {
      return res.status(400).json({ error: "status inválido" });
    }

    // Busca o sensor pelo código no banco de dados
    const s = await db.query("SELECT * FROM sensores WHERE codigo_sensor = $1", [codigo_sensor]);
    // Verifica se o sensor foi encontrado
    if (s.rowCount === 0) {
      return res.status(404).json({ error: "sensor não encontrado" });
    }
    const sensor = s.rows[0];
    // Verifica se o sensor está vinculado a uma vaga
    if (!sensor.vaga_id) {
      return res.status(400).json({ error: "sensor não está vinculado a nenhuma vaga" });
    }

    // Atualiza o status da vaga correspondente no banco de dados
    await db.query("UPDATE vagas SET status = $1 WHERE id = $2", [status, sensor.vaga_id]);

    // Lógica para registrar no histórico com base no status do sensor
    if (status === "ocupada") {
      // Se a vaga foi ocupada, insere um novo registro no histórico
      if (usuario_id) {
        // Se um usuario_id for fornecido, registra com ele
        await db.query("INSERT INTO historico (usuario_id, vaga_id, data_entrada) VALUES ($1,$2,NOW())", [usuario_id, sensor.vaga_id]);
      } else {
        // Caso contrário, registra com usuario_id nulo
        await db.query("INSERT INTO historico (usuario_id, vaga_id, data_entrada) VALUES ($1,$2,NOW())", [null, sensor.vaga_id]);
      }
    } else { // status === "livre"
      // Se a vaga foi liberada, atualiza o registro de histórico mais recente sem data_saida
      const last = await db.query(
        "SELECT id FROM historico WHERE vaga_id = $1 AND data_saida IS NULL ORDER BY data_entrada DESC LIMIT 1",
        [sensor.vaga_id]
      );
      // Se um registro de histórico for encontrado, atualiza sua data_saida
      if (last.rowCount > 0) {
        await db.query("UPDATE historico SET data_saida = NOW() WHERE id = $1", [last.rows[0].id]);
      }
    }

    // Retorna uma resposta de sucesso com o ID da vaga e o novo status
    return res.json({ ok: true, vaga_id: sensor.vaga_id, status });
  } catch (err) {
    console.error("Erro em sensorEvent:", err.message); // Loga o erro no console
    return res.status(500).json({ error: "Erro no servidor" }); // Retorna erro 500 em caso de falha
  }
};

// Exporta a função do controlador para ser usada nas rotas
module.exports = { sensorEvent };

