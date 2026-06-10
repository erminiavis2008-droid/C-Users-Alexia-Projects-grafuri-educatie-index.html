const SIM_GRAPH = {
  nodes: {
    A: { x: 120, y: 200 },
    B: { x: 220, y: 100 },
    C: { x: 320, y: 200 },
    D: { x: 420, y: 100 },
    E: { x: 480, y: 200 },
    F: { x: 300, y: 320 }
  },
  edges: [
    ['A', 'B'], ['B', 'C'], ['C', 'D'], ['C', 'E'],
    ['A', 'F'], ['F', 'C'], ['B', 'F']
  ],
  adj: {
    A: ['B', 'F'],
    B: ['A', 'C', 'F'],
    C: ['B', 'D', 'E', 'F'],
    D: ['C'],
    E: ['C'],
    F: ['A', 'B', 'C']
  }
};

class GraphSimulator {
  constructor() {
    this.canvas = document.getElementById('sim-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.visited = new Set();
    this.order = [];
    this.animating = false;
    this.highlightNode = null;

    this.bindEvents();
    this.draw();
  }

  bindEvents() {
    document.getElementById('sim-bfs')?.addEventListener('click', () => this.runBFS());
    document.getElementById('sim-dfs')?.addEventListener('click', () => this.runDFS());
    document.getElementById('sim-reset')?.addEventListener('click', () => this.reset());
  }

  reset() {
    this.visited = new Set();
    this.order = [];
    this.animating = false;
    this.highlightNode = null;
    this.setLog('Graf resetat. Apasă BFS sau DFS pentru a începe de la nodul A.');
    this.draw();
  }

  setLog(msg) {
    const el = document.getElementById('sim-log');
    if (el) el.textContent = msg;
  }

  draw() {
    const ctx = this.ctx;
    const { nodes, edges } = SIM_GRAPH;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    edges.forEach(([u, v]) => {
      const a = nodes[u], b = nodes[v];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    Object.entries(nodes).forEach(([id, pos]) => {
      const isVisited = this.visited.has(id);
      const isActive = this.highlightNode === id;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#d8b4fe' : isVisited ? 'rgba(216, 180, 254, 0.4)' : '#211829';
      ctx.fill();
      ctx.strokeStyle = isVisited ? '#d8b4fe' : '#6b5b7b';
      ctx.lineWidth = isActive ? 3 : 2;
      ctx.stroke();

      ctx.fillStyle = isActive ? '#1a0f24' : '#f3e8ff';
      ctx.font = 'bold 16px DM Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(id, pos.x, pos.y);

      if (isVisited) {
        const idx = this.order.indexOf(id);
        ctx.fillStyle = '#f0abfc';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(idx + 1, pos.x + 18, pos.y - 18);
      }
    });
  }

  async runBFS() {
    if (this.animating) return;
    this.reset();
    this.animating = true;
    this.setLog('BFS: explorăm în lățime din A...');

    const queue = ['A'];
    this.visited.add('A');

    while (queue.length > 0) {
      const node = queue.shift();
      this.highlightNode = node;
      this.order.push(node);
      this.setLog(`BFS vizitează: ${node} | Ordine: ${this.order.join(' → ')}`);
      this.draw();
      await this.sleep(800);

      for (const neighbor of SIM_GRAPH.adj[node]) {
        if (!this.visited.has(neighbor)) {
          this.visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    this.highlightNode = null;
    this.setLog(`BFS finalizat! Ordinea: ${this.order.join(' → ')}`);
    this.animating = false;
    this.draw();
  }

  async runDFS() {
    if (this.animating) return;
    this.reset();
    this.animating = true;
    this.setLog('DFS: explorăm în adâncime din A...');

    const dfs = async (node) => {
      this.highlightNode = node;
      this.visited.add(node);
      this.order.push(node);
      this.setLog(`DFS vizitează: ${node} | Ordine: ${this.order.join(' → ')}`);
      this.draw();
      await this.sleep(800);

      for (const neighbor of SIM_GRAPH.adj[node]) {
        if (!this.visited.has(neighbor)) {
          await dfs(neighbor);
        }
      }
    };

    await dfs('A');
    this.highlightNode = null;
    this.setLog(`DFS finalizat! Ordinea: ${this.order.join(' → ')}`);
    this.animating = false;
    this.draw();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

document.addEventListener('DOMContentLoaded', () => new GraphSimulator());
