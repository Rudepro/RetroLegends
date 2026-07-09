/**
 * LANDING.JS
 * Lógica de la landing page
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Inicializar canvas de partículas
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    initParticleBackground(canvas);
  }

  // Cargar y mostrar juegos
  await GameManager.loadGames();
  renderGames();

  // Configurar scroll to top
  setupScrollToTop();

  // Audio en interacciones
  setupAudioInteractions();

  // Animaciones al hacer scroll
  setupScrollAnimations();
});

/**
 * Inicializa fondo animado con partículas
 */
function initParticleBackground(canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = `rgba(0, 255, 0, ${this.opacity})`;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  // Crear partículas
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Redimensionar canvas
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/**
 * Renderiza la grilla de juegos
 */
async function renderGames() {
  const grid = document.getElementById('games-grid');
  const games = GameManager.getAllGames();

  grid.innerHTML = '';

  for (const game of games) {
    const isUnlocked = Storage.isGameUnlocked(game.id);
    const stats = Storage.getGameStats(game.id);

    const card = document.createElement('div');
    card.className = `game-card fade-in ${!isUnlocked ? 'locked' : ''}`;

    const emoji = getGameEmoji(game.id);
    const playtime = stats ? formatPlaytime(stats.totalPlayTime) : '0m';
    const highScore = stats ? stats.highScore : 0;

    card.innerHTML = `
      <div class="game-thumbnail">${emoji}</div>
      <div class="game-info">
        <div class="game-name">${game.title}</div>
        <div class="game-description">${game.description}</div>
        <div class="game-meta">
          <span class="game-genre">🎮 ${game.genre}</span>
          <span class="game-difficulty">⚔️ ${game.difficulty}</span>
        </div>
        ${stats ? `
          <div class="game-meta" style="color: var(--primary-neon); font-size: 0.8rem;">
            <span>Récord: ${highScore}</span>
            <span>Tiempo: ${playtime}</span>
          </div>
        ` : ''}
        <button class="btn btn-small" onclick="playGame('${game.id}')" ${!isUnlocked ? 'disabled' : ''}>
          ${isUnlocked ? '🎮 Jugar' : '🔒 Bloqueado'}
        </button>
      </div>
    `;

    grid.appendChild(card);
  }
}

/**
 * Obtiene emoji para cada juego
 */
function getGameEmoji(gameId) {
  const emojis = {
    'crystal-forge': '💎',
    'quantum-duel': '⚡',
    'biocore': '🧬',
    'shadow-labyrinth': '🌑',
    'rocket-escape': '🚀',
    'forgotten-temple': '🏛️',
    'galaxy-defender': '🛸',
    'echoes-of-darkness': '👿'
  };
  return emojis[gameId] || '🎮';
}

/**
 * Formatea tiempo de juego
 */
function formatPlaytime(seconds) {
  if (seconds < 60) return `${Math.floor(seconds)}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

/**
 * Reproduce sonido y navega a juego
 */
function playGame(gameId) {
  if (Storage.isGameUnlocked(gameId)) {
    AudioManager.playSuccess();
    GameManager.playGame(gameId);
  } else {
    AudioManager.playError();
  }
}

/**
 * Configura scroll suave
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    AudioManager.playBeep();
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Botón scroll to top
 */
function setupScrollToTop() {
  const btn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Audio en interacciones
 */
function setupAudioInteractions() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!btn.disabled) {
        AudioManager.playClick();
      }
    });
  });

  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      AudioManager.playBeep();
    });
  });
}

/**
 * Animaciones al hacer scroll
 */
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .game-card, .about-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
  });
}
