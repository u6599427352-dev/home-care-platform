import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  UsersIcon, 
  ClipboardDocumentListIcon, 
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const stats = [
    { 
      name: 'Pazienti Attivi', 
      value: '127', 
      icon: UsersIcon, 
      color: 'bg-blue-500',
      description: 'Pazienti in carico'
    },
    { 
      name: 'Interventi Oggi', 
      value: '34', 
      icon: ClipboardDocumentListIcon, 
      color: 'bg-green-500',
      description: 'Visite programmate'
    },
    { 
      name: 'Operatori Attivi', 
      value: '23', 
      icon: UsersIcon, 
      color: 'bg-purple-500',
      description: 'Operatori in servizio'
    },
    { 
      name: 'Alert Aperti', 
      value: '8', 
      icon: ExclamationTriangleIcon, 
      color: 'bg-red-500',
      description: 'Situazioni da monitorare'
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'Visita domiciliare',
      patient: 'Mario Rossi',
      operator: 'Dott.ssa Bianchi',
      time: '09:30',
      status: 'completata'
    },
    {
      id: 2,
      type: 'Controllo parametri',
      patient: 'Anna Verdi',
      operator: 'Inf. Neri',
      time: '10:15',
      status: 'in corso'
    },
    {
      id: 3,
      type: 'Somministrazione farmaci',
      patient: 'Giuseppe Blu',
      operator: 'OSS Ferrari',
      time: '11:00',
      status: 'programmata'
    },
    {
      id: 4,
      type: 'Fisioterapia',
      patient: 'Maria Gialli',
      operator: 'Fis. Costa',
      time: '14:30',
      status: 'programmata'
    },
  ];

  const alerts = [
    {
      id: 1,
      type: 'Parametri anomali',
      patient: 'Carlo Viola',
      description: 'Pressione arteriosa elevata (180/95)',
      priority: 'alta',
      time: '08:45'
    },
    {
      id: 2,
      type: 'Mancata visita',
      patient: 'Elena Rosa',
      description: 'Paziente non presente al domicilio',
      priority: 'media',
      time: '09:20'
    },
    {
      id: 3,
      type: 'Richiesta urgente',
      patient: 'Franco Azzurri',
      description: 'Familiare richiede visita non programmata',
      priority: 'alta',
      time: '10:10'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Panoramica generale delle attività di cure domiciliari
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString('it-IT', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Attività Recenti</h2>
            <p className="text-sm text-gray-500">Ultime visite e interventi</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{activity.type}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'completata' ? 'bg-green-100 text-green-800' :
                        activity.status === 'in corso' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">{activity.patient}</span> - {activity.operator}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Alert e Notifiche</h2>
            <p className="text-sm text-gray-500">Situazioni che richiedono attenzione</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-red-800">{alert.type}</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          alert.priority === 'alta' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {alert.priority}
                        </span>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm font-medium text-gray-900">{alert.patient}</p>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Azioni Rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <UsersIcon className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Nuovo Paziente</h3>
            <p className="text-sm text-gray-500">Aggiungi un nuovo paziente</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <ClipboardDocumentListIcon className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Nuova Visita</h3>
            <p className="text-sm text-gray-500">Programma una visita</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <CheckCircleIcon className="w-8 h-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Completa Diario</h3>
            <p className="text-sm text-gray-500">Registra intervento</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-600 mb-2" />
            <h3 className="font-medium text-gray-900">Segnala Evento</h3>
            <p className="text-sm text-gray-500">Gestisci emergenza</p>
          </button>
        </div>
      </div>
    </div>
  );
}
