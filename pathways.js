// Short starting paths cross topic boundaries. Keep IDs stable so links survive updates.
export const pathways = [
  {
    id: 'money-tight',
    en: { title: 'Money is tight', description: 'Protect essentials and find help before a bill becomes a crisis.' },
    es: { title: 'El dinero no alcanza', description: 'Prioriza lo esencial y busca apoyo antes de que una cuenta se vuelva una crisis.' },
    actions: ['bill-priority', 'call-creditor', 'snap-check', 'rent-help', 'future-find-debt-counselor'],
  },
  {
    id: 'caring-for-someone',
    en: { title: 'I care for someone', description: 'Find support for the person you help and for yourself.' },
    es: { title: 'Cuido de alguien', description: 'Encuentra apoyo para la persona que cuidas y también para ti.' },
    actions: ['family-care-notebook', 'family-share-tasks', 'family-eldercare-locator', 'family-respite-search', 'family-caregiver-check'],
  },
  {
    id: 'work-changed',
    en: { title: 'Work has changed', description: 'Take the next step after losing a job or changing one.' },
    es: { title: 'Cambió mi trabajo', description: 'Da el siguiente paso tras perder o cambiar de empleo.' },
    actions: ['unemployment-check', 'future-plan-coverage-after-job-loss', 'job-center', 'future-compare-career-paths', 'job-offer-scam'],
  },
  {
    id: 'scam-concern',
    en: { title: 'I’m worried about a scam', description: 'Slow down, secure your information, and check what happened.' },
    es: { title: 'Me preocupa una estafa', description: 'Haz una pausa, protege tus datos y averigua qué pasó.' },
    actions: ['verify-request', 'digital-phishing', 'digital-report-scam', 'digital-breach-response', 'digital-hacked-account', 'credit-freeze'],
  },
  {
    id: 'home-ready',
    en: { title: 'I want to be ready', description: 'Make a practical plan for home emergencies and disruptions.' },
    es: { title: 'Quiero estar preparado', description: 'Haz un plan práctico para emergencias e imprevistos en casa.' },
    actions: ['local-alerts', 'contact-plan', 'future-plan-evacuation-ride', 'basic-kit', 'future-protect-disaster-records'],
  },
  {
    id: 'routine-reset',
    en: { title: 'I need a fresh routine', description: 'Begin with small choices for health and connection.' },
    es: { title: 'Necesito una nueva rutina', description: 'Empieza con decisiones pequeñas para tu salud y tus vínculos.' },
    actions: ['move-more', 'sleep-window', 'budget-meal', 'real-check-in'],
  },
];
