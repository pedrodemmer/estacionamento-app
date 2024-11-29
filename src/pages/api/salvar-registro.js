// pages/api/salvar-registro.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { apelido, vaga_id, valores_id, data } = req.body;

    try {
      // Inserindo dados do veículo diretamente na tabela registro
      const insertQuery = `
        INSERT INTO mydb.registro (apelido, vaga_id, valores_id, data)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;

      const values = [apelido, vaga_id, valores_id, data];

      const result = await query(insertQuery, values);

      res.status(200).json(result.rows[0]); // Retorna o primeiro registro inserido
    } catch (error) {
      console.error('Erro ao salvar o registro:', error);
      res.status(500).json({ error: 'Erro ao salvar o registro.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
