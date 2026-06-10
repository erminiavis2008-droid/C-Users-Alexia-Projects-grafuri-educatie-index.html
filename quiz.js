const QUIZ_QUESTIONS = [
  {
    type: 'multipla',
    question: 'Ce reprezintă o muchie într-un graf neorientat?',
    options: [
      'O pereche ordonată de noduri',
      'O pereche neordonată de noduri',
      'Un nod izolat',
      'O mulțime de arce'
    ],
    answer: 1
  },
  {
    type: 'adevarat',
    question: 'Un arbore cu n noduri are exact n−1 muchii.',
    options: ['Adevărat', 'Fals'],
    answer: 0
  },
  {
    type: 'multipla',
    question: 'Care este suma gradelor tuturor nodurilor într-un graf neorientat cu m muchii?',
    options: ['m', '2m', 'm/2', 'n'],
    answer: 1
  },
  {
    type: 'completare',
    question: 'Un graf neorientat fără cicluri și conex se numește _______.',
    answer: 'arbore'
  },
  {
    type: 'multipla',
    question: 'Într-un graf orientat, gradul exterior al unui nod reprezintă:',
    options: [
      'Numărul de arce care intră în nod',
      'Numărul de arce care ies din nod',
      'Suma gradelor tuturor nodurilor',
      'Numărul total de noduri'
    ],
    answer: 1
  },
  {
    type: 'adevarat',
    question: 'Într-un graf neorientat, numărul de noduri cu grad impar este întotdeauna par.',
    options: ['Adevărat', 'Fals'],
    answer: 0
  },
  {
    type: 'multipla',
    question: 'Algoritmul BFS parcurge graful:',
    options: [
      'În adâncime, folosind stivă',
      'În lățime, folosind coadă',
      'Aleatoriu',
      'Doar pe arbori'
    ],
    answer: 1
  },
  {
    type: 'completare',
    question: 'În matricea de adiacență, elementul A[i][j] = 1 înseamnă că există muchie/arcul de la i la _______.',
    answer: 'j'
  },
  {
    type: 'adevarat',
    question: 'Un graf complet cu n noduri are n(n−1)/2 muchii.',
    options: ['Adevărat', 'Fals'],
    answer: 0
  },
  {
    type: 'multipla',
    question: 'Care reprezentare este mai eficientă pentru un graf rar (puține muchii)?',
    options: [
      'Matricea de adiacență',
      'Lista de adiacență',
      'Ambele la fel',
      'Niciuna'
    ],
    answer: 1
  },
  {
    type: 'multipla',
    question: 'Un lanț eulerian există într-un graf neorientat conex dacă:',
    options: [
      'Toate nodurile au grad par',
      'Exact 0 sau 2 noduri au grad impar',
      'Graful are un ciclu',
      'Graful este complet'
    ],
    answer: 1
  },
  {
    type: 'adevarat',
    question: 'DFS folosește o structură de tip stivă (explicită sau prin recursivitate).',
    options: ['Adevărat', 'Fals'],
    answer: 0
  },
  {
    type: 'completare',
    question: 'Un graf orientat în care există drum între oricare două noduri în ambele sensuri se numește tare _______.',
    answer: 'conex'
  },
  {
    type: 'multipla',
    question: 'Câte muchii are graful complet K₄?',
    options: ['4', '6', '8', '12'],
    answer: 1
  },
  {
    type: 'multipla',
    question: 'Care dintre următoarele NU este o proprietate a unui arbore?',
    options: [
      'Este conex',
      'Nu are cicluri',
      'Are exact n−1 muchii',
      'Toate nodurile au gradul cel puțin 2'
    ],
    answer: 3
  },
  {
    type: 'adevarat',
    question: 'Sortarea topologică poate fi aplicată oricărui graf orientat.',
    options: ['Adevărat', 'Fals'],
    answer: 1
  },
  {
    type: 'completare',
    question: 'Algoritmul care găsește drumul minim de la o sursă la toate nodurile (cu ponderi nenegative) se numește algoritmul lui _______.',
    answer: 'dijkstra'
  }
];

class Quiz {
  constructor() {
    this.questions = QUIZ_QUESTIONS.slice(0, 15);
    this.current = 0;
    this.score = 0;
    this.answered = false;
    this.selected = null;

    this.startBtn = document.getElementById('start-quiz');
    this.restartBtn = document.getElementById('restart-quiz');
    this.nextBtn = document.getElementById('quiz-next');
    this.startScreen = document.getElementById('quiz-start');
    this.gameScreen = document.getElementById('quiz-game');
    this.resultScreen = document.getElementById('quiz-result');
    this.questionArea = document.getElementById('quiz-question-area');
    this.progressFill = document.getElementById('quiz-progress-fill');
    this.counter = document.getElementById('quiz-counter');

    this.bindEvents();
  }

  bindEvents() {
    this.startBtn?.addEventListener('click', () => this.start());
    this.restartBtn?.addEventListener('click', () => this.start());
    this.nextBtn?.addEventListener('click', () => this.next());
  }

  start() {
    this.current = 0;
    this.score = 0;
    this.startScreen.classList.add('hidden');
    this.resultScreen.classList.add('hidden');
    this.gameScreen.classList.remove('hidden');
    this.showQuestion();
  }

  showQuestion() {
    const q = this.questions[this.current];
    this.answered = false;
    this.selected = null;
    this.nextBtn.disabled = true;

    const pct = ((this.current) / this.questions.length) * 100;
    this.progressFill.style.width = pct + '%';
    this.counter.textContent = `${this.current + 1} / ${this.questions.length}`;

    const typeLabels = {
      multipla: 'Alegere multiplă',
      adevarat: 'Adevărat / Fals',
      completare: 'Completare'
    };

    let html = `
      <div class="quiz-question">
        <span class="quiz-type-badge">${typeLabels[q.type]}</span>
        <h3>${q.question}</h3>
    `;

    if (q.type === 'completare') {
      html += `<input type="text" class="quiz-input" id="quiz-fill" placeholder="Scrie răspunsul..." autocomplete="off">`;
    } else {
      html += '<div class="quiz-options">';
      q.options.forEach((opt, i) => {
        html += `<label class="quiz-option" data-index="${i}"><input type="radio" name="quiz-opt" value="${i}" hidden> ${opt}</label>`;
      });
      html += '</div>';
    }

    html += '</div>';
    this.questionArea.innerHTML = html;

    if (q.type === 'completare') {
      const input = document.getElementById('quiz-fill');
      input.addEventListener('input', () => {
        this.selected = input.value.trim();
        this.nextBtn.disabled = this.selected.length === 0;
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.selected) this.checkAnswer();
      });
    } else {
      this.questionArea.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', () => {
          if (this.answered) return;
          this.questionArea.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          this.selected = parseInt(opt.dataset.index);
          this.nextBtn.disabled = false;
        });
      });
    }

    this.nextBtn.textContent = this.current === this.questions.length - 1 ? 'Vezi rezultatul' : 'Următoarea întrebare';
    this.nextBtn.onclick = () => {
      if (!this.answered) this.checkAnswer();
      else this.next();
    };
  }

  checkAnswer() {
    if (this.answered) return;
    const q = this.questions[this.current];
    this.answered = true;
    let correct = false;

    if (q.type === 'completare') {
      const userAns = this.selected.toLowerCase().trim();
      const correctAns = q.answer.toLowerCase().trim();
      correct = userAns === correctAns || userAns.includes(correctAns);
      const input = document.getElementById('quiz-fill');
      input.style.borderColor = correct ? 'var(--accent-3)' : '#f87171';
      input.disabled = true;
    } else {
      correct = this.selected === q.answer;
      this.questionArea.querySelectorAll('.quiz-option').forEach((opt, i) => {
        if (i === q.answer) opt.classList.add('correct');
        else if (i === this.selected && !correct) opt.classList.add('wrong');
      });
    }

    if (correct) this.score++;
    this.nextBtn.disabled = false;
  }

  next() {
    this.current++;
    if (this.current >= this.questions.length) {
      this.showResult();
    } else {
      this.showQuestion();
    }
  }

  showResult() {
    this.gameScreen.classList.add('hidden');
    this.resultScreen.classList.remove('hidden');
    this.progressFill.style.width = '100%';

    document.getElementById('score-value').textContent = this.score;
    const pct = Math.round((this.score / this.questions.length) * 100);
    let msg = '';
    if (pct >= 90) msg = 'Excelent! Ești un expert în grafuri! 🎉';
    else if (pct >= 70) msg = 'Foarte bine! Cunoștințele tale sunt solide. 👏';
    else if (pct >= 50) msg = 'Bine! Mai exersează puțin. 📚';
    else msg = 'Revizuiește partea teoretică și încearcă din nou. 💪';

    document.getElementById('score-message').textContent = `${msg} Ai obținut ${pct}% (${this.score} din ${this.questions.length}).`;
  }
}

document.addEventListener('DOMContentLoaded', () => new Quiz());
