import { pool } from "@/lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, senha } = req.body;

    try {
      const result = await pool.query(
        "SELECT id, email, senha FROM mydb.usuario WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const usuario = result.rows[0];

      if (usuario.senha !== senha) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        "secreta", 
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao acessar o banco de dados:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ error: `Método ${req.method} não permitido` });
}
