import { useState, useEffect } from 'react';
import { supabase, type RiskEvent } from '@/lib/supabase';

export function useRiskEvents() {
  const [events, setEvents] = useState<RiskEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all risk events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('risk_events')
        .select('*')
        .order('data_evento', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento eventi');
    } finally {
      setLoading(false);
    }
  };

  // Add new risk event
  const addEvent = async (eventData: Omit<RiskEvent, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .insert([eventData])
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nella segnalazione dell\'evento';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update risk event
  const updateEvent = async (id: string, updates: Partial<RiskEvent>) => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => prev.map(e => e.id === id ? data : e));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento dell\'evento';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Close risk event
  const closeEvent = async (id: string, followUp: string) => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .update({
          stato: 'Chiuso',
          data_chiusura: new Date().toISOString().split('T')[0],
          follow_up: followUp
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setEvents(prev => prev.map(e => e.id === id ? data : e));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nella chiusura dell\'evento';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get events by type
  const getEventsByType = async (tipo: string) => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .select('*')
        .eq('tipo', tipo)
        .order('data_evento', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento degli eventi';
      return { success: false, error: errorMessage };
    }
  };

  // Get events by severity
  const getEventsBySeverity = async (gravita: string) => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .select('*')
        .eq('gravita', gravita)
        .order('data_evento', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento degli eventi';
      return { success: false, error: errorMessage };
    }
  };

  // Get events statistics
  const getEventsStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .select('tipo, gravita, stato, prevenzione');

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        byType: {} as Record<string, number>,
        bySeverity: {} as Record<string, number>,
        byStatus: {} as Record<string, number>,
        preventable: data?.filter(e => e.prevenzione).length || 0
      };

      data?.forEach(event => {
        stats.byType[event.tipo] = (stats.byType[event.tipo] || 0) + 1;
        stats.bySeverity[event.gravita] = (stats.bySeverity[event.gravita] || 0) + 1;
        stats.byStatus[event.stato] = (stats.byStatus[event.stato] || 0) + 1;
      });

      return { success: true, data: stats };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel calcolo delle statistiche';
      return { success: false, error: errorMessage };
    }
  };

  // Get events by date range
  const getEventsByDateRange = async (startDate: string, endDate: string) => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .select('*')
        .gte('data_evento', startDate)
        .lte('data_evento', endDate)
        .order('data_evento', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento degli eventi';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    closeEvent,
    getEventsByType,
    getEventsBySeverity,
    getEventsStatistics,
    getEventsByDateRange,
    refetch: fetchEvents
  };
}