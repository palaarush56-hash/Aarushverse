
 // ===== AARUSHVERSE SITE INFO AND PROJECTS =====

export const site = {
  name: 'AARUSHVERSE',

  description:
    'Games, web projects, experiments and digital experiences created by Aarush.',

  fanDisclaimer:
    'This is an unofficial fan-made project and is not affiliated with or endorsed by the original rights holders.',

  social: {
    itch: 'https://aarushpal.itch.io',
    github: 'https://github.com/palaarush56-hash',
    youtube: '',
    instagram: 'https://www.instagram.com/aarushpal_official.17/',
    email: ''
  },

  about: {
    intro:
      'Hi! I am Aarush, a young developer who enjoys building websites, browser games and creative digital projects. Aarushverse is my personal space to share what I create and what I learn along the way.',

    interests:
      'I enjoy web development, browser game creation, interactive experiences, creative coding and exploring new AI tools. I like turning ideas into real projects and experimenting with new designs.',

    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Python',
      'Responsive Design'
    ],

    goals:
      'My goal is to improve my coding skills, create more original games, build modern websites and develop projects that people can explore and enjoy.',

    philosophy:
      'Learn by building, experiment with ideas, solve problems and keep improving. Every project is an opportunity to learn something new.'
  },

  ads: {
    enabled: false,
    provider: null
  }
};

/* ===== PROJECTS ===== */

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
    description:
      'A browser game by Aarush. Explore the game and enjoy the arcade-style experience.',
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
    description:
      'Play DashExtreme, a fast-paced browser game built for an exciting arcade experience.',
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
    description:
      'An experimental project concept. More details will be added as development progresses.'
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
    description:
      'A responsive Starbucks-inspired landing page built with HTML5 and CSS3. This project helped me practice page layouts, Flexbox, typography and modern web styling. It is a static front-end practice project and does not include real ordering or backend functionality.',
    technologies: [
      'HTML5',
      'CSS3',
      'Responsive Design',
      'UI Design'
    ],
    coverImage: ''
  },

  {
    id: 'sample-fan-page',
    title: 'Sample Fan Concept',
    type: 'fan',
    status: 'Concept',
    sample: true,
    description:
      'A fan-made concept project. This entry is a placeholder for a future creative idea.'
  },

  {
    id: 'sample-upcoming',
    title: 'Sample Upcoming Project',
    type: 'upcoming',
    status: 'Concept',
    sample: true,
    description:
      'A future project idea. Details will be added when development begins.'
  }

  {
    id: 'cyber-run',
    title: 'Cyber Run',
    type: 'game',
    category: 'Arcade',
    status: 'Released',
    featured: true,
    playMode: 'local',
    localGamePath: 'Cyber Run.html',
    description: 'Run, jump and collect coins in Cyber Run, a neon arcade game.',
    coverImage: 'images/cyber-run.jpg'
  },



