//src/lib/db.js

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: "postgres://default:pHqY3B1nKbCz@ep-long-wind-a4zpk8b2-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
  })

export { pool };

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

export { query };

export async function initializeDatabase() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query(`
      CREATE SCHEMA IF NOT EXISTS "mydb";

      CREATE TABLE IF NOT EXISTS "mydb"."usuario" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "nome" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "senha" VARCHAR(45) NOT NULL,
  "cpf" VARCHAR(11) NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."veiculo" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "placa" VARCHAR(7) NOT NULL,
  "apelido" VARCHAR(45) NOT NULL,
  "usuario_id" INT NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."estado" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "nome" VARCHAR(100) NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."cidade" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "nome" VARCHAR(100) NOT NULL,
  "estado_id" INT NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."endereco" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "rua" VARCHAR(45) NOT NULL,
  "numero" INT NOT NULL,
  "bairro" VARCHAR(45) NOT NULL,
  "cep" VARCHAR(8) NOT NULL,
  "cidade_id" INT NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."vaga" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "numero" VARCHAR(45) NOT NULL,
  "status" BOOLEAN NOT NULL,
  "endereco_id" INT NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."periodo" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "tempo" TIME NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."valores" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "valor" DECIMAL(2) NOT NULL,
  "tempo_id" INT NOT NULL
);
 
CREATE TABLE IF NOT EXISTS "mydb"."registro" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "data" TIMESTAMP NOT NULL,
  "veiculo_id" INT NOT NULL,
  "vaga_id" INT NOT NULL,
  "valores_id" INT NOT NULL
);
 
CREATE UNIQUE INDEX "id_UNIQUE_usuario" ON "mydb"."usuario" ("id");
 
CREATE UNIQUE INDEX "email_UNIQUE_usuario" ON "mydb"."usuario" ("email");
 
CREATE UNIQUE INDEX "cpf_UNIQUE_usuario" ON "mydb"."usuario" ("cpf");
 
CREATE UNIQUE INDEX "id_UNIQUE_veiculo" ON "mydb"."veiculo" ("id");
 
CREATE UNIQUE INDEX "placa_UNIQUE_veiculo" ON "mydb"."veiculo" ("placa");
 
CREATE INDEX "fk_veiculo_usuario_idx" ON "mydb"."veiculo" ("usuario_id");
 
CREATE UNIQUE INDEX "id_UNIQUE_estado" ON "mydb"."estado" ("id");
 
CREATE UNIQUE INDEX "id_UNIQUE_cidade" ON "mydb"."cidade" ("id");
 
CREATE INDEX "fk_cidade_estado1_idx" ON "mydb"."cidade" ("estado_id");
 
CREATE UNIQUE INDEX "id_UNIQUE_endereco" ON "mydb"."endereco" ("id");
 
CREATE INDEX "fk_endereco_cidade1_idx" ON "mydb"."endereco" ("cidade_id");
 
CREATE UNIQUE INDEX "numero_UNIQUE" ON "mydb"."vaga" ("numero");
 
CREATE UNIQUE INDEX "id_UNIQUE_vaga" ON "mydb"."vaga" ("id");
 
CREATE INDEX "fk_vagas_endereco1_idx" ON "mydb"."vaga" ("endereco_id");
 
CREATE UNIQUE INDEX "id_UNIQUE_periodo" ON "mydb"."periodo" ("id");
 
CREATE UNIQUE INDEX "id_UNIQUE_valores" ON "mydb"."valores" ("id");
 
CREATE INDEX "fk_valores_tempo1_idx" ON "mydb"."valores" ("tempo_id");
 
CREATE UNIQUE INDEX "id_UNIQU_registroE" ON "mydb"."registro" ("id");
 
CREATE INDEX "fk_registro_veiculo1_idx" ON "mydb"."registro" ("veiculo_id");
 
CREATE INDEX "fk_registro_vaga1_idx" ON "mydb"."registro" ("vaga_id");
 
CREATE INDEX "fk_registro_valores1_idx" ON "mydb"."registro" ("valores_id");
 
ALTER TABLE "mydb"."veiculo" ADD CONSTRAINT "fk_veiculo_usuario" FOREIGN KEY ("usuario_id") REFERENCES "mydb"."usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."cidade" ADD CONSTRAINT "fk_cidade_estado1" FOREIGN KEY ("estado_id") REFERENCES "mydb"."estado" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."endereco" ADD CONSTRAINT "fk_endereco_cidade1" FOREIGN KEY ("cidade_id") REFERENCES "mydb"."cidade" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."vaga" ADD CONSTRAINT "fk_vagas_endereco1" FOREIGN KEY ("endereco_id") REFERENCES "mydb"."endereco" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."valores" ADD CONSTRAINT "fk_valores_tempo1" FOREIGN KEY ("tempo_id") REFERENCES "mydb"."periodo" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."registro" ADD CONSTRAINT "fk_registro_veiculo1" FOREIGN KEY ("veiculo_id") REFERENCES "mydb"."veiculo" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."registro" ADD CONSTRAINT "fk_registro_vaga1" FOREIGN KEY ("vaga_id") REFERENCES "mydb"."vaga" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
 
ALTER TABLE "mydb"."registro" ADD CONSTRAINT "fk_registro_valores1" FOREIGN KEY ("valores_id") REFERENCES "mydb"."valores" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    `);

        await client.query('COMMIT');
        console.log('Banco de dados inicializado com sucesso');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Erro ao inicializar o banco de dados:', error);
        throw error;
    } finally {
        client.release();
    }
}
