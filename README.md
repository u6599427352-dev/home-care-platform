# 🏥 HomeCare Platform - Piattaforma Cure Domiciliari

Una piattaforma avanzata basata sulla context engineering per la gestione delle cure domiciliari, sviluppata con le ultime tecnologie web.

## 🌟 Caratteristiche Principali

### 📊 Dashboard Intelligente
- **Panoramica in tempo reale** delle attività di cura
- **Statistiche avanzate** sui pazienti attivi, interventi e operatori
- **Alert e notifiche** per situazioni critiche
- **Azioni rapide** per operazioni frequenti

### 📋 Fascicolo Domiciliare Digitale
- **Gestione completa** dei dati pazienti secondo normative sanitarie
- **Dati anagrafici** e informazioni caregiver
- **Strumenti di valutazione standardizzati**:
  - Indice di Barthel (ADL)
  - I.A.D.L. (Attività Strumentali)
  - Short Portable Mental Status Questionnaire
  - A.Di.Co. (Disturbi Comportamentali)
  - D.M.I. (Indice Medico Non Autosufficienza)
- **Storico prestazioni** e piani di trattamento

### 📝 Diario Assistenziale
- **Registrazione interventi** con data, ora e operatori
- **Prestazioni svolte** dettagliate
- **Sistema di firme digitali** operatori e caregiver
- **Ricerca e filtri avanzati** per periodo e paziente

### 👥 Gestione Operatori
- **Fascicoli personale completi** secondo normative
- **Documentazione obbligatoria**:
  - Curriculum formativo aggiornato
  - Attestazioni formazione continua
  - Idoneità psico-fisica
  - Formazione sicurezza lavoro
  - Certificazione BLSD
  - Formazione procedure interne
  - Patenti di guida
- **Monitoraggio scadenze** automatico
- **Dashboard compliance** documenti

### 📚 Documentazione Digitale
- **Upload e gestione PDF** procedure e linee guida
- **Categorizzazione automatica** per tipo e argomento
- **Sistema di versioning** documenti
- **Ricerca full-text** e filtri avanzati
- **Controllo accessi** basato su ruoli

### 🎓 Formazione con AI
- **Generazione automatica corsi** tramite intelligenza artificiale
- **Test di valutazione personalizzati** creati da AI
- **Sistema di certificazioni** digitali
- **Tracciamento progressi** e competenze
- **Analytics formazione** avanzate

### ⚠️ Risk Management
- **Segnalazione eventi avversi** in tempo reale
- **Classificazione automatica** gravità e tipo
- **Indicatori di sicurezza** KPI personalizzati
- **Piani di azione** correttivi
- **Dashboard analitiche** per trend e prevenzione

## 🛠️ Stack Tecnologico

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Type safety e developer experience
- **Tailwind CSS** - Styling utility-first
- **Heroicons** - Iconografia professionale
- **Headless UI** - Componenti accessibili

### Backend & Database
- **Prisma ORM** - Database modeling e migrations
- **PostgreSQL** - Database relazionale robusto
- **NextAuth.js** - Sistema di autenticazione

### AI & Integrations
- **OpenAI API** - Generazione contenuti formativi
- **React Hook Form** - Gestione form avanzata
- **Zod** - Validazione schema
- **Date-fns** - Manipolazione date
- **Recharts** - Grafici e analytics

## 🚀 Setup e Installazione

### Prerequisiti
- Node.js 18+ 
- npm o yarn
- PostgreSQL database

### Installazione

1. **Clone del repository**
```bash
git clone <repository-url>
cd home-care-platform
```

2. **Installazione dipendenze**
```bash
npm install
```

3. **Avvio sviluppo**
```bash
npm run dev
```

4. **Apri il browser**
```
http://localhost:3000
```

## 📁 Struttura Progetto

```
home-care-platform/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── dashboard/          # Dashboard principale
│   │   ├── fascicolo/          # Fascicoli domiciliari
│   │   ├── diario/             # Diario assistenziale
│   │   ├── operatori/          # Gestione operatori
│   │   ├── documentazione/     # Gestione documenti
│   │   ├── formazione/         # Sistema formazione
│   │   └── risk-management/    # Risk management
│   ├── components/             # Componenti riutilizzabili
│   │   ├── layout/             # Layout componenti
│   │   ├── forms/              # Form componenti
│   │   └── ui/                 # UI base componenti
│   └── types/                  # TypeScript definitions
├── public/                     # Asset statici
└── docs/                       # Documentazione
```

## 🎯 Funzionalità Implementate

### ✅ Completate
- [x] Dashboard con statistiche e alert
- [x] Fascicolo Domiciliare completo
- [x] Diario Assistenziale con firme
- [x] Gestione Operatori e documenti
- [x] Sistema Documentazione PDF
- [x] Formazione con AI e certificazioni
- [x] Risk Management dashboard
- [x] Layout responsivo mobile-first
- [x] Navigazione sidebar collassabile
- [x] Sistema di filtri avanzati

### 🔄 In Sviluppo
- [ ] Autenticazione e autorizzazione
- [ ] Database integration con Prisma
- [ ] API REST complete
- [ ] Sistema notifiche real-time
- [ ] Export PDF e stampe
- [ ] Backup automatico dati

## 📱 Mobile Responsiveness

La piattaforma è completamente **responsive** e ottimizzata per:
- **Desktop** (1920x1080+)
- **Tablet** (768px-1024px)
- **Mobile** (320px-768px)
- **Touch interface** friendly

## 🔐 Sicurezza e Compliance

### Protezione Dati Sanitari
- **Crittografia** dati sensibili
- **Audit logging** completo
- **Controllo accessi** granulare
- **Compliance GDPR** e normative sanitarie

## 📊 Analytics e Report

### Dashboard Executive
- **KPI assistenziali** in tempo reale
- **Trend analisi** longitudinali
- **Indicatori qualità** personalizzabili
- **Report automatici**

## 🚀 Deploy

### Vercel (Raccomandato)
```bash
npm run build
npx vercel --prod
```

### Docker
```bash
docker build -t homecare-platform .
docker run -p 3000:3000 homecare-platform
```

## 🤝 Supporto

Per supporto tecnico o richieste di funzionalità:
- 📧 Email: support@homecare-platform.com
- 💬 GitHub Issues
- 📖 Documentazione completa

## 📄 Licenza

Progetto rilasciato sotto licenza **MIT**.

---

**HomeCare Platform** - Trasformare le cure domiciliari attraverso la tecnologia 🚀
