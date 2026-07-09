/**
 * BIOCORE - Juego tipo Snake con evolución, mutaciones y biomas
 */

class BioCore {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gameState = 'menu';
    this.score = 0;
    this.level = 1;
    this.gameTime = 0;
    
    // Organismo
    this.organism = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.speed = 100;
    this.moveTimer = 0;
    
    // Alimento y mutaciones
    this.food = null;
    this.mutations = [];
    this.dnaPool = 100;
    
    this.init();
  }

  init() {
    this.setupOrganism();
    this.setupInput();
    this.startGameLoop();
  }

  setupOrganism() {
    this.organism = [
      { x: 20, y: 20 },
      { x: 19, y: 20 },
      { x: 18, y: 20 }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.spawnFood();
  }

  spawnFood() {
    this.food = {
      x: Math.floor(Math.random() * (this.width / 10)) * 10,
      y: Math.floor(Math.random() * (this.height / 10)) * 10,
      type: Math.random() < 0.7 ? 'normal' : 'mutation'
    };
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
      if (e.key === 'ArrowDown' && this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
      if (e.key === 'ArrowLeft' && this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
      if (e.key === 'ArrowRight' && this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
    });
  }

  update(dt) {
    if (this.gameState !== 'playing') return;

    this.gameTime += dt;
    this.moveTimer += dt;

    if (this.moveTimer > 1 / this.speed) {
      this.moveTimer = 0;
      this.direction = { ...this.nextDirection };

      const head = this.organism[0];
      const newHead = {
        x: head.x + this.direction.x,
        y: head.y + this.direction.y
      };

      // Colisiones con paredes (wrap)
      newHead.x = (newHead.x + this.width / 10) % (this.width / 10);
      newHead.y = (newHead.y + this.height / 10) % (this.height / 10);

      // Colisión consigo mismo
      if (this.organism.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        this.gameOver();
        return;
      }

      this.organism.unshift(newHead);

      // Comer alimento
      if (newHead.x === this.food.x && newHead.y === this.food.y) {
        AudioManager.playSuccess();
        this.score += this.food.type === 'mutation' ? 50 : 10;
        
        if (this.food.type === 'mutation') {
          this.dnaPool += 30;
          this.applyMutation();
        }

        this.spawnFood();
      } else {
        this.organism.pop();
      }
    }

    ParticleSystem.update(dt);
  }

  applyMutation() {
    const mutations = ['speed', 'size', 'regeneration'];
    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    
    switch (mutation) {
      case 'speed':
        this.speed *= 1.1;
        break;
      case 'size':
        // Agregar segmento extra
        const tail = this.organism[this.organism.length - 1];
        this.organism.push({ ...tail });
        break;
      case 'regeneration':
        this.organism.push({ ...this.organism[this.organism.length - 1] });
        break;
    }
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    this.recordSession();
    this.showGameOverMenu();
  }

  recordSession() {
    const stats = {
      victory: this.score > 100,
      score: this.score,
      level: this.level,
      playTime: this.gameTime
    };
    GameManager.recordGameSession('biocore', stats);
  }

  draw() {
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Grid
    this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
    for (let i = 0; i < this.width; i += 10) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.height);
      this.ctx.stroke();
    }

    // Organismo
    this.organism.forEach((segment, index) => {
      const alpha = 1 - (index / this.organism.length) * 0.5;
      this.ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
      this.ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(segment.x * 10, segment.y * 10, 10, 10);
    });

    // Alimento
    this.ctx.fillStyle = this.food.type === 'mutation' ? '#ff00ff' : '#ffaa00';
    this.ctx.fillRect(this.food.x * 10, this.food.y * 10, 10, 10);

    ParticleSystem.draw(this.ctx);
  }

  startGameLoop() {
    let lastTime = Date.now();

    const gameLoop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      this.update(dt);
      this.draw();

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
  }
}

let game = null;

function initGame() {
  game = new BioCore(document.getElementById('gameCanvas'));
}

function startGame() {
  game.setupOrganism();
  game.gameState = 'playing';
  document.getElementById('mainMenu').classList.remove('active');
  updateUI();
}

function resumeGame() {
  game.gameState = 'playing';
  document.getElementById('pauseMenu').classList.remove('active');
}

function showGameOverMenu() {
  document.getElementById('finalScore').textContent = game.score;
  document.getElementById('gameOverMenu').classList.add('active');
}

function goHome() {
  window.location.href = '../index.html';
}

function updateUI() {
  document.getElementById('score').textContent = game.score;
  document.getElementById('level').textContent = game.level;
  document.getElementById('size').textContent = game.organism.length;
}

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (game.gameState === 'playing') {
    game.gameState = 'paused';
    document.getElementById('pauseMenu').classList.add('active');
  }
});

document.getElementById('menuBtn').addEventListener('click', () => {
  goHome();
});

window.addEventListener('load', () => {
  initGame();
  updateUI();
});
