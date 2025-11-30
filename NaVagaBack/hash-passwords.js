const db = require("./db");
const bcrypt = require("bcrypt");

async function hashPasswords() {
  try {
    const users = await db.query("SELECT id, senha FROM usuarios;");
    
    for (const user of users.rows) {
      const hashedPassword = await bcrypt.hash(user.senha, 10);
      await db.query("UPDATE usuarios SET senha = $1 WHERE id = $2", [hashedPassword, user.id]);
      console.log(`✓ Senha do usuário ID ${user.id} foi hasheada`);
    }
    
    console.log("\n✓ Todas as senhas foram hasheadas com sucesso!");
    
    // Verificar resultado
    const result = await db.query("SELECT id, nome, email, senha FROM usuarios;");
    console.log("\nUsuários após hashear senhas:");
    console.table(result.rows);
    
    process.exit(0);
  } catch (err) {
    console.error("Erro ao hashear senhas:", err.message);
    process.exit(1);
  }
}

hashPasswords();
