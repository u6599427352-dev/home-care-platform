import { useState, useEffect } from 'react';
import { supabase, type Operator } from '@/lib/supabase';

export function useOperators() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all operators
  const fetchOperators = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .order('cognome', { ascending: true });

      if (error) throw error;
      setOperators(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento operatori');
    } finally {
      setLoading(false);
    }
  };

  // Add new operator
  const addOperator = async (operatorData: Omit<Operator, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .insert([operatorData])
        .select()
        .single();

      if (error) throw error;
      setOperators(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiunta dell\'operatore';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update operator
  const updateOperator = async (id: string, updates: Partial<Operator>) => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setOperators(prev => prev.map(op => op.id === id ? data : op));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento dell\'operatore';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update operator documents
  const updateOperatorDocuments = async (id: string, documents: Record<string, any>) => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .update({ documenti: documents })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setOperators(prev => prev.map(op => op.id === id ? data : op));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento dei documenti';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete operator
  const deleteOperator = async (id: string) => {
    try {
      const { error } = await supabase
        .from('operators')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setOperators(prev => prev.filter(op => op.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'eliminazione dell\'operatore';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get operators by qualification
  const getOperatorsByQualification = async (qualifica: string) => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .eq('qualifica', qualifica)
        .eq('stato', 'attivo');

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento degli operatori';
      return { success: false, error: errorMessage };
    }
  };

  // Get operators with expiring documents
  const getOperatorsWithExpiringDocuments = async (daysAhead: number = 30) => {
    try {
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .eq('stato', 'attivo');

      if (error) throw error;

      // Filter operators with expiring documents on the client side
      const expiringOperators = data?.filter(operator => {
        if (!operator.documenti) return false;
        
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + daysAhead);

        return Object.values(operator.documenti).some((doc: any) => {
          if (doc.scadenza) {
            const expiryDate = new Date(doc.scadenza);
            return expiryDate <= futureDate && expiryDate >= now;
          }
          return false;
        });
      }) || [];

      return { success: true, data: expiringOperators };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento degli operatori';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return {
    operators,
    loading,
    error,
    addOperator,
    updateOperator,
    updateOperatorDocuments,
    deleteOperator,
    getOperatorsByQualification,
    getOperatorsWithExpiringDocuments,
    refetch: fetchOperators
  };
}