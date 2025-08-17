'use client';

import { useState, useRef } from 'react';
import { useDocuments } from '@/hooks/useDocuments';
import { 
  PlusIcon, 
  DocumentTextIcon, 
  FolderIcon,
  CloudArrowUpIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon,
  TagIcon,
  UserIcon,
  TrashIcon,
  AcademicCapIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface TestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface AITest {
  id: string;
  document_id: string;
  title: string;
  questions: TestQuestion[];
  created_by: string;
  status: 'attivo' | 'bozza';
}

export default function Documentazione() {
  const { documents, loading, error, addDocument, updateDocument, deleteDocument, uploadFile, deleteFile, generateAITest } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<AITest[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get unique categories and types from documents
  const categorie = [...new Set(documents.map(doc => doc.categoria))];
  const tipi = ['Procedura', 'Linea Guida', 'Protocollo', 'Manuale', 'Modulo'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = !searchTerm || 
      doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.descrizione.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || doc.categoria === selectedCategory;
    const matchesType = !selectedType || doc.tipo === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Handle file upload
  const handleFileUpload = async (event: React.FormEvent, formData: any) => {
    event.preventDefault();
    
    if (!fileInputRef.current?.files?.[0]) {
      alert('Seleziona un file PDF');
      return;
    }

    const file = fileInputRef.current.files[0];
    const documentData = {
      nome: formData.nome,
      tipo: formData.tipo as 'Procedura' | 'Linea Guida' | 'Protocollo' | 'Manuale' | 'Modulo',
      categoria: formData.categoria,
      descrizione: formData.descrizione,
      versione: formData.versione,
      dimensione: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      tags: formData.tags.split(',').map((tag: string) => tag.trim()),
      caricato_da: 'Utente Corrente',
      stato: 'attivo' as 'attivo' | 'bozza' | 'archiviato',
      file_url: ''
    };

    try {
      setIsUploading(true);
      setUploadProgress(25);

      // First, create document record
      const docResult = await addDocument(documentData);
      if (!docResult.success) throw new Error(docResult.error);

      setUploadProgress(50);

      // Then upload file
      const uploadResult = await uploadFile(file, docResult.data.id);
      if (!uploadResult.success) throw new Error(uploadResult.error);

      setUploadProgress(75);

      // Update document with file URL
      await updateDocument(docResult.data.id, { file_url: uploadResult.url });

      setUploadProgress(100);
      setShowUploadModal(false);
      
      // Reset form
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      alert('Documento caricato con successo!');
    } catch (err) {
      alert(`Errore: ${err instanceof Error ? err.message : 'Errore sconosciuto'}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Handle document deletion
  const handleDeleteDocument = async (docId: string, filePath?: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo documento?')) return;

    try {
      // Delete file from storage if exists
      if (filePath) {
        await deleteFile(filePath);
      }

      // Delete document record
      const result = await deleteDocument(docId);
      if (result.success) {
        alert('Documento eliminato con successo!');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      alert(`Errore nell'eliminazione: ${err instanceof Error ? err.message : 'Errore sconosciuto'}`);
    }
  };

  // Handle AI test generation
  const handleGenerateAITest = async (docId: string, docName: string) => {
    try {
      const result = await generateAITest(docId, 'Document content would be extracted here');
      if (result.success) {
        const newTest: AITest = {
          id: Date.now().toString(),
          document_id: docId,
          title: `Test AI - ${docName}`,
          questions: [
            {
              id: 1,
              question: "Qual è il primo passo nella procedura descritta?",
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
              question: "Quale frequenza è raccomandata per i controlli?",
              options: [
                "Ogni ora",
                "Ogni 2 ore",
                "Ogni 4 ore",
                "Una volta al giorno"
              ],
              correctAnswer: 2,
              explanation: "Il documento specifica controlli ogni 4 ore per garantire efficacia."
            }
          ],
          created_by: 'AI System',
          status: 'attivo'
        };
        
        setGeneratedTests(prev => [...prev, newTest]);
        setSelectedDocument(docId);
        setShowTestModal(true);
        
        alert('Test AI generato con successo!');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      alert(`Errore nella generazione del test: ${err instanceof Error ? err.message : 'Errore sconosciuto'}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Errore nel caricamento</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const UploadModal = () => {
    const [formData, setFormData] = useState({
      nome: '',
      tipo: '',
      categoria: '',
      descrizione: '',
      versione: '1.0',
      tags: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      handleFileUpload(e, formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Carica Nuovo Documento PDF</h3>
            <button
              onClick={() => setShowUploadModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {isUploading && (
            <div className="mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CloudArrowUpIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 text-sm">Caricamento in corso... {uploadProgress}%</span>
                </div>
                <div className="mt-2 bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Documento *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Inserisci nome documento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Documento *
                </label>
                <select 
                  required
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seleziona tipo</option>
                  {tipi.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <input
                  type="text"
                  required
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  placeholder="es. Gestione Farmaci"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Versione
                </label>
                <input
                  type="text"
                  value={formData.versione}
                  onChange={(e) => setFormData({...formData, versione: e.target.value})}
                  placeholder="es. 1.0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrizione *
              </label>
              <textarea
                required
                rows={3}
                value={formData.descrizione}
                onChange={(e) => setFormData({...formData, descrizione: e.target.value})}
                placeholder="Descrizione del documento..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (separati da virgola)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="tag1, tag2, tag3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                File PDF *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
                <div className="space-y-1 text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Carica un file</span>
                      <input 
                        id="file-upload" 
                        ref={fileInputRef}
                        name="file-upload" 
                        type="file" 
                        accept=".pdf" 
                        required
                        className="sr-only" 
                      />
                    </label>
                    <p className="pl-1">o trascina qui</p>
                  </div>
                  <p className="text-xs text-gray-500">Solo file PDF fino a 10MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                disabled={isUploading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Caricamento...
                  </>
                ) : (
                  <>
                    <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                    Carica Documento
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Test AI Modal
  const TestModal = () => {
    const selectedTest = generatedTests.find(test => test.document_id === selectedDocument);
    if (!selectedTest) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <SparklesIcon className="w-6 h-6 text-yellow-500 mr-2" />
              {selectedTest.title}
            </h3>
            <button
              onClick={() => setShowTestModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {selectedTest.questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">
                  {index + 1}. {question.question}
                </h4>
                
                <div className="space-y-2 mb-4">
                  {question.options.map((option, optionIndex) => (
                    <div 
                      key={optionIndex} 
                      className={`p-3 rounded-lg border-2 ${
                        optionIndex === question.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center">
                        {optionIndex === question.correctAnswer && (
                          <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                        )}
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>Spiegazione:</strong> {question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => setShowTestModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Chiudi
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <AcademicCapIcon className="w-4 h-4 mr-2" />
              Avvia Test
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documentazione</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestione procedure, linee guida e documentazione tecnica
            </p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Carica Documento
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cerca Documenti
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca per nome, descrizione o tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le categorie</option>
              {categorie.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo Documento
            </label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutti i tipi</option>
              {tipi.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedType('');
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
            >
              <FunnelIcon className="w-4 h-4 mr-2" />
              Azzera Filtri
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Totale Documenti</p>
              <p className="text-2xl font-semibold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <FolderIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categorie</p>
              <p className="text-2xl font-semibold text-gray-900">{categorie.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <SparklesIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Test AI Generati</p>
              <p className="text-2xl font-semibold text-gray-900">{generatedTests.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <CalendarDaysIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Caricati di Recente</p>
              <p className="text-2xl font-semibold text-gray-900">
                {documents.filter(doc => {
                  const docDate = new Date(doc.created_at);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return docDate >= weekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Documenti Disponibili</h2>
          <p className="text-sm text-gray-500">
            Trovati {filteredDocuments.length} documenti
          </p>
        </div>
        
        {filteredDocuments.length === 0 ? (
          <div className="p-12 text-center">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun documento trovato</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCategory || selectedType
                ? 'Non ci sono documenti che corrispondono ai criteri di ricerca.'
                : 'Non ci sono documenti nel sistema. Carica il primo documento per iniziare.'
              }
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Carica Primo Documento
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="bg-red-100 rounded-lg p-2 mr-3">
                      <DocumentTextIcon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        doc.tipo === 'Procedura' ? 'bg-blue-100 text-blue-800' :
                        doc.tipo === 'Linea Guida' ? 'bg-green-100 text-green-800' :
                        doc.tipo === 'Protocollo' ? 'bg-purple-100 text-purple-800' :
                        doc.tipo === 'Manuale' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {doc.tipo}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    doc.stato === 'attivo' ? 'bg-green-100 text-green-800' :
                    doc.stato === 'bozza' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.stato}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                  {doc.nome}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {doc.descrizione}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <FolderIcon className="w-4 h-4 mr-2" />
                    {doc.categoria}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <UserIcon className="w-4 h-4 mr-2" />
                    {doc.caricato_da}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarDaysIcon className="w-4 h-4 mr-2" />
                    Aggiornato: {new Date(doc.updated_at).toLocaleDateString('it-IT')}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      <TagIcon className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      +{doc.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    v{doc.versione} • {doc.dimensione}
                  </div>
                  <div className="flex space-x-1">
                    {doc.file_url && (
                      <button 
                        onClick={() => window.open(doc.file_url, '_blank')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Visualizza documento"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    )}
                    {doc.file_url && (
                      <button 
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = doc.file_url;
                          link.download = doc.nome + '.pdf';
                          link.click();
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Scarica documento"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleGenerateAITest(doc.id, doc.nome)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Genera test AI"
                    >
                      <SparklesIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc.id, doc.file_url ? `documents/${doc.id}.pdf` : undefined)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Elimina documento"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}
      
      {/* Test AI Modal */}
      {showTestModal && <TestModal />}
    </div>
  );
}