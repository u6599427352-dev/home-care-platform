'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  ClockIcon, 
  UserIcon, 
  CheckCircleIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function DiarioAssistenziale() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showNewEntry, setShowNewEntry] = useState(false);

  const patients = [
    { id: 1, nome: 'Mario Rossi', indirizzo: 'Via Roma 123, Milano' },
    { id: 2, nome: 'Anna Verdi', indirizzo: 'Via Garibaldi 45, Roma' },
    { id: 3, nome: 'Giuseppe Blu', indirizzo: 'Via Mazzini 78, Napoli' },
    { id: 4, nome: 'Maria Gialli', indirizzo: 'Via Dante 90, Torino' }
  ];

  const diaryEntries = [
    {
      id: 1,
      paziente: 'Mario Rossi',
      data: '2024-08-16',
      ora: '09:30',
      operatori: ['Dott.ssa Bianchi', 'Inf. Neri'],
      prestazioni: [
        'Controllo parametri vitali',
        'Somministrazione insulina',
        'Controllo glicemia'
      ],
      note: 'Paziente in buone condizioni generali. Glicemia 120 mg/dl. Pressione 140/85 mmHg. Paziente collaborativo.',
      firma: 'Dott.ssa M. Bianchi',
      firmaCaregiver: 'Anna Rossi (moglie)',
      status: 'completato'
    },
    {
      id: 2,
      paziente: 'Anna Verdi',
      data: '2024-08-16',
      ora: '10:15',
      operatori: ['Inf. Costa'],
      prestazioni: [
        'Medicazione ulcera gamba destra',
        'Controllo saturazione ossigeno',
        'Fisioterapia respiratoria'
      ],
      note: 'Ulcera in miglioramento, riduzione dell\'essudato. Saturazione 95%. Eseguiti esercizi respiratori.',
      firma: 'Inf. L. Costa',
      firmaCaregiver: 'Marco Verdi (figlio)',
      status: 'completato'
    },
    {
      id: 3,
      paziente: 'Giuseppe Blu',
      data: '2024-08-16',
      ora: '11:00',
      operatori: ['Fis. Viola', 'OSS Ferrari'],
      prestazioni: [
        'Fisioterapia motoria arto superiore destro',
        'Mobilizzazione passiva',
        'Addestramento al cammino'
      ],
      note: 'Buona collaborazione del paziente. Miglioramento della forza muscolare arto superiore. Deambulazione assistita per 10 metri.',
      firma: 'Fis. G. Viola',
      firmaCaregiver: 'Elena Blu (moglie)',
      status: 'completato'
    },
    {
      id: 4,
      paziente: 'Mario Rossi',
      data: '2024-08-16',
      ora: '14:30',
      operatori: ['OSS Ferrari'],
      prestazioni: [
        'Igiene personale',
        'Controllo lesione tallone sinistro',
        'Somministrazione farmaci serali'
      ],
      note: 'Igiene completata. Lesione tallone in via di guarigione. Farmaci somministrati regolarmente.',
      firma: 'OSS M. Ferrari',
      firmaCaregiver: 'In attesa firma caregiver',
      status: 'in_attesa_firma'
    }
  ];

  const filteredEntries = diaryEntries.filter(entry => {
    const matchesPatient = !selectedPatient || entry.paziente.includes(selectedPatient);
    const matchesDate = !selectedDate || entry.data === selectedDate;
    return matchesPatient && matchesDate;
  });

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
                <option key={patient.id} value={patient.nome}>{patient.nome}</option>
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
              <p className="text-2xl font-semibold text-gray-900">{new Set(filteredEntries.map(e => e.paziente)).size}</p>
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
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-lg font-medium text-gray-900">{entry.paziente}</h3>
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
                      {entry.operatori.map((operatore, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {operatore}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prestazioni */}
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700">Prestazioni svolte:</p>
                    <ul className="mt-1 space-y-1">
                      {entry.prestazioni.map((prestazione, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {prestazione}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Note */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700">Note:</p>
                    <p className="mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {entry.note}
                    </p>
                  </div>

                  {/* Firme */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs font-medium text-gray-500">FIRMA OPERATORE</p>
                      <p className="text-sm text-gray-900">{entry.firma}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">FIRMA CAREGIVER/PAZIENTE</p>
                      <p className={`text-sm ${
                        entry.firmaCaregiver.includes('In attesa') 
                          ? 'text-yellow-600 italic' 
                          : 'text-gray-900'
                      }`}>
                        {entry.firmaCaregiver}
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
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="p-12 text-center">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna registrazione trovata</h3>
            <p className="text-gray-500 mb-4">
              Non ci sono registrazioni per i criteri di ricerca selezionati.
            </p>
            <button
              onClick={() => setShowNewEntry(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Aggiungi Prima Registrazione
            </button>
          </div>
        )}
      </div>
    </div>
  );
}