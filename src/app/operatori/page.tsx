'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,
  ShieldCheckIcon,
  TruckIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Operatore {
  id: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  telefono: string;
  email: string;
  indirizzo: string;
  qualifica: string;
  dataAssunzione: string;
  stato: 'attivo' | 'sospeso' | 'inattivo';
  documenti: {
    curriculum: { presente: boolean; dataCaricamento?: string; scadenza?: string };
    formazioneContinua: { presente: boolean; dataCaricamento?: string; scadenza?: string };
    idoneitaPsicofisica: { presente: boolean; dataCaricamento?: string; scadenza?: string };
    sicurezzaLavoro: { presente: boolean; dataCaricamento?: string; scadenza?: string };
    blsd: { presente: boolean; dataCaricamento?: string; scadenza?: string };
    procedureInterne: { presente: boolean; dataCaricamento?: string; scadenza?: string };
    patente: { presente: boolean; tipo?: string; scadenza?: string };
  };
}

export default function Operatori() {
  const [selectedOperator, setSelectedOperator] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [filterQualifica, setFilterQualifica] = useState('');
  const [filterStato, setFilterStato] = useState('');

  const operatori: Operatore[] = [
    {
      id: 1,
      nome: 'Maria',
      cognome: 'Bianchi',
      codiceFiscale: 'BNCMRA80D45H501Y',
      telefono: '+39 333 1111111',
      email: 'm.bianchi@homecare.it',
      indirizzo: 'Via Milano 15, Milano',
      qualifica: 'Medico',
      dataAssunzione: '2020-01-15',
      stato: 'attivo',
      documenti: {
        curriculum: { presente: true, dataCaricamento: '2024-01-15', scadenza: '2025-01-15' },
        formazioneContinua: { presente: true, dataCaricamento: '2024-06-01', scadenza: '2025-06-01' },
        idoneitaPsicofisica: { presente: true, dataCaricamento: '2024-03-01', scadenza: '2025-03-01' },
        sicurezzaLavoro: { presente: true, dataCaricamento: '2024-02-01', scadenza: '2026-02-01' },
        blsd: { presente: true, dataCaricamento: '2024-04-15', scadenza: '2026-04-15' },
        procedureInterne: { presente: true, dataCaricamento: '2024-01-20', scadenza: '2025-01-20' },
        patente: { presente: true, tipo: 'B', scadenza: '2028-08-15' }
      }
    },
    {
      id: 2,
      nome: 'Luigi',
      cognome: 'Neri',
      codiceFiscale: 'NRLGGI75H12F205Z',
      telefono: '+39 334 2222222',
      email: 'l.neri@homecare.it',
      indirizzo: 'Via Roma 88, Milano',
      qualifica: 'Infermiere',
      dataAssunzione: '2021-03-10',
      stato: 'attivo',
      documenti: {
        curriculum: { presente: true, dataCaricamento: '2024-01-10', scadenza: '2025-01-10' },
        formazioneContinua: { presente: true, dataCaricamento: '2024-05-15', scadenza: '2025-05-15' },
        idoneitaPsicofisica: { presente: true, dataCaricamento: '2024-02-20', scadenza: '2025-02-20' },
        sicurezzaLavoro: { presente: false },
        blsd: { presente: true, dataCaricamento: '2024-03-10', scadenza: '2026-03-10' },
        procedureInterne: { presente: true, dataCaricamento: '2024-01-15', scadenza: '2025-01-15' },
        patente: { presente: true, tipo: 'B', scadenza: '2027-12-20' }
      }
    },
    {
      id: 3,
      nome: 'Anna',
      cognome: 'Costa',
      codiceFiscale: 'CSTNNA85C15L736W',
      telefono: '+39 335 3333333',
      email: 'a.costa@homecare.it',
      indirizzo: 'Via Verdi 33, Milano',
      qualifica: 'OSS',
      dataAssunzione: '2022-06-01',
      stato: 'attivo',
      documenti: {
        curriculum: { presente: true, dataCaricamento: '2024-01-05', scadenza: '2025-01-05' },
        formazioneContinua: { presente: true, dataCaricamento: '2024-07-01', scadenza: '2025-07-01' },
        idoneitaPsicofisica: { presente: true, dataCaricamento: '2024-01-15', scadenza: '2025-01-15' },
        sicurezzaLavoro: { presente: true, dataCaricamento: '2024-01-10', scadenza: '2026-01-10' },
        blsd: { presente: false },
        procedureInterne: { presente: true, dataCaricamento: '2024-01-08', scadenza: '2025-01-08' },
        patente: { presente: true, tipo: 'B', scadenza: '2029-03-15' }
      }
    },
    {
      id: 4,
      nome: 'Marco',
      cognome: 'Ferrari',
      codiceFiscale: 'FRRMRC90A01H501X',
      telefono: '+39 336 4444444',
      email: 'm.ferrari@homecare.it',
      indirizzo: 'Via Dante 67, Milano',
      qualifica: 'Fisioterapista',
      dataAssunzione: '2023-02-15',
      stato: 'attivo',
      documenti: {
        curriculum: { presente: true, dataCaricamento: '2024-02-01', scadenza: '2025-02-01' },
        formazioneContinua: { presente: true, dataCaricamento: '2024-08-01', scadenza: '2025-08-01' },
        idoneitaPsicofisica: { presente: true, dataCaricamento: '2024-03-15', scadenza: '2025-03-15' },
        sicurezzaLavoro: { presente: true, dataCaricamento: '2024-02-20', scadenza: '2026-02-20' },
        blsd: { presente: true, dataCaricamento: '2024-05-01', scadenza: '2026-05-01' },
        procedureInterne: { presente: true, dataCaricamento: '2024-02-18', scadenza: '2025-02-18' },
        patente: { presente: false }
      }
    }
  ];

  const qualifiche = ['Medico', 'Infermiere', 'OSS', 'Fisioterapista', 'Psicologo'];
  const stati = ['attivo', 'sospeso', 'inattivo'];

  const filteredOperatori = operatori.filter(op => {
    const matchesQualifica = !filterQualifica || op.qualifica === filterQualifica;
    const matchesStato = !filterStato || op.stato === filterStato;
    return matchesQualifica && matchesStato;
  });

  const getDocumentStatus = (documento: any) => {
    if (!documento.presente) return 'mancante';
    if (documento.scadenza) {
      const scadenza = new Date(documento.scadenza);
      const oggi = new Date();
      const giorniMancanti = Math.ceil((scadenza.getTime() - oggi.getTime()) / (1000 * 3600 * 24));
      if (giorniMancanti < 0) return 'scaduto';
      if (giorniMancanti <= 30) return 'in_scadenza';
    }
    return 'valido';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valido': return 'text-green-800 bg-green-100';
      case 'in_scadenza': return 'text-yellow-800 bg-yellow-100';
      case 'scaduto': return 'text-red-800 bg-red-100';
      case 'mancante': return 'text-gray-800 bg-gray-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'valido': return 'Valido';
      case 'in_scadenza': return 'In scadenza';
      case 'scaduto': return 'Scaduto';
      case 'mancante': return 'Mancante';
      default: return 'N/D';
    }
  };

  if (viewMode === 'detail' && selectedOperator) {
    const operatore = operatori.find(op => op.id === selectedOperator);
    if (!operatore) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {setViewMode('list'); setSelectedOperator(null);}}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ← Torna all'elenco
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Fascicolo: {operatore.nome} {operatore.cognome}
                </h1>
                <p className="text-sm text-gray-500">{operatore.qualifica} - CF: {operatore.codiceFiscale}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Modifica
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Stampa Fascicolo
              </button>
            </div>
          </div>
        </div>

        {/* Operator Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dati Personali */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2" />
              Dati Personali
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Nome Completo</label>
                <p className="text-gray-900">{operatore.nome} {operatore.cognome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Codice Fiscale</label>
                <p className="text-gray-900">{operatore.codiceFiscale}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Qualifica</label>
                <p className="text-gray-900">{operatore.qualifica}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Assunzione</label>
                <p className="text-gray-900">{new Date(operatore.dataAssunzione).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Stato</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  operatore.stato === 'attivo' ? 'bg-green-100 text-green-800' : 
                  operatore.stato === 'sospeso' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {operatore.stato}
                </span>
              </div>
            </div>
          </div>

          {/* Contatti */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2" />
              Contatti
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Telefono</label>
                  <p className="text-gray-900">{operatore.telefono}</p>
                </div>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-900">{operatore.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <label className="text-sm font-medium text-gray-500">Indirizzo</label>
                  <p className="text-gray-900">{operatore.indirizzo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stato Documentazione */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Stato Documentazione
            </h3>
            <div className="space-y-2">
              {Object.entries(operatore.documenti).map(([key, doc]) => {
                const status = getDocumentStatus(doc);
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                      {getStatusText(status)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Documentazione Dettagliata */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Documentazione Dettagliata
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Curriculum e Formazione */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Curriculum e Formazione</h4>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Curriculum Formativo</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.curriculum))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.curriculum))}
                  </span>
                </div>
                {operatore.documenti.curriculum.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Caricato: {operatore.documenti.curriculum.dataCaricamento}</p>
                    {operatore.documenti.curriculum.scadenza && (
                      <p>Scade: {operatore.documenti.curriculum.scadenza}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Formazione Continua Obbligatoria</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.formazioneContinua))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.formazioneContinua))}
                  </span>
                </div>
                {operatore.documenti.formazioneContinua.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Caricato: {operatore.documenti.formazioneContinua.dataCaricamento}</p>
                    <p>Scade: {operatore.documenti.formazioneContinua.scadenza}</p>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Formazione Procedure Interne</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.procedureInterne))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.procedureInterne))}
                  </span>
                </div>
                {operatore.documenti.procedureInterne.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Caricato: {operatore.documenti.procedureInterne.dataCaricamento}</p>
                    <p>Scade: {operatore.documenti.procedureInterne.scadenza}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Certificazioni e Abilitazioni */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 border-b pb-2">Certificazioni e Abilitazioni</h4>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Idoneità Psico-Fisica</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.idoneitaPsicofisica))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.idoneitaPsicofisica))}
                  </span>
                </div>
                {operatore.documenti.idoneitaPsicofisica.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Caricato: {operatore.documenti.idoneitaPsicofisica.dataCaricamento}</p>
                    <p>Scade: {operatore.documenti.idoneitaPsicofisica.scadenza}</p>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Sicurezza sul Lavoro</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.sicurezzaLavoro))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.sicurezzaLavoro))}
                  </span>
                </div>
                {operatore.documenti.sicurezzaLavoro.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Caricato: {operatore.documenti.sicurezzaLavoro.dataCaricamento}</p>
                    <p>Scade: {operatore.documenti.sicurezzaLavoro.scadenza}</p>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Certificazione BLSD</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.blsd))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.blsd))}
                  </span>
                </div>
                {operatore.documenti.blsd.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Caricato: {operatore.documenti.blsd.dataCaricamento}</p>
                    <p>Scade: {operatore.documenti.blsd.scadenza}</p>
                  </div>
                )}
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Patente di Guida</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getDocumentStatus(operatore.documenti.patente))}`}>
                    {getStatusText(getDocumentStatus(operatore.documenti.patente))}
                  </span>
                </div>
                {operatore.documenti.patente.presente && (
                  <div className="text-sm text-gray-600">
                    <p>Tipo: {operatore.documenti.patente.tipo}</p>
                    <p>Scade: {operatore.documenti.patente.scadenza}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Operatori</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestione fascicoli personale operatori e documentazione
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuovo Operatore
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtra per Qualifica
            </label>
            <select 
              value={filterQualifica}
              onChange={(e) => setFilterQualifica(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutte le qualifiche</option>
              {qualifiche.map(qualifica => (
                <option key={qualifica} value={qualifica}>{qualifica}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtra per Stato
            </label>
            <select 
              value={filterStato}
              onChange={(e) => setFilterStato(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutti gli stati</option>
              {stati.map(stato => (
                <option key={stato} value={stato}>{stato}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterQualifica('');
                setFilterStato('');
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Azzera Filtri
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <UserIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Operatori Attivi</p>
              <p className="text-2xl font-semibold text-gray-900">{operatori.filter(op => op.stato === 'attivo').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documenti OK</p>
              <p className="text-2xl font-semibold text-gray-900">
                {operatori.reduce((acc, op) => {
                  const docsOk = Object.values(op.documenti).filter(doc => 
                    doc.presente && getDocumentStatus(doc) === 'valido'
                  ).length;
                  return acc + docsOk;
                }, 0)}
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
              <p className="text-sm font-medium text-gray-600">In Scadenza</p>
              <p className="text-2xl font-semibold text-gray-900">
                {operatori.reduce((acc, op) => {
                  const docsScadenza = Object.values(op.documenti).filter(doc => 
                    getDocumentStatus(doc) === 'in_scadenza'
                  ).length;
                  return acc + docsScadenza;
                }, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-red-100 rounded-lg p-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documenti Mancanti</p>
              <p className="text-2xl font-semibold text-gray-900">
                {operatori.reduce((acc, op) => {
                  const docsMancanti = Object.values(op.documenti).filter(doc => 
                    !doc.presente || getDocumentStatus(doc) === 'scaduto'
                  ).length;
                  return acc + docsMancanti;
                }, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Operators List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Elenco Operatori</h2>
          <p className="text-sm text-gray-500">Totale: {filteredOperatori.length} operatori</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operatore
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualifica
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Assunzione
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato Documenti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOperatori.map((operatore) => {
                const documentiValidi = Object.values(operatore.documenti).filter(doc => 
                  doc.presente && getDocumentStatus(doc) === 'valido'
                ).length;
                const totaleDocumenti = Object.keys(operatore.documenti).length;
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {operatore.qualifica}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(operatore.dataAssunzione).toLocaleDateString('it-IT')}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        operatore.stato === 'attivo' ? 'bg-green-100 text-green-800' :
                        operatore.stato === 'sospeso' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {operatore.stato}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedOperator(operatore.id);
                          setViewMode('detail');
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Visualizza
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Modifica
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}