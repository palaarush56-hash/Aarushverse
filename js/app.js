import { site, projects } from './data/projects.js';

const app = document.getElementById('app');
// Builds DOM nodes with textContent only, so project text is never rendered as HTML.
const h = (t, a = {}, ...k) => {
  const e = document.createElement(t);
  for (const [n, v] of Object.entries(a)) {
    if (v == null || v === false) continue;
    if (n === 'class') e.className = v;
    else if (n.startsWith('on')) e.addEventListener(n.slice(2), v);
    else e.setAttribute(n, v === true ? '' : v);
  }
  for (const c of k.flat()) if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c));
  return e;
};
const DEF = { type: 'game', description: '', coverImage: '', gallery: [], category: 'Other', status: 'Experimental',
  technologies: [], featured: false, playMode: 'none', localGamePath: '', externalUrl: '', embedEnabled: false,
  instructions: '', controls: [], lastUpdated: '', releaseDate: '', progress: null, sample: false };
const items = projects.map(p => ({ ...DEF, ...p, slug: p.slug || p.id })).filter(p => {
  if (!p.id || !p.title) { console.warn('Skipping invalid project entry:', p); return false; }
  return true;
});
const safeUrl = u => { try { const x = new URL(u); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch { return ''; } };
const safeLocal = p => (/^[\w\-./]+$/.test(p) && !p.includes('..') && !p.startsWith('/') && p.endsWith('.html')) ? p : '';
const dest = p => p.playMode === 'local' ? safeLocal(p.localGamePath) : safeUrl(p.externalUrl);
console.log('Starbucks test:', dest({
  playMode: 'local',
  localGamePath: 'projects/starbucks/index.html'
}));

// Ads: disabled unless a real provider is configured. See README.
export const Ads = {
  enabled: () => !!(site.ads.enabled && site.ads.provider),
  async interstitial() { if (this.enabled() && site.ads.provider.showInterstitial) await site.ads.provider.showInterstitial(); },
  async rewarded() { // call only from a user click; true only on confirmed reward
    if (!this.enabled() || !site.ads.provider.showRewarded) return false;
    const r = await site.ads.provider.showRewarded(); return !!(r && r.rewarded === true);
  }
};
window.AarushverseAds = Ads;

const badge = (t, c = '') => h('span', { class: 'badge ' + c }, t);
const cover = p => {
  const ph = () => h('div', { class: 'ph', 'aria-hidden': 'true' }, p.title.slice(0, 2).toUpperCase());
  if (!p.coverImage) return h('div', { class: 'cover' }, ph());
  const img = h('img', { src: p.coverImage, alt: p.title + ' cover art', loading: 'lazy' });
  const box = h('div', { class: 'cover' }, img);
  img.addEventListener('error', () => { img.remove(); box.append(ph()); });
  return box;
};
const ext = (href, label, cls = 'btn') => h('a', { class: cls, href, target: '_blank', rel: 'noopener noreferrer' }, label);

function card(p) {
  const d = dest(p), actions = [];
  if (p.type === 'game') {
    if (p.playMode === 'local' && d) actions.push(h('a', { class: 'btn primary', href: '#/item/' + p.slug }, 'PLAY'));
    else if (d) actions.push(ext(d, 'PLAY', 'btn primary'));
    else actions.push(h('span', { class: 'soon' }, 'NOT PLAYABLE YET'));
  } else if (p.type === 'project' || p.type === 'fan') {
    if (d) actions.push(ext(d, p.type === 'fan' ? 'VISIT WEBSITE' : 'OPEN PROJECT', 'btn primary'));
    else actions.push(h('span', { class: 'soon' }, 'PREVIEW COMING SOON'));
  }
  actions.push(h('a', { class: 'btn', href: '#/item/' + p.slug }, 'DETAILS'));
  return h('article', { class: 'card' }, cover(p),
    h('div', { class: 'body' },
      h('div', { class: 'badges' }, badge(p.status, 'st'), p.type === 'game' && badge(p.category), p.type === 'fan' && badge('UNOFFICIAL FAN PROJECT', 'warn'), p.sample && badge('SAMPLE', 'warn')),
      h('h3', {}, p.title), h('p', {}, p.description || 'No description yet.'),
      p.technologies.length > 0 && h('p', { class: 'muted small' }, p.technologies.join(' · ')),
      p.lastUpdated && h('p', { class: 'muted small' }, 'Updated ' + p.lastUpdated),
      h('div', { class: 'actions' }, actions)));
}

function upcomingCard(p) {
  return h('article', { class: 'card' }, cover(p), h('div', { class: 'body' },
    h('div', { class: 'badges' }, badge(p.status, 'st'), p.sample && badge('SAMPLE', 'warn')),
    h('h3', {}, p.title), h('p', {}, p.description),
    h('p', { class: 'small' }, p.releaseDate ? 'Estimated release: ' + p.releaseDate : 'RELEASE DATE NOT ANNOUNCED'),
    typeof p.progress === 'number' && h('progress', { max: 100, value: p.progress, 'aria-label': 'Development progress' })));
}

const grid = (list, fn = card) => list.length ? h('div', { class: 'grid' }, list.map(fn)) : h('p', { class: 'empty' }, 'Nothing here yet.');
const head = (t, s) => h('div', { class: 'sec-head' }, h('h2', {}, t), s && h('p', { class: 'muted' }, s));

function home() {
  return [
    h('section', { class: 'hero' },
      h('p', { class: 'eyebrow' }, 'WELCOME TO MY DIGITAL UNIVERSE'),
      h('h1', {}, 'I BUILD GAMES, EXPERIMENTS & DIGITAL EXPERIENCES.'),
      h('p', { class: 'lead' }, 'Explore the games I create, discover experimental projects, and follow my journey as an independent creator.'),
      h('div', { class: 'actions' }, h('a', { class: 'btn primary', href: '#/games' }, 'EXPLORE MY GAMES'), h('a', { class: 'btn', href: '#/projects' }, 'VIEW MY PROJECTS'))),
    h('section', { class: 'wrap' }, head('Featured Games'), grid(items.filter(p => p.type === 'game' && p.featured))),
    h('section', { class: 'wrap' }, head('Coming Soon'), grid(items.filter(p => p.type === 'upcoming'), upcomingCard))
  ];
}

function library(type, title, intro) {
  const all = items.filter(p => p.type === type);
  const S = { q: '', cat: '', st: '', sort: 'featured' };
  const out = h('div', { 'aria-live': 'polite' });
  const uniq = k => [...new Set(all.map(p => p[k]))].sort();
  const mk = (arr, label, key) => h('select', { 'aria-label': label, onchange: e => { S[key] = e.target.value; draw(); } },
    h('option', { value: '' }, label), arr.map(v => h('option', { value: v }, v)));
  const search = h('input', { type: 'search', placeholder: 'Search by title', 'aria-label': 'Search by title', oninput: e => { S.q = e.target.value.trim().toLowerCase(); draw(); } });
  const selects = [type === 'game' && mk(uniq('category'), 'All categories', 'cat'), mk(uniq('status'), 'All statuses', 'st'),
    h('select', { 'aria-label': 'Sort', onchange: e => { S.sort = e.target.value; draw(); } }, h('option', { value: 'featured' }, 'Sort: Featured'), h('option', { value: 'newest' }, 'Sort: Newest'))];
  const reset = h('button', { class: 'btn', type: 'button', onclick: () => { Object.assign(S, { q: '', cat: '', st: '', sort: 'featured' }); search.value = ''; selects.forEach(s => s && (s.selectedIndex = 0)); draw(); } }, 'RESET');
  function draw() {
    const r = all.filter(p => (!S.q || p.title.toLowerCase().includes(S.q)) && (!S.cat || p.category === S.cat) && (!S.st || p.status === S.st));
    r.sort((a, b) => S.sort === 'newest' ? (b.lastUpdated || '').localeCompare(a.lastUpdated || '') : (b.featured - a.featured));
    out.replaceChildren(r.length ? grid(r) : h('p', { class: 'empty' }, 'No results match your search. Try different filters or press Reset.'));
  }
  draw();
  return h('section', { class: 'wrap' }, head(title, intro),
    type === 'fan' && h('p', { class: 'note' }, site.fanDisclaimer),
    h('div', { class: 'filters' }, search, selects, reset), out);
}

function detail(slug) {
  const p = items.find(x => x.slug === slug);
  if (!p) return notFound();
  const d = dest(p), back = { game: '#/games', project: '#/projects', fan: '#/fan-pages', upcoming: '#/' }[p.type];
  const stage = h('div', { class: 'stage' });
  const acts = h('div', { class: 'actions' }, h('a', { class: 'btn', href: back }, '← BACK'));
  const frameOk = d && (p.playMode === 'local' || (p.playMode === 'external' && p.embedEnabled));
  if (frameOk) {
    const play = h('button', { class: 'btn primary', type: 'button', onclick: async () => {
      await Ads.interstitial();
      const f = h('iframe', { src: d, title: p.title, allow: 'fullscreen; gamepad', sandbox: 'allow-scripts allow-same-origin allow-pointer-lock', referrerpolicy: 'no-referrer' });
      stage.replaceChildren(f); play.remove();
      if (document.fullscreenEnabled) acts.append(h('button', { class: 'btn', type: 'button', onclick: () => f.requestFullscreen && f.requestFullscreen() }, 'FULLSCREEN'));
    } }, 'PLAY HERE');
    acts.append(play);
  }
  if (d && p.playMode === 'external') acts.append(ext(d, 'OPEN EXTERNAL PAGE', frameOk ? 'btn' : 'btn primary'));
  else if (d && p.type !== 'game') acts.append(ext(d, 'OPEN', 'btn primary'));
  if (!d) acts.append(h('span', { class: 'soon' }, p.type === 'game' ? 'NOT PLAYABLE YET' : 'PREVIEW COMING SOON'));
  const list = (t, a) => a.length > 0 && h('div', {}, h('h3', {}, t), h('ul', {}, a.map(x => h('li', {}, x))));
  document.title = p.title + ' | ' + site.name;
  return h('section', { class: 'wrap detail' }, cover(p), h('h1', {}, p.title),
    h('div', { class: 'badges' }, badge(p.status, 'st'), badge(p.category), p.sample && badge('SAMPLE', 'warn')),
    p.type === 'fan' && h('p', { class: 'note' }, site.fanDisclaimer),
    h('p', {}, p.description || 'No description yet.'), stage, acts,
    p.instructions && h('div', {}, h('h3', {}, 'Instructions'), h('p', {}, p.instructions)),
    list('Controls', p.controls), list('Technologies', p.technologies),
    p.gallery.length > 0 && h('div', { class: 'grid' }, p.gallery.map((s, i) => h('img', { src: s, alt: p.title + ' screenshot ' + (i + 1), loading: 'lazy', class: 'shot', onerror: e => e.target.remove() }))));
}

function socials() {
  const s = site.social, L = [['itch.io', s.itch], ['GitHub', s.github], ['YouTube', s.youtube], ['Instagram', s.instagram]]
    .map(([n, u]) => [n, safeUrl(u)]).filter(x => x[1]);
  if (s.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) L.push(['Email', 'mailto:' + s.email]);
  return L.length ? h('div', { class: 'actions' }, L.map(([n, u]) => ext(u, n))) : h('p', { class: 'muted' }, 'No links configured yet.');
}
function about() {
  const a = site.about;
  return h('section', { class: 'wrap prose' }, head('About Me'), h('p', {}, a.intro),
    h('h3', {}, 'Interests'), h('p', {}, a.interests), h('h3', {}, 'Technologies'), h('p', {}, a.technologies.join(' · ')),
    h('h3', {}, 'Current Goals'), h('p', {}, a.goals), h('h3', {}, 'Project Philosophy'), h('p', {}, a.philosophy), socials());
}
const contact = () => h('section', { class: 'wrap prose' }, head('Contact', 'Find me here:'), socials());
const notFound = () => h('section', { class: 'wrap' }, h('h1', {}, 'Page not found'), h('a', { class: 'btn primary', href: '#/' }, 'GO HOME'));

const routes = {
  '': [home, 'Home'], games: [() => library('game', 'Games', 'Browse every game.'), 'Games'],
  projects: [() => library('project', 'Projects Lab', 'Experiments and works in progress.'), 'Projects'],
  'fan-pages': [() => library('fan', 'Fan Pages', 'Unofficial fan projects and concepts.'), 'Fan Pages'],
  about: [about, 'About'], contact: [contact, 'Contact']
};
function route() {
  const [r, arg] = location.hash.replace(/^#\/?/, '').split('/');
  let view;
  if (r === 'item') view = detail(arg);
  else {
    const rt = routes[r];
    view = rt ? rt[0]() : notFound();
    document.title = rt ? (rt[1] === 'Home' ? '' : rt[1] + ' | ') + site.name : 'Not found | ' + site.name;
  }
  app.replaceChildren(...[].concat(view));
  document.querySelectorAll('#nav a').forEach(a => a.toggleAttribute('aria-current', r !== 'item' && a.dataset.r === (r || 'home')));
  document.getElementById('nav').classList.remove('open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
  window.scrollTo(0, 0); app.focus({ preventScroll: true });
}
document.getElementById('menuBtn').addEventListener('click', e => {
  const o = document.getElementById('nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o);
});
document.getElementById('footText').textContent = '© ' + new Date().getFullYear() + ' ' + site.name;
window.addEventListener('hashchange', route);
route();
