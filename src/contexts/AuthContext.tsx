'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, type User } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token');
      if (!sessionToken) {
        setLoading(false);
        return;
      }

      // Verify session token
      const { data: session, error: sessionError } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('session_token', sessionToken)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (sessionError || !session) {
        localStorage.removeItem('session_token');
        setLoading(false);
        return;
      }

      // Get user data
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user_id)
        .eq('stato', 'attivo')
        .single();

      if (userError || !userData) {
        localStorage.removeItem('session_token');
        setLoading(false);
        return;
      }

      setUser(userData);
      
      // Update last access
      await supabase
        .from('users')
        .update({ ultimo_accesso: new Date().toISOString() })
        .eq('id', userData.id);

    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('session_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);

      // Get user by username
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (userError || !userData) {
        return { success: false, error: 'Username o password non validi' };
      }

      // Check if user is active
      if (userData.stato !== 'attivo') {
        return { success: false, error: 'Account non attivo o sospeso' };
      }

      // Check if user is blocked
      if (userData.bloccato_fino && new Date(userData.bloccato_fino) > new Date()) {
        return { success: false, error: 'Account temporaneamente bloccato' };
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, userData.password_hash);
      
      if (!isPasswordValid) {
        // Increment failed attempts
        const newFailedAttempts = userData.tentativi_falliti + 1;
        const updates: any = { tentativi_falliti: newFailedAttempts };
        
        // Block user after 5 failed attempts for 15 minutes
        if (newFailedAttempts >= 5) {
          const blockUntil = new Date();
          blockUntil.setMinutes(blockUntil.getMinutes() + 15);
          updates.bloccato_fino = blockUntil.toISOString();
        }

        await supabase
          .from('users')
          .update(updates)
          .eq('id', userData.id);

        return { success: false, error: 'Username o password non validi' };
      }

      // Reset failed attempts on successful login
      await supabase
        .from('users')
        .update({ 
          tentativi_falliti: 0, 
          bloccato_fino: null,
          ultimo_accesso: new Date().toISOString()
        })
        .eq('id', userData.id);

      // Create session
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8); // 8 hours session

      const { error: sessionError } = await supabase
        .from('user_sessions')
        .insert({
          user_id: userData.id,
          session_token: sessionToken,
          ip_address: await getClientIP(),
          user_agent: navigator.userAgent,
          expires_at: expiresAt.toISOString()
        });

      if (sessionError) {
        console.error('Session creation error:', sessionError);
        return { success: false, error: 'Errore nella creazione della sessione' };
      }

      // Store session token
      localStorage.setItem('session_token', sessionToken);
      
      // Update user state
      setUser(userData);

      // Log the login action
      await logUserAction(userData.id, 'login', 'auth', { success: true });

      return { success: true };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Errore durante il login' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token');
      
      if (sessionToken && user) {
        // Remove session from database
        await supabase
          .from('user_sessions')
          .delete()
          .eq('session_token', sessionToken);

        // Log the logout action
        await logUserAction(user.id, 'logout', 'auth', { success: true });
      }

      // Clear local storage and state
      localStorage.removeItem('session_token');
      setUser(null);

    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state anyway
      localStorage.removeItem('session_token');
      setUser(null);
    }
  };

  // Helper functions
  const generateSessionToken = (): string => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const getClientIP = async (): Promise<string | null> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return null;
    }
  };

  const logUserAction = async (userId: string, action: string, module: string, details: any) => {
    try {
      await supabase
        .from('user_audit_log')
        .insert({
          user_id: userId,
          azione: action,
          modulo: module,
          dettagli: details,
          ip_address: await getClientIP(),
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Audit log error:', error);
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