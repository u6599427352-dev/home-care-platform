-- Users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nome VARCHAR(100) NOT NULL,
  cognome VARCHAR(100) NOT NULL,
  ruolo VARCHAR(50) NOT NULL DEFAULT 'utente', -- 'admin', 'operatore', 'supervisore', 'utente'
  stato VARCHAR(20) NOT NULL DEFAULT 'attivo', -- 'attivo', 'sospeso', 'inattivo'
  ultimo_accesso TIMESTAMP,
  tentativi_falliti INTEGER DEFAULT 0,
  bloccato_fino TIMESTAMP,
  reset_password_token VARCHAR(255),
  reset_password_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Sessions table for managing user sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User permissions table
CREATE TABLE IF NOT EXISTS user_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  modulo VARCHAR(50) NOT NULL, -- 'dashboard', 'fascicolo', 'diario', 'operatori', 'documentazione', 'formazione', 'risk_management', 'admin'
  permessi JSONB NOT NULL DEFAULT '{"read": false, "write": false, "delete": false, "admin": false}', -- permissions for each module
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, modulo)
);

-- Audit log for user actions
CREATE TABLE IF NOT EXISTS user_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  azione VARCHAR(100) NOT NULL,
  modulo VARCHAR(50) NOT NULL,
  dettagli JSONB,
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stato ON users(stato);
CREATE INDEX IF NOT EXISTS idx_users_ruolo ON users(ruolo);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_permissions_user_id ON user_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_user_id ON user_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_user_audit_log_timestamp ON user_audit_log(timestamp);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_permissions_updated_at BEFORE UPDATE ON user_permissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND ruolo = 'admin'
        )
    );

CREATE POLICY "Admins can insert users" ON users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND ruolo = 'admin'
        )
    );

CREATE POLICY "Admins can update users" ON users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id::text = auth.uid()::text 
            AND ruolo = 'admin'
        )
    );

-- Default admin user (password: admin)
-- Note: In production, use proper password hashing
INSERT INTO users (id, username, email, password_hash, nome, cognome, ruolo, stato) 
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin',
    'admin@homecare.local',
    '$2b$12$ic89UHKqxbdJNp7Gy8aulenCcdo55mdli5/zM05BZjt1bEg267DBi', -- bcrypt hash of 'admin'
    'Amministratore',
    'Sistema',
    'admin',
    'attivo'
) ON CONFLICT (username) DO NOTHING;

-- Default permissions for admin
INSERT INTO user_permissions (user_id, modulo, permessi) VALUES
('00000000-0000-0000-0000-000000000001', 'dashboard', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'fascicolo', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'diario', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'operatori', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'documentazione', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'formazione', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'risk_management', '{"read": true, "write": true, "delete": true, "admin": true}'),
('00000000-0000-0000-0000-000000000001', 'admin', '{"read": true, "write": true, "delete": true, "admin": true}')
ON CONFLICT (user_id, modulo) DO NOTHING;