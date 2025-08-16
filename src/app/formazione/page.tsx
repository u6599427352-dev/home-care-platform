'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  AcademicCapIcon, 
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  BookOpenIcon,
  ChartBarIcon,
  TrophyIcon,
  UserGroupIcon,
  SparklesIcon,
  DocumentCheckIcon,
  EyeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Corso {
  id: number;
  titolo: string;
  descrizione: string;
  categoria: string;
  durata: number; // in minuti
  difficolta: 'Principiante' | 'Intermedio' | 'Avanzato';
  stato: 'disponibile' | 'in_corso' | 'completato';
  dataCreazione: string;
  ultimoAccesso?: string;
  progressoPercentuale: number;
  testDisponibile: boolean;
  punteggioUltimoTest?: number;
  certificatoOttenuto: boolean;
  valutazioneMedia: number;
  numeroPartecipanti: number;
  moduli: {
    id: number;
    titolo: string;
    completato: boolean;
    durata: number;
  }[];
}

interface Test {
  id: number;
  corsoId: number;
  titolo: string;
  domande: {
    id: number;
    domanda: string;
    opzioni: string[];
    rispostaCorretta: number;
    spiegazione: string;
  }[];
  durataMaxMinuti: number;
  punteggioMinimo: number;
  tentativiRimasti: number;
}

export default function Formazione() {
  const [selectedTab, setSelectedTab] = useState<'corsi' | 'test' | 'certificati' | 'crea'>('corsi');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);

  const corsi: Corso[] = [
    {
      id: 1,
      titolo: 'Gestione Farmaci Domiciliari',
      descrizione: 'Corso completo sulla gestione sicura dei farmaci presso il domicilio del paziente, includendo conservazione, somministrazione e monitoraggio effetti.',
      categoria: 'Farmacologia',
      durata: 120,
      difficolta: 'Intermedio',
      stato: 'completato',
      dataCreazione: '2024-01-15',
      ultimoAccesso: '2024-08-10',
      progressoPercentuale: 100,
      testDisponibile: true,
      punteggioUltimoTest: 95,
      certificatoOttenuto: true,
      valutazioneMedia: 4.8,
      numeroPartecipanti: 45,
      moduli: [
        { id: 1, titolo: 'Principi base farmacologia', completato: true, durata: 30 },
        { id: 2, titolo: 'Conservazione farmaci', completato: true, durata: 25 },
        { id: 3, titolo: 'Somministrazione sicura', completato: true, durata: 35 },
        { id: 4, titolo: 'Monitoraggio e documentazione', completato: true, durata: 30 }
      ]
    },
    {
      id: 2,
      titolo: 'Prevenzione Cadute negli Anziani',
      descrizione: 'Strategie evidence-based per la valutazione del rischio cadute e implementazione di interventi preventivi efficaci.',
      categoria: 'Sicurezza',
      durata: 90,
      difficolta: 'Principiante',
      stato: 'in_corso',
      dataCreazione: '2024-02-01',
      ultimoAccesso: '2024-08-15',
      progressoPercentuale: 60,
      testDisponibile: true,
      certificatoOttenuto: false,
      valutazioneMedia: 4.6,
      numeroPartecipanti: 38,
      moduli: [
        { id: 1, titolo: 'Fattori di rischio cadute', completato: true, durata: 20 },
        { id: 2, titolo: 'Valutazione clinica', completato: true, durata: 25 },
        { id: 3, titolo: 'Interventi preventivi', completato: false, durata: 25 },
        { id: 4, titolo: 'Educazione paziente e family', completato: false, durata: 20 }
      ]
    },
    {
      id: 3,
      titolo: 'Wound Care Avanzato',
      descrizione: 'Gestione avanzata delle lesioni cutanee: valutazione, trattamento e follow-up delle lesioni da pressione e ulcere croniche.',
      categoria: 'Clinica',
      durata: 180,
      difficolta: 'Avanzato',
      stato: 'disponibile',
      dataCreazione: '2024-03-01',
      progressoPercentuale: 0,
      testDisponibile: true,
      certificatoOttenuto: false,
      valutazioneMedia: 4.9,
      numeroPartecipanti: 28,
      moduli: [
        { id: 1, titolo: 'Fisiologia guarigione ferite', completato: false, durata: 45 },
        { id: 2, titolo: 'Classificazione lesioni', completato: false, durata: 40 },
        { id: 3, titolo: 'Medicazioni avanzate', completato: false, durata: 50 },
        { id: 4, titolo: 'Terapie innovative', completato: false, durata: 45 }
      ]
    },
    {
      id: 4,
      titolo: 'Comunicazione Terapeutica',
      descrizione: 'Sviluppo delle competenze di comunicazione efficace con pazienti, familiari e team interdisciplinare.',
      categoria: 'Relazionale',
      durata: 100,
      difficolta: 'Intermedio',
      stato: 'disponibile',
      dataCreazione: '2024-04-01',
      progressoPercentuale: 0,
      testDisponibile: true,
      certificatoOttenuto: false,
      valutazioneMedia: 4.7,
      numeroPartecipanti: 52,
      moduli: [
        { id: 1, titolo: 'Ascolto attivo', completato: false, durata: 25 },
        { id: 2, titolo: 'Comunicazione non verbale', completato: false, durata: 25 },
        { id: 3, titolo: 'Gestione conflitti', completato: false, durata: 25 },
        { id: 4, titolo: 'Comunicazione di cattive notizie', completato: false, durata: 25 }
      ]
    }
  ];

  const testEsempio: Test = {
    id: 1,
    corsoId: 1,
    titolo: 'Test Finale - Gestione Farmaci Domiciliari',
    durataMaxMinuti: 30,
    punteggioMinimo: 80,
    tentativiRimasti: 2,
    domande: [
      {
        id: 1,
        domanda: 'Qual è la temperatura ideale per la conservazione della maggior parte dei farmaci?',
        opzioni: ['0-5°C', '15-25°C', '25-30°C', '30-40°C'],
        rispostaCorretta: 1,
        spiegazione: 'La maggior parte dei farmaci deve essere conservata a temperatura ambiente (15-25°C) per mantenere la stabilità e l\'efficacia.'
      },
      {
        id: 2,
        domanda: 'Prima della somministrazione di un farmaco, quali controlli sono obbligatori?',
        opzioni: [
          'Solo il nome del paziente',
          'Nome paziente e dosaggio',
          'Nome paziente, farmaco, dosaggio, via e orario (5 giusti)',
          'Solo il nome del farmaco'
        ],
        rispostaCorretta: 2,
        spiegazione: 'I "5 giusti" sono fondamentali per la sicurezza: giusto paziente, giusto farmaco, giusto dosaggio, giusta via, giusto orario.'
      }
    ]
  };

  const categorie = ['Farmacologia', 'Sicurezza', 'Clinica', 'Relazionale', 'Tecnologia', 'Emergenze'];

  const AICourseGenerator = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <SparklesIcon className="w-6 h-6 text-purple-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-900">Genera Corso con AI</h3>
      </div>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Argomento del Corso
            </label>
            <input
              type="text"
              placeholder="es. Gestione del dolore cronico"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              {categorie.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Livello
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzato">Avanzato</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durata (minuti)
            </label>
            <input
              type="number"
              placeholder="90"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numero Moduli
            </label>
            <input
              type="number"
              placeholder="4"
              min="2"
              max="8"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Obiettivi di Apprendimento
          </label>
          <textarea
            rows={3}
            placeholder="Descrivi cosa i partecipanti dovranno essere in grado di fare al termine del corso..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-start">
            <SparklesIcon className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-purple-900">Funzionalità AI</h4>
              <p className="text-sm text-purple-700 mt-1">
                L'AI genererà automaticamente contenuti, quiz interattivi e test di valutazione personalizzati 
                basati sulle ultime evidenze scientifiche e best practices.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Anteprima
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
          >
            <SparklesIcon className="w-4 h-4 mr-2" />
            Genera Corso
          </button>
        </div>
      </form>
    </div>
  );

  const TestModal = ({ test }: { test: Test }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{test.titolo}</h3>
            <p className="text-sm text-gray-500">
              Tempo massimo: {test.durataMaxMinuti} minuti • Punteggio minimo: {test.punteggioMinimo}%
            </p>
          </div>
          <button
            onClick={() => setShowTestModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {test.domande.map((domanda, index) => (
            <div key={domanda.id} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                {index + 1}. {domanda.domanda}
              </h4>
              <div className="space-y-2">
                {domanda.opzioni.map((opzione, optIndex) => (
                  <label key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`domanda-${domanda.id}`}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-gray-700">{opzione}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Tentativi rimasti: {test.tentativiRimasti}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowTestModal(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Salva Bozza
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Invia Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Formazione</h1>
            <p className="mt-1 text-sm text-gray-500">
              Sistema di formazione continua con AI per test e certificazioni
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={() => setSelectedTab('crea')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Crea con AI
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Nuovo Corso
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'corsi', name: 'Corsi', icon: BookOpenIcon },
              { id: 'test', name: 'Test', icon: DocumentCheckIcon },
              { id: 'certificati', name: 'Certificati', icon: TrophyIcon },
              { id: 'crea', name: 'Genera con AI', icon: SparklesIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-lg p-3">
              <BookOpenIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Corsi Attivi</p>
              <p className="text-2xl font-semibold text-gray-900">{corsi.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-lg p-3">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Corsi Completati</p>
              <p className="text-2xl font-semibold text-gray-900">
                {corsi.filter(c => c.stato === 'completato').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-lg p-3">
              <TrophyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certificati Ottenuti</p>
              <p className="text-2xl font-semibold text-gray-900">
                {corsi.filter(c => c.certificatoOttenuto).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 rounded-lg p-3">
              <UserGroupIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Partecipazioni Totali</p>
              <p className="text-2xl font-semibold text-gray-900">
                {corsi.reduce((acc, c) => acc + c.numeroPartecipanti, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {selectedTab === 'corsi' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {corsi.map((corso) => (
              <div key={corso.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`rounded-lg p-2 mr-3 ${
                      corso.difficolta === 'Principiante' ? 'bg-green-100' :
                      corso.difficolta === 'Intermedio' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <AcademicCapIcon className={`w-6 h-6 ${
                        corso.difficolta === 'Principiante' ? 'text-green-600' :
                        corso.difficolta === 'Intermedio' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {corso.categoria}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    corso.stato === 'completato' ? 'bg-green-100 text-green-800' :
                    corso.stato === 'in_corso' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {corso.stato === 'completato' ? 'Completato' :
                     corso.stato === 'in_corso' ? 'In Corso' : 'Disponibile'}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-2">{corso.titolo}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{corso.descrizione}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progresso</span>
                    <span className="font-medium">{corso.progressoPercentuale}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${corso.progressoPercentuale}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {corso.durata} min
                  </div>
                  <div className="flex items-center">
                    <ChartBarIcon className="w-4 h-4 mr-2" />
                    {corso.difficolta}
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    {corso.numeroPartecipanti} partecipanti
                  </div>
                  <div className="flex items-center">
                    <TrophyIcon className="w-4 h-4 mr-2" />
                    ⭐ {corso.valutazioneMedia}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    {corso.testDisponibile && (
                      <button
                        onClick={() => {
                          setCurrentTest(testEsempio);
                          setShowTestModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <DocumentCheckIcon className="w-4 h-4 mr-1" />
                        Test
                      </button>
                    )}
                    {corso.certificatoOttenuto && (
                      <span className="text-green-600 text-sm flex items-center">
                        <TrophyIcon className="w-4 h-4 mr-1" />
                        Certificato
                      </span>
                    )}
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-sm">
                    {corso.stato === 'disponibile' ? (
                      <>
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Inizia
                      </>
                    ) : (
                      <>
                        <ArrowRightIcon className="w-4 h-4 mr-2" />
                        Continua
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'test' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Test Disponibili</h3>
            <div className="space-y-4">
              {corsi.filter(c => c.testDisponibile).map((corso) => (
                <div key={corso.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{corso.titolo}</h4>
                    <p className="text-sm text-gray-600">Test finale - 30 minuti</p>
                    {corso.punteggioUltimoTest && (
                      <p className="text-sm text-green-600">Ultimo punteggio: {corso.punteggioUltimoTest}%</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTest(testEsempio);
                      setShowTestModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Inizia Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'certificati' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Certificati Ottenuti</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corsi.filter(c => c.certificatoOttenuto).map((corso) => (
                <div key={corso.id} className="border-2 border-yellow-200 rounded-lg p-6 bg-gradient-to-br from-yellow-50 to-orange-50">
                  <div className="text-center">
                    <TrophyIcon className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-900 mb-2">{corso.titolo}</h4>
                    <p className="text-sm text-gray-600 mb-2">Punteggio: {corso.punteggioUltimoTest}%</p>
                    <p className="text-xs text-gray-500">Completato il {corso.ultimoAccesso}</p>
                    <button className="mt-4 w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center justify-center">
                      <EyeIcon className="w-4 h-4 mr-2" />
                      Visualizza Certificato
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'crea' && <AICourseGenerator />}
      </div>

      {/* Test Modal */}
      {showTestModal && currentTest && <TestModal test={currentTest} />}
    </div>
  );
}