'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
  pazientiAttivi: number;
  interventiOggi: number;
  operatoriAttivi: number;
  alertAperti: number;
}

interface RecentActivity {
  id: string;
  type: string;
  patient: string;
  operator: string;
  time: string;
  status: 'completata' | 'in corso' | 'programmata';
  created_at: string;
}

interface Alert {
  id: string;
  type: string;
  patient: string;
  description: string;
  priority: 'alta' | 'media' | 'bassa';
  time: string;
  created_at: string;
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    pazientiAttivi: 0,
    interventiOggi: 0,
    operatoriAttivi: 0,
    alertAperti: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    try {
      // Get active patients count
      const { count: pazientiCount } = await supabase
        .from('patients')
        .select('*', { count: 'exact', head: true })
        .eq('stato', 'attivo');

      // Get today's diary entries (interventions)
      const today = new Date().toISOString().split('T')[0];
      const { count: interventiCount } = await supabase
        .from('diary_entries')
        .select('*', { count: 'exact', head: true })
        .gte('data_intervento', today)
        .lt('data_intervento', new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]);

      // Get active operators count
      const { count: operatoriCount } = await supabase
        .from('operators')
        .select('*', { count: 'exact', head: true })
        .eq('stato', 'attivo');

      // Get open risk events count (as alerts)
      const { count: alertCount } = await supabase
        .from('risk_events')
        .select('*', { count: 'exact', head: true })
        .eq('stato', 'aperto');

      setStats({
        pazientiAttivi: pazientiCount || 0,
        interventiOggi: interventiCount || 0,
        operatoriAttivi: operatoriCount || 0,
        alertAperti: alertCount || 0
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  const fetchRecentActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select(`
          id,
          tipo_intervento,
          note,
          data_intervento,
          ora_inizio,
          ora_fine,
          patients!inner (nome, cognome),
          operators!inner (nome, cognome)
        `)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;

      const activities: RecentActivity[] = (data || []).map((entry: any) => ({
        id: entry.id,
        type: entry.tipo_intervento,
        patient: `${entry.patients?.nome || ''} ${entry.patients?.cognome || ''}`.trim(),
        operator: `${entry.operators?.nome || ''} ${entry.operators?.cognome || ''}`.trim(),
        time: entry.ora_inizio || 'N/A',
        status: entry.ora_fine ? 'completata' : 'in corso',
        created_at: entry.data_intervento
      }));

      setRecentActivities(activities);
    } catch (err) {
      console.error('Error fetching recent activities:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from('risk_events')
        .select(`
          id,
          tipo_evento,
          descrizione,
          gravita,
          created_at,
          patients!inner (nome, cognome)
        `)
        .eq('stato', 'aperto')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const alertsData: Alert[] = (data || []).map((event: any) => ({
        id: event.id,
        type: event.tipo_evento,
        patient: `${event.patients?.nome || ''} ${event.patients?.cognome || ''}`.trim(),
        description: event.descrizione,
        priority: event.gravita as 'alta' | 'media' | 'bassa',
        time: new Date(event.created_at).toLocaleTimeString('it-IT', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        created_at: event.created_at
      }));

      setAlerts(alertsData);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchRecentActivities(),
        fetchAlerts()
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento della dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, []);

  return {
    stats,
    recentActivities,
    alerts,
    loading,
    error,
    refreshDashboard
  };
}