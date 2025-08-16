'use client';

import { useState } from 'react';
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
  UserIcon
} from '@heroicons/react/24/outline';

interface Documento {
  id: number;
  nome: string;
  tipo: 'Procedura' | 'Linea Guida' | 'Protocollo' | 'Manuale' | 'Modulo';
  categoria: string;
  descrizione: string;
  dataCaricamento: string;
  dataUltimaModifica: string;
  caricatoDa: string;
  dimensione: string;
  versione: string;
  stato: 'attivo' | 'bozza' | 'archiviato';
  tags: string[];
  url?: string;
}

export default function Documentazione() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documenti: Documento[] = [
    {
      id: 1,
      nome: 'Procedura Gestione Farmaci Domiciliari',
      tipo: 'Procedura',
      categoria: 'Gestione Farmaci',
      descrizione: 'Procedura dettagliata per la gestione, conservazione e somministrazione farmaci presso il domicilio del paziente',
      dataCaricamento: '2024-01-15',
      dataUltimaModifica: '2024-06-20',
      caricatoDa: 'Dott.ssa Bianchi',
      dimensione: '2.3 MB',
      versione: '3.1',
      stato: 'attivo',
      tags: ['farmaci', 'domicilio', 'sicurezza', 'somministrazione']
    },
    {
      id: 2,
      nome: 'Linee Guida Prevenzione Cadute',
      tipo: 'Linea Guida',
      categoria: 'Sicurezza Paziente',
      descrizione: 'Linee guida per la valutazione del rischio cadute e implementazione misure preventive',
      dataCaricamento: '2024-02-01',
      dataUltimaModifica: '2024-07-15',
      caricatoDa: 'Fis. Viola',
      dimensione: '1.8 MB',
      versione: '2.0',
      stato: 'attivo',
      tags: ['cadute', 'prevenzione', 'valutazione', 'sicurezza']
    },
    {
      id: 3,
      nome: 'Protocollo Gestione Lesioni da Decubito',
      tipo: 'Protocollo',
      categoria: 'Wound Care',
      descrizione: 'Protocollo clinico per prevenzione, valutazione e trattamento lesioni da pressione',
      dataCaricamento: '2024-01-20',
      dataUltimaModifica: '2024-05-10',
      caricatoDa: 'Inf. Neri',
      dimensione: '4.1 MB',
      versione: '1.5',
      stato: 'attivo',
      tags: ['lesioni', 'decubito', 'wound care', 'prevenzione']
    },
    {
      id: 4,
      nome: 'Manuale Gestione Emergenze Domiciliari',
      tipo: 'Manuale',
      categoria: 'Emergenze',
      descrizione: 'Manuale operativo per la gestione delle emergenze sanitarie presso il domicilio',
      dataCaricamento: '2024-03-01',
      dataUltimaModifica: '2024-08-01',
      caricatoDa: 'Coord. Ferrari',
      dimensione: '6.7 MB',
      versione: '4.0',
      stato: 'attivo',
      tags: ['emergenze', 'domicilio', 'urgenze', 'protocolli']
    },
    {
      id: 5,
      nome: 'Procedura Controllo Infezioni',
      tipo: 'Procedura',
      categoria: 'Controllo Infezioni',
      descrizione: 'Procedura per prevenzione e controllo delle infezioni correlate all\'assistenza domiciliare',
      dataCaricamento: '2024-02-15',
      dataUltimaModifica: '2024-06-30',
      caricatoDa: 'Dr. Costa',
      dimensione: '3.2 MB',
      versione: '2.3',
      stato: 'attivo',
      tags: ['infezioni', 'prevenzione', 'ica', 'sanificazione']
    },
    {
      id: 6,
      nome: 'Modulo Consenso Informato Telemedicina',
      tipo: 'Modulo',
      categoria: 'Modulistica',
      descrizione: 'Modulo per raccolta consenso informato per servizi di telemedicina',
      dataCaricamento: '2024-04-01',
      dataUltimaModifica: '2024-04-01',
      caricatoDa: 'Segr. Rossi',
      dimensione: '0.5 MB',
      versione: '1.0',
      stato: 'bozza',
      tags: ['consenso', 'telemedicina', 'privacy', 'gdpr']
    }
  ];

  const categorie = ['Gestione Farmaci', 'Sicurezza Paziente', 'Wound Care', 'Emergenze', 'Controllo Infezioni', 'Modulistica'];
  const tipi = ['Procedura', 'Linea Guida', 'Protocollo', 'Manuale', 'Modulo'];

  const filteredDocumenti = documenti.filter(doc => {
    const matchesSearch = !searchTerm || 
      doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.descrizione.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || doc.categoria === selectedCategory;
    const matchesType = !selectedType || doc.tipo === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const UploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Carica Nuovo Documento</h3>
          <button
            onClick={() => setShowUploadModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Documento
              </label>
              <input
                type="text"
                placeholder="Inserisci nome documento"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo Documento
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                Categoria
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Seleziona categoria</option>
                {categorie.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Versione
              </label>
              <input
                type="text"
                placeholder="es. 1.0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrizione
            </label>
            <textarea
              rows={3}
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
              placeholder="tag1, tag2, tag3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              File PDF
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
              <div className="space-y-1 text-center">
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Carica un file</span>
                    <input id="file-upload" name="file-upload" type="file" accept=".pdf" className="sr-only" />
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
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Carica Documento
            </button>
          </div>
        </form>
      </div>
    </div>
  );

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
              <p className="text-2xl font-semibold text-gray-900">{documenti.length}</p>
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
              <CloudArrowUpIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Caricati Questo Mese</p>
              <p className="text-2xl font-semibold text-gray-900">
                {documenti.filter(doc => {
                  const docDate = new Date(doc.dataCaricamento);
                  const now = new Date();
                  return docDate.getMonth() === now.getMonth() && docDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <CalendarDaysIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aggiornati di Recente</p>
              <p className="text-2xl font-semibold text-gray-900">
                {documenti.filter(doc => {
                  const docDate = new Date(doc.dataUltimaModifica);
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
            Trovati {filteredDocumenti.length} documenti
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {filteredDocumenti.map((doc) => (
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
                  {doc.caricatoDa}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDaysIcon className="w-4 h-4 mr-2" />
                  Aggiornato: {new Date(doc.dataUltimaModifica).toLocaleDateString('it-IT')}
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
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocumenti.length === 0 && (
          <div className="p-12 text-center">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun documento trovato</h3>
            <p className="text-gray-500 mb-4">
              Non ci sono documenti che corrispondono ai criteri di ricerca.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Carica Primo Documento
            </button>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && <UploadModal />}
    </div>
  );
}