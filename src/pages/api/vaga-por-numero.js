// pages/api/vaga-por-numero.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { numero } = req.query;

    try {
      const vagaQuery = `SELECT id FROM mydb.vaga WHERE numero = $1;`;
      const vagaResult = await query(vagaQuery, [numero]);

      if (vagaResult.rows.length === 0) {
        return res.status(404).json({ error: 'Vaga não encontrada.' });
      }

      res.status(200).json({ vaga_id: vagaResult.rows[0].id });
    } catch (error) {
      console.error('Erro ao buscar vaga:', error);
      res.status(500).json({ error: 'Erro ao buscar vaga.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
