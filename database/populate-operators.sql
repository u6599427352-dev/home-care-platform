-- Popolamento tabella operators con organigramma reale
-- Basato su: 3.2.3.2. AU - Organigramma rev.0o.pdf

-- Inserimento operatori secondo l'organigramma delle Cure Domiciliari

-- DIREZIONE
INSERT INTO operators (nome, cognome, ruolo, specializzazione, stato, telefono, email, data_assunzione) VALUES
('Cecilia', 'Matta', 'medico', 'Direttore', 'attivo', '+39 010 1234567', 'c.matta@curedomiciliari.it', '2020-01-15'),
('Federica', 'Pastorino', 'psicologo', 'Vice-Direttore/Psicologa', 'attivo', '+39 010 1234568', 'f.pastorino@curedomiciliari.it', '2020-02-01'),
('Lorenzo', 'Grecu', 'medico', 'Direttore e Medico Responsabile', 'attivo', '+39 010 1234569', 'l.grecu@curedomiciliari.it', '2020-03-01');

-- COORDINAMENTO
INSERT INTO operators (nome, cognome, ruolo, specializzazione, stato, telefono, email, data_assunzione) VALUES
('Pasquale', 'Milena', 'infermiere', 'Coordinatore Infermieristico (L.P.)', 'attivo', '+39 010 1234570', 'p.milena@curedomiciliari.it', '2020-04-01'),
('Cristina', 'Bovone', 'infermiere', 'Case Manager', 'attivo', '+39 010 1234571', 'c.bovone@curedomiciliari.it', '2021-01-15');

-- INFERMIERI
INSERT INTO operators (nome, cognome, ruolo, specializzazione, stato, telefono, email, data_assunzione) VALUES
('Ghita', 'Dumitra', 'infermiere', 'Infermiere (L.P.)', 'attivo', '+39 010 1234572', 'g.dumitra@curedomiciliari.it', '2021-03-01'),
('Sasu', 'Roxana', 'infermiere', 'Infermiere (L.P.)', 'attivo', '+39 010 1234573', 's.roxana@curedomiciliari.it', '2021-05-01');

-- FISIOTERAPISTI
INSERT INTO operators (nome, cognome, ruolo, specializzazione, stato, telefono, email, data_assunzione) VALUES
('Andrea', 'Corradini', 'fisioterapista', 'Fisioterapista (L.P.)', 'attivo', '+39 010 1234574', 'a.corradini@curedomiciliari.it', '2021-06-01'),
('Emanuele', 'Pisoni', 'fisioterapista', 'Fisioterapista (L.P.)', 'attivo', '+39 010 1234575', 'e.pisoni@curedomiciliari.it', '2021-07-01');

-- OSS (Operatori Socio Sanitari)
INSERT INTO operators (nome, cognome, ruolo, specializzazione, stato, telefono, email, data_assunzione) VALUES
('Lucia', 'Ferrarotti', 'oss', 'Operatore Socio Sanitario', 'attivo', '+39 010 1234576', 'l.ferrarotti@curedomiciliari.it', '2021-08-01'),
('Anna', 'Conzatti', 'oss', 'Operatore Socio Sanitario', 'attivo', '+39 010 1234577', 'a.conzatti@curedomiciliari.it', '2021-09-01'),
('Sabrina', 'Tononi', 'oss', 'Operatore Socio Sanitario', 'attivo', '+39 010 1234578', 's.tononi@curedomiciliari.it', '2021-10-01'),
('Anna Tiziana', 'Romano', 'oss', 'Operatore Socio Sanitario', 'attivo', '+39 010 1234579', 'a.romano@curedomiciliari.it', '2021-11-01'),
('Eugenia', 'Marella', 'oss', 'Operatore Socio Sanitario', 'attivo', '+39 010 1234580', 'e.marella@curedomiciliari.it', '2021-12-01');

-- SUPPORTO E FORMAZIONE
INSERT INTO operators (nome, cognome, ruolo, specializzazione, stato, telefono, email, data_assunzione) VALUES
('Nadia', 'Vuovolo', 'amministrativo', 'Segreteria - Call Center', 'attivo', '+39 010 1234581', 'n.vuovolo@curedomiciliari.it', '2020-05-01'),
('Matteo', 'Vannucci', 'formatore', 'Responsabile Formazione', 'attivo', '+39 010 1234582', 'm.vannucci@curedomiciliari.it', '2022-01-01');

-- Aggiornamento contatori
UPDATE operators SET created_at = NOW(), updated_at = NOW() WHERE created_at IS NULL;