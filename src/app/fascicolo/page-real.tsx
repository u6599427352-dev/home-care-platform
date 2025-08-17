'use client';

import { useState } from 'react';
import { usePatients } from '@/hooks/usePatients';
import { 
  PlusIcon, 
  UserIcon, 
  PhoneIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function FascicoloDomiciliareReal() {
  const { patients, loading, error, addPatient } = usePatients();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = !searchTerm || 
      patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.codice_fiscale.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filterStatus || patient.stato === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

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

  const selectedPatientData = patients.find(p => p.id === selectedPatient);

  if (viewMode === 'detail' && selectedPatientData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {setViewMode('list'); setSelectedPatient(null);}}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                ← Torna all'elenco
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Fascicolo: {selectedPatientData.nome} {selectedPatientData.cognome}
                </h1>
                <p className="text-sm text-gray-500">CF: {selectedPatientData.codice_fiscale}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Modifica
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Stampa
              </button>
            </div>
          </div>
        </div>

        {/* Patient Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dati Anagrafici */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2" />
              Dati Anagrafici
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Nome e Cognome</label>
                <p className="text-gray-900">{selectedPatientData.nome} {selectedPatientData.cognome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Codice Fiscale</label>
                <p className="text-gray-900">{selectedPatientData.codice_fiscale}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data di Nascita</label>
                <p className="text-gray-900">{new Date(selectedPatientData.data_nascita).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Telefono</label>
                <p className="text-gray-900">{selectedPatientData.telefono}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Indirizzo</label>
                <p className="text-gray-900">{selectedPatientData.indirizzo}</p>
              </div>
            </div>
          </div>

          {/* Caregiver e Operatori */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <PhoneIcon className="w-5 h-5 mr-2" />
              Caregiver e Operatori
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Caregiver</label>
                <p className="text-gray-900">{selectedPatientData.caregiver}</p>
                <p className="text-sm text-gray-600">{selectedPatientData.caregiver_telefono}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Inizio Cure</label>
                <p className="text-gray-900">{new Date(selectedPatientData.data_inizio).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Operatori di Riferimento</label>
                <div className="space-y-1">
                  {selectedPatientData.operatori_riferimento.map((op, index) => (
                    <p key={index} className="text-gray-900 text-sm">{op}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Diagnosi e Rischi */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
              Diagnosi e Rischi
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Diagnosi Principale</label>
                <p className="text-gray-900">{selectedPatientData.diagnosi}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Elementi di Rischio</label>
                <div className="space-y-1">
                  {selectedPatientData.elementi_rischio.map((rischio, index) => (
                    <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
                      {rischio}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Consenso Informato</label>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                  <span className={selectedPatientData.consenso_informato ? "text-green-700" : "text-red-700"}>
                    {selectedPatientData.consenso_informato ? 'Firmato' : 'Non firmato'}
                  </span>
                </div>
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
            <h1 className="text-2xl font-bold text-gray-900">Fascicolo Domiciliare</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gestione dei fascicoli sanitari domiciliari per ogni persona assistita
            </p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuovo Fascicolo
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca per nome, cognome o codice fiscale..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tutti gli stati</option>
              <option value="attivo">Attivo</option>
              <option value="sospeso">Sospeso</option>
              <option value="dimesso">Dimesso</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Elenco Pazienti</h2>
          <p className="text-sm text-gray-500">Totale: {filteredPatients.length} pazienti</p>
        </div>
        
        {filteredPatients.length === 0 ? (
          <div className="p-12 text-center">
            <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun paziente trovato</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus 
                ? 'Nessun paziente corrisponde ai criteri di ricerca.'
                : 'Non ci sono pazienti nel sistema.'
              }
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center">
              <PlusIcon className="w-4 h-4 mr-2" />
              Aggiungi Primo Paziente
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paziente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Codice Fiscale
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caregiver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Inizio
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
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {patient.nome} {patient.cognome}
                          </div>
                          <div className="text-sm text-gray-500">{patient.telefono}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.codice_fiscale}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.caregiver}</div>
                      <div className="text-sm text-gray-500">{patient.caregiver_telefono}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(patient.data_inizio).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.stato === 'attivo' 
                          ? 'bg-green-100 text-green-800' 
                          : patient.stato === 'sospeso'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.stato}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedPatient(patient.id);
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}