import jwt from 'jsonwebtoken';
import { pool } from '@/lib/db'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'your-secret-key');

      const usuarioId = decoded.usuario_id;

      const [veiculos] = await pool.query(
        'SELECT * FROM veiculo WHERE usuario_id = ?',
        [usuarioId]
      );

      return res.status(200).json(veiculos);
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  }
}
