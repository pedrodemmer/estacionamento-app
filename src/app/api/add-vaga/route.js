const { sql } = require('@vercel/postgres');
const { NextResponse } = require('next/server');

async function GET(request) {
  const { searchParams } = new URL(request.url);
  const modeloVeiculo = searchParams.get('modeloVeiculo');
  const placa = searchParams.get('placa');

  try {
    if (!modeloVeiculo || !placa) throw new Error('Modelo do veiculo e placa requiridos!');
    await sql`INSERT INTO Veiculo (Modelo, Placa) VALUES (${Modelo}, ${Placa});`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const veiculos = await sql`SELECT * FROM Veiculo;`;
  return NextResponse.json({ veiculos }, { status: 200 });
}

module.exports = { GET };
