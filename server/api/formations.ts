import {sub} from 'date-fns'

const formations = [
  {
    id: 1,
    name: 'Introduction à la Programmation',
    description: 'Apprenez les bases de la programmation.',
    short_description: 'Bases de la programmation pour débutants.',
    image: 'https://img-c.udemycdn.com/course/240x135/905844_be7b.jpg',
    content: 'Contenu complet de la formation pour débutants.',
    created_at: sub(new Date(), {days: 30}).toISOString(),
    updated_at: sub(new Date(), {days: 10}).toISOString(),
    tags: [{id: 1, name: 'Programmation'}, {id: 2, name: 'Débutant'}],
    theme: 'Informatique',
    subject: 'Développement',
    duration: '20 heures',
    classes: [{id: 1, name: 'Classe 101', studentCount: 30}],
    author: {id: 1, name: 'John Doe'},
    comments: [
      {
        id: 1,
        name: 'Très instructif!',
        created_at: sub(new Date(), {days: 28}).toISOString(),
        updated_at: sub(new Date(), {days: 27}).toISOString(),
        author: {id: 2, name: 'Alice Martin'}
      }
    ],
    chapters: [
      {
        id: 1,
        label: 'Les bases',
        lessons: [{id: 1, label: 'Introduction', description: 'Les bases de la programmation.', content: 'Détails.'}]
      }
    ]
  },
  {
    id: 2,
    name: 'Développement Web Frontend',
    description: 'Apprenez le HTML, CSS, et JavaScript.',
    short_description: 'Frontend pour débutants',
    image: 'https://img-c.udemycdn.com/course/240x135/1355250_4ec9_2.jpg',
    content: 'Contenu complet sur HTML, CSS, et JavaScript.',
    created_at: sub(new Date(), {days: 25}).toISOString(),
    updated_at: sub(new Date(), {days: 12}).toISOString(),
    tags: [{id: 3, name: 'Web'}, {id: 4, name: 'Frontend'}],
    theme: 'Informatique',
    subject: 'Développement',
    duration: '25 heures',
    classes: [{id: 2, name: 'Classe 102', studentCount: 25}],
    author: {id: 3, name: 'Jane Smith'},
    comments: [
      {
        id: 2,
        name: 'Très utile!',
        created_at: sub(new Date(), {days: 20}).toISOString(),
        updated_at: sub(new Date(), {days: 18}).toISOString(),
        author: {id: 4, name: 'Carlos Reyes'}
      }
    ],
    chapters: [
      {
        id: 3,
        label: 'HTML Basics',
        lessons: [{id: 5, label: 'Tags and Structure', description: 'HTML structure basics.', content: 'HTML details.'}]
      }
    ]
  },
  {
    id: 3,
    name: 'Bases de la Data Science',
    description: 'Introduction aux principes de la data science.',
    short_description: 'Introduction à la science des données.',
    image: 'https://img-c.udemycdn.com/course/240x135/1659882_04d8_3.jpg',
    content: 'Découvrir le monde de la data science.',
    created_at: sub(new Date(), {days: 60}).toISOString(),
    updated_at: sub(new Date(), {days: 10}).toISOString(),
    tags: [{id: 5, name: 'Data Science'}],
    theme: 'Informatique',
    subject: 'Data',
    duration: '15 heures',
    classes: [{id: 3, name: 'Data 101', studentCount: 20}],
    author: {id: 5, name: 'Emma Johnson'},
    comments: [
      {
        id: 3,
        name: 'Très intéressant!',
        created_at: sub(new Date(), {days: 58}).toISOString(),
        updated_at: sub(new Date(), {days: 57}).toISOString(),
        author: {id: 6, name: 'Laura Sanchez'}
      }
    ],
    chapters: [
      {
        id: 4,
        label: 'Introduction',
        lessons: [{
          id: 6,
          label: 'Qu\'est-ce que la data science?',
          description: 'Concepts de base.',
          content: 'Détails.'
        }]
      }
    ]
  },
  {
    id: 4,
    name: 'Python Avancé',
    description: 'Techniques avancées pour maîtriser Python.',
    short_description: 'Niveau avancé en Python.',
    image: 'https://img-c.udemycdn.com/course/240x135/2396488_7708_5.jpg',
    content: 'Contenu avancé en Python.',
    created_at: sub(new Date(), {days: 40}).toISOString(),
    updated_at: sub(new Date(), {days: 5}).toISOString(),
    tags: [{id: 6, name: 'Python'}],
    theme: 'Informatique',
    subject: 'Programmation',
    duration: '30 heures',
    classes: [{id: 4, name: 'Python Master', studentCount: 40}],
    author: {id: 7, name: 'Lucas Nguyen'},
    comments: [],
    chapters: [
      {
        id: 5,
        label: 'Modules avancés',
        lessons: [{
          id: 7,
          label: 'Gestion de la mémoire',
          description: 'Optimisation en Python.',
          content: 'Détails avancés.'
        }]
      }
    ]
  },
  {
    id: 5,
    name: 'Introduction à l\'IA',
    description: 'Bases de l\'intelligence artificielle.',
    short_description: 'IA pour débutants.',
    image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
    content: 'Principes de l\'intelligence artificielle.',
    created_at: sub(new Date(), {days: 45}).toISOString(),
    updated_at: sub(new Date(), {days: 8}).toISOString(),
    tags: [{id: 7, name: 'Intelligence Artificielle'}],
    theme: 'Informatique',
    subject: 'IA',
    duration: '35 heures',
    classes: [{id: 5, name: 'IA 101', studentCount: 50}],
    author: {id: 8, name: 'Sara Lopez'},
    comments: [],
    chapters: [
      {
        id: 6,
        label: 'Fondamentaux',
        lessons: [{
          id: 8,
          label: 'Historique de l\'IA',
          description: 'Origines et évolutions.',
          content: 'Détails sur l\'IA.'
        }]
      }
    ]
  },
  {
    id: 6,
    name: 'Apprendre JavaScript',
    description: 'Découverte de JavaScript.',
    short_description: 'JavaScript pour les débutants.',
    image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
    content: 'Apprendre les bases de JavaScript.',
    created_at: sub(new Date(), {days: 20}).toISOString(),
    updated_at: sub(new Date(), {days: 2}).toISOString(),
    tags: [{id: 8, name: 'JavaScript'}],
    theme: 'Informatique',
    subject: 'Programmation',
    duration: '18 heures',
    classes: [{id: 6, name: 'JS Basics', studentCount: 35}],
    author: {id: 9, name: 'Marie Durant'},
    comments: [],
    chapters: [
      {
        id: 7,
        label: 'Syntaxe',
        lessons: [{
          id: 9,
          label: 'Variables',
          description: 'Définir des variables.',
          content: 'Détails sur les variables.'
        }]
      }
    ]
  },
  {
    id: 7,
    name: 'Machine Learning',
    description: 'Concepts de base du machine learning.',
    short_description: 'Apprendre le ML.',
    image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
    content: 'Apprenez à développer des modèles de ML.',
    created_at: sub(new Date(), {days: 75}).toISOString(),
    updated_at: sub(new Date(), {days: 25}).toISOString(),
    tags: [{id: 9, name: 'Machine Learning'}],
    theme: 'Informatique',
    subject: 'Data',
    duration: '40 heures',
    classes: [{id: 7, name: 'ML Basics', studentCount: 60}],
    author: {id: 10, name: 'Tom Lee'},
    comments: [],
    chapters: [
      {
        id: 8,
        label: 'Modélisation',
        lessons: [{
          id: 10,
          label: 'Modèles linéaires',
          description: 'Utilisation des modèles.',
          content: 'Détails sur les modèles linéaires.'
        }]
      }
    ]
  },
  {
    id: 8,
    name: 'Marketing Digital',
    description: 'Apprendre les bases du marketing digital.',
    short_description: 'Débuter en marketing digital.',
    image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
    content: 'Découverte des stratégies de marketing en ligne.',
    created_at: sub(new Date(), {days: 90}).toISOString(),
    updated_at: sub(new Date(), {days: 60}).toISOString(),
    tags: [{id: 10, name: 'Marketing'}],
    theme: 'Communication',
    subject: 'Digital',
    duration: '12 heures',
    classes: [{id: 8, name: 'Marketing 101', studentCount: 45}],
    author: {id: 11, name: 'Olivia Martin'},
    comments: [],
    chapters: [
      {
        id: 9,
        label: 'Introduction',
        lessons: [{id: 11, label: 'Bases du marketing', description: 'Notions de base.', content: 'Détails.'}]
      }
    ]
  },
  {
    id: 9,
    name: 'Réseaux Sociaux pour Entreprises',
    description: 'Utilisation des réseaux sociaux pour promouvoir une entreprise.',
    short_description: 'Réseaux sociaux pour business.',
    image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
    content: 'Comprendre le marketing sur réseaux sociaux.',
    created_at: sub(new Date(), {days: 15}).toISOString(),
    updated_at: sub(new Date(), {days: 7}).toISOString(),
    tags: [{id: 11, name: 'Réseaux Sociaux'}],
    theme: 'Communication',
    subject: 'Digital',
    duration: '10 heures',
    classes: [{id: 9, name: 'Social Media', studentCount: 20}],
    author: {id: 12, name: 'Nadia Zhou'},
    comments: [],
    chapters: [
      {
        id: 10,
        label: 'Stratégie',
        lessons: [{id: 12, label: 'Définir une audience', description: 'Audience cible.', content: 'Détails.'}]
      }
    ]
  },
  {
    id: 10,
    name: 'Finance pour les Entrepreneurs',
    description: 'Comprendre les finances pour gérer une entreprise.',
    short_description: 'Finance de base pour entrepreneurs.',
    image: 'https://img-c.udemycdn.com/course/240x135/1670100_9b0d.jpg',
    content: 'Apprenez les fondamentaux de la finance.',
    created_at: sub(new Date(), {days: 50}).toISOString(),
    updated_at: sub(new Date(), {days: 20}).toISOString(),
    tags: [{id: 12, name: 'Finance'}],
    theme: 'Commerce',
    subject: 'Finance',
    duration: '16 heures',
    classes: [{id: 10, name: 'Finance 101', studentCount: 30}],
    author: {id: 13, name: 'Youssef Benali'},
    comments: [],
    chapters: [
      {
        id: 11,
        label: 'Principes financiers',
        lessons: [{id: 13, label: 'Budgétisation', description: 'Gérer un budget.', content: 'Détails.'}]
      }
    ]
  }
]

export default eventHandler(async (event) => {
  const { id } = getQuery(event) as { id?: number }

  if (id) return formations.find(formation => formation.id === Number(id))

  return formations
})
