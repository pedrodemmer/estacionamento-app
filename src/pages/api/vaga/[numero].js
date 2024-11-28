const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgres://default:pHqY3B1nKbCz@ep-long-wind-a4zpk8b2-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

export default async function handler(req, res) {
  const { numero } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const result = await pool.query(
      `SELECT v.id, v.numero, v.status, e.rua, e.numero AS endereco_numero 
       FROM mydb.vaga v 
       JOIN mydb.endereco e ON v.endereco_id = e.id 
       WHERE v.numero = $1`,
      [numero]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vaga não encontrada' });
    }

    const vaga = result.rows[0];
    res.status(200).json({
      id: vaga.id,  // Incluindo o id da vaga
      numero: vaga.numero,
      status: vaga.status,
      endereco: `${vaga.rua}, ${vaga.endereco_numero}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
}
