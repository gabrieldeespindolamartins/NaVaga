const db = require("./db");

async function checkUsers() {
  try {
    const result = await db.query("SELECT id, nome, email, senha FROM usuarios;");
    console.log("Usuários no banco:");
    console.table(result.rows);
    process.exit(0);
  } catch (err) {
    console.error("Erro ao consultar usuários:", err.message);
    process.exit(1);
  }
}

checkUsers();
