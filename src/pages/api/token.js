import jwt from 'jsonwebtoken';
import { pool } from '@/lib/db';  // Sua instância do banco de dados

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { authorization } = req.headers;

    // Verifique se o token está presente
    if (!authorization) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
      // Decodificar o token JWT
      const token = authorization.split(' ')[1];  // Pega o token após 'Bearer'
      const decoded = jwt.verify(token, 'your-secret-key'); // Verifique a chave secreta

      // Recupera o usuario_id do token decodificado
      const usuarioId = decoded.usuario_id;

      // Query para pegar os veículos associados ao usuário
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
