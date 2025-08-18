'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  nome: string;
  cognome: string;
  ruolo: 'admin' | 'operatore' | 'supervisore' | 'utente';
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Demo users
const DEMO_USERS = [
  {
    id: 'admin-user',
    username: 'admin',
    password: 'admin',
    nome: 'Amministratore',
    cognome: 'Sistema',
    ruolo: 'admin' as const,
    email: 'admin@homecare.local'
  },
  {
    id: 'operatore-user',
    username: 'operatore',
    password: 'operatore',
    nome: 'Mario',
    cognome: 'Rossi',
    ruolo: 'operatore' as const,
    email: 'mario.rossi@homecare.local'
  }
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if we're in the browser environment
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      const sessionToken = localStorage.getItem('session_token');
      const sessionExpiry = localStorage.getItem('session_expiry');
      
      if (!sessionToken || !sessionExpiry) {
        setLoading(false);
        return;
      }

      // Check if session is expired
      if (new Date() > new Date(sessionExpiry)) {
        localStorage.removeItem('session_token');
        localStorage.removeItem('session_expiry');
        localStorage.removeItem('user_data');
        setLoading(false);
        return;
      }

      // Get user data from localStorage
      const userData = localStorage.getItem('user_data');
      if (userData) {
        setUser(JSON.parse(userData));
      }

    } catch (error) {
      console.error('Auth check error:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session_token');
        localStorage.removeItem('session_expiry');
        localStorage.removeItem('user_data');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);

      // Simple client-side authentication
      const user = DEMO_USERS.find(u => u.username === username && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Credenziali non valide' };
      }

      // Create session
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8); // 8 hours

      const userData = {
        id: user.id,
        username: user.username,
        nome: user.nome,
        cognome: user.cognome,
        ruolo: user.ruolo,
        email: user.email
      };

      // Store session data in localStorage (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('session_token', sessionToken);
        localStorage.setItem('session_expiry', expiresAt.toISOString());
        localStorage.setItem('user_data', JSON.stringify(userData));
      }
      
      // Update user state
      setUser(userData);

      return { success: true };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Errore durante il login' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear local storage and state (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session_token');
        localStorage.removeItem('session_expiry');
        localStorage.removeItem('user_data');
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state anyway
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session_token');
        localStorage.removeItem('session_expiry');
        localStorage.removeItem('user_data');
      }
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Simple session token generator
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}