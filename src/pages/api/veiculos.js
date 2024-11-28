import { pool } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { placa, apelido } = req.body;

  // Garantir que placa e apelido sejam fornecidos
  if (!placa || !apelido) {
    return res.status(400).json({ error: "Placa e apelido são obrigatórios" });
  }

  try {
    // Verifica o maior ID existente na tabela
    const idQuery = `SELECT MAX(id) as max_id FROM mydb.veiculo;`;
    const idResult = await pool.query(idQuery);

    const maxId = idResult.rows[0].max_id || 0;
    const nextId = maxId + 1;

    // Insere o novo veículo com o próximo ID, e usuario_id como NULL
    const insertQuery = `
      INSERT INTO mydb.veiculo (id, placa, apelido, usuario_id) 
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [nextId, placa, apelido, null];

    const result = await pool.query(insertQuery, values);

    res.status(201).json({
      message: "Veículo criado com sucesso",
      id: result.rows[0].id, // Obtém o ID gerado da cláusula RETURNING
    });
  } catch (error) {
    console.error("Erro ao inserir veículo:", error);
    res.status(500).json({ error: "Erro ao criar veículo" });
  }
}
