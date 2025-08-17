'use client';

import { useState } from 'react';
import { useDiary } from '@/hooks/useDiary';
import { usePatients } from '@/hooks/usePatients';
import { 
  PlusIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function DiarioAssistenziale() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  
  const { entries: diaryEntries, loading: diaryLoading, error: diaryError, addEntry: addDiaryEntry, updateEntry: updateDiaryEntry } = useDiary();
  const { patients, loading: patientsLoading, error: patientsError } = usePatients();

  const loading = diaryLoading || patientsLoading;
  const error = diaryError || patientsError;

  const filteredEntries = diaryEntries.filter(entry => {
    const patientMatch = patients.find(p => p.id === entry.patient_id);
    const patientName = patientMatch ? `${patientMatch.nome} ${patientMatch.cognome}` : '';
    
    const matchesPatient = !selectedPatient || patientName.toLowerCase().includes(selectedPatient.toLowerCase());
    const matchesDate = !selectedDate || entry.data === selectedDate;
    return matchesPatient && matchesDate;
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

  const NewEntryForm = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Nuova Registrazione Diario</h3>
        <button
          onClick={() => setShowNewEntry(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Paziente
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Seleziona paziente</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>{patient.nome} {patient.cognome}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data e Ora
            </label>
            <div className="flex space-x-2">
              <input
                type="date"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              <input
                type="time"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toTimeString().slice(0,5)}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operatori
          </label>
          <input
            type="text"
            placeholder="Inserisci nomi degli operatori separati da virgola"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prestazioni Svolte
          </label>
          <textarea
            rows={3}
            placeholder="Descrivi le prestazioni svolte..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note e Osservazioni
          </label>
          <textarea
            rows={4}
            placeholder="Inserisci note dettagliate sull'intervento..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firma Operatore
            </label>
            <input
              type="text"
              placeholder="Nome e qualifica operatore"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Firma Caregiver/Paziente
            </label>
            <input
              type="text"
              placeholder="Nome caregiver o paziente"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setShowNewEntry(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Annulla
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salva Registrazione
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Diario Assistenziale</h1>
            <p className="mt-1 text-sm text-gray-500">
              Registrazione degli accessi e interventi presso il domicilio del paziente
            </p>
          </div>
          <button
            onClick={() => setShowNewEntry(true)}
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Nuova Registrazione
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtra per Paziente
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca paziente..."
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtra per Data
            </label>
            <div className="relative">
              <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedPatient('');
                setSelectedDate('');
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Azzera Filtri
            </button>
          </div>
        </div>
      </div>

      {/* New Entry Form */}
      {showNewEntry && <NewEntryForm />}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Registrazioni Oggi</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredEntries.filter(e => e.data === new Date().toISOString().split('T')[0]).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completate</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredEntries.filter(e => e.status === 'completato').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Attesa Firma</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredEntries.filter(e => e.status === 'in_attesa_firma').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <UserIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pazienti Visitati</p>
              <p className="text-2xl font-semibold text-gray-900">{new Set(filteredEntries.map(e => e.patient_id)).size}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diary Entries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Registrazioni Diario</h2>
          <p className="text-sm text-gray-500">
            Trovate {filteredEntries.length} registrazioni
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna registrazione trovata</h3>
              <p className="text-gray-500 mb-4">
                Non ci sono registrazioni diario che corrispondono ai filtri selezionati.
              </p>
              <button
                onClick={() => setShowNewEntry(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Nuova Registrazione
              </button>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const patientMatch = patients.find(p => p.id === entry.patient_id);
              const patientName = patientMatch ? `${patientMatch.nome} ${patientMatch.cognome}` : 'Paziente non trovato';
              
              return (
                <div key={entry.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <h3 className="text-lg font-medium text-gray-900">{patientName}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            entry.status === 'completato' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {entry.status === 'completato' ? 'Completato' : 'In attesa firma'}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarDaysIcon className="w-4 h-4 mr-1" />
                          {new Date(entry.data).toLocaleDateString('it-IT')}
                          <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                          {entry.ora}
                        </div>
                      </div>

                      {/* Operatori */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">Operatori:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {entry.operatori?.map((operatore, index) => (
                            <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {operatore}
                            </span>
                          )) || <span className="text-sm text-gray-500">Nessun operatore assegnato</span>}
                        </div>
                      </div>

                      {/* Prestazioni */}
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">Prestazioni svolte:</p>
                        <ul className="mt-1 space-y-1">
                          {entry.prestazioni?.map((prestazione, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {prestazione}
                            </li>
                          )) || <li className="text-sm text-gray-500">Nessuna prestazione registrata</li>}
                        </ul>
                      </div>

                  {/* Note */}
                  {entry.note && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700">Note:</p>
                      <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {entry.note}
                      </p>
                    </div>
                  )}

                  {/* Firme */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs font-medium text-gray-500">FIRMA OPERATORE</p>
                      <p className="text-sm text-gray-900">{entry.firma_operatore || 'Non firmato'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">FIRMA CAREGIVER/PAZIENTE</p>
                      <p className={`text-sm ${
                        !entry.firma_caregiver 
                          ? 'text-yellow-600 italic' 
                          : 'text-gray-900'
                      }`}>
                        {entry.firma_caregiver || 'In attesa firma'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-4 flex flex-col space-y-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Modifica
                  </button>
                  <button className="text-green-600 hover:text-green-800 text-sm flex items-center">
                    <DocumentTextIcon className="w-4 h-4 mr-1" />
                    Stampa
                  </button>
                </div>
              </div>
            </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}