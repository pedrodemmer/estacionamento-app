import { pool } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nome, email, senha, cpf } = req.body;

    if (!nome || !email || !senha || !cpf) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const query = `
        INSERT INTO mydb.usuario (nome, email, senha, cpf) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const values = [nome, email, senha, cpf];

      const result = await pool.query(query, values);

      res.status(201).json({ usuario: result.rows[0] });
    } catch (error) {
      console.error("Erro ao inserir no banco:", error.message);
      res.status(500).json({ error: "Erro ao processar o registro." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Método ${req.method} não permitido.` });
  }
}
