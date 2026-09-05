// ============ NIGHT SKY ============
(function initSky() {
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
    const count = Math.floor((w * h) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.4 + 0.15,
    }));
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const twinkle = prefersReducedMotion ? 0 : Math.sin(t * 0.001 * s.speed + s.phase) * 0.35;
      const alpha = Math.max(0, Math.min(1, s.baseAlpha + twinkle));
      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 227, 211, ${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!prefersReducedMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
})();

// ============ SNAKE SPEECH TYPEWRITER ============
(function initSpeech() {
  const el = document.getElementById('speechText');
  const wrap = document.getElementById('speech');
  const message = "Hiiii Leyla. I was sent to show you around \u2014 snakey";

  function type() {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = message.slice(0, i + 1);
      i++;
      if (i >= message.length) {
        clearInterval(interval);
        wrap.classList.add('done');
      }
    }, 32);
  }

  setTimeout(type, 2200);
})();

// ============ SCROLL CUE ============
document.getElementById('scrollCue').addEventListener('click', () => {
  document.getElementById('reasons').scrollIntoView({ behavior: 'smooth' });
});

// ============ WHY I LOVE YOU ============
(function initReasons() {
  // Placeholders \u2014 edit these to whatever's actually true for you two
  const reasons = [
    "the way you say my name is so incredily cute",
    "you remember tiny things I mention once and bring them up later like it's nothing.",
    "you make ordinary days feel like they're worth remembering.",
    "the absolute perfection of beauty you possess",
    "you're stubborn in exactly the ways that make you, you.",
    "talking to you is the easiest part of my day, every day.",
    "you make me want to be better without ever demanding it.",
    "Leyla, honestly, just all of it. every bit.",
  ];

  const textEl = document.getElementById('reasonText');
  const btn = document.getElementById('reasonBtn');
  const countEl = document.getElementById('reasonCount');
  let seen = [];
  let count = 0;

  function nextReason() {
    if (seen.length === reasons.length) seen = [];
    let idx;
    do {
      idx = Math.floor(Math.random() * reasons.length);
    } while (seen.includes(idx));
    seen.push(idx);
    count++;

    textEl.classList.add('swap');
    setTimeout(() => {
      textEl.textContent = reasons[idx];
      textEl.classList.remove('swap');
    }, 220);

    countEl.textContent = count === 1 ? "1 reason down, plenty more" : `${count} reasons down, plenty more`;
  }

  btn.addEventListener('click', nextReason);
})();

// ============ TIME TOGETHER COUNTER ============
(function initCounter() {
  const start = new Date('2026-08-21T00:00:00');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = new Date();
    let diff = Math.max(0, now - start) / 1000;

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    const seconds = Math.floor(diff);

    daysEl.textContent = days;
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
})();

// ============ HUG BUTTON ============
(function initHug() {
  const btn = document.getElementById('hugBtn');
  const layer = document.getElementById('hugLayer');
  const words = ['mwah', 'mwah \u2764', 'love you', 'Leyla \ud83d\udc95', 'come here'];
  const hearts = ['\u2764', '\ud83d\udc95', '\ud83e\udde1', '\ud83d\udc99'];

  function spawnFloater(text, isHeart) {
    const el = document.createElement('span');
    el.className = 'floater' + (isHeart ? ' heart' : '');
    el.textContent = text;
    el.style.left = `${10 + Math.random() * 80}%`;
    el.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
    el.style.animationDelay = `${Math.random() * 0.4}s`;
    layer.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  btn.addEventListener('click', () => {
    document.body.classList.remove('shake');
    void document.body.offsetWidth; // restart animation
    document.body.classList.add('shake');

    for (let i = 0; i < 6; i++) {
      setTimeout(() => spawnFloater(hearts[Math.floor(Math.random() * hearts.length)], true), i * 90);
    }
    for (let i = 0; i < 4; i++) {
      setTimeout(() => spawnFloater(words[Math.floor(Math.random() * words.length)], false), i * 160 + 150);
    }
  });
})();

// ============ BACKGROUND MUSIC TOGGLE ============
(function initMusic() {
  const audio = document.getElementById('bgm');
  const btn = document.getElementById('musicToggle');

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {
        // no song.mp3 added yet \u2014 that's fine, fails silently
      });
      btn.classList.add('playing');
      btn.textContent = '\u266b';
      btn.setAttribute('aria-label', 'Pause background music');
    } else {
      audio.pause();
      btn.classList.remove('playing');
      btn.textContent = '\u266a';
      btn.setAttribute('aria-label', 'Play background music');
    }
  });
})();

// ============ SNAKE GAME ============
(function initGame() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('gameOverlay');
  const overlayText = document.getElementById('gameOverlayText');
  const startBtn = document.getElementById('gameStart');
  const scoreEl = document.getElementById('gameScore');
  const bestEl = document.getElementById('gameBest');
  const pad = document.getElementById('gamePad');

  const CELL = 16;
  const COLS = canvas.width / CELL;
  const ROWS = canvas.height / CELL;
  const STEP_MS = 130;

  let snake, dir, nextDir, food, score, best, running, loopId, lastTime;

  best = Number(localStorage.getItem('leylaSnakeBest') || 0);
  bestEl.textContent = best;

  function reset() {
    snake = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = score;
    placeFood();
  }

  function placeFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function draw() {
    ctx.fillStyle = '#0c1220';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#a3182b';
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2.6, 0, Math.PI * 2);
    ctx.fill();

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#2c9c96' : '#1f6f6b';
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }

  function tick(t) {
    if (!running) return;
    loopId = requestAnimationFrame(tick);
    if (t - lastTime < STEP_MS) return;
    lastTime = t;

    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS || snake.some(s => s.x === head.x && s.y === head.y)) {
      gameOver();
      return;
    }

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      placeFood();
    } else {
      snake.pop();
    }

    draw();
  }

  function gameOver() {
    running = false;
    cancelAnimationFrame(loopId);
    if (score > best) {
      best = score;
      bestEl.textContent = best;
      localStorage.setItem('leylaSnakeBest', String(best));
      overlayText.textContent = `new best, Leyla! ${score} \ud83d\udc0d`;
    } else {
      overlayText.textContent = `game over \u2014 score: ${score}`;
    }
    overlay.classList.remove('hidden');
    startBtn.textContent = 'play again';
  }

  function start() {
    reset();
    draw();
    running = true;
    lastTime = 0;
    overlay.classList.add('hidden');
    loopId = requestAnimationFrame(tick);
  }

  startBtn.addEventListener('click', start);

  function setDir(x, y) {
    if (dir.x === -x && dir.y === -y) return; // no instant reverse
    nextDir = { x, y };
  }

  window.addEventListener('keydown', (e) => {
    const keyMap = {
      ArrowUp: [0, -1], w: [0, -1], W: [0, -1],
      ArrowDown: [0, 1], s: [0, 1], S: [0, 1],
      ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0],
      ArrowRight: [1, 0], d: [1, 0], D: [1, 0],
    };
    if (keyMap[e.key]) {
      e.preventDefault();
      if (!running) { start(); }
      setDir(...keyMap[e.key]);
    }
  });

  pad.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-dir]');
    if (!b) return;
    if (!running) start();
    const map = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    setDir(...map[b.dataset.dir]);
  });

  reset();
  draw();
})();
