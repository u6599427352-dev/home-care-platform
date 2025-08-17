-- Sample data for HomeCare Platform
-- Execute this after creating the schema

-- Insert sample patients
INSERT INTO patients (nome, cognome, codice_fiscale, data_nascita, telefono, email, indirizzo, caregiver, caregiver_telefono, data_inizio, operatori_riferimento, diagnosi, elementi_rischio, consenso_informato, stato) VALUES
('Mario', 'Rossi', 'RSSMRA80A01H501Z', '1980-01-01', '+39 333 1234567', 'mario.rossi@email.com', 'Via Roma 123, Milano', 'Anna Rossi', '+39 333 7654321', '2024-01-15', '{"Dott.ssa Bianchi", "Inf. Neri"}', 'Diabete mellito tipo 2, Ipertensione arteriosa', '{"Allergia penicillina", "Rischio cadute"}', true, 'attivo'),

('Anna', 'Verdi', 'VRDNNA75B15F205X', '1975-02-15', '+39 334 2345678', 'anna.verdi@email.com', 'Via Garibaldi 45, Roma', 'Marco Verdi', '+39 334 8765432', '2024-02-01', '{"Dott. Ferrari", "OSS Costa"}', 'BPCO, Insufficienza cardiaca', '{"Allergia iodio", "Disfagia"}', true, 'attivo'),

('Giuseppe', 'Blu', 'BLUGPP70C20L736Y', '1970-03-20', '+39 335 3456789', 'giuseppe.blu@email.com', 'Via Mazzini 78, Napoli', 'Elena Blu', '+39 335 9876543', '2024-01-10', '{"Dott.ssa Gialli", "Fis. Viola"}', 'Ictus cerebrale, Emiparesi destra', '{"Rischio cadute", "Disfagia"}', true, 'attivo'),

('Maria', 'Rosa', 'RSAMRA65D45F839W', '1965-04-05', '+39 336 4567890', 'maria.rosa@email.com', 'Via Dante 90, Torino', 'Paolo Rosa', '+39 336 0987654', '2024-03-01', '{"Dr. Marrone", "Inf. Bianchi"}', 'Demenza senile, Diabete', '{"Rischio cadute", "Wandering"}', true, 'attivo');

-- Insert sample operators
INSERT INTO operators (nome, cognome, codice_fiscale, telefono, email, indirizzo, qualifica, data_assunzione, stato, documenti) VALUES
('Maria', 'Bianchi', 'BNCMRA80D45H501Y', '+39 333 1111111', 'm.bianchi@homecare.it', 'Via Milano 15, Milano', 'Medico', '2020-01-15', 'attivo', '{"curriculum": {"presente": true, "dataCaricamento": "2024-01-15", "scadenza": "2025-01-15"}, "formazioneContinua": {"presente": true, "dataCaricamento": "2024-06-01", "scadenza": "2025-06-01"}, "idoneitaPsicofisica": {"presente": true, "dataCaricamento": "2024-03-01", "scadenza": "2025-03-01"}}'),

('Luigi', 'Neri', 'NRLGGI75H12F205Z', '+39 334 2222222', 'l.neri@homecare.it', 'Via Roma 88, Milano', 'Infermiere', '2021-03-10', 'attivo', '{"curriculum": {"presente": true, "dataCaricamento": "2024-01-10", "scadenza": "2025-01-10"}, "formazioneContinua": {"presente": true, "dataCaricamento": "2024-05-15", "scadenza": "2025-05-15"}, "blsd": {"presente": true, "dataCaricamento": "2024-03-10", "scadenza": "2026-03-10"}}'),

('Anna', 'Costa', 'CSTNNA85C15L736W', '+39 335 3333333', 'a.costa@homecare.it', 'Via Verdi 33, Milano', 'OSS', '2022-06-01', 'attivo', '{"curriculum": {"presente": true, "dataCaricamento": "2024-01-05", "scadenza": "2025-01-05"}, "formazioneContinua": {"presente": true, "dataCaricamento": "2024-07-01", "scadenza": "2025-07-01"}, "sicurezzaLavoro": {"presente": true, "dataCaricamento": "2024-01-10", "scadenza": "2026-01-10"}}'),

('Marco', 'Ferrari', 'FRRMRC90A01H501X', '+39 336 4444444', 'm.ferrari@homecare.it', 'Via Dante 67, Milano', 'Fisioterapista', '2023-02-15', 'attivo', '{"curriculum": {"presente": true, "dataCaricamento": "2024-02-01", "scadenza": "2025-02-01"}, "blsd": {"presente": true, "dataCaricamento": "2024-05-01", "scadenza": "2026-05-01"}}');

-- Insert sample diary entries
INSERT INTO diary_entries (patient_id, data, ora, operatori, prestazioni, note, firma_operatore, firma_caregiver, status) VALUES
((SELECT id FROM patients WHERE codice_fiscale = 'RSSMRA80A01H501Z'), '2024-08-16', '09:30', '{"Dott.ssa Bianchi", "Inf. Neri"}', '{"Controllo parametri vitali", "Somministrazione insulina", "Controllo glicemia"}', 'Paziente in buone condizioni generali. Glicemia 120 mg/dl. Pressione 140/85 mmHg. Paziente collaborativo.', 'Dott.ssa M. Bianchi', 'Anna Rossi (moglie)', 'completato'),

((SELECT id FROM patients WHERE codice_fiscale = 'VRDNNA75B15F205X'), '2024-08-16', '10:15', '{"Inf. Costa"}', '{"Medicazione ulcera gamba destra", "Controllo saturazione ossigeno", "Fisioterapia respiratoria"}', 'Ulcera in miglioramento, riduzione essudato. Saturazione 95%. Eseguiti esercizi respiratori.', 'Inf. L. Costa', 'Marco Verdi (figlio)', 'completato'),

((SELECT id FROM patients WHERE codice_fiscale = 'BLUGPP70C20L736Y'), '2024-08-16', '11:00', '{"Fis. Viola", "OSS Ferrari"}', '{"Fisioterapia motoria arto superiore destro", "Mobilizzazione passiva", "Addestramento al cammino"}', 'Buona collaborazione del paziente. Miglioramento della forza muscolare arto superiore. Deambulazione assistita per 10 metri.', 'Fis. G. Viola', 'Elena Blu (moglie)', 'completato');

-- Insert sample documents
INSERT INTO documents (nome, tipo, categoria, descrizione, dimensione, versione, stato, tags, caricato_da) VALUES
('Procedura Gestione Farmaci Domiciliari', 'Procedura', 'Gestione Farmaci', 'Procedura dettagliata per la gestione, conservazione e somministrazione farmaci presso il domicilio del paziente', '2.3 MB', '3.1', 'attivo', '{"farmaci", "domicilio", "sicurezza", "somministrazione"}', 'Dott.ssa Bianchi'),

('Linee Guida Prevenzione Cadute', 'Linea Guida', 'Sicurezza Paziente', 'Linee guida per la valutazione del rischio cadute e implementazione misure preventive', '1.8 MB', '2.0', 'attivo', '{"cadute", "prevenzione", "valutazione", "sicurezza"}', 'Fis. Viola'),

('Protocollo Gestione Lesioni da Decubito', 'Protocollo', 'Wound Care', 'Protocollo clinico per prevenzione, valutazione e trattamento lesioni da pressione', '4.1 MB', '1.5', 'attivo', '{"lesioni", "decubito", "wound care", "prevenzione"}', 'Inf. Neri'),

('Manuale Gestione Emergenze Domiciliari', 'Manuale', 'Emergenze', 'Manuale operativo per la gestione delle emergenze sanitarie presso il domicilio', '6.7 MB', '4.0', 'attivo', '{"emergenze", "domicilio", "urgenze", "protocolli"}', 'Coord. Ferrari');

-- Insert sample risk events
INSERT INTO risk_events (tipo, gravita, stato, paziente, operatore, data_evento, descrizione, azioni_correttive, responsabile, prevenzione) VALUES
('Caduta', 'Media', 'Aperto', 'Mario Rossi', 'OSS Ferrari', '2024-08-15', 'Paziente scivolato in bagno durante igiene mattutina. Nessuna frattura riscontrata.', '{"Installazione tappetini antiscivolo", "Rivalutazione ambiente domestico", "Training aggiuntivo per caregiver"}', 'Dott.ssa Bianchi', true),

('Errore Farmaco', 'Alta', 'In Valutazione', 'Anna Verdi', 'Inf. Neri', '2024-08-14', 'Somministrazione doppia dose insulina per errore di lettura prescrizione.', '{"Revisione protocollo somministrazione farmaci", "Implementazione doppio controllo", "Formazione specifica operatore"}', 'Farm. Costa', true),

('Lesione', 'Bassa', 'In Corso', 'Giuseppe Blu', 'Inf. Viola', '2024-08-12', 'Piccola lesione cutanea durante mobilizzazione paziente.', '{"Revisione tecnica mobilizzazione", "Controllo presidi utilizzati"}', 'Fis. Gialli', false),

('Infezione', 'Media', 'Risolto', 'Maria Rosa', 'Multiple', '2024-08-10', 'IVU associata a cateterismo vescicale prolungato.', '{"Revisione protocollo gestione CV", "Formazione team su prevenzione ICA", "Implementazione checklist quotidiana"}', 'Dr. Marrone', true);

-- Insert sample training courses
INSERT INTO training_courses (titolo, descrizione, categoria, durata, difficolta, stato, moduli) VALUES
('Gestione Farmaci Domiciliari', 'Corso completo sulla gestione sicura dei farmaci presso il domicilio del paziente, includendo conservazione, somministrazione e monitoraggio effetti.', 'Farmacologia', 120, 'Intermedio', 'disponibile', '[{"id": 1, "titolo": "Principi base farmacologia", "durata": 30}, {"id": 2, "titolo": "Conservazione farmaci", "durata": 25}, {"id": 3, "titolo": "Somministrazione sicura", "durata": 35}, {"id": 4, "titolo": "Monitoraggio e documentazione", "durata": 30}]'),

('Prevenzione Cadute negli Anziani', 'Strategie evidence-based per la valutazione del rischio cadute e implementazione di interventi preventivi efficaci.', 'Sicurezza', 90, 'Principiante', 'disponibile', '[{"id": 1, "titolo": "Fattori di rischio cadute", "durata": 20}, {"id": 2, "titolo": "Valutazione clinica", "durata": 25}, {"id": 3, "titolo": "Interventi preventivi", "durata": 25}, {"id": 4, "titolo": "Educazione paziente e family", "durata": 20}]'),

('Wound Care Avanzato', 'Gestione avanzata delle lesioni cutanee: valutazione, trattamento e follow-up delle lesioni da pressione e ulcere croniche.', 'Clinica', 180, 'Avanzato', 'disponibile', '[{"id": 1, "titolo": "Fisiologia guarigione ferite", "durata": 45}, {"id": 2, "titolo": "Classificazione lesioni", "durata": 40}, {"id": 3, "titolo": "Medicazioni avanzate", "durata": 50}, {"id": 4, "titolo": "Terapie innovative", "durata": 45}]');

-- Insert sample course enrollments
INSERT INTO course_enrollments (operator_id, course_id, stato, progresso_percentuale, data_inizio, punteggio_test, certificato_ottenuto) VALUES
((SELECT id FROM operators WHERE email = 'm.bianchi@homecare.it'), (SELECT id FROM training_courses WHERE titolo = 'Gestione Farmaci Domiciliari'), 'completato', 100, '2024-01-20', 95, true),

((SELECT id FROM operators WHERE email = 'l.neri@homecare.it'), (SELECT id FROM training_courses WHERE titolo = 'Prevenzione Cadute negli Anziani'), 'in_corso', 60, '2024-07-15', null, false),

((SELECT id FROM operators WHERE email = 'a.costa@homecare.it'), (SELECT id FROM training_courses WHERE titolo = 'Wound Care Avanzato'), 'in_corso', 25, '2024-08-01', null, false);