'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  UserIcon, 
  PhoneIcon, 
  CalendarIcon, 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function FascicoloDomiciliare() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const patients = [
    {
      id: 1,
      nome: 'Mario',
      cognome: 'Rossi',
      codiceFiscale: 'RSSMRA80A01H501Z',
      dataNascita: '1980-01-01',
      telefono: '+39 333 1234567',
      indirizzo: 'Via Roma 123, Milano',
      caregiver: 'Anna Rossi',
      caregiverTelefono: '+39 333 7654321',
      dataInizio: '2024-01-15',
      operatoriRiferimento: ['Dott.ssa Bianchi', 'Inf. Neri'],
      diagnosi: 'Diabete mellito tipo 2, Ipertensione arteriosa',
      elementiRischio: ['Allergia penicillina', 'Rischio cadute'],
      consensoInformato: true,
      status: 'attivo'
    },
    {
      id: 2,
      nome: 'Anna',
      cognome: 'Verdi',
      codiceFiscale: 'VRDNNA75B15F205X',
      dataNascita: '1975-02-15',
      telefono: '+39 334 2345678',
      indirizzo: 'Via Garibaldi 45, Roma',
      caregiver: 'Marco Verdi',
      caregiverTelefono: '+39 334 8765432',
      dataInizio: '2024-02-01',
      operatoriRiferimento: ['Dott. Ferrari', 'OSS Costa'],
      diagnosi: 'BPCO, Insufficienza cardiaca',
      elementiRischio: ['Allergia iodio', 'Disfagia'],
      consensoInformato: true,
      status: 'attivo'
    },
    {
      id: 3,
      nome: 'Giuseppe',
      cognome: 'Blu',
      codiceFiscale: 'BLUGPP70C20L736Y',
      dataNascita: '1970-03-20',
      telefono: '+39 335 3456789',
      indirizzo: 'Via Mazzini 78, Napoli',
      caregiver: 'Elena Blu',
      caregiverTelefono: '+39 335 9876543',
      dataInizio: '2024-01-10',
      operatoriRiferimento: ['Dott.ssa Gialli', 'Fis. Viola'],
      diagnosi: 'Ictus cerebrale, Emiparesi destra',
      elementiRischio: ['Rischio cadute', 'Disfagia'],
      consensoInformato: true,
      status: 'attivo'
    }
  ];

  const valutazioni = {
    barthel: { punteggio: 85, data: '2024-08-01', operatore: 'Dott.ssa Bianchi' },
    iadl: { punteggio: 6, data: '2024-08-01', operatore: 'Inf. Neri' },
    spmsq: { punteggio: 9, data: '2024-08-01', operatore: 'Dott.ssa Bianchi' },
    adico: { punteggio: 'Lieve', data: '2024-08-01', operatore: 'Psi. Rosa' },
    dmi: { punteggio: 3, data: '2024-08-01', operatore: 'Dott.ssa Bianchi' }
  };

  const prestazioni = [
    { data: '2024-08-15', tipo: 'Controllo glicemia', operatore: 'Inf. Neri', note: 'Valori nella norma' },
    { data: '2024-08-14', tipo: 'Somministrazione insulina', operatore: 'OSS Ferrari', note: 'Somministrazione regolare' },
    { data: '2024-08-13', tipo: 'Controllo pressione', operatore: 'Inf. Neri', note: 'PA: 140/85 mmHg' },
    { data: '2024-08-12', tipo: 'Medicazione ulcera', operatore: 'Inf. Bianchi', note: 'Miglioramento evidente' }
  ];

  if (viewMode === 'detail' && selectedPatient) {
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return null;

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
                  Fascicolo: {patient.nome} {patient.cognome}
                </h1>
                <p className="text-sm text-gray-500">CF: {patient.codiceFiscale}</p>
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
                <p className="text-gray-900">{patient.nome} {patient.cognome}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Codice Fiscale</label>
                <p className="text-gray-900">{patient.codiceFiscale}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data di Nascita</label>
                <p className="text-gray-900">{new Date(patient.dataNascita).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Telefono</label>
                <p className="text-gray-900">{patient.telefono}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Indirizzo</label>
                <p className="text-gray-900">{patient.indirizzo}</p>
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
                <p className="text-gray-900">{patient.caregiver}</p>
                <p className="text-sm text-gray-600">{patient.caregiverTelefono}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Data Inizio Cure</label>
                <p className="text-gray-900">{new Date(patient.dataInizio).toLocaleDateString('it-IT')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Operatori di Riferimento</label>
                <div className="space-y-1">
                  {patient.operatoriRiferimento.map((op, index) => (
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
                <p className="text-gray-900">{patient.diagnosi}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Elementi di Rischio</label>
                <div className="space-y-1">
                  {patient.elementiRischio.map((rischio, index) => (
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
                  <span className="text-green-700">Firmato</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Valutazioni */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Strumenti di Valutazione
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Indice di Barthel</h4>
              <p className="text-2xl font-bold text-blue-700">{valutazioni.barthel.punteggio}</p>
              <p className="text-xs text-blue-600">Data: {valutazioni.barthel.data}</p>
              <p className="text-xs text-blue-600">Operatore: {valutazioni.barthel.operatore}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">I.A.D.L.</h4>
              <p className="text-2xl font-bold text-green-700">{valutazioni.iadl.punteggio}</p>
              <p className="text-xs text-green-600">Data: {valutazioni.iadl.data}</p>
              <p className="text-xs text-green-600">Operatore: {valutazioni.iadl.operatore}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">SPMSQ</h4>
              <p className="text-2xl font-bold text-purple-700">{valutazioni.spmsq.punteggio}</p>
              <p className="text-xs text-purple-600">Data: {valutazioni.spmsq.data}</p>
              <p className="text-xs text-purple-600">Operatore: {valutazioni.spmsq.operatore}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900">A.Di.Co.</h4>
              <p className="text-2xl font-bold text-yellow-700">{valutazioni.adico.punteggio}</p>
              <p className="text-xs text-yellow-600">Data: {valutazioni.adico.data}</p>
              <p className="text-xs text-yellow-600">Operatore: {valutazioni.adico.operatore}</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900">D.M.I.</h4>
              <p className="text-2xl font-bold text-red-700">{valutazioni.dmi.punteggio}</p>
              <p className="text-xs text-red-600">Data: {valutazioni.dmi.data}</p>
              <p className="text-xs text-red-600">Operatore: {valutazioni.dmi.operatore}</p>
            </div>
          </div>
        </div>

        {/* Prestazioni Recenti */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
            Prestazioni Erogate (Ultime)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo Prestazione
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operatore
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {prestazioni.map((prestazione, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(prestazione.data).toLocaleDateString('it-IT')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prestazione.tipo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {prestazione.operatore}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {prestazione.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <input
              type="text"
              placeholder="Cerca per nome, cognome o codice fiscale..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Tutti gli stati</option>
              <option value="attivo">Attivo</option>
              <option value="sospeso">Sospeso</option>
              <option value="chiuso">Chiuso</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Elenco Pazienti</h2>
          <p className="text-sm text-gray-500">Totale: {patients.length} pazienti</p>
        </div>
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
              {patients.map((patient) => (
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
                    {patient.codiceFiscale}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.caregiver}</div>
                    <div className="text-sm text-gray-500">{patient.caregiverTelefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(patient.dataInizio).toLocaleDateString('it-IT')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.status === 'attivo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
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
      </div>
    </div>
  );
}