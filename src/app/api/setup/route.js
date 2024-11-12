// src/app/api/setup/route.js

import { NextResponse } from 'next/server';
import { initializeDatabase } from '../../../lib/db';

export async function POST(request) {
  try {
    
    const response = NextResponse.json({ message: 'Banco de dados inicializado com sucesso' }, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', '*'); // Permitir todas as origens
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    await initializeDatabase();
    return response;
  } catch (error) {
    console.error("Erro no endpoint /api/setup:", error);
    return NextResponse.json({ error: 'Erro ao inicializar o banco de dados' }, { status: 500 });
  }
}
