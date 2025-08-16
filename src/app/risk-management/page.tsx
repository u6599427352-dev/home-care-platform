'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface RiskEvent {
  id: number;
  tipo: 'Caduta' | 'Errore Farmaco' | 'Infezione' | 'Lesione' | 'Altro';
  gravita: 'Bassa' | 'Media' | 'Alta' | 'Critica';
  stato: 'Aperto' | 'In Valutazione' | 'In Corso' | 'Risolto' | 'Chiuso';
  paziente: string;
  operatore: string;
  dataEvento: string;
  dataNotifica: string;
  descrizione: string;
  azioniCorrettive: string[];
  responsabile: string;
  dataChiusura?: string;
  followUp?: string;
  prevenzione: boolean;
}

interface RiskIndicator {
  id: string;
  nome: string;
  valore: number;
  obiettivo: number;
  trend: 'up' | 'down' | 'stable';
  periodo: string;
  unita: string;
}

export default function RiskManagement() {
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'eventi' | 'indicatori' | 'piani'>('dashboard');
  const [showEventModal, setShowEventModal] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterGravity, setFilterGravity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const riskEvents: RiskEvent[] = [
    {
      id: 1,
      tipo: 'Caduta',
      gravita: 'Media',
      stato: 'Aperto',
      paziente: 'Mario Rossi',
      operatore: 'OSS Ferrari',
      dataEvento: '2024-08-15',
      dataNotifica: '2024-08-15',
      descrizione: 'Paziente scivolato in bagno durante igiene mattutina. Nessuna frattura riscontrata.',
      azioniCorrettive: [
        'Installazione tappetini antiscivolo',
        'Rivalutazione ambiente domestico',
        'Training aggiuntivo per caregiver'
      ],
      responsabile: 'Dott.ssa Bianchi',
      prevenzione: true
    },
    {
      id: 2,
      tipo: 'Errore Farmaco',
      gravita: 'Alta',
      stato: 'In Valutazione',
      paziente: 'Anna Verdi',
      operatore: 'Inf. Neri',
      dataEvento: '2024-08-14',
      dataNotifica: '2024-08-14',
      descrizione: 'Somministrazione doppia dose insulina per errore di lettura prescrizione.',
      azioniCorrettive: [
        'Revisione protocollo somministrazione farmaci',
        'Implementazione doppio controllo',
        'Formazione specifica operatore'
      ],
      responsabile: 'Farm. Costa',
      prevenzione: true
    },
    {
      id: 3,
      tipo: 'Lesione',
      gravita: 'Bassa',
      stato: 'In Corso',
      paziente: 'Giuseppe Blu',
      operatore: 'Inf. Viola',
      dataEvento: '2024-08-12',
      dataNotifica: '2024-08-12',
      descrizione: 'Piccola lesione cutanea durante mobilizzazione paziente.',
      azioniCorrettive: [
        'Revisione tecnica mobilizzazione',
        'Controllo presidi utilizzati'
      ],
      responsabile: 'Fis. Gialli',
      prevenzione: false
    },
    {
      id: 4,
      tipo: 'Infezione',
      gravita: 'Media',
      stato: 'Risolto',
      paziente: 'Maria Rosa',
      operatore: 'Multiple',
      dataEvento: '2024-08-10',
      dataNotifica: '2024-08-10',
      descrizione: 'IVU associata a cateterismo vescicale prolungato.',
      azioniCorrettive: [
        'Revisione protocollo gestione CV',
        'Formazione team su prevenzione ICA',
        'Implementazione checklist quotidiana'
      ],
      responsabile: 'Dr. Marrone',
      dataChiusura: '2024-08-16',
      followUp: 'Controllo urinocoltura negativa. Paziente guarita.',
      prevenzione: true
    }
  ];

  const riskIndicators: RiskIndicator[] = [
    {
      id: 'cadute',
      nome: 'Tasso Cadute',
      valore: 2.1,
      obiettivo: 1.5,
      trend: 'up',
      periodo: 'Ultimo mese',
      unita: 'per 1000 giorni assistenza'
    },
    {
      id: 'farmaci',
      nome: 'Errori Farmacologici',
      valore: 0.8,
      obiettivo: 0.5,
      trend: 'down',
      periodo: 'Ultimo mese',
      unita: 'per 1000 somministrazioni'
    },
    {
      id: 'infezioni',
      nome: 'Infezioni Correlate',
      valore: 1.2,
      obiettivo: 1.0,
      trend: 'stable',
      periodo: 'Ultimo mese',
      unita: 'per 1000 giorni assistenza'
    },
    {
      id: 'lesioni',
      nome: 'Lesioni da Pressione',
      valore: 0.5,
      obiettivo: 0.3,
      trend: 'down',
      periodo: 'Ultimo mese',
      unita: 'per 100 pazienti'
    }
  ];

  const filteredEvents = riskEvents.filter(event => {
    const matchesType = !filterType || event.tipo === filterType;
    const matchesGravity = !filterGravity || event.gravita === filterGravity;
    const matchesStatus = !filterStatus || event.stato === filterStatus;
    return matchesType && matchesGravity && matchesStatus;
  });

  const NewEventModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Segnala Nuovo Evento</h3>
          <button
            onClick={() => setShowEventModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo Evento
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">Seleziona tipo</option>
                <option value="Caduta">Caduta</option>
                <option value="Errore Farmaco">Errore Farmaco</option>
                <option value="Infezione">Infezione</option>
                <option value="Lesione">Lesione</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gravità
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">Seleziona gravità</option>
                <option value="Bassa">Bassa</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
                <option value="Critica">Critica</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data e Ora Evento
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paziente Coinvolto
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">Seleziona paziente</option>
                <option value="Mario Rossi">Mario Rossi</option>
                <option value="Anna Verdi">Anna Verdi</option>
                <option value="Giuseppe Blu">Giuseppe Blu</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operatore Coinvolto
              </label>
              <input
                type="text"
                placeholder="Nome operatore"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrizione Dettagliata dell&apos;Evento
            </label>
            <textarea
              rows={4}
              placeholder="Descrivi cosa è successo, le circostanze, le conseguenze immediate..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Azioni Immediate Intraprese
            </label>
            <textarea
              rows={3}
              placeholder="Descrivi le azioni immediate prese per gestire l'evento..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsabile Gestione
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                <option value="">Seleziona responsabile</option>
                <option value="Dott.ssa Bianchi">Dott.ssa Bianchi</option>
                <option value="Inf. Neri">Inf. Neri</option>
                <option value="Coord. Ferrari">Coord. Ferrari</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="prevenibile"
                className="mr-2 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="prevenibile" className="text-sm text-gray-700">
                Evento potenzialmente prevenibile
              </label>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-red-900">Importante</h4>
                <p className="text-sm text-red-700 mt-1">
                  La segnalazione tempestiva degli eventi avversi è fondamentale per migliorare 
                  la sicurezza e prevenire future occorrenze.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowEventModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Segnala Evento
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
            <h1 className="text-2xl font-bold text-gray-900">Risk Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestione del rischio clinico e monitoraggio indicatori di sicurezza
            </p>
          </div>
          <button
            onClick={() => setShowEventModal(true)}
            className="mt-4 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Segnala Evento
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
              { id: 'eventi', name: 'Eventi', icon: ExclamationTriangleIcon },
              { id: 'indicatori', name: 'Indicatori', icon: ArrowTrendingUpIcon },
              { id: 'piani', name: 'Piani Azione', icon: DocumentTextIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'dashboard' | 'eventi' | 'indicatori' | 'piani')}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-lg p-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Eventi Aperti</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {riskEvents.filter(e => e.stato === 'Aperto' || e.stato === 'In Valutazione').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-lg p-3">
                  <ClockIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Gestione</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {riskEvents.filter(e => e.stato === 'In Corso').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-lg p-3">
                  <CheckIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Risolti Questo Mese</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {riskEvents.filter(e => e.stato === 'Risolto' || e.stato === 'Chiuso').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-lg p-3">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Prevenibili</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {riskEvents.filter(e => e.prevenzione).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Indicatori di Rischio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riskIndicators.map((indicator) => (
                <div key={indicator.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{indicator.nome}</h4>
                    <div className={`p-1 rounded-full ${
                      indicator.trend === 'up' ? 'bg-red-100' :
                      indicator.trend === 'down' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {indicator.trend === 'up' ? (
                        <ArrowTrendingUpIcon className="w-4 h-4 text-red-600" />
                      ) : indicator.trend === 'down' ? (
                        <ArrowTrendingDownIcon className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-gray-900">{indicator.valore}</span>
                      <span className="text-sm text-gray-500">{indicator.unita}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Obiettivo: {indicator.obiettivo}</span>
                      <span className={
                        indicator.valore <= indicator.obiettivo ? 'text-green-600' : 'text-red-600'
                      }>
                        {indicator.valore <= indicator.obiettivo ? '✓' : '⚠'}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          indicator.valore <= indicator.obiettivo ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          width: `${Math.min((indicator.valore / indicator.obiettivo) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    
                    <p className="text-xs text-gray-500">{indicator.periodo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Eventi Recenti</h3>
            <div className="space-y-4">
              {riskEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.tipo === 'Caduta' ? 'bg-orange-100 text-orange-800' :
                          event.tipo === 'Errore Farmaco' ? 'bg-red-100 text-red-800' :
                          event.tipo === 'Infezione' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.tipo}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.gravita === 'Critica' ? 'bg-red-100 text-red-800' :
                          event.gravita === 'Alta' ? 'bg-orange-100 text-orange-800' :
                          event.gravita === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.gravita}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.stato === 'Aperto' ? 'bg-red-100 text-red-800' :
                          event.stato === 'In Valutazione' ? 'bg-yellow-100 text-yellow-800' :
                          event.stato === 'In Corso' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.stato}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1">
                        <strong>Paziente:</strong> {event.paziente}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">{event.descrizione}</p>
                      <p className="text-xs text-gray-500">
                        Segnalato il {new Date(event.dataEvento).toLocaleDateString('it-IT')} - 
                        Responsabile: {event.responsabile}
                      </p>
                    </div>
                    <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'eventi' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Evento
                </label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Tutti i tipi</option>
                  <option value="Caduta">Caduta</option>
                  <option value="Errore Farmaco">Errore Farmaco</option>
                  <option value="Infezione">Infezione</option>
                  <option value="Lesione">Lesione</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gravità
                </label>
                <select 
                  value={filterGravity}
                  onChange={(e) => setFilterGravity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Tutte le gravità</option>
                  <option value="Bassa">Bassa</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Critica">Critica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stato
                </label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Tutti gli stati</option>
                  <option value="Aperto">Aperto</option>
                  <option value="In Valutazione">In Valutazione</option>
                  <option value="In Corso">In Corso</option>
                  <option value="Risolto">Risolto</option>
                  <option value="Chiuso">Chiuso</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterType('');
                    setFilterGravity('');
                    setFilterStatus('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Azzera Filtri
                </button>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Eventi Segnalati</h3>
              <p className="text-sm text-gray-500">Trovati {filteredEvents.length} eventi</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <div key={event.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="font-medium text-gray-900">#{event.id}</span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.tipo === 'Caduta' ? 'bg-orange-100 text-orange-800' :
                          event.tipo === 'Errore Farmaco' ? 'bg-red-100 text-red-800' :
                          event.tipo === 'Infezione' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.tipo}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.gravita === 'Critica' ? 'bg-red-100 text-red-800' :
                          event.gravita === 'Alta' ? 'bg-orange-100 text-orange-800' :
                          event.gravita === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.gravita}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          event.stato === 'Aperto' ? 'bg-red-100 text-red-800' :
                          event.stato === 'In Valutazione' ? 'bg-yellow-100 text-yellow-800' :
                          event.stato === 'In Corso' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.stato}
                        </span>
                        {event.prevenzione && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Prevenibile
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-900 mb-2">{event.descrizione}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <strong>Paziente:</strong> {event.paziente}
                        </div>
                        <div>
                          <strong>Operatore:</strong> {event.operatore}
                        </div>
                        <div>
                          <strong>Responsabile:</strong> {event.responsabile}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Data Evento:</strong> {new Date(event.dataEvento).toLocaleDateString('it-IT')}
                        </div>
                        <div>
                          <strong>Data Segnalazione:</strong> {new Date(event.dataNotifica).toLocaleDateString('it-IT')}
                        </div>
                      </div>

                      {event.azioniCorrettive.length > 0 && (
                        <div className="mt-3">
                          <strong className="text-sm text-gray-700">Azioni Correttive:</strong>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                            {event.azioniCorrettive.map((azione, index) => (
                              <li key={index}>{azione}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {event.followUp && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <strong className="text-sm text-green-800">Follow-up:</strong>
                          <p className="text-sm text-green-700 mt-1">{event.followUp}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <CheckIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'indicatori' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Indicatori di Sicurezza</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {riskIndicators.map((indicator) => (
              <div key={indicator.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">{indicator.nome}</h4>
                  <div className={`p-2 rounded-full ${
                    indicator.trend === 'up' ? 'bg-red-100' :
                    indicator.trend === 'down' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {indicator.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="w-6 h-6 text-red-600" />
                    ) : indicator.trend === 'down' ? (
                      <ArrowTrendingDownIcon className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold text-gray-900">{indicator.valore}</span>
                    <span className="text-sm text-gray-500">{indicator.unita}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Valore Attuale</span>
                      <span className="font-medium">{indicator.valore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Obiettivo</span>
                      <span className="font-medium">{indicator.obiettivo}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Performance</span>
                      <span className={`font-medium ${
                        indicator.valore <= indicator.obiettivo ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {indicator.valore <= indicator.obiettivo ? 'In Target' : 'Sopra Target'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        indicator.valore <= indicator.obiettivo ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min((indicator.valore / (indicator.obiettivo * 2)) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-500">{indicator.periodo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'piani' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Piani di Azione</h3>
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">Piani di Azione</h4>
            <p className="text-gray-500 mb-4">
              Sviluppa e monitora piani di azione per migliorare la sicurezza.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Crea Nuovo Piano
            </button>
          </div>
        </div>
      )}

      {/* New Event Modal */}
      {showEventModal && <NewEventModal />}
    </div>
  );
}