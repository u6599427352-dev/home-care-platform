const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const operators = [
  // DIREZIONE
  {
    nome: 'Cecilia',
    cognome: 'Matta',
    codice_fiscale: 'MTTCCL70A41F205Z',
    ruolo: 'medico',
    specializzazione: 'Direttore',
    stato: 'attivo',
    telefono: '+39 010 1234567',
    email: 'c.matta@curedomiciliari.it',
    indirizzo: 'Via Roma 1, Genova',
    qualifica: 'Medico',
    data_assunzione: '2020-01-15',
    documenti: {}
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
  },
  {
    nome: 'Lorenzo',
    cognome: 'Grecu',
    ruolo: 'medico',
    specializzazione: 'Direttore e Medico Responsabile',
    stato: 'attivo',
    telefono: '+39 010 1234569',
    email: 'l.grecu@curedomiciliari.it',
    data_assunzione: '2020-03-01'
  },
  
  // COORDINAMENTO
  {
    nome: 'Pasquale',
    cognome: 'Milena',
    ruolo: 'infermiere',
    specializzazione: 'Coordinatore Infermieristico (L.P.)',
    stato: 'attivo',
    telefono: '+39 010 1234570',
    email: 'p.milena@curedomiciliari.it',
    data_assunzione: '2020-04-01'
  },
  {
    nome: 'Cristina',
    cognome: 'Bovone',
    ruolo: 'infermiere',
    specializzazione: 'Case Manager',
    stato: 'attivo',
    telefono: '+39 010 1234571',
    email: 'c.bovone@curedomiciliari.it',
    data_assunzione: '2021-01-15'
  },
  
  // INFERMIERI
  {
    nome: 'Ghita',
    cognome: 'Dumitra',
    ruolo: 'infermiere',
    specializzazione: 'Infermiere (L.P.)',
    stato: 'attivo',
    telefono: '+39 010 1234572',
    email: 'g.dumitra@curedomiciliari.it',
    data_assunzione: '2021-03-01'
  },
  {
    nome: 'Sasu',
    cognome: 'Roxana',
    ruolo: 'infermiere',
    specializzazione: 'Infermiere (L.P.)',
    stato: 'attivo',
    telefono: '+39 010 1234573',
    email: 's.roxana@curedomiciliari.it',
    data_assunzione: '2021-05-01'
  },
  
  // FISIOTERAPISTI
  {
    nome: 'Andrea',
    cognome: 'Corradini',
    ruolo: 'fisioterapista',
    specializzazione: 'Fisioterapista (L.P.)',
    stato: 'attivo',
    telefono: '+39 010 1234574',
    email: 'a.corradini@curedomiciliari.it',
    data_assunzione: '2021-06-01'
  },
  {
    nome: 'Emanuele',
    cognome: 'Pisoni',
    ruolo: 'fisioterapista',
    specializzazione: 'Fisioterapista (L.P.)',
    stato: 'attivo',
    telefono: '+39 010 1234575',
    email: 'e.pisoni@curedomiciliari.it',
    data_assunzione: '2021-07-01'
  },
  
  // OSS (Operatori Socio Sanitari)
  {
    nome: 'Lucia',
    cognome: 'Ferrarotti',
    ruolo: 'oss',
    specializzazione: 'Operatore Socio Sanitario',
    stato: 'attivo',
    telefono: '+39 010 1234576',
    email: 'l.ferrarotti@curedomiciliari.it',
    data_assunzione: '2021-08-01'
  },
  {
    nome: 'Anna',
    cognome: 'Conzatti',
    ruolo: 'oss',
    specializzazione: 'Operatore Socio Sanitario',
    stato: 'attivo',
    telefono: '+39 010 1234577',
    email: 'a.conzatti@curedomiciliari.it',
    data_assunzione: '2021-09-01'
  },
  {
    nome: 'Sabrina',
    cognome: 'Tononi',
    ruolo: 'oss',
    specializzazione: 'Operatore Socio Sanitario',
    stato: 'attivo',
    telefono: '+39 010 1234578',
    email: 's.tononi@curedomiciliari.it',
    data_assunzione: '2021-10-01'
  },
  {
    nome: 'Anna Tiziana',
    cognome: 'Romano',
    ruolo: 'oss',
    specializzazione: 'Operatore Socio Sanitario',
    stato: 'attivo',
    telefono: '+39 010 1234579',
    email: 'a.romano@curedomiciliari.it',
    data_assunzione: '2021-11-01'
  },
  {
    nome: 'Eugenia',
    cognome: 'Marella',
    ruolo: 'oss',
    specializzazione: 'Operatore Socio Sanitario',
    stato: 'attivo',
    telefono: '+39 010 1234580',
    email: 'e.marella@curedomiciliari.it',
    data_assunzione: '2021-12-01'
  },
  
  // SUPPORTO E FORMAZIONE
  {
    nome: 'Nadia',
    cognome: 'Vuovolo',
    ruolo: 'amministrativo',
    specializzazione: 'Segreteria - Call Center',
    stato: 'attivo',
    telefono: '+39 010 1234581',
    email: 'n.vuovolo@curedomiciliari.it',
    data_assunzione: '2020-05-01'
  },
  {
    nome: 'Matteo',
    cognome: 'Vannucci',
    ruolo: 'formatore',
    specializzazione: 'Responsabile Formazione',
    stato: 'attivo',
    telefono: '+39 010 1234582',
    email: 'm.vannucci@curedomiciliari.it',
    data_assunzione: '2022-01-01'
  }
];

async function populateOperators() {
  try {
    console.log('Popolamento database con operatori da organigramma...');
    
    // Check if operators table has data
    const { data: existingOperators, error: checkError } = await supabase
      .from('operators')
      .select('id, nome, cognome')
      .limit(5);
    
    if (checkError) {
      throw checkError;
    }
    
    console.log(`Trovati ${existingOperators?.length || 0} operatori esistenti nel database`);
    
    // Only clear if we have fake data (names like "Mario Rossi" etc)
    if (existingOperators && existingOperators.length > 0) {
      console.log('Rimozione operatori esistenti...');
      await supabase.from('operators').delete().gte('id', '00000000-0000-0000-0000-000000000000');
    }
    
    // Insert new operators
    console.log('Inserimento nuovi operatori...');
    const { data, error } = await supabase
      .from('operators')
      .insert(operators)
      .select();
    
    if (error) {
      throw error;
    }
    
    console.log(`✅ Inseriti ${data.length} operatori nel database`);
    console.log('Operatori inseriti:');
    data.forEach(op => {
      console.log(`- ${op.nome} ${op.cognome} (${op.ruolo}) - ${op.specializzazione}`);
    });
    
  } catch (error) {
    console.error('❌ Errore durante il popolamento:', error);
    process.exit(1);
  }
}

populateOperators();