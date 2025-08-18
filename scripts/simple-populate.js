const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const operators = [
  {
    nome: 'Cecilia',
    cognome: 'Matta',
    ruolo: 'medico',
    specializzazione: 'Direttore',
    stato: 'attivo',
    telefono: '+39 010 1234567',
    email: 'c.matta@curedomiciliari.it',
    data_assunzione: '2020-01-15'
  },
  {
    nome: 'Federica',
    cognome: 'Pastorino',
    ruolo: 'psicologo',
    specializzazione: 'Vice-Direttore/Psicologa',
    stato: 'attivo',
    telefono: '+39 010 1234568',
    email: 'f.pastorino@curedomiciliari.it',
    data_assunzione: '2020-02-01'
  }
];

async function addOperators() {
  try {
    console.log('Aggiunta operatori test...');
    
    const { data, error } = await supabase
      .from('operators')
      .insert(operators)
      .select();
    
    if (error) {
      console.error('Errore:', error);
      return;
    }
    
    console.log('✅ Operatori aggiunti:', data?.length);
    
  } catch (err) {
    console.error('Errore:', err);
  }
}

addOperators();