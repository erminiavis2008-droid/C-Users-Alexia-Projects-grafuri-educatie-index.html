const APPLICATIONS = [
  {
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    title: 'Rețele de telefonie',
    description: 'Antenele de telefonie mobilă formează un graf în care nodurile sunt turnurile de transmisie, iar muchiile reprezintă legăturile sau zonele de acoperire suprapuse. Informația (apeluri, date) circulă de la o antenă la alta până ajunge la destinație.',
    mapping: 'Antene = noduri · Conexiuni = muchii · Semnal = flux pe muchii'
  },
  {
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80',
    title: 'Hărți rutiere',
    description: 'În navigația GPS, orașele și intersecțiile sunt noduri, iar drumurile sunt muchii (eventual ponderate cu distanța sau timpul). Algoritmi precum Dijkstra găsesc traseul optim între două puncte.',
    mapping: 'Orașe = noduri · Drumuri = muchii · Cost = pondere'
  },
  {
    image: 'https://images.unsplash.com/photo-1474487548417-9cb457734bbe?w=600&q=80',
    title: 'Rețele feroviare',
    description: 'Gările sunt nodurile rețelei feroviare, iar liniile de cale ferată sunt muchiile. Un tren parcurge un lanț de muchii între gări. Planificarea rutelor folosește grafuri pentru a minimiza timpul sau costul.',
    mapping: 'Gări = noduri · Linii feroviare = muchii'
  },
  {
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    title: 'Transport aerian',
    description: 'Aeroporturile sunt noduri, iar zborurile directe sunt arce într-un graf orientat (sensul zborului contează). Companiile aeriene optimizează rutele cu escală folosind algoritmi pe grafuri.',
    mapping: 'Aeroporturi = noduri · Zboruri = arce orientate'
  },
  {
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e939e966?w=600&q=80',
    title: 'Rețele sociale',
    description: 'Fiecare utilizator este un nod, iar relațiile de prietenie sau urmărire sunt muchii. Algoritmi de recomandare și detectare a comunităților analizează structura acestui graf masiv.',
    mapping: 'Utilizatori = noduri · Prietenii = muchii'
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    title: 'Internetul',
    description: 'Routerele și serverele sunt noduri, iar cablurile și conexiunile wireless sunt muchii. Pachetele de date circulă pe drumuri minime — internetul este un graf gigantic conex.',
    mapping: 'Routere = noduri · Legături = muchii'
  },
  {
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    title: 'Distribuția energiei electrice',
    description: 'Stațiile de transformare și centralele sunt noduri; liniile de înaltă tensiune sunt muchii. Rețeaua trebuie să rămână conexă pentru a alimenta toți consumatorii.',
    mapping: 'Stații = noduri · Linii electrice = muchii'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    title: 'Organizarea fișierelor',
    description: 'Sistemul de fișiere al unui calculator este un arbore: directorul rădăcină, subdirectoarele și fișierele formează o structură ierarhică fără cicluri.',
    mapping: 'Directoare = noduri interne · Fișiere = frunze'
  }
];

const TOC_ITEMS = [
  { href: '#teorie', icon: '📖', title: 'Teorie', desc: 'Grafuri, arbori, reprezentări' },
  { href: '#probleme-rezolvate', icon: '💻', title: 'Probleme rezolvate', desc: '8 probleme cu algoritmi C++' },
  { href: '#exercitii', icon: '✏️', title: 'Exerciții', desc: '10 probleme pentru colegi' },
  { href: '#quiz', icon: '❓', title: 'Quiz', desc: '15 întrebări interactive' },
  { href: '#rebus', icon: '🧩', title: 'Rebus', desc: 'Termeni din teoria grafurilor' },
  { href: '#aplicatii', icon: '🌍', title: 'Aplicații', desc: 'Grafuri în viața reală' },
  { href: '#simulator', icon: '▶️', title: 'Simulator BFS/DFS', desc: 'Vizualizare parcurgeri' },
  { href: '#constructor', icon: '🔧', title: 'Constructor', desc: 'Creează propriul graf' },
  { href: '#galerie', icon: '🖼️', title: 'Galerie', desc: 'Diagrame, animații, fotografii' },
  { href: '#bibliografie', icon: '📚', title: 'Bibliografie', desc: 'Surse și referințe' }
];

const GALLERY_PHOTOS = [
  {
    title: 'Rețea de calculatoare interconectate',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Vizualizare date — structură de rețea',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Algoritmi și programare pe grafuri',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Matematică și teoria grafurilor',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Navigație GPS — drumuri și noduri',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Rețea neuronală — noduri și conexiuni',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Glob digital — conexiuni globale',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80',
    credit: 'Unsplash'
  },
  {
    title: 'Diagramă pe tablă — reprezentare graf',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=700&q=80',
    credit: 'Unsplash'
  }
];

const GALLERY_ITEMS = [
  {
    title: 'Graf neorientat complet K₄',
    svg: `<svg viewBox="0 0 200 180"><line x1="100" y1="30" x2="40" y2="90" stroke="#d8b4fe" stroke-width="2"/><line x1="100" y1="30" x2="160" y2="90" stroke="#d8b4fe" stroke-width="2"/><line x1="40" y1="90" x2="160" y2="90" stroke="#d8b4fe" stroke-width="2"/><line x1="100" y1="30" x2="100" y2="150" stroke="#d8b4fe" stroke-width="2"/><line x1="40" y1="90" x2="100" y2="150" stroke="#d8b4fe" stroke-width="2"/><line x1="160" y1="90" x2="100" y2="150" stroke="#d8b4fe" stroke-width="2"/><circle cx="100" cy="30" r="14" fill="#211829" stroke="#d8b4fe" stroke-width="2"/><circle cx="40" cy="90" r="14" fill="#211829" stroke="#d8b4fe" stroke-width="2"/><circle cx="160" cy="90" r="14" fill="#211829" stroke="#d8b4fe" stroke-width="2"/><circle cx="100" cy="150" r="14" fill="#211829" stroke="#d8b4fe" stroke-width="2"/></svg>`
  },
  {
    title: 'Graf orientat — flux de date',
    svg: `<svg viewBox="0 0 220 120"><defs><marker id="g1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#e9d5ff"/></marker></defs><line x1="30" y1="60" x2="80" y2="30" stroke="#e9d5ff" stroke-width="2" marker-end="url(#g1)"/><line x1="80" y1="30" x2="130" y2="60" stroke="#e9d5ff" stroke-width="2" marker-end="url(#g1)"/><line x1="130" y1="60" x2="180" y2="30" stroke="#e9d5ff" stroke-width="2" marker-end="url(#g1)"/><line x1="30" y1="60" x2="80" y2="90" stroke="#e9d5ff" stroke-width="2" marker-end="url(#g1)"/><line x1="80" y1="90" x2="130" y2="60" stroke="#e9d5ff" stroke-width="2" marker-end="url(#g1)"/><circle cx="30" cy="60" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="80" cy="30" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="130" cy="60" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="180" cy="30" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="80" cy="90" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/></svg>`
  },
  {
    title: 'Arbore binar de căutare',
    svg: `<svg viewBox="0 0 200 160"><line x1="100" y1="25" x2="55" y2="65" stroke="#f0abfc" stroke-width="2"/><line x1="100" y1="25" x2="145" y2="65" stroke="#f0abfc" stroke-width="2"/><line x1="55" y1="65" x2="30" y2="110" stroke="#f0abfc" stroke-width="2"/><line x1="55" y1="65" x2="80" y2="110" stroke="#f0abfc" stroke-width="2"/><line x1="145" y1="65" x2="120" y2="110" stroke="#f0abfc" stroke-width="2"/><line x1="145" y1="65" x2="170" y2="110" stroke="#f0abfc" stroke-width="2"/><circle cx="100" cy="25" r="12" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="55" cy="65" r="10" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="145" cy="65" r="10" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="30" cy="110" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="80" cy="110" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="120" cy="110" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="170" cy="110" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/></svg>`
  },
  {
    title: 'Parcurgere BFS — nivele',
    svg: `<svg viewBox="0 0 240 140"><circle cx="120" cy="25" r="14" fill="#d8b4fe" opacity="0.9"/><circle cx="70" cy="75" r="12" fill="#d8b4fe" opacity="0.6"/><circle cx="120" cy="75" r="12" fill="#d8b4fe" opacity="0.6"/><circle cx="170" cy="75" r="12" fill="#d8b4fe" opacity="0.6"/><circle cx="50" cy="120" r="10" fill="#d8b4fe" opacity="0.3"/><circle cx="90" cy="120" r="10" fill="#d8b4fe" opacity="0.3"/><circle cx="150" cy="120" r="10" fill="#d8b4fe" opacity="0.3"/><circle cx="190" cy="120" r="10" fill="#d8b4fe" opacity="0.3"/><line x1="120" y1="39" x2="70" y2="63" stroke="#c4b5d0" stroke-width="1.5"/><line x1="120" y1="39" x2="120" y2="63" stroke="#c4b5d0" stroke-width="1.5"/><line x1="120" y1="39" x2="170" y2="63" stroke="#c4b5d0" stroke-width="1.5"/></svg>`
  },
  {
    title: 'Matrice de adiacență — vizual',
    svg: `<svg viewBox="0 0 200 160"><rect x="50" y="20" width="100" height="100" fill="none" stroke="#d8b4fe" stroke-width="1"/><line x1="83" y1="20" x2="83" y2="120" stroke="#d8b4fe" stroke-width="0.5" opacity="0.5"/><line x1="117" y1="20" x2="117" y2="120" stroke="#d8b4fe" stroke-width="0.5" opacity="0.5"/><line x1="50" y1="53" x2="150" y2="53" stroke="#d8b4fe" stroke-width="0.5" opacity="0.5"/><line x1="50" y1="87" x2="150" y2="87" stroke="#d8b4fe" stroke-width="0.5" opacity="0.5"/><rect x="50" y="20" width="33" height="33" fill="#d8b4fe" opacity="0.2"/><rect x="83" y="53" width="34" height="34" fill="#d8b4fe" opacity="0.4"/><rect x="117" y="87" width="33" height="33" fill="#d8b4fe" opacity="0.6"/><text x="100" y="145" fill="#c4b5d0" font-size="10" text-anchor="middle">Matrice 4×4</text></svg>`
  },
  {
    title: 'Arbore genealogic (exemplu)',
    svg: `<svg viewBox="0 0 220 150"><line x1="110" y1="30" x2="60" y2="70" stroke="#e9d5ff" stroke-width="2"/><line x1="110" y1="30" x2="160" y2="70" stroke="#e9d5ff" stroke-width="2"/><line x1="60" y1="70" x2="35" y2="115" stroke="#e9d5ff" stroke-width="2"/><line x1="60" y1="70" x2="85" y2="115" stroke="#e9d5ff" stroke-width="2"/><line x1="160" y1="70" x2="135" y2="115" stroke="#e9d5ff" stroke-width="2"/><line x1="160" y1="70" x2="185" y2="115" stroke="#e9d5ff" stroke-width="2"/><circle cx="110" cy="30" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="60" cy="70" r="10" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="160" cy="70" r="10" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="35" cy="115" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="85" cy="115" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="135" cy="115" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="185" cy="115" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/></svg>`
  }
];

const GALLERY_ANIMATIONS = [
  {
    title: 'Animație BFS — parcurgere pe nivele',
    svg: `<svg viewBox="0 0 280 180" class="anim-bfs"><style>.anim-bfs circle{animation:pulse 2s ease infinite}.anim-bfs circle:nth-child(2){animation-delay:.3s}.anim-bfs circle:nth-child(3){animation-delay:.6s}.anim-bfs circle:nth-child(4){animation-delay:.9s}@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}</style><line x1="140" y1="30" x2="80" y2="80" stroke="#d8b4fe" stroke-width="2" opacity=".4"/><line x1="140" y1="30" x2="200" y2="80" stroke="#d8b4fe" stroke-width="2" opacity=".4"/><line x1="80" y1="80" x2="50" y2="140" stroke="#d8b4fe" stroke-width="2" opacity=".4"/><line x1="80" y1="80" x2="110" y2="140" stroke="#d8b4fe" stroke-width="2" opacity=".4"/><line x1="200" y1="80" x2="230" y2="140" stroke="#d8b4fe" stroke-width="2" opacity=".4"/><circle cx="140" cy="30" r="14" fill="#d8b4fe"/><circle cx="80" cy="80" r="12" fill="#d8b4fe"/><circle cx="200" cy="80" r="12" fill="#d8b4fe"/><circle cx="50" cy="140" r="10" fill="#d8b4fe"/><circle cx="110" cy="140" r="10" fill="#d8b4fe"/><circle cx="230" cy="140" r="10" fill="#d8b4fe"/></svg>`
  },
  {
    title: 'Animație DFS — explorare în adâncime',
    svg: `<svg viewBox="0 0 280 160" class="anim-dfs"><style>.anim-dfs .path{stroke-dasharray:200;stroke-dashoffset:200;animation:draw 3s ease forwards infinite}@keyframes draw{to{stroke-dashoffset:0}}</style><path class="path" d="M140,30 L80,70 L50,120 L110,120 L80,70 L200,70 L230,120" fill="none" stroke="#e9d5ff" stroke-width="2"/><circle cx="140" cy="30" r="12" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="80" cy="70" r="10" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="50" cy="120" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="110" cy="120" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="200" cy="70" r="10" fill="#211829" stroke="#e9d5ff" stroke-width="2"/><circle cx="230" cy="120" r="8" fill="#211829" stroke="#e9d5ff" stroke-width="2"/></svg>`
  },
  {
    title: 'Propagare semnal — rețea de antene',
    svg: `<svg viewBox="0 0 280 140" class="anim-signal"><style>.anim-signal .wave{animation:wave 2s ease-out infinite}.anim-signal .w2{animation-delay:.5s}.anim-signal .w3{animation-delay:1s}@keyframes wave{0%{r:12;opacity:.8}100%{r:40;opacity:0}}</style><circle cx="140" cy="70" r="12" fill="#f0abfc"/><circle class="wave" cx="140" cy="70" r="12" fill="none" stroke="#f0abfc" stroke-width="2"/><circle class="wave w2" cx="140" cy="70" r="12" fill="none" stroke="#f0abfc" stroke-width="2"/><circle class="wave w3" cx="140" cy="70" r="12" fill="none" stroke="#f0abfc" stroke-width="2"/><line x1="140" y1="70" x2="60" y2="40" stroke="#c4b5d0" stroke-width="1.5"/><line x1="140" y1="70" x2="220" y2="40" stroke="#c4b5d0" stroke-width="1.5"/><line x1="140" y1="70" x2="60" y2="110" stroke="#c4b5d0" stroke-width="1.5"/><line x1="140" y1="70" x2="220" y2="110" stroke="#c4b5d0" stroke-width="1.5"/><circle cx="60" cy="40" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="220" cy="40" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="60" cy="110" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="220" cy="110" r="8" fill="#211829" stroke="#f0abfc" stroke-width="2"/></svg>`
  },
  {
    title: 'Drum minim — algoritmul lui Dijkstra (concept)',
    svg: `<svg viewBox="0 0 280 120" class="anim-dijk"><style>.anim-dijk .route{stroke-dasharray:300;animation:route 4s linear infinite}@keyframes route{0%{stroke-dashoffset:300}100%{stroke-dashoffset:0}}</style><line x1="30" y1="60" x2="100" y2="30" stroke="#334155" stroke-width="2"/><line x1="100" y1="30" x2="170" y2="60" stroke="#334155" stroke-width="2"/><line x1="30" y1="60" x2="100" y2="90" stroke="#334155" stroke-width="2"/><line x1="100" y1="90" x2="170" y2="60" stroke="#334155" stroke-width="2"/><line x1="170" y1="60" x2="240" y2="60" stroke="#334155" stroke-width="2"/><path class="route" d="M30,60 L100,90 L170,60 L240,60" fill="none" stroke="#f0abfc" stroke-width="3"/><circle cx="30" cy="60" r="10" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="100" cy="90" r="10" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="170" cy="60" r="10" fill="#211829" stroke="#f0abfc" stroke-width="2"/><circle cx="240" cy="60" r="10" fill="#211829" stroke="#f0abfc" stroke-width="2"/></svg>`
  }
];

const GALLERY_VIDEOS = [
  {
    title: 'VisuAlgo — BFS și DFS vizualizat',
    embed: 'https://www.youtube.com/embed/_s0v0r7qZPg',
    desc: 'Demonstrație animată a parcurgerilor în lățime și adâncime.'
  },
  {
    title: 'Grafuri — introducere (Khan Academy)',
    embed: 'https://www.youtube.com/embed/WA1iLlER_cg',
    desc: 'Concepte de bază despre grafuri și reprezentări.'
  },
  {
    title: 'Algoritmul lui Dijkstra explicat',
    embed: 'https://www.youtube.com/embed/GazC5A7Hff0',
    desc: 'Cum se găsește drumul minim într-un graf ponderat.'
  }
];

const EXERCISES = [
  {
    question: '1. Câte muchii are un arbore cu 12 noduri?',
    solution: 'Un arbore cu n noduri are exact n−1 muchii. Deci 12−1 = 11 muchii.'
  },
  {
    question: '2. Care este suma gradelor tuturor nodurilor într-un graf neorientat cu 8 muchii?',
    solution: 'Conform teoremei mâinilor: Σ deg(v) = 2|E| = 2×8 = 16.'
  },
  {
    question: '3. Un graf orientat are 5 noduri și fiecare nod are gradul interior 1 și gradul exterior 1. Câte arce are?',
    solution: 'Suma gradelor exterioare = suma gradelor interioare = |A|. 5×1 = 5 arce.'
  },
  {
    question: '4. Câte muchii are graful complet K₅?',
    solution: 'Graful complet cu n noduri are n(n−1)/2 muchii. K₅: 5×4/2 = 10 muchii.'
  },
  {
    question: '5. Un graf neorientat are 6 noduri și este conex. Care este numărul minim de muchii?',
    solution: 'Un graf conex cu n noduri are minim n−1 muchii (arbore). Minim = 5 muchii.'
  },
  {
    question: '6. Verificați dacă secvența de grade (3, 3, 2, 2, 2) poate fi gradul unui graf neorientat simplu.',
    solution: 'Suma = 12, deci |E| = 6. Conform teoremei lui Hakimi, secvența este grafică — da, este posibil.'
  },
  {
    question: '7. Câte noduri cu grad impar are orice graf neorientat? Justificați.',
    solution: 'Suma gradelor = 2|E| (pară). Suma numerelor impare e pară doar dacă există un număr par de noduri cu grad impar (0, 2, 4, ...).'
  },
  {
    question: '8. Un arbore are 7 frunze și fiecare nod intern are gradul 3. Câte noduri are arborele?',
    solution: 'Fie i noduri interne. Noduri = 7 + i. Muchii = 6 + i. Dar Σdeg = 7×1 + i×3 = 2×(6+i) → 7+3i = 12+2i → i=5. Total: 12 noduri.'
  },
  {
    question: '9. Care este diferența între un drum și un lanț într-un graf orientat?',
    solution: 'Un lanț ignoră direcția arcelor; un drum respectă direcția — fiecare arc merge din nodul curent spre următorul.'
  },
  {
    question: '10. Reprezentați prin listă de adiacență graful cu muchiile: (1,2), (1,3), (2,3), (3,4).',
    solution: '1: [2,3] · 2: [1,3] · 3: [1,2,4] · 4: [3]'
  }
];
