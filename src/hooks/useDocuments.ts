import { useState, useEffect } from 'react';
import { supabase, type Document } from '@/lib/supabase';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento documenti');
    } finally {
      setLoading(false);
    }
  };

  // Add new document
  const addDocument = async (documentData: Omit<Document, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([documentData])
        .select()
        .single();

      if (error) throw error;
      setDocuments(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiunta del documento';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update document
  const updateDocument = async (id: string, updates: Partial<Document>) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setDocuments(prev => prev.map(doc => doc.id === id ? data : doc));
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'aggiornamento del documento';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Delete document
  const deleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'eliminazione del documento';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Upload file to Supabase Storage
  const uploadFile = async (file: File, documentId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${documentId}.${fileExt}`;
      const filePath = `documents/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrl } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl.publicUrl, path: filePath };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento del file';
      return { success: false, error: errorMessage };
    }
  };

  // Delete file from Supabase Storage
  const deleteFile = async (filePath: string) => {
    try {
      const { error } = await supabase.storage
        .from('documents')
        .remove([filePath]);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nell\'eliminazione del file';
      return { success: false, error: errorMessage };
    }
  };

  // Generate AI test from document content
  const generateAITest = async (documentId: string, content: string) => {
    try {
      // This would integrate with an AI service like OpenAI
      // For now, we'll simulate the response
      const questions = [
        {
          id: 1,
          question: "Qual è il primo passo nella procedura descritta nel documento?",
          options: [
            "Preparazione dell'ambiente",
            "Controllo dei dispositivi",
            "Verifica delle competenze",
            "Documentazione preliminare"
          ],
          correctAnswer: 0,
          explanation: "La preparazione dell'ambiente è sempre il primo passo essenziale."
        },
        {
          id: 2,
          question: "Quale frequenza è raccomandata per il controllo dei parametri?",
          options: [
            "Ogni ora",
            "Ogni 2 ore",
            "Ogni 4 ore", 
            "Una volta al giorno"
          ],
          correctAnswer: 2,
          explanation: "Il documento specifica controlli ogni 4 ore per garantire efficacia."
        }
      ];

      // Store test in database
      const testData = {
        document_id: documentId,
        title: `Test su documento`,
        questions: JSON.stringify(questions),
        created_by: 'AI System',
        status: 'attivo'
      };

      // In a real implementation, you'd save this to a 'tests' table
      return { success: true, data: testData };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nella generazione del test';
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    uploadFile,
    deleteFile,
    generateAITest,
    refetch: fetchDocuments
  };
}