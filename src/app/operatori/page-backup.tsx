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
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';


export default function Operatori() {
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [filterQualifica, setFilterQualifica] = useState('');
  const [filterStato, setFilterStato] = useState('');

  // OPERATORI REALI dall'organigramma
  const operators = [
    { id: '1', nome: 'Cecilia', cognome: 'Matta', qualifica: 'Direttore', email: 'c.matta@curedomiciliari.it', telefono: '+39 010 1234567', data_assunzione: '2020-01-15', stato: 'attivo' },
    { id: '2', nome: 'Federica', cognome: 'Pastorino', qualifica: 'Vice-Direttore', email: 'f.pastorino@curedomiciliari.it', telefono: '+39 010 1234568', data_assunzione: '2020-02-01', stato: 'attivo' },
    { id: '3', nome: 'Lorenzo', cognome: 'Grecu', qualifica: 'Direttore Sanitario', email: 'l.grecu@curedomiciliari.it', telefono: '+39 010 1234569', data_assunzione: '2020-03-01', stato: 'attivo' },
    { id: '4', nome: 'Nadia', cognome: 'Vuovolo', qualifica: 'Segreteria', email: 'n.vuovolo@curedomiciliari.it', telefono: '+39 010 1234581', data_assunzione: '2020-05-01', stato: 'attivo' },
    { id: '5', nome: 'Matteo', cognome: 'Vannucci', qualifica: 'Responsabile Formazione', email: 'm.vannucci@curedomiciliari.it', telefono: '+39 010 1234582', data_assunzione: '2022-01-01', stato: 'attivo' },
    { id: '6', nome: 'Andrea', cognome: 'Corradini', qualifica: 'Fisioterapista', email: 'a.corradini@curedomiciliari.it', telefono: '+39 010 1234574', data_assunzione: '2021-06-01', stato: 'attivo' },
    { id: '7', nome: 'Emanuele', cognome: 'Pisoni', qualifica: 'Fisioterapista', email: 'e.pisoni@curedomiciliari.it', telefono: '+39 010 1234575', data_assunzione: '2021-07-01', stato: 'attivo' },
    { id: '8', nome: 'Pasquale', cognome: 'Milena', qualifica: 'Coordinatore Infermieristico', email: 'p.milena@curedomiciliari.it', telefono: '+39 010 1234570', data_assunzione: '2020-04-01', stato: 'attivo' },
    { id: '9', nome: 'Cristina', cognome: 'Bovone', qualifica: 'Case Manager', email: 'c.bovone@curedomiciliari.it', telefono: '+39 010 1234571', data_assunzione: '2021-01-15', stato: 'attivo' },
    { id: '10', nome: 'Ghita', cognome: 'Dumitra', qualifica: 'Infermiere', email: 'g.dumitra@curedomiciliari.it', telefono: '+39 010 1234572', data_assunzione: '2021-03-01', stato: 'attivo' },
    { id: '11', nome: 'Sasu', cognome: 'Roxana', qualifica: 'Infermiere', email: 's.roxana@curedomiciliari.it', telefono: '+39 010 1234573', data_assunzione: '2021-05-01', stato: 'attivo' },
    { id: '12', nome: 'Lucia', cognome: 'Ferrarotti', qualifica: 'OSS', email: 'l.ferrarotti@curedomiciliari.it', telefono: '+39 010 1234576', data_assunzione: '2021-08-01', stato: 'attivo' },
    { id: '13', nome: 'Anna', cognome: 'Conzatti', qualifica: 'OSS', email: 'a.conzatti@curedomiciliari.it', telefono: '+39 010 1234577', data_assunzione: '2021-09-01', stato: 'attivo' },
    { id: '14', nome: 'Sabrina', cognome: 'Tononi', qualifica: 'OSS', email: 's.tononi@curedomiciliari.it', telefono: '+39 010 1234578', data_assunzione: '2021-10-01', stato: 'attivo' },
    { id: '15', nome: 'Anna Tiziana', cognome: 'Romano', qualifica: 'OSS', email: 'a.romano@curedomiciliari.it', telefono: '+39 010 1234579', data_assunzione: '2021-11-01', stato: 'attivo' },
    { id: '16', nome: 'Eugenia', cognome: 'Marella', qualifica: 'OSS', email: 'e.marella@curedomiciliari.it', telefono: '+39 010 1234580', data_assunzione: '2021-12-01', stato: 'attivo' }
  ];

  const qualifiche = ['Direttore', 'Vice-Direttore', 'Direttore Sanitario', 'Segreteria', 'Responsabile Formazione', 'Fisioterapista', 'Coordinatore Infermieristico', 'Case Manager', 'Infermiere', 'OSS'];
  const stati = ['attivo', 'sospeso', 'inattivo'];

  const filteredOperatori = operators.filter(op => {
    const matchesQualifica = !filterQualifica || op.qualifica === filterQualifica;
    const matchesStato = !filterStato || op.stato === filterStato;
    return matchesQualifica && matchesStato;
  });



  if (viewMode === 'detail' && selectedOperator) {
    const operatore = operators.find(op => op.id === selectedOperator);
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
                <p className="text-sm text-gray-500">{operatore.qualifica}</p>
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
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{operatore.email || 'Non disponibile'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Telefono</label>
                <p className="text-gray-900">{operatore.telefono || 'Non disponibile'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Qualifica</label>
                <p className="text-gray-900">{operatore.qualifica}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Assunzione</label>
                <p className="text-gray-900">{operatore.data_assunzione ? new Date(operatore.data_assunzione).toLocaleDateString('it-IT') : 'Non disponibile'}</p>
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
                  <p className="text-gray-900">Via Roma 1, Genova</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informazioni Aggiuntive */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              Informazioni Aggiuntive
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Qualifica</label>
                <p className="text-gray-900">{operatore.qualifica}</p>
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
        </div>

        {/* Documentazione Dettagliata */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            Documentazione
          </h3>
          <p className="text-gray-600">Sistema di gestione documentazione in sviluppo.</p>
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
              <p className="text-2xl font-semibold text-gray-900">{filteredOperatori.filter(op => op.stato === 'attivo').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ruoli Diversi</p>
              <p className="text-2xl font-semibold text-gray-900">
                {new Set(filteredOperatori.map(op => op.qualifica)).size}
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
              <p className="text-sm font-medium text-gray-600">Totale Operatori</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredOperatori.length}
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
              <p className="text-sm font-medium text-gray-600">Operatori Sospesi</p>
              <p className="text-2xl font-semibold text-gray-900">
                {filteredOperatori.filter(op => op.stato === 'sospeso' || op.stato === 'inattivo').length}
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
                  Specializzazione
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
                      {new Date(operatore.data_assunzione).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">{operatore.email}</span>
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