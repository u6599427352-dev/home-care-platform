import { useState, useEffect } from 'react';
import { supabase, type DiaryEntry } from '@/lib/supabase';

export function useDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all diary entries
  const fetchEntries = async (patientId?: string, date?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('diary_entries')
        .select('*')
        .order('data', { ascending: false })
        .order('ora', { ascending: false });

      if (patientId) {
        query = query.eq('patient_id', patientId);
      }

      if (date) {
        query = query.eq('data', date);
      }

      const { data, error } = await query;

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento del diario');
    } finally {
      setLoading(false);
    }
  };

  // Add new diary entry
  const addEntry = async (entryData: Omit<DiaryEntry, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .insert([entryData])
        .select()
        .single();

      if (error) throw error;
      setEntries(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiunta della registrazione';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update diary entry
  const updateEntry = async (id: string, updates: Partial<DiaryEntry>) => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setEntries(prev => prev.map(e => e.id === id ? data : e));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento della registrazione';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete diary entry
  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setEntries(prev => prev.filter(e => e.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'eliminazione della registrazione';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get entries by patient
  const getEntriesByPatient = async (patientId: string) => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('patient_id', patientId)
        .order('data', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento delle registrazioni';
      return { success: false, error: errorMessage };
    }
  };

  // Get entries by date range
  const getEntriesByDateRange = async (startDate: string, endDate: string) => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .gte('data', startDate)
        .lte('data', endDate)
        .order('data', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento delle registrazioni';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    entries,
    loading,
    error,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByPatient,
    getEntriesByDateRange,
    refetch: fetchEntries
  };
}