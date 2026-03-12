export const QUESTIONS = [
  // National
  { id: 'q1', text: "Les déserts médicaux : l'État a-t-il failli à sa mission ?", theme: '🏥 Santé', level: 'national', response_count: 4200 },
  { id: 'q2', text: "Les réseaux sociaux sont-ils devenus nuisibles pour la démocratie ?", theme: '📱 Numérique', level: 'national', response_count: 4100 },
  { id: 'q3', text: "Faut-il encadrer les loyers dans toutes les grandes villes françaises ?", theme: '🏠 Logement', level: 'national', response_count: 6300 },
  { id: 'q4', text: "La justice française est-elle trop lente ?", theme: '⚖️ Justice', level: 'national', response_count: 4900 },
  { id: 'q5', text: "Faut-il interdire les smartphones dans tous les établissements scolaires ?", theme: '🎓 Éducation', level: 'national', response_count: 1850 },
  { id: 'q6', text: "Le télétravail a-t-il définitivement changé les attentes au travail ?", theme: '💼 Travail', level: 'national', response_count: 3200 },
  { id: 'q7', text: "La taxe carbone est-elle juste ou aveugle socialement ?", theme: '🌱 Écologie', level: 'national', response_count: 2800 },
  { id: 'q8', text: "La génération des 25-35 ans est-elle condamnée à rester locataire ?", theme: '🏠 Logement', level: 'national', response_count: 2100 },
  // Regional
  { id: 'q9', text: "Les transports en commun de votre région sont-ils à la hauteur ?", theme: '🚌 Transports', level: 'regional', response_count: 1200 },
  { id: 'q10', text: "Les services publics de proximité se dégradent-ils dans votre région ?", theme: '🏛 Services', level: 'regional', response_count: 980 },
  // Local
  { id: 'q11', text: "Les pistes cyclables de votre ville sont-elles bien dimensionnées ?", theme: '🚴 Mobilité', level: 'local', response_count: 380 },
  { id: 'q12', text: "Le marché local doit-il être étendu à la journée entière ?", theme: '🛒 Commerce', level: 'local', response_count: 420 },
]

export const THEMES = ['🏥 Santé', '📱 Numérique', '🏠 Logement', '⚖️ Justice', '🎓 Éducation', '💼 Travail', '🌱 Écologie', '🚌 Transports', '🏛 Services', '🚴 Mobilité', '🛒 Commerce']

export const LEVELS = [
  { key: 'national', label: 'National', icon: '🇫🇷' },
  { key: 'regional', label: 'Régional', icon: '🗺' },
  { key: 'local', label: 'Local', icon: '📍' },
]

export const AGE_RANGES = ['18-24 ans', '25-34 ans', '35-44 ans', '45-54 ans', '55-64 ans', '65 ans et +']
export const PROFESSIONS = ['Étudiant·e', 'Salarié·e du privé', 'Fonctionnaire', 'Indépendant·e', 'Chef·fe d\'entreprise', 'Retraité·e', 'En recherche d\'emploi', 'Autre']
export const INTERESTS = ['Santé', 'Éducation', 'Logement', 'Écologie', 'Économie', 'Justice', 'Numérique', 'Transports', 'Culture', 'International']
