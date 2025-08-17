import { useState, useEffect } from 'react';
import { supabase, type User, type UserPermission } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento utenti');
    } finally {
      setLoading(false);
    }
  };

  // Hash password
  const hashPassword = async (password: string) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  };

  // Generate random password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Add new user
  const addUser = async (userData: {
    username: string;
    email: string;
    nome: string;
    cognome: string;
    ruolo: 'admin' | 'operatore' | 'supervisore' | 'utente';
    password?: string;
  }) => {
    try {
      const password = userData.password || generatePassword();
      const passwordHash = await hashPassword(password);

      const { data, error } = await supabase
        .from('users')
        .insert([{
          ...userData,
          password_hash: passwordHash,
          stato: 'attivo',
          tentativi_falliti: 0
        }])
        .select()
        .single();

      if (error) throw error;
      
      setUsers(prev => [data, ...prev]);
      
      // Create default permissions based on role
      await createDefaultPermissions(data.id, userData.ruolo);
      
      return { success: true, data, password };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiunta dell\'utente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Create default permissions for new user
  const createDefaultPermissions = async (userId: string, ruolo: string) => {
    const defaultPermissions = {
      admin: {
        dashboard: { read: true, write: true, delete: true, admin: true },
        fascicolo: { read: true, write: true, delete: true, admin: true },
        diario: { read: true, write: true, delete: true, admin: true },
        operatori: { read: true, write: true, delete: true, admin: true },
        documentazione: { read: true, write: true, delete: true, admin: true },
        formazione: { read: true, write: true, delete: true, admin: true },
        risk_management: { read: true, write: true, delete: true, admin: true },
        admin: { read: true, write: true, delete: true, admin: true }
      },
      supervisore: {
        dashboard: { read: true, write: true, delete: false, admin: false },
        fascicolo: { read: true, write: true, delete: false, admin: false },
        diario: { read: true, write: true, delete: false, admin: false },
        operatori: { read: true, write: false, delete: false, admin: false },
        documentazione: { read: true, write: true, delete: false, admin: false },
        formazione: { read: true, write: true, delete: false, admin: false },
        risk_management: { read: true, write: true, delete: false, admin: false }
      },
      operatore: {
        dashboard: { read: true, write: false, delete: false, admin: false },
        fascicolo: { read: true, write: true, delete: false, admin: false },
        diario: { read: true, write: true, delete: false, admin: false },
        documentazione: { read: true, write: false, delete: false, admin: false },
        formazione: { read: true, write: false, delete: false, admin: false }
      },
      utente: {
        dashboard: { read: true, write: false, delete: false, admin: false },
        fascicolo: { read: true, write: false, delete: false, admin: false },
        diario: { read: true, write: false, delete: false, admin: false }
      }
    };

    const permissions = defaultPermissions[ruolo as keyof typeof defaultPermissions] || defaultPermissions.utente;
    
    const permissionsData = Object.entries(permissions).map(([modulo, permessi]) => ({
      user_id: userId,
      modulo,
      permessi
    }));

    const { error } = await supabase
      .from('user_permissions')
      .insert(permissionsData);

    if (error) throw error;
  };

  // Update user
  const updateUser = async (id: string, updates: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setUsers(prev => prev.map(user => user.id === id ? data : user));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento dell\'utente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Reset user password
  const resetUserPassword = async (id: string, newPassword?: string) => {
    try {
      const password = newPassword || generatePassword();
      const passwordHash = await hashPassword(password);

      const { data, error } = await supabase
        .from('users')
        .update({ 
          password_hash: passwordHash,
          tentativi_falliti: 0,
          bloccato_fino: null
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setUsers(prev => prev.map(user => user.id === id ? data : user));
      return { success: true, password };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel reset della password';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Toggle user status
  const toggleUserStatus = async (id: string) => {
    try {
      const user = users.find(u => u.id === id);
      if (!user) throw new Error('Utente non trovato');

      const newStatus = user.stato === 'attivo' ? 'sospeso' : 'attivo';
      
      const { data, error } = await supabase
        .from('users')
        .update({ stato: newStatus })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setUsers(prev => prev.map(user => user.id === id ? data : user));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel cambio stato utente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    try {
      // First delete permissions
      await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', id);

      // Then delete user
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setUsers(prev => prev.filter(user => user.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'eliminazione dell\'utente';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get user permissions
  const getUserPermissions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_permissions')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento permessi';
      return { success: false, error: errorMessage };
    }
  };

  // Update user permissions
  const updateUserPermissions = async (userId: string, permissions: UserPermission[]) => {
    try {
      // Delete existing permissions
      await supabase
        .from('user_permissions')
        .delete()
        .eq('user_id', userId);

      // Insert new permissions
      const { error } = await supabase
        .from('user_permissions')
        .insert(permissions.map(p => ({
          user_id: userId,
          modulo: p.modulo,
          permessi: p.permessi
        })));

      if (error) throw error;
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento permessi';
      return { success: false, error: errorMessage };
    }
  };

  // Get user statistics
  const getUserStats = () => {
    const stats = {
      total: users.length,
      attivi: users.filter(u => u.stato === 'attivo').length,
      sospesi: users.filter(u => u.stato === 'sospeso').length,
      inattivi: users.filter(u => u.stato === 'inattivo').length,
      byRole: {
        admin: users.filter(u => u.ruolo === 'admin').length,
        supervisore: users.filter(u => u.ruolo === 'supervisore').length,
        operatore: users.filter(u => u.ruolo === 'operatore').length,
        utente: users.filter(u => u.ruolo === 'utente').length
      }
    };
    return stats;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    resetUserPassword,
    toggleUserStatus,
    deleteUser,
    getUserPermissions,
    updateUserPermissions,
    getUserStats,
    generatePassword,
    refetch: fetchUsers
  };
}