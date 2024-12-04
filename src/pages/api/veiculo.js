import { pool } from "@/lib/db";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === "GET") {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ error: "Token não fornecido" });
        }

        try {
            const SECRET_KEY = "secreta"; 
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const usuario_id = decodedToken.id;

            if (!usuario_id) {
                return res.status(400).json({ error: "Usuário não encontrado no token" });
            }

            const query = `
            SELECT id, placa, apelido 
            FROM mydb.veiculo 
            WHERE usuario_id = $1
          `;
            const result = await pool.query(query, [usuario_id]);
            console.log("Veículos retornados:", result.rows);

            res.status(200).json(result.rows);
        } catch (error) {
            console.error("Erro ao buscar veículos:", error);
            res.status(500).json({ error: "Erro ao buscar veículos" });
        }
    }
}
