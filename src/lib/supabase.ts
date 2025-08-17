import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Patient {
  id: string;
  nome: string;
  cognome: string;
  codice_fiscale: string;
  data_nascita: string;
  telefono: string;
  email?: string;
  indirizzo: string;
  caregiver: string;
  caregiver_telefono: string;
  data_inizio: string;
  operatori_riferimento: string[];
  diagnosi: string;
  elementi_rischio: string[];
  consenso_informato: boolean;
  stato: 'attivo' | 'sospeso' | 'dimesso';
  created_at: string;
  updated_at: string;
}

export interface DiaryEntry {
  id: string;
  patient_id: string;
  data: string;
  ora: string;
  operatori: string[];
  prestazioni: string[];
  note: string;
  firma_operatore: string;
  firma_caregiver?: string;
  status: 'completato' | 'in_attesa_firma';
  created_at: string;
  updated_at: string;
}

export interface Operator {
  id: string;
  nome: string;
  cognome: string;
  codice_fiscale: string;
  telefono: string;
  email: string;
  indirizzo: string;
  qualifica: string;
  data_assunzione: string;
  stato: 'attivo' | 'sospeso' | 'inattivo';
  documenti: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  nome: string;
  tipo: 'Procedura' | 'Linea Guida' | 'Protocollo' | 'Manuale' | 'Modulo';
  categoria: string;
  descrizione: string;
  file_url: string;
  dimensione: string;
  versione: string;
  stato: 'attivo' | 'bozza' | 'archiviato';
  tags: string[];
  caricato_da: string;
  created_at: string;
  updated_at: string;
}

export interface RiskEvent {
  id: string;
  tipo: 'Caduta' | 'Errore Farmaco' | 'Infezione' | 'Lesione' | 'Altro';
  gravita: 'Bassa' | 'Media' | 'Alta' | 'Critica';
  stato: 'Aperto' | 'In Valutazione' | 'In Corso' | 'Risolto' | 'Chiuso';
  paziente: string;
  operatore: string;
  data_evento: string;
  descrizione: string;
  azioni_correttive: string[];
  responsabile: string;
  data_chiusura?: string;
  follow_up?: string;
  prevenzione: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  nome: string;
  cognome: string;
  ruolo: 'admin' | 'operatore' | 'supervisore' | 'utente';
  stato: 'attivo' | 'sospeso' | 'inattivo';
  ultimo_accesso?: string;
  tentativi_falliti: number;
  bloccato_fino?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}

export interface UserSession {
  id: string;
  user_id: string;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  expires_at: string;
  created_at: string;
}

export interface UserPermission {
  id: string;
  user_id: string;
  modulo: 'dashboard' | 'fascicolo' | 'diario' | 'operatori' | 'documentazione' | 'formazione' | 'risk_management' | 'admin';
  permessi: {
    read: boolean;
    write: boolean;
    delete: boolean;
    admin: boolean;
  };
  created_at: string;
  updated_at: string;
}