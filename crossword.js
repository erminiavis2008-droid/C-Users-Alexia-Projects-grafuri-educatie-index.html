const CROSSWORD_DATA = {
  rows: 11,
  cols: 10,
  words: [
    { word: 'GRAF', clue: '1. Structură formată din noduri și muchii/arce', row: 0, col: 0, dir: 'across', num: 1 },
    { word: 'NOD', clue: '2. Element de bază al unui graf (vârf)', row: 2, col: 0, dir: 'across', num: 2 },
    { word: 'MUCHIE', clue: '3. Legătură între două noduri într-un graf neorientat', row: 4, col: 0, dir: 'across', num: 3 },
    { word: 'ARC', clue: '4. Legătură orientată între două noduri', row: 6, col: 0, dir: 'across', num: 4 },
    { word: 'ARBORE', clue: '5. Graf conex fără cicluri', row: 8, col: 0, dir: 'across', num: 5 },
    { word: 'CICLU', clue: '6. Lanț închis care revine la punctul de start', row: 0, col: 7, dir: 'down', num: 6 },
    { word: 'CONEX', clue: '7. Există lanț între orice pereche de noduri', row: 0, col: 9, dir: 'down', num: 7 },
    { word: 'GRAD', clue: '8. Numărul de muchii incidente cu un nod', row: 2, col: 7, dir: 'across', num: 8 },
    { word: 'DRUM', clue: '9. Succesiune de arce cu direcție coerentă', row: 4, col: 7, dir: 'across', num: 9 },
    { word: 'BFS', clue: '10. Parcurgere în lățime (abreviere)', row: 6, col: 7, dir: 'across', num: 10 },
    { word: 'DFS', clue: '11. Parcurgere în adâncime (abreviere)', row: 8, col: 7, dir: 'across', num: 11 }
  ]
};

class Crossword {
  constructor() {
    this.grid = [];
    this.solution = [];
    this.init();
  }

  init() {
    const { rows, cols, words } = CROSSWORD_DATA;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    this.solution = Array.from({ length: rows }, () => Array(cols).fill(''));

    words.forEach(w => {
      const letters = w.word.split('');
      letters.forEach((letter, i) => {
        const r = w.dir === 'across' ? w.row : w.row + i;
        const c = w.dir === 'across' ? w.col + i : w.col;
        if (r < rows && c < cols) {
          const existing = this.grid[r][c];
          const cellNum = i === 0 ? w.num : (existing?.number || null);
          this.grid[r][c] = { letter, wordId: w.word, number: cellNum };
          this.solution[r][c] = letter;
        }
      });
    });

    this.renderGrid();
    this.renderClues(words);
    this.bindControls();
  }

  renderGrid() {
    const container = document.getElementById('crossword-grid');
    if (!container) return;

    container.style.gridTemplateColumns = `repeat(${CROSSWORD_DATA.cols}, 32px)`;

    let html = '';
    for (let r = 0; r < CROSSWORD_DATA.rows; r++) {
      for (let c = 0; c < CROSSWORD_DATA.cols; c++) {
        const cell = this.grid[r][c];
        if (!cell) {
          html += `<div class="crossword-cell block"></div>`;
        } else {
          const num = cell.number ? `<span class="cell-number">${cell.number}</span>` : '';
          html += `<div class="crossword-cell" data-row="${r}" data-col="${c}">
            ${num}
            <input type="text" maxlength="1" data-row="${r}" data-col="${c}" aria-label="Celulă ${r},${c}">
          </div>`;
        }
      }
    }
    container.innerHTML = html;

    container.querySelectorAll('input').forEach(input => {
      input.addEventListener('focus', () => this.highlightCell(input));
      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-ZĂÂÎȘȚ]/g, '').slice(-1);
        this.moveNext(input);
      });
      input.addEventListener('keydown', (e) => this.handleKey(e, input));
    });
  }

  renderClues(words) {
    const container = document.getElementById('crossword-clues-list');
    if (!container) return;

    const across = words.filter(w => w.dir === 'across').sort((a, b) => a.num - b.num);
    const down = words.filter(w => w.dir === 'down').sort((a, b) => a.num - b.num);

    let html = '<h4>Pe orizontală</h4>';
    across.forEach(w => {
      html += `<div class="clue-item" data-word="${w.word}">${w.clue}</div>`;
    });
    if (down.length) {
      html += '<h4 style="margin-top:1rem">Pe verticală</h4>';
      down.forEach(w => {
        html += `<div class="clue-item" data-word="${w.word}">${w.clue}</div>`;
      });
    }
    container.innerHTML = html;
  }

  highlightCell(input) {
    document.querySelectorAll('.crossword-cell').forEach(c => c.classList.remove('active'));
    input.parentElement.classList.add('active');
  }

  moveNext(input) {
    const r = parseInt(input.dataset.row);
    const c = parseInt(input.dataset.col);
    const next = document.querySelector(`input[data-row="${r}"][data-col="${c + 1}"]`)
      || document.querySelector(`input[data-row="${r + 1}"][data-col="${c}"]`);
    if (next) next.focus();
  }

  handleKey(e, input) {
    if (e.key === 'Backspace' && !input.value) {
      const r = parseInt(input.dataset.row);
      const c = parseInt(input.dataset.col);
      const prev = document.querySelector(`input[data-row="${r}"][data-col="${c - 1}"]`);
      if (prev) { prev.focus(); prev.value = ''; }
    }
  }

  bindControls() {
    document.getElementById('check-crossword')?.addEventListener('click', () => this.check());
    document.getElementById('reveal-crossword')?.addEventListener('click', () => this.reveal());
  }

  check() {
    let correct = 0, total = 0;
    document.querySelectorAll('.crossword-cell input').forEach(input => {
      const r = parseInt(input.dataset.row);
      const c = parseInt(input.dataset.col);
      const expected = this.solution[r][c];
      total++;
      const cell = input.parentElement;
      cell.classList.remove('correct', 'wrong');
      if (input.value.toUpperCase() === expected) {
        cell.classList.add('correct');
        correct++;
      } else if (input.value) {
        cell.classList.add('wrong');
      }
    });
    const fb = document.getElementById('crossword-feedback');
    if (fb) {
      fb.textContent = `Ai ${correct} din ${total} litere corecte!`;
      fb.style.color = correct === total ? 'var(--accent-3)' : 'var(--accent)';
    }
  }

  reveal() {
    document.querySelectorAll('.crossword-cell input').forEach(input => {
      const r = parseInt(input.dataset.row);
      const c = parseInt(input.dataset.col);
      input.value = this.solution[r][c];
      input.parentElement.classList.add('correct');
    });
    const fb = document.getElementById('crossword-feedback');
    if (fb) fb.textContent = 'Toate soluțiile au fost afișate.';
  }
}

document.addEventListener('DOMContentLoaded', () => new Crossword());
