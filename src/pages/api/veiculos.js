import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secreta";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { usuario_id } = req.query;

    if (!usuario_id) {
      return res.status(400).json({ error: "Usuário não especificado" });
    }

    try {
      const query = `
        SELECT id, placa, apelido 
        FROM mydb.veiculo 
        WHERE usuario_id = $1
      `;
      const result = await pool.query(query, [usuario_id]);

      res.status(200).json(result.rows); // Retorna os veículos
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
      res.status(500).json({ error: "Erro ao buscar veículos" });
    }
  } else if (req.method === "POST") {
    const { placa, apelido } = req.body;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(' ')[1]; // Obtendo o token sem o 'Bearer'
    let usuario_id;

    try {
      const decodedToken = jwt.verify(token, SECRET_KEY);
      usuario_id = decodedToken.id; // Certifique-se de que o token contém `usuario_id`
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    if (!placa || !apelido) {
      return res.status(400).json({ error: "Placa e apelido são obrigatórios" });
    }

    try {
      const idQuery = `SELECT MAX(id) as max_id FROM mydb.veiculo;`;
      const idResult = await pool.query(idQuery);

      const maxId = idResult.rows[0].max_id || 0;
      const nextId = maxId + 1;

      const insertQuery = `
          INSERT INTO mydb.veiculo (id, placa, apelido, usuario_id) 
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `;
      const values = [nextId, placa, apelido, usuario_id];

      const result = await pool.query(insertQuery, values);

      res.status(201).json({
        message: "Veículo criado com sucesso",
        id: result.rows[0].id,
      });
    } catch (error) {
      console.error("Erro ao inserir veículo:", error);
      res.status(500).json({ error: "Erro ao criar veículo" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { placa, apelido } = req.body;

    if (!id || !placa || !apelido) {
      return res.status(400).json({ error: "ID, placa e apelido são obrigatórios" });
    }

    try {
      const updateQuery = `
        UPDATE mydb.veiculo 
        SET placa = $1, apelido = $2 
        WHERE id = $3
      `;
      const result = await pool.query(updateQuery, [placa, apelido, id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }

      res.status(200).json({ message: "Veículo atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      res.status(500).json({ error: "Erro ao atualizar veículo" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID é obrigatório para exclusão" });
    }

    try {
      const deleteQuery = "DELETE FROM mydb.veiculo WHERE id = $1";
      const result = await pool.query(deleteQuery, [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Veículo não encontrado" });
      }

      res.status(200).json({ message: "Veículo excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      res.status(500).json({ error: "Erro ao excluir veículo" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
