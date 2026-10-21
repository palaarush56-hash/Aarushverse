
 // ===== EDIT THIS FILE to change site info and add projects =====
export const site = {
  name: 'AARUSHVERSE',
  description: 'Games, experiments and digital experiences by an independent creator.',
  fanDisclaimer: 'This is an unofficial fan-made project and is not affiliated with or endorsed by the original rights holders.',
  social: {
    itch: 'https://aarushpal.itch.io',
    github: '',
    youtube: '',
    instagram: '',
    email: ''
  },
  about: {
    intro: 'PLACEHOLDER: Write a short introduction about yourself here.',
    interests: 'PLACEHOLDER: Describe your game development interests.',
    technologies: ['HTML5', 'CSS', 'JavaScript'],
    goals: 'PLACEHOLDER: Describe your current goals.',
    philosophy: 'PLACEHOLDER: Describe your project philosophy.'
  },
  ads: { enabled: false, provider: null }
};

/* Project fields */
export const projects = [
  {
    id: 'cyber-viper-2084',
    title: 'Cyber Viper 2084',
    type: 'game',
    category: 'Arcade',
    status: 'Released',
    featured: true,
    playMode: 'local',
    localGamePath: 'games/itch_upload/index.html',
    description: 'A browser game by Aarush, hosted on itch.io. Open the game page to play.',
    coverImage: 'images/cyber-viper.jpg'
  },

  {
    id: 'dash-extreme',
    title: 'DashExtreme',
    type: 'game',
    category: 'Arcade',
    status: 'Released',
    featured: true,
    playMode: 'local',
    localGamePath: 'games/dashextrem.netlify.html',
    description: 'Play DashExtrem, a fast-paced browser game.',
    coverImage: 'images/dash-extreme.jpg'
  },

  {
    id: 'sample-experiment',
    title: 'Sample Experiment',
    type: 'game',
    category: 'Puzzle',
    status: 'Experimental',
    sample: true,
    technologies: ['JavaScript'],
    lastUpdated: '2026-01-01',
    description: 'Placeholder with no destination yet.'
  },

  {
    id: 'starbucks-landing-page',
    title: 'Starbucks Landing Page UI Clone',
    type: 'project',
    category: 'Web Design',
    status: 'Completed',
    featured: true,
    playMode: 'local',
    localGamePath: 'Project/starbuks/index.html',
    description: 'A responsive front-end landing page clone of Starbucks built using pure HTML5 and CSS3. Created to practice modern UI layout techniques, Flexbox, custom typography, and clean web styling. Note: This is a static front-end UI design created for layout and CSS practice. Interactive ordering and backend features are not included.',
    technologies: ['HTML5', 'CSS3', 'Responsive Design', 'UI Clone'],
    coverImage: ''
  },

  {
    id: 'sample-fan-page',
    title: 'Sample Fan Concept',
    type: 'fan',
    status: 'Concept',
    sample: true,
    description: 'Placeholder concept-only fan page.'
  },

  {
    id: 'sample-upcoming',
    title: 'Sample Upcoming Project',
    type: 'upcoming',
    status: 'Concept',
    sample: true,
    description: 'Placeholder. Add releaseDate or progress only when real.'
  }
];
