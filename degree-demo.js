function initDegreeDemo() {
  const container = document.getElementById('degree-demo');
  if (!container) return;

  const edges = [
    [1, 2], [1, 4], [2, 3], [2, 4], [3, 4]
  ];

  const degrees = { 1: 0, 2: 0, 3: 0, 4: 0 };
  edges.forEach(([a, b]) => { degrees[a]++; degrees[b]++; });

  container.innerHTML = `
    <div class="degree-demo-layout">
      <svg viewBox="0 0 260 200" class="degree-svg">
        <line x1="60" y1="100" x2="130" y2="40" class="edge"/>
        <line x1="130" y1="40" x2="200" y2="100" class="edge"/>
        <line x1="200" y1="100" x2="130" y2="160" class="edge"/>
        <line x1="130" y1="160" x2="60" y2="100" class="edge"/>
        <line x1="130" y1="40" x2="130" y2="160" class="edge"/>
        ${[1,2,3,4].map((n, i) => {
          const pos = [[60,100],[130,40],[200,100],[130,160]][i];
          return `<circle cx="${pos[0]}" cy="${pos[1]}" r="20" class="node degree-node" data-node="${n}"/>
            <text x="${pos[0]}" y="${pos[1]+5}" class="node-label">${n}</text>
            <text x="${pos[0]}" y="${pos[1]-30}" class="degree-badge" id="deg-${n}">grad ${degrees[n]}</text>`;
        }).join('')}
      </svg>
      <div class="degree-info">
        <p>Click pe un nod pentru a vedea muchiile incidente:</p>
        <div id="degree-detail" class="degree-detail">Selectează un nod din graf.</div>
        <p class="note">Teorema mâinilor: Σ deg(v) = 2×|E| = 2×5 = <strong>10</strong></p>
      </div>
    </div>
  `;

  const edgeMap = {
    1: ['1—2', '1—4'],
    2: ['2—1', '2—3', '2—4'],
    3: ['3—2', '3—4'],
    4: ['4—1', '4—2', '4—3']
  };

  container.querySelectorAll('.degree-node').forEach(circle => {
    circle.style.cursor = 'pointer';
    circle.addEventListener('click', () => {
      const n = circle.dataset.node;
      container.querySelectorAll('.degree-node').forEach(c => c.setAttribute('stroke', '#d8b4fe'));
      circle.setAttribute('stroke', '#f0abfc');
      circle.setAttribute('stroke-width', '3');
      document.getElementById('degree-detail').innerHTML =
        `<strong>Nodul ${n}</strong> are gradul <strong>${degrees[n]}</strong>.<br>Muchii incidente: ${edgeMap[n].join(', ')}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', initDegreeDemo);
