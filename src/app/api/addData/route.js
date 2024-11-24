import { pool } from '@/lib/db';

export async function POST(req, res) {
    try {
      // Receber os dados do corpo da requisição
      const body = await req.json();
      const { estado, cidade, enderecos } = body;
  
      // Verificar se o estado já existe
      const estadoResult = await pool.query(
        'SELECT id FROM "mydb"."estado" WHERE nome = $1',
        [estado]
      );
  
      let estadoId;
      if (estadoResult.rows.length === 0) {
        // Inserir o estado e recuperar o ID
        const insertEstadoResult = await pool.query(
          'INSERT INTO "mydb"."estado" (nome) VALUES ($1) RETURNING id',
          [estado]
        );
        estadoId = insertEstadoResult.rows[0].id;
      } else {
        estadoId = estadoResult.rows[0].id;
      }
  
      // Verificar se a cidade já existe
      const cidadeResult = await pool.query(
        'SELECT id FROM "mydb"."cidade" WHERE nome = $1 AND estado_id = $2',
        [cidade, estadoId]
      );
  
      let cidadeId;
      if (cidadeResult.rows.length === 0) {
        // Inserir a cidade e recuperar o ID
        const insertCidadeResult = await pool.query(
          'INSERT INTO "mydb"."cidade" (nome, estado_id) VALUES ($1, $2) RETURNING id',
          [cidade, estadoId]
        );
        cidadeId = insertCidadeResult.rows[0].id;
      } else {
        cidadeId = cidadeResult.rows[0].id;
      }
  
      // Iterar sobre os endereços e inserir cada um, se não existir
      for (const endereco of enderecos) {
        const { rua, numero, bairro, cep, vaga } = endereco;
  
        // Verificar se o endereço já existe
        const enderecoResult = await pool.query(
          'SELECT id FROM "mydb"."endereco" WHERE rua = $1 AND numero = $2 AND bairro = $3 AND cep = $4 AND cidade_id = $5',
          [rua, numero, bairro, cep, cidadeId]
        );
  
        let enderecoId;
        if (enderecoResult.rows.length === 0) {
          // Inserir o endereço e recuperar o ID
          const insertEnderecoResult = await pool.query(
            'INSERT INTO "mydb"."endereco" (rua, numero, bairro, cep, cidade_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [rua, numero, bairro, cep, cidadeId]
          );
          enderecoId = insertEnderecoResult.rows[0].id;
        } else {
          enderecoId = enderecoResult.rows[0].id;
        }
  
        // Verificar se a vaga já existe
        const vagaExistenteResult = await pool.query(
          'SELECT id FROM "mydb"."vaga" WHERE numero = $1 AND endereco_id = $2',
          [vaga.numero, enderecoId]
        );
  
        if (vagaExistenteResult.rows.length === 0) {
          // Inserir a vaga vinculada ao endereço
          await pool.query(
            'INSERT INTO "mydb"."vaga" (numero, status, endereco_id) VALUES ($1, $2, $3)',
            [vaga.numero, vaga.status, enderecoId]
          );
        } else {
          console.log(`Vaga ${vaga.numero} já existe no endereço ${enderecoId}`);
        }
      }
  
      return new Response(JSON.stringify({ message: 'Dados inseridos com sucesso' }), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Erro ao processar a requisição' }), {
        status: 500,
      });
    }
  }
  
