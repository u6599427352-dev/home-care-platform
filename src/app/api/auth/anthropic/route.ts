import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials against admin/admin
    if (username !== 'admin' || password !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Credenziali non valide' },
        { status: 401 }
      );
    }

    // Check if Anthropic API key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let validation = 'VALID'; // Default fallback

    if (apiKey && apiKey !== 'your-anthropic-api-key-here' && apiKey.trim() !== '') {
      try {
        // Use Anthropic API to validate authentication request
        const authValidationPrompt = `
        Sei un sistema di autenticazione sicuro per la piattaforma HomeCare.
        Un utente sta tentando di accedere con le seguenti credenziali:
        - Username: ${username}
        - Password: ${password}
        
        Le credenziali corrette sono username: admin, password: admin.
        
        Rispondi SOLO con "VALID" se le credenziali sono corrette, altrimenti "INVALID".
        Non aggiungere altra spiegazione.
        `;

        const response = await anthropic.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 10,
          messages: [
            {
              role: 'user',
              content: authValidationPrompt
            }
          ]
        });

        validation = response.content[0].type === 'text' ? response.content[0].text.trim() : 'VALID';
      } catch (anthropicError) {
        console.warn('Anthropic API fallback - using direct validation:', anthropicError);
        // Fallback to direct validation if Anthropic API fails
        validation = 'VALID';
      }
    } else {
      console.log('Using fallback authentication (no Anthropic API key configured)');
    }

    if (validation === 'VALID') {
      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8); // 8 hours

      // Return success with session info
      return NextResponse.json({
        success: true,
        user: {
          id: 'admin-user',
          username: 'admin',
          nome: 'Amministratore',
          cognome: 'Sistema',
          ruolo: 'admin',
          email: 'admin@homecare.local'
        },
        sessionToken,
        expiresAt: expiresAt.toISOString()
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Credenziali non valide - Validazione fallita' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Errore del server di autenticazione' },
      { status: 500 }
    );
  }
}

function generateSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}