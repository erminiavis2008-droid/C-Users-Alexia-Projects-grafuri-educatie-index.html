document.addEventListener('DOMContentLoaded', () => {
  initBackground();
  initNav();
  initTabs();
  initFilters();
  initScrollTop();
  initScrollReveal();
  initStatsCounter();
  renderToc();
  renderProblems();
  renderExercises();
  initExerciseBulk();
  renderApplications();
  initGallery();
  initLightbox();
  initHeroGraph();
});

function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let nodes = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(216, 180, 254, ${0.18 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(216, 180, 254, 0.45)';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize);
  animate();
}

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle?.addEventListener('click', () => links.classList.toggle('open'));

  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = links?.querySelectorAll('a') || [];

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navItems.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
    });
  });
}

function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`tab-${btn.dataset.tab}`)?.classList.add('active');
    });
  });
}

function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProblems(btn.dataset.filter);
    });
  });
}

function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  window.addEventListener('scroll', () => {
    btn?.classList.toggle('visible', window.scrollY > 400);
  });
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .section-title, .team-card, .toc-card, .app-card, .problem-card, .exercise-card');
  els.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initStatsCounter() {
  const nums = document.querySelectorAll('.stat-num');
  let started = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        nums.forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          let current = 0;
          const step = Math.ceil(target / 20);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current;
          }, 50);
        });
      }
    });
  }, { threshold: 0.5 });

  const bar = document.querySelector('.stats-bar');
  if (bar) observer.observe(bar);
}

function renderToc() {
  const container = document.getElementById('toc-grid');
  if (!container) return;

  container.innerHTML = TOC_ITEMS.map(item => `
    <a href="${item.href}" class="toc-card reveal">
      <span class="toc-icon">${item.icon}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </a>
  `).join('');
}

function initExerciseBulk() {
  document.getElementById('show-all-solutions')?.addEventListener('click', () => {
    document.querySelectorAll('.exercise-solution').forEach(s => s.classList.add('visible'));
    document.querySelectorAll('.toggle-solution').forEach(b => b.textContent = 'Ascunde soluția');
  });
  document.getElementById('hide-all-solutions')?.addEventListener('click', () => {
    document.querySelectorAll('.exercise-solution').forEach(s => s.classList.remove('visible'));
    document.querySelectorAll('.toggle-solution').forEach(b => b.textContent = 'Arată soluția');
  });
}

function renderApplications() {
  const container = document.getElementById('applications-container');
  if (!container) return;

  container.innerHTML = APPLICATIONS.map(app => `
    <article class="app-card reveal">
      <div class="app-icon">
        <img src="${app.image}" alt="${app.title}" loading="lazy">
      </div>
      <div class="app-card-body">
        <h3>${app.title}</h3>
        <p>${app.description}</p>
        <div class="app-mapping">${app.mapping}</div>
      </div>
    </article>
  `).join('');
}

function initGallery() {
  const tabs = document.querySelectorAll('.gallery-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGallery(tab.dataset.gallery);
    });
  });
  renderGallery('diagrame');
}

function renderGallery(type = 'diagrame') {
  const container = document.getElementById('gallery-content');
  if (!container) return;

  if (type === 'fotografii') {
    container.innerHTML = `<div class="gallery-grid">${GALLERY_PHOTOS.map(item => `
      <figure class="gallery-item gallery-photo reveal gallery-clickable" data-photo="1">
        <div class="gallery-visual">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <p>${item.title}</p>
      </figure>
    `).join('')}</div>`;

    container.querySelectorAll('.gallery-photo').forEach(el => {
      el.addEventListener('click', () => {
        const img = el.querySelector('img');
        const title = el.querySelector('p')?.textContent || '';
        openLightbox(`<img src="${img.src}" alt="${title}" style="max-width:100%;border-radius:8px">`, title);
      });
    });
    return;
  }

  if (type === 'video') {
    container.innerHTML = `<div class="gallery-videos">${GALLERY_VIDEOS.map(v => `
      <article class="gallery-video-card reveal">
        <div class="video-wrap">
          <iframe src="${v.embed}" title="${v.title}" allowfullscreen loading="lazy"></iframe>
        </div>
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
      </article>
    `).join('')}</div>`;
    return;
  }

  const items = type === 'animatii' ? GALLERY_ANIMATIONS : GALLERY_ITEMS;
  container.innerHTML = `<div class="gallery-grid">${items.map((item, i) => `
    <figure class="gallery-item reveal" data-gallery-index="${i}" data-gallery-type="${type}">
      <div class="gallery-visual gallery-clickable">${item.svg}</div>
      <p>${item.title}</p>
    </figure>
  `).join('')}</div>`;

  container.querySelectorAll('.gallery-clickable').forEach(el => {
    el.addEventListener('click', () => {
      openLightbox(el.innerHTML, el.closest('.gallery-item')?.querySelector('p')?.textContent || '');
    });
  });
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-close')?.addEventListener('click', () => lb?.classList.add('hidden'));
  lb?.addEventListener('click', e => {
    if (e.target === lb) lb.classList.add('hidden');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lb?.classList.add('hidden');
  });
}

function openLightbox(content, title) {
  const lb = document.getElementById('lightbox');
  const inner = document.getElementById('lightbox-content');
  if (!lb || !inner) return;
  inner.innerHTML = `<h3>${title}</h3><div class="lightbox-visual">${content}</div>`;
  lb.classList.remove('hidden');
}

function initHeroGraph() {
  const container = document.getElementById('hero-graph');
  if (!container) return;

  const nodes = [
    { x: 50, y: 50, label: 'A' },
    { x: 150, y: 20, label: 'B' },
    { x: 250, y: 50, label: 'C' },
    { x: 100, y: 120, label: 'D' },
    { x: 200, y: 120, label: 'E' },
    { x: 150, y: 180, label: 'F' }
  ];
  const edges = [[0,1],[1,2],[0,3],[3,4],[4,2],[3,5],[5,4],[1,4]];

  let angle = 0;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 300 220');
  svg.setAttribute('width', '320');
  svg.setAttribute('height', '240');
  svg.style.filter = 'drop-shadow(0 0 20px rgba(216,180,254,0.35))';

  const edgeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  edges.forEach(([a, b]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', nodes[a].x);
    line.setAttribute('y1', nodes[a].y);
    line.setAttribute('x2', nodes[b].x);
    line.setAttribute('y2', nodes[b].y);
    line.setAttribute('stroke', '#d8b4fe');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('opacity', '0.6');
    edgeGroup.appendChild(line);
  });

  nodes.forEach(n => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', n.x);
    circle.setAttribute('cy', n.y);
    circle.setAttribute('r', '18');
    circle.setAttribute('fill', '#1a2234');
    circle.setAttribute('stroke', '#d8b4fe');
    circle.setAttribute('stroke-width', '2');
    nodeGroup.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', n.x);
    text.setAttribute('y', n.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', '#e2e8f0');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', 'bold');
    text.textContent = n.label;
    nodeGroup.appendChild(text);
  });

  svg.appendChild(edgeGroup);
  svg.appendChild(nodeGroup);
  container.appendChild(svg);

  function pulse() {
    angle += 0.02;
    const scale = 1 + Math.sin(angle) * 0.03;
    svg.style.transform = `scale(${scale})`;
    requestAnimationFrame(pulse);
  }
  pulse();
}
