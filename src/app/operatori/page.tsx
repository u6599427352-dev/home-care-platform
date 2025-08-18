'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  UserIcon, 
  DocumentTextIcon, 
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  TruckIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Tipologie professionali secondo normativa
const TIPOLOGIE_PROFESSIONALI = [
  'Medico',
  'Infermiere',
  'OSS',
  'Fisioterapista',
  'Psicologo',
  'Amministrativo',
  'Coordinatore'
];

// Tipologie rapporto di lavoro
const TIPOLOGIE_RAPPORTO = [
  'Dipendente',
  'Consulente',
  'Collaboratore',
  'Convenzione'
];

// Operatori REALI dall'organigramma
const OPERATORI = [
  {
    id: '1',
    nome: 'Cecilia',
    cognome: 'Matta',
    tipologiaProfessionale: 'Medico',
    requisiti: 'Laurea in Medicina, Specializzazione',
    tipoRapporto: 'Dipendente',
    telefono: '+39 010 1234567',
    email: 'c.matta@curedomiciliari.it',
    dataAssunzione: '2020-01-15',
    stato: 'attivo',
    fascicolo: {
      curriculum: { presente: true, ultimoAggiornamento: '2024-01-15' },
      formazioneContinua: { presente: true, scadenza: '2025-06-01' },
      idoneitaPsicoFisica: { presente: true, scadenza: '2025-03-01' },
      sicurezzaLavoro: { presente: true, scadenza: '2026-02-01' },
      blsd: { presente: true, scadenza: '2026-04-15' },
      procedureInterne: { presente: true, ultimoAggiornamento: '2024-01-20' },
      patente: { presente: true, tipo: 'B', scadenza: '2028-08-15' }
    },
    turni: {
      ultimoTurno: '2024-08-17',
      oreSettimanali: 40,
      tipoTurno: 'Diurno'
    }
  },
  {
    id: '2',
    nome: 'Federica',
    cognome: 'Pastorino',
    tipologiaProfessionale: 'Psicologo',
    requisiti: 'Laurea in Psicologia, Abilitazione',
    tipoRapporto: 'Dipendente',
    telefono: '+39 010 1234568',
    email: 'f.pastorino@curedomiciliari.it',
    dataAssunzione: '2020-02-01',
    stato: 'attivo',
    fascicolo: {
      curriculum: { presente: true, ultimoAggiornamento: '2024-02-01' },
      formazioneContinua: { presente: true, scadenza: '2025-07-01' },
      idoneitaPsicoFisica: { presente: true, scadenza: '2025-04-01' },
      sicurezzaLavoro: { presente: true, scadenza: '2026-03-01' },
      blsd: { presente: false },
      procedureInterne: { presente: true, ultimoAggiornamento: '2024-02-15' },
      patente: { presente: true, tipo: 'B', scadenza: '2027-12-20' }
    },
    turni: {
      ultimoTurno: '2024-08-16',
      oreSettimanali: 36,
      tipoTurno: 'Diurno'
    }
  },
  {
    id: '3',
    nome: 'Lorenzo',
    cognome: 'Grecu',
    tipologiaProfessionale: 'Medico',
    requisiti: 'Laurea in Medicina, Specializzazione',
    tipoRapporto: 'Dipendente',
    telefono: '+39 010 1234569',
    email: 'l.grecu@curedomiciliari.it',
    dataAssunzione: '2020-03-01',
    stato: 'attivo',
    fascicolo: {
      curriculum: { presente: true, ultimoAggiornamento: '2024-03-01' },
      formazioneContinua: { presente: true, scadenza: '2025-08-01' },
      idoneitaPsicoFisica: { presente: true, scadenza: '2025-05-01' },
      sicurezzaLavoro: { presente: true, scadenza: '2026-04-01' },
      blsd: { presente: true, scadenza: '2026-05-15' },
      procedureInterne: { presente: true, ultimoAggiornamento: '2024-03-10' },
      patente: { presente: true, tipo: 'B', scadenza: '2029-01-15' }
    },
    turni: {
      ultimoTurno: '2024-08-17',
      oreSettimanali: 40,
      tipoTurno: 'Diurno'
    }
  },
  {
    id: '4',
    nome: 'Pasquale',
    cognome: 'Milena',
    tipologiaProfessionale: 'Infermiere',
    requisiti: 'Laurea in Infermieristica, Abilitazione',
    tipoRapporto: 'Dipendente',
    telefono: '+39 010 1234570',
    email: 'p.milena@curedomiciliari.it',
    dataAssunzione: '2020-04-01',
    stato: 'attivo',
    fascicolo: {
      curriculum: { presente: true, ultimoAggiornamento: '2024-04-01' },
      formazioneContinua: { presente: true, scadenza: '2025-09-01' },
      idoneitaPsicoFisica: { presente: true, scadenza: '2025-06-01' },
      sicurezzaLavoro: { presente: true, scadenza: '2026-05-01' },
      blsd: { presente: true, scadenza: '2026-06-15' },
      procedureInterne: { presente: true, ultimoAggiornamento: '2024-04-15' },
      patente: { presente: true, tipo: 'B', scadenza: '2028-11-20' }
    },
    turni: {
      ultimoTurno: '2024-08-17',
      oreSettimanali: 38,
      tipoTurno: 'H24'
    }
  },
  {
    id: '5',
    nome: 'Cristina',
    cognome: 'Bovone',
    tipologiaProfessionale: 'Infermiere',
    requisiti: 'Laurea in Infermieristica, Abilitazione',
    tipoRapporto: 'Dipendente',
    telefono: '+39 010 1234571',
    email: 'c.bovone@curedomiciliari.it',
    dataAssunzione: '2021-01-15',
    stato: 'attivo',
    fascicolo: {
      curriculum: { presente: true, ultimoAggiornamento: '2024-01-15' },
      formazioneContinua: { presente: true, scadenza: '2025-05-15' },
      idoneitaPsicoFisica: { presente: true, scadenza: '2025-02-15' },
      sicurezzaLavoro: { presente: false },
      blsd: { presente: true, scadenza: '2026-03-10' },
      procedureInterne: { presente: true, ultimoAggiornamento: '2024-01-20' },
      patente: { presente: true, tipo: 'B', scadenza: '2027-08-15' }
    },
    turni: {
      ultimoTurno: '2024-08-16',
      oreSettimanali: 36,
      tipoTurno: 'Diurno'
    }
  }
];

export default function Operatori() {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [filterTipologia, setFilterTipologia] = useState('');
  const [filterRapporto, setFilterRapporto] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOperatori = OPERATORI.filter(op => {
    const matchesSearch = !searchTerm || 
      `${op.nome} ${op.cognome}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipologia = !filterTipologia || op.tipologiaProfessionale === filterTipologia;
    const matchesRapporto = !filterRapporto || op.tipoRapporto === filterRapporto;
    return matchesSearch && matchesTipologia && matchesRapporto;
  });

  // Statistiche secondo normativa 3.1.4.1
  const statisticheTipologie = TIPOLOGIE_PROFESSIONALI.map(tipo => ({
    tipo,
    numero: OPERATORI.filter(op => op.tipologiaProfessionale === tipo).length
  }));

  const getDocumentStatus = (doc: any) => {
    if (!doc.presente) return { status: 'mancante', color: 'bg-red-100 text-red-800' };
    if (doc.scadenza) {
      const scadenza = new Date(doc.scadenza);
      const oggi = new Date();
      const giorniMancanti = Math.ceil((scadenza.getTime() - oggi.getTime()) / (1000 * 3600 * 24));
      if (giorniMancanti < 0) return { status: 'scaduto', color: 'bg-red-100 text-red-800' };
      if (giorniMancanti <= 30) return { status: 'in_scadenza', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { status: 'valido', color: 'bg-green-100 text-green-800' };
  };

  if (viewMode === 'detail' && selectedOperator) {
    const operatore = OPERATORI.find(op => op.id === selectedOperator);
    if (!operatore) return null;

    return (
      <div className="space-y-6 p-6">
        {/* Header Fascicolo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {setViewMode('list'); setSelectedOperator(null);}}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Torna all'elenco
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Fascicolo Operatore: {operatore.nome} {operatore.cognome}
                </h1>
                <p className="text-sm text-gray-500">
                  {operatore.tipologiaProfessionale} • {operatore.tipoRapporto} • Requisiti: {operatore.requisiti}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Modifica Fascicolo
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Stampa Fascicolo
              </button>
            </div>
          </div>
        </div>

        {/* Dati Anagrafici e Professionali */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2" />
              Dati Anagrafici e Professionali
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Nome Completo</label>
                <p className="text-gray-900">{operatore.nome} {operatore.cognome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tipologia Professionale</label>
                <p className="text-gray-900">{operatore.tipologiaProfessionale}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Requisiti Professionali</label>
                <p className="text-gray-900">{operatore.requisiti}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tipologia Rapporto di Lavoro</label>
                <p className="text-gray-900">{operatore.tipoRapporto}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Assunzione</label>
                <p className="text-gray-900">{new Date(operatore.dataAssunzione).toLocaleDateString('it-IT')}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ClockIcon className="w-5 h-5 mr-2" />
              Turnazione e Attività
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Ultimo Turno Effettuato</label>
                <p className="text-gray-900">{new Date(operatore.turni.ultimoTurno).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Ore Settimanali</label>
                <p className="text-gray-900">{operatore.turni.oreSettimanali}h</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Tipologia Turno</label>
                <p className="text-gray-900">{operatore.turni.tipoTurno}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Stato</label>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {operatore.stato}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fascicolo Documentale Completo */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Fascicolo Documentale (Art. 3.1.4.4)
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formazione e Curriculum */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Curriculum e Formazione</h4>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Curriculum Formativo</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.curriculum).color}`}>
                    {operatore.fascicolo.curriculum.presente ? 'Presente' : 'Mancante'}
                  </span>
                </div>
                {operatore.fascicolo.curriculum.presente && (
                  <p className="text-sm text-gray-600">
                    Ultimo aggiornamento: {operatore.fascicolo.curriculum.ultimoAggiornamento}
                  </p>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Formazione Continua Obbligatoria</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.formazioneContinua).color}`}>
                    {getDocumentStatus(operatore.fascicolo.formazioneContinua).status}
                  </span>
                </div>
                {operatore.fascicolo.formazioneContinua.presente && (
                  <p className="text-sm text-gray-600">
                    Scadenza: {operatore.fascicolo.formazioneContinua.scadenza}
                  </p>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Formazione Procedure Interne</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.procedureInterne).color}`}>
                    {operatore.fascicolo.procedureInterne.presente ? 'Completata' : 'Da completare'}
                  </span>
                </div>
                {operatore.fascicolo.procedureInterne.presente && (
                  <p className="text-sm text-gray-600">
                    Ultimo aggiornamento: {operatore.fascicolo.procedureInterne.ultimoAggiornamento}
                  </p>
                )}
              </div>
            </div>

            {/* Certificazioni e Abilitazioni */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Certificazioni e Idoneità</h4>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Idoneità Psico-Fisica</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.idoneitaPsicoFisica).color}`}>
                    {getDocumentStatus(operatore.fascicolo.idoneitaPsicoFisica).status}
                  </span>
                </div>
                {operatore.fascicolo.idoneitaPsicoFisica.presente && (
                  <p className="text-sm text-gray-600">
                    Scadenza: {operatore.fascicolo.idoneitaPsicoFisica.scadenza}
                  </p>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Sicurezza sul Lavoro</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.sicurezzaLavoro).color}`}>
                    {getDocumentStatus(operatore.fascicolo.sicurezzaLavoro).status}
                  </span>
                </div>
                {operatore.fascicolo.sicurezzaLavoro.presente && (
                  <p className="text-sm text-gray-600">
                    Scadenza: {operatore.fascicolo.sicurezzaLavoro.scadenza}
                  </p>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Certificazione BLSD</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.blsd).color}`}>
                    {getDocumentStatus(operatore.fascicolo.blsd).status}
                  </span>
                </div>
                {operatore.fascicolo.blsd.presente && (
                  <p className="text-sm text-gray-600">
                    Scadenza: {operatore.fascicolo.blsd.scadenza}
                  </p>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Patente di Guida</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(operatore.fascicolo.patente).color}`}>
                    {getDocumentStatus(operatore.fascicolo.patente).status}
                  </span>
                </div>
                {operatore.fascicolo.patente.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Tipo: {operatore.fascicolo.patente.tipo}</p>
                    <p>Scadenza: {operatore.fascicolo.patente.scadenza}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Archivio Storico Turni */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CalendarDaysIcon className="w-5 h-5 mr-2" />
            Archivio Storico Turni (Art. 3.1.4.3)
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              L'archivio storico dei turni effettuati e della documentazione relativa ai servizi svolti, 
              contenente i dati degli accessi a domicilio, è conservato per il periodo previsto dalla normativa vigente.
            </p>
            <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
              Visualizza Archivio Completo →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestione Operatori</h1>
            <p className="mt-1 text-sm text-gray-500">
              Elenco del personale impiegato secondo Art. 3.1.4.1 - Fascicoli personali e turnazione
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuovo Operatore
          </button>
        </div>
      </div>

      {/* Statistiche Tipologie Professionali (Art. 3.1.4.1) */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tipologie e Numero Figure Professionali
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {statisticheTipologie.map((stat) => (
            <div key={stat.tipo} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stat.numero}</p>
              <p className="text-sm text-gray-600">{stat.tipo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filtri e Ricerca */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ricerca
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Nome, cognome o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipologia Professionale
            </label>
            <select 
              value={filterTipologia}
              onChange={(e) => setFilterTipologia(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le tipologie</option>
              {TIPOLOGIE_PROFESSIONALI.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rapporto di Lavoro
            </label>
            <select 
              value={filterRapporto}
              onChange={(e) => setFilterRapporto(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutti i rapporti</option>
              {TIPOLOGIE_RAPPORTO.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterTipologia('');
                setFilterRapporto('');
                setSearchTerm('');
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Azzera Filtri
            </button>
          </div>
        </div>
      </div>

      {/* Elenco Operatori */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Elenco Personale Impiegato</h2>
          <p className="text-sm text-gray-500">
            Totale: {filteredOperatori.length} operatori • Conforme Art. 3.1.4.1-3.1.4.5
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operatore
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipologia Professionale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rapporto di Lavoro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requisiti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato Fascicolo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ultimo Turno
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOperatori.map((operatore) => {
                const documentiValidi = Object.values(operatore.fascicolo).filter(doc => 
                  doc.presente && (getDocumentStatus(doc).status === 'valido')
                ).length;
                const totaleDocumenti = Object.keys(operatore.fascicolo).length;
                const percentualeCompleta = Math.round((documentiValidi / totaleDocumenti) * 100);

                return (
                  <tr key={operatore.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {operatore.nome} {operatore.cognome}
                          </div>
                          <div className="text-sm text-gray-500">{operatore.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {operatore.tipologiaProfessionale}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {operatore.tipoRapporto}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{operatore.requisiti}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className={`h-2 rounded-full ${
                              percentualeCompleta >= 80 ? 'bg-green-500' :
                              percentualeCompleta >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${percentualeCompleta}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{percentualeCompleta}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(operatore.turni.ultimoTurno).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedOperator(operatore.id);
                          setViewMode('detail');
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4 flex items-center"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Fascicolo
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Normative */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-amber-800 mb-2">
          Conformità Normativa
        </h3>
        <div className="text-sm text-amber-700 space-y-1">
          <p>• <strong>Art. 3.1.4.1:</strong> Elenco personale con tipologie, numero figure professionali e requisiti</p>
          <p>• <strong>Art. 3.1.4.2:</strong> Evidenza turnazione del personale</p>
          <p>• <strong>Art. 3.1.4.3:</strong> Archivio storico turni e documentazione servizi</p>
          <p>• <strong>Art. 3.1.4.4:</strong> Fascicolo completo per ciascun operatore</p>
          <p>• <strong>Art. 3.1.4.5:</strong> Rispetto normativa trattamento dati personali</p>
        </div>
      </div>
    </div>
  );
}