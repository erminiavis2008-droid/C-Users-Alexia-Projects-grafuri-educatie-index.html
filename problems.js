const PROBLEMS = [
  {
    id: 1,
    type: 'neorientat',
    title: 'Numărarea componentelor conexe',
    enunt: 'Se dă un graf neorientat cu n noduri (numerotate de la 1 la n) și m muchii. Determinați numărul de componente conexe ale grafului.',
    idee: 'Parcurgem graful cu DFS (sau BFS) din fiecare nod nevizitat. Fiecare apel DFS dintr-un nod nou descoperă o componentă conexă nouă.',
    algoritm: '1. Inițializăm viz[] = false\n2. Pentru i = 1..n:\n   - Dacă viz[i] = false: apelăm DFS(i), incrementăm contorul\n3. Returnăm contorul',
    cod: `#include <iostream>
#include <vector>
using namespace std;

vector<int> adj[1001];
bool viz[1001];
int n, m, componente = 0;

void DFS(int nod) {
    viz[nod] = true;
    for (int vecin : adj[nod])
        if (!viz[vecin])
            DFS(vecin);
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    for (int i = 1; i <= n; i++)
        if (!viz[i]) { DFS(i); componente++; }
    cout << componente;
    return 0;
}`,
    explicatie: 'Fiecare apel DFS marchează toate nodurile dintr-o componentă. Contorul crește la fiecare componentă nouă descoperită. Complexitate: O(n + m).'
  },
  {
    id: 2,
    type: 'neorientat',
    title: 'Verificarea dacă un graf este conex',
    enunt: 'Dat fiind un graf neorientat cu n noduri și m muchii, verificați dacă graful este conex (există lanț între oricare două noduri).',
    idee: 'Un graf este conex dacă și numai dacă o singură parcurgere DFS/BFS din nodul 1 vizitează toate cele n noduri.',
    algoritm: '1. DFS din nodul 1\n2. Numărăm nodurile vizitate\n3. Dacă număr = n → conex, altfel → neconex',
    cod: `#include <iostream>
#include <vector>
using namespace std;

vector<int> adj[1001];
bool viz[1001];
int n, m, cnt = 0;

void DFS(int nod) {
    viz[nod] = true;
    cnt++;
    for (int v : adj[nod])
        if (!viz[v]) DFS(v);
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    DFS(1);
    cout << (cnt == n ? "DA" : "NU");
    return 0;
}`,
    explicatie: 'Dacă după DFS din nodul 1 am vizitat toate cele n noduri, graful este conex. Altfel, există cel puțin o componentă izolată.'
  },
  {
    id: 3,
    type: 'neorientat',
    title: 'Detectarea unui ciclu într-un graf neorientat',
    enunt: 'Se dă un graf neorientat. Determinați dacă graful conține cel puțin un ciclu.',
    idee: 'În DFS, dacă găsim o muchie către un nod deja vizitat care NU este părintele curent, am descoperit un ciclu.',
    algoritm: 'DFS(nod, părinte):\n  viz[nod] = true\n  pentru fiecare vecin v:\n    dacă v nu e vizitat: DFS(v, nod)\n    altfel dacă v ≠ părinte: CICLU găsit',
    cod: `#include <iostream>
#include <vector>
using namespace std;

vector<int> adj[1001];
bool viz[1001];
bool ciclu = false;

void DFS(int nod, int parinte) {
    viz[nod] = true;
    for (int v : adj[nod]) {
        if (!viz[v]) DFS(v, nod);
        else if (v != parinte) ciclu = true;
    }
}

int main() {
    int n, m; cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    DFS(1, -1);
    cout << (ciclu ? "DA" : "NU");
    return 0;
}`,
    explicatie: 'Muchia de retur (back edge) către un strămoș (nu părintele direct) indică existența unui ciclu în graf.'
  },
  {
    id: 4,
    type: 'orientat',
    title: 'Sortare topologică',
    enunt: 'Se dă un graf orientat aciclic (DAG). Afișați o sortare topologică a nodurilor.',
    idee: 'Folosim algoritmul lui Kahn: procesăm nodurile cu grad interior 0, le eliminăm și actualizăm gradele vecinilor.',
    algoritm: '1. Calculăm gradul interior al fiecărui nod\n2. Adăugăm în coadă nodurile cu grad 0\n3. Extragem nod, îl afișăm, scădem gradul vecinilor\n4. Repetăm până coada e goală',
    cod: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> adj[1001];
int gradInt[1001];
int n, m;

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
        gradInt[b]++;
    }
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (gradInt[i] == 0) q.push(i);
    while (!q.empty()) {
        int nod = q.front(); q.pop();
        cout << nod << " ";
        for (int v : adj[nod])
            if (--gradInt[v] == 0) q.push(v);
    }
    return 0;
}`,
    explicatie: 'Sortarea topologică produce o ordine în care pentru fiecare arc (u,v), u apare înaintea lui v. Funcționează doar pe grafuri aciclice.'
  },
  {
    id: 5,
    type: 'orientat',
    title: 'Detectarea ciclurilor într-un graf orientat',
    enunt: 'Verificați dacă un graf orientat conține cel puțin un ciclu.',
    idee: 'Folosim colorarea nodurilor în DFS: alb (nevizitat), gri (în curs de explorare), negru (finalizat). Un arc către un nod gri indică ciclu.',
    algoritm: 'DFS cu stări color[]:\n  0 = nevizitat, 1 = în explorare, 2 = finalizat\n  Dacă găsim arc către nod cu color=1 → CICLU',
    cod: `#include <iostream>
#include <vector>
using namespace std;

vector<int> adj[1001];
int color[1001]; // 0, 1, 2
bool ciclu = false;
int n, m;

void DFS(int nod) {
    color[nod] = 1;
    for (int v : adj[nod]) {
        if (color[v] == 0) DFS(v);
        else if (color[v] == 1) ciclu = true;
    }
    color[nod] = 2;
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
    }
    for (int i = 1; i <= n; i++)
        if (color[i] == 0) DFS(i);
    cout << (ciclu ? "DA" : "NU");
    return 0;
}`,
    explicatie: 'Nodul gri este în stiva de recursivitate. Un arc înapoi (back edge) către un nod gri închide un ciclu.'
  },
  {
    id: 6,
    type: 'orientat',
    title: 'Drum maxim în DAG (cel mai lung drum)',
    enunt: 'Într-un graf orientat aciclic cu ponderi pe arce, găsiți lungimea celui mai lung drum.',
    idee: 'După sortare topologică, relaxăm distanțele în ordinea topologică (similar cu Bellman-Ford, dar mai eficient pe DAG).',
    algoritm: '1. Sortare topologică\n2. dist[1] = 0, restul = -∞\n3. Pentru fiecare nod în ordine topologică:\n   relaxăm arcele ieșitoare: dist[v] = max(dist[v], dist[u]+w)',
    cod: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct Arc { int dest, pond; };
vector<Arc> adj[1001];
int gradInt[1001], dist[1001];
int n, m;

int main() {
    cin >> n >> m;
    fill(dist + 1, dist + n + 1, -1000000);
    dist[1] = 0;
    for (int i = 0; i < m; i++) {
        int a, b, w; cin >> a >> b >> w;
        adj[a].push_back({b, w});
        gradInt[b]++;
    }
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (gradInt[i] == 0) q.push(i);
    vector<int> ordine;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        ordine.push_back(u);
        for (auto& a : adj[u])
            if (--gradInt[a.dest] == 0) q.push(a.dest);
    }
    for (int u : ordine)
        for (auto& a : adj[u])
            dist[a.dest] = max(dist[a.dest], dist[u] + a.pond);
    cout << *max_element(dist + 1, dist + n + 1);
    return 0;
}`,
    explicatie: 'Pe un DAG, cel mai lung drum se calculează în O(n+m) folosind sortarea topologică, fără risc de cicluri pozitive.'
  },
  {
    id: 7,
    type: 'arbore',
    title: 'Înălțimea unui arbore',
    enunt: 'Se dă un arbore cu rădăcina în nodul 1. Determinați înălțimea arborelui (lungimea celui mai lung drum de la rădăcină la o frunză).',
    idee: 'Parcurgem arborele în DFS. Înălțimea unui nod = 1 + max(înălțimea copiilor). Rădăcina are înălțimea 0.',
    algoritm: 'DFS(nod, părinte):\n  h = 0\n  pentru fiecare copil: h = max(h, DFS(copil) + 1)\n  returnează h',
    cod: `#include <iostream>
#include <vector>
using namespace std;

vector<int> adj[1001];
int n;

int DFS(int nod, int parinte) {
    int h = 0;
    for (int v : adj[nod])
        if (v != parinte)
            h = max(h, DFS(v, nod) + 1);
    return h;
}

int main() {
    int m; cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    cout << DFS(1, -1);
    return 0;
}`,
    explicatie: 'Înălțimea arborelui este numărul de muchii de pe cel mai lung drum rădăcină-frunză. Complexitate: O(n).'
  },
  {
    id: 8,
    type: 'arbore',
    title: 'Cel mai apropiat strămoș comun (LCA)',
    enunt: 'Dat un arbore cu rădăcina 1 și Q perechi de noduri (u, v), găsiți pentru fiecare pereche cel mai apropiat strămoș comun (LCA).',
    idee: 'Folosim binary lifting: preprocesăm pentru fiecare nod strămoșii la distanțe 2^k. LCA se găsește ridicând nodurile la același nivel.',
    algoritm: '1. DFS pentru adâncimi și părinți directi\n2. Binary lifting: up[k][v] = strămoșul la 2^k\n3. Pentru LCA(u,v): ridicăm la același nivel, apoi urcăm simultan',
    cod: `#include <iostream>
#include <vector>
using namespace std;

vector<int> adj[1001];
int up[20][1001], depth[1001];
int n, LOG;

void DFS(int nod, int parinte) {
    up[0][nod] = parinte;
    for (int k = 1; k < LOG; k++)
        up[k][nod] = up[k-1][up[k-1][nod]];
    for (int v : adj[nod])
        if (v != parinte) {
            depth[v] = depth[nod] + 1;
            DFS(v, nod);
        }
}

int LCA(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    for (int k = 0; k < LOG; k++)
        if ((diff >> k) & 1) u = up[k][u];
    if (u == v) return u;
    for (int k = LOG - 1; k >= 0; k--)
        if (up[k][u] != up[k][v]) {
            u = up[k][u]; v = up[k][v];
        }
    return up[0][u];
}

int main() {
    cin >> n;
    LOG = 1; while ((1 << LOG) <= n) LOG++;
    for (int i = 0; i < n - 1; i++) {
        int a, b; cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    DFS(1, 1);
    int q; cin >> q;
    while (q--) {
        int u, v; cin >> u >> v;
        cout << LCA(u, v) << "\\n";
    }
    return 0;
}`,
    explicatie: 'LCA este util în arbori pentru distanțe, căi și query-uri. Binary lifting oferă O(log n) per query după preprocesare O(n log n).'
  }
];

function renderProblems(filter = 'all') {
  const container = document.getElementById('problems-container');
  if (!container) return;

  const filtered = filter === 'all'
    ? PROBLEMS
    : PROBLEMS.filter(p => p.type === filter);

  container.innerHTML = filtered.map(p => `
    <article class="problem-card" data-type="${p.type}">
      <div class="problem-header">
        <span class="problem-tag tag-${p.type}">${p.type === 'neorientat' ? 'Neorientat' : p.type === 'orientat' ? 'Orientat' : 'Arbore'}</span>
        <h3>${p.id}. ${p.title}</h3>
        <span class="problem-toggle">▼</span>
      </div>
      <div class="problem-body">
        <div class="problem-section">
          <h4>Enunț</h4>
          <p>${p.enunt}</p>
        </div>
        <div class="problem-section">
          <h4>Idee de rezolvare</h4>
          <p>${p.idee}</p>
        </div>
        <div class="problem-section">
          <h4>Algoritm</h4>
          <pre>${p.algoritm}</pre>
        </div>
        <div class="problem-section">
          <h4>Implementare C++</h4>
          <pre><code>${escapeHtml(p.cod)}</code></pre>
        </div>
        <div class="problem-section">
          <h4>Explicația rezultatului</h4>
          <p>${p.explicatie}</p>
        </div>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.problem-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });
}

function renderExercises() {
  const container = document.getElementById('exercises-container');
  if (!container) return;

  container.innerHTML = EXERCISES.map((ex, i) => `
    <article class="exercise-card">
      <h3>${ex.question}</h3>
      <button class="toggle-solution" data-index="${i}">Arată soluția</button>
      <div class="exercise-solution" id="sol-${i}">
        <strong>Soluție:</strong> ${ex.solution}
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.toggle-solution').forEach(btn => {
    btn.addEventListener('click', () => {
      const sol = document.getElementById(`sol-${btn.dataset.index}`);
      sol.classList.toggle('visible');
      btn.textContent = sol.classList.contains('visible') ? 'Ascunde soluția' : 'Arată soluția';
    });
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
