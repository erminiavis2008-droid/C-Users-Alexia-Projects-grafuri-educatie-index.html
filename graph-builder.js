class GraphBuilder {
  constructor() {
    this.canvas = document.getElementById('builder-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.edges = [];
    this.directed = false;
    this.mode = 'add-node';
    this.edgeStart = null;
    this.dragNode = null;
    this.nextId = 1;
    this.hoveredNode = null;

    this.bindEvents();
    this.updateOutput();
    this.draw();
  }

  bindEvents() {
    document.querySelectorAll('[data-builder-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-builder-mode]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.mode = btn.dataset.builderMode;
        this.edgeStart = null;
        const msgs = {
          'add-node': 'Mod: Adaugă nod — click pe canvas.',
          'add-edge': 'Mod: Adaugă muchie — click pe două noduri.',
          'move': 'Mod: Mută — trage nodurile.',
          'delete': 'Mod: Șterge — click pe un nod.'
        };
        this.updateStatus(msgs[this.mode] || '');
      });
    });

    document.getElementById('builder-directed')?.addEventListener('change', e => {
      this.directed = e.target.checked;
      this.updateOutput();
    });

    document.getElementById('builder-clear')?.addEventListener('click', () => this.clear());
    document.getElementById('builder-random')?.addEventListener('click', () => this.generateRandom());

    this.canvas.addEventListener('mousedown', e => this.onMouseDown(e));
    this.canvas.addEventListener('mousemove', e => this.onMouseMove(e));
    this.canvas.addEventListener('mouseup', () => { this.dragNode = null; });
    this.canvas.addEventListener('mouseleave', () => { this.dragNode = null; this.hoveredNode = null; this.draw(); });
  }

  getPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  findNode(x, y) {
    return this.nodes.find(n => Math.hypot(n.x - x, n.y - y) < 20);
  }

  onMouseDown(e) {
    const { x, y } = this.getPos(e);
    const node = this.findNode(x, y);

    if (this.mode === 'add-node' && !node) {
      const label = String.fromCharCode(64 + this.nextId) || String(this.nextId);
      this.nodes.push({ id: this.nextId++, label, x, y });
      this.updateOutput();
      this.draw();
      return;
    }

    if (this.mode === 'add-edge') {
      if (!node) return;
      if (!this.edgeStart) {
        this.edgeStart = node;
        this.updateStatus(`Selectat ${node.label}. Alege al doilea nod.`);
      } else if (this.edgeStart.id !== node.id) {
        const exists = this.edges.some(e =>
          (e.from === this.edgeStart.id && e.to === node.id) ||
          (!this.directed && e.from === node.id && e.to === this.edgeStart.id)
        );
        if (!exists) this.edges.push({ from: this.edgeStart.id, to: node.id });
        this.edgeStart = null;
        this.updateOutput();
        this.updateStatus('Muchie adăugată.');
      }
      this.draw();
      return;
    }

    if (this.mode === 'delete' && node) {
      this.nodes = this.nodes.filter(n => n.id !== node.id);
      this.edges = this.edges.filter(e => e.from !== node.id && e.to !== node.id);
      this.updateOutput();
      this.draw();
      return;
    }

    if (this.mode === 'move' && node) {
      this.dragNode = node;
    }
  }

  onMouseMove(e) {
    const { x, y } = this.getPos(e);
    if (this.dragNode) {
      this.dragNode.x = x;
      this.dragNode.y = y;
      this.draw();
      return;
    }
    this.hoveredNode = this.findNode(x, y);
    this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'crosshair';
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.edges.forEach(edge => {
      const a = this.nodes.find(n => n.id === edge.from);
      const b = this.nodes.find(n => n.id === edge.to);
      if (!a || !b) return;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = 'rgba(216, 180, 254, 0.55)';
      ctx.lineWidth = 2;
      ctx.stroke();

      if (this.directed) {
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const ax = b.x - Math.cos(angle) * 22;
        const ay = b.y - Math.sin(angle) * 22;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 8 * Math.cos(angle - 0.4), ay - 8 * Math.sin(angle - 0.4));
        ctx.lineTo(ax - 8 * Math.cos(angle + 0.4), ay - 8 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = '#d8b4fe';
        ctx.fill();
      }
    });

    if (this.edgeStart) {
      ctx.beginPath();
      ctx.arc(this.edgeStart.x, this.edgeStart.y, 24, 0, Math.PI * 2);
      ctx.strokeStyle = '#f0abfc';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    this.nodes.forEach(n => {
      const active = n === this.edgeStart || n === this.hoveredNode;
      ctx.beginPath();
      ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = active ? '#d8b4fe' : '#211829';
      ctx.fill();
      ctx.strokeStyle = active ? '#fff' : '#d8b4fe';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = active ? '#1a0f24' : '#f3e8ff';
      ctx.font = 'bold 14px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y);
    });
  }

  updateOutput() {
    const listEl = document.getElementById('builder-adj-list');
    const matrixEl = document.getElementById('builder-adj-matrix');
    const statsEl = document.getElementById('builder-stats');
    if (!listEl) return;

    const labels = {};
    this.nodes.forEach(n => { labels[n.id] = n.label; });

    const adj = {};
    this.nodes.forEach(n => { adj[n.label] = []; });
    this.edges.forEach(e => {
      const from = labels[e.from];
      const to = labels[e.to];
      if (from && to) {
        if (!adj[from].includes(to)) adj[from].push(to);
        if (!this.directed && !adj[to].includes(from)) adj[to].push(from);
      }
    });

    listEl.textContent = Object.keys(adj).length
      ? Object.entries(adj).map(([k, v]) => `${k}: [${v.join(', ')}]`).join('\n')
      : 'Adaugă noduri pentru a vedea lista.';

    const sorted = this.nodes.map(n => n.label).sort();
    if (sorted.length === 0) {
      matrixEl.innerHTML = '<p class="note">Matricea apare aici.</p>';
    } else {
      let html = '<table class="adj-matrix"><tr><th></th>';
      sorted.forEach(l => { html += `<th>${l}</th>`; });
      html += '</tr>';
      sorted.forEach(row => {
        html += `<tr><th>${row}</th>`;
        sorted.forEach(col => {
          const connected = adj[row]?.includes(col) ? 1 : 0;
          html += `<td>${connected}</td>`;
        });
        html += '</tr>';
      });
      html += '</table>';
      matrixEl.innerHTML = html;
    }

    const degrees = {};
    this.nodes.forEach(n => { degrees[n.label] = 0; });
    this.edges.forEach(e => {
      const from = labels[e.from];
      const to = labels[e.to];
      if (from) degrees[from]++;
      if (!this.directed && to) degrees[to]++;
      else if (this.directed && to) degrees[to]++;
    });

    if (statsEl) {
      const degStr = Object.entries(degrees).map(([k, v]) => `${k}: ${v}`).join(' · ');
      statsEl.textContent = `${this.nodes.length} noduri · ${this.edges.length} muchii/arce${degStr ? ' · Grade: ' + degStr : ''}`;
    }
  }

  updateStatus(msg) {
    const el = document.getElementById('builder-status');
    if (el) el.textContent = msg;
  }

  clear() {
    this.nodes = [];
    this.edges = [];
    this.edgeStart = null;
    this.nextId = 1;
    this.updateOutput();
    this.updateStatus('Graf șters. Click pe canvas pentru a adăuga noduri.');
    this.draw();
  }

  generateRandom() {
    this.clear();
    const count = 5 + Math.floor(Math.random() * 3);
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const r = 120;

    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count - Math.PI / 2;
      this.nodes.push({
        id: this.nextId,
        label: String.fromCharCode(64 + this.nextId),
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      });
      this.nextId++;
    }

    for (let i = 0; i < count + 2; i++) {
      const a = this.nodes[Math.floor(Math.random() * count)];
      const b = this.nodes[Math.floor(Math.random() * count)];
      if (a.id !== b.id) {
        const exists = this.edges.some(e =>
          (e.from === a.id && e.to === b.id) ||
          (!this.directed && e.from === b.id && e.to === a.id)
        );
        if (!exists) this.edges.push({ from: a.id, to: b.id });
      }
    }

    this.updateOutput();
    this.updateStatus('Graf aleator generat!');
    this.draw();
  }
}

document.addEventListener('DOMContentLoaded', () => new GraphBuilder());
