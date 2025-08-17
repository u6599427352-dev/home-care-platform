-- HomeCare Platform Database Schema
-- Execute this in Supabase SQL Editor

-- Enable Row Level Security
ALTER DATABASE postgres SET timezone TO 'Europe/Rome';

-- Patients table
CREATE TABLE patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  codice_fiscale VARCHAR(16) UNIQUE NOT NULL,
  data_nascita DATE NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(255),
  indirizzo TEXT NOT NULL,
  caregiver VARCHAR(200) NOT NULL,
  caregiver_telefono VARCHAR(20) NOT NULL,
  data_inizio DATE NOT NULL,
  operatori_riferimento TEXT[] DEFAULT '{}',
  diagnosi TEXT NOT NULL,
  elementi_rischio TEXT[] DEFAULT '{}',
  consenso_informato BOOLEAN DEFAULT false,
  stato VARCHAR(20) DEFAULT 'attivo' CHECK (stato IN ('attivo', 'sospeso', 'dimesso')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Operators table
CREATE TABLE operators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  codice_fiscale VARCHAR(16) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  email VARCHAR(255) UNIQUE NOT NULL,
  indirizzo TEXT,
  qualifica VARCHAR(100) NOT NULL,
  data_assunzione DATE NOT NULL,
  stato VARCHAR(20) DEFAULT 'attivo' CHECK (stato IN ('attivo', 'sospeso', 'inattivo')),
  documenti JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Diary entries table
CREATE TABLE diary_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  ora TIME NOT NULL,
  operatori TEXT[] NOT NULL,
  prestazioni TEXT[] NOT NULL,
  note TEXT NOT NULL,
  firma_operatore VARCHAR(200) NOT NULL,
  firma_caregiver VARCHAR(200),
  status VARCHAR(20) DEFAULT 'completato' CHECK (status IN ('completato', 'in_attesa_firma')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Procedura', 'Linea Guida', 'Protocollo', 'Manuale', 'Modulo')),
  categoria VARCHAR(100) NOT NULL,
  descrizione TEXT,
  file_url VARCHAR(500),
  dimensione VARCHAR(20),
  versione VARCHAR(20) NOT NULL,
  stato VARCHAR(20) DEFAULT 'attivo' CHECK (stato IN ('attivo', 'bozza', 'archiviato')),
  tags TEXT[] DEFAULT '{}',
  caricato_da VARCHAR(200) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Risk events table
CREATE TABLE risk_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Caduta', 'Errore Farmaco', 'Infezione', 'Lesione', 'Altro')),
  gravita VARCHAR(20) NOT NULL CHECK (gravita IN ('Bassa', 'Media', 'Alta', 'Critica')),
  stato VARCHAR(20) DEFAULT 'Aperto' CHECK (stato IN ('Aperto', 'In Valutazione', 'In Corso', 'Risolto', 'Chiuso')),
  paziente VARCHAR(200) NOT NULL,
  operatore VARCHAR(200) NOT NULL,
  data_evento DATE NOT NULL,
  descrizione TEXT NOT NULL,
  azioni_correttive TEXT[] DEFAULT '{}',
  responsabile VARCHAR(200) NOT NULL,
  data_chiusura DATE,
  follow_up TEXT,
  prevenzione BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Training courses table
CREATE TABLE training_courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titolo VARCHAR(255) NOT NULL,
  descrizione TEXT,
  categoria VARCHAR(100) NOT NULL,
  durata INTEGER NOT NULL, -- in minutes
  difficolta VARCHAR(20) CHECK (difficolta IN ('Principiante', 'Intermedio', 'Avanzato')),
  stato VARCHAR(20) DEFAULT 'disponibile' CHECK (stato IN ('disponibile', 'bozza', 'archiviato')),
  moduli JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Course enrollments table
CREATE TABLE course_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
  course_id UUID REFERENCES training_courses(id) ON DELETE CASCADE,
  stato VARCHAR(20) DEFAULT 'in_corso' CHECK (stato IN ('in_corso', 'completato', 'sospeso')),
  progresso_percentuale INTEGER DEFAULT 0,
  data_inizio DATE NOT NULL,
  data_completamento DATE,
  punteggio_test INTEGER,
  certificato_ottenuto BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(operator_id, course_id)
);

-- Create indexes for better performance
CREATE INDEX idx_patients_codice_fiscale ON patients(codice_fiscale);
CREATE INDEX idx_patients_stato ON patients(stato);
CREATE INDEX idx_operators_email ON operators(email);
CREATE INDEX idx_operators_stato ON operators(stato);
CREATE INDEX idx_diary_entries_patient_id ON diary_entries(patient_id);
CREATE INDEX idx_diary_entries_data ON diary_entries(data);
CREATE INDEX idx_documents_tipo ON documents(tipo);
CREATE INDEX idx_documents_categoria ON documents(categoria);
CREATE INDEX idx_risk_events_data_evento ON risk_events(data_evento);
CREATE INDEX idx_risk_events_stato ON risk_events(stato);

-- Enable RLS (Row Level Security)
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies (for now, allow all operations - will be refined with authentication)
CREATE POLICY "Allow all operations" ON patients FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON operators FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON diary_entries FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON documents FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON risk_events FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON training_courses FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON course_enrollments FOR ALL USING (true);

-- Create functions for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON operators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diary_entries_updated_at BEFORE UPDATE ON diary_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_risk_events_updated_at BEFORE UPDATE ON risk_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_training_courses_updated_at BEFORE UPDATE ON training_courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_enrollments_updated_at BEFORE UPDATE ON course_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();