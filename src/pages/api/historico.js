// pages/api/historico.js
import { pool } from '@/lib/db';  // Importando o pool de conexões

export default async function handler(req, res) {
    try {
        // Realiza o JOIN para buscar informações completas
        const result = await pool.query(`
            SELECT 
                r.id,
                r.data,
                r.apelido,
                va.numero AS vaga,
                e.rua AS rua, 
                e.numero AS endereco_numero,  
                vl.valor AS valor,
                t.tempo AS periodo  
            FROM mydb.registro r
            LEFT JOIN mydb.vaga va ON r.vaga_id = va.id
            LEFT JOIN mydb.endereco e ON va.endereco_id = e.id  -- Realiza o JOIN para buscar o endereco
            LEFT JOIN mydb.valores vl ON r.valores_id = vl.id
            LEFT JOIN mydb.periodo t ON vl.tempo_id = t.id  -- Realiza o JOIN para buscar o tempo
            ORDER BY r.data DESC;  -- Ajuste a ordenação conforme necessário
        `);
        
        // Log para verificar o resultado
        console.log('Resultado da consulta:', result.rows);

        // Retorna os dados em formato JSON
        res.status(200).json(result.rows);  
    } catch (error) {
        console.error('Erro ao buscar dados do banco:', error);
        res.status(500).json({ error: 'Erro ao buscar dados do banco' });
    }
}
