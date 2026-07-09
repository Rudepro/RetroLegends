/**
 * ROCKET ESCAPE - Juego tipo Flappy Bird
 */

class RocketEscape {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gameState = 'menu';
    this.score = 0;
    this.distance = 0;
    this.lives = 3;
    this.gameTime = 0;
    
    // Cohete
    this.rocket = {
      x: this.width / 2,
      y: this.height / 2,
      width: 15,
      height: 25,
      vy: 0,
      gravity: 400
    };
    
    // Obstáculos
    this.pipes = [];
    this.meteorites = [];
    this.storms = [];
    this.pipeSpawnTimer = 0;
    
    this.init();
  }

  init() {
    this.setupInput();
    this.startGameLoop();
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'ArrowUp') && this.gameState === 'playing') {
        e.preventDefault();
        this.rocket.vy = -250;
        AudioManager.playBeep();
      }
    });

    this.canvas.addEventListener('click', () => {
      if (this.gameState === 'playing') {
        this.rocket.vy = -250;
        AudioManager.playBeep();
      }
    });
  }

  update(dt) {
    if (this.gameState !== 'playing') return;

    this.gameTime += dt;
    this.distance = Math.floor(this.gameTime * 100);

    // Física del cohete
    this.rocket.vy += this.rocket.gravity * dt;
    this.rocket.y += this.rocket.vy * dt;

    // Colisión con bordes
    if (this.rocket.y < 0 || this.rocket.y + this.rocket.height > this.height) {
      this.loseLife();
    }

    // Generar obstáculos
    this.pipeSpawnTimer -= dt;
    if (this.pipeSpawnTimer <= 0) {
      this.spawnObstacle();
      this.pipeSpawnTimer = 2;
    }

    // Actualizar obstáculos
    this.pipes = this.pipes.filter((pipe) => {
      pipe.x -= 200 * dt;
      
      if (this.checkCollision(this.rocket, pipe)) {
        this.loseLife();
      }

      return pipe.x > -pipe.width;
    });

    this.meteorites = this.meteorites.filter((meteor) => {
      meteor.x -= 250 * dt;
      meteor.y += (Math.random() - 0.5) * 100 * dt;

      if (Math.hypot(this.rocket.x - meteor.x, this.rocket.y - meteor.y) < this.rocket.width) {
        this.loseLife();
      }

      return meteor.x > -meteor.size;
    });

    this.storms = this.storms.filter((storm) => {
      storm.x -= 180 * dt;
      return storm.x > -storm.width;
    });

    // Scoring
    this.pipes.forEach((pipe) => {
      if (!pipe.scored && pipe.x < this.rocket.x) {
        pipe.scored = true;
        this.score += 10;
        AudioManager.playSuccess();
      }
    });

    ParticleSystem.update(dt);
  }

  spawnObstacle() {
    const type = Math.random();
    
    if (type < 0.6) {
      // Tuberías
      const gapSize = 80;
      const gapY = 50 + Math.random() * (this.height - 150);
      
      this.pipes.push({
        x: this.width,
        y: 0,
        width: 50,
        height: gapY,
        type: 'top',
        scored: false
      });
      
      this.pipes.push({
        x: this.width,
        y: gapY + gapSize,
        width: 50,
        height: this.height - gapY - gapSize,
        type: 'bottom',
        scored: false
      });
    } else if (type < 0.8) {
      // Meteoritos
      this.meteorites.push({
        x: this.width,
        y: Math.random() * this.height,
        vx: 250,
        size: 10
      });
    } else {
      // Tormenta
      this.storms.push({
        x: this.width,
        y: 0,
        width: 100,
        height: 50 + Math.random() * 50
      });
    }
  }

  checkCollision(rocket, pipe) {
    return !(rocket.x + rocket.width < pipe.x ||
             rocket.x > pipe.x + pipe.width ||
             rocket.y + rocket.height < pipe.y ||
             rocket.y > pipe.y + pipe.height);
  }

  loseLife() {
    this.lives--;
    AudioManager.playError();
    
    if (this.lives <= 0) {
      this.gameOver();
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
      victory: this.distance > 5000,
      score: this.score,
      distance: this.distance,
      playTime: this.gameTime
    };
    GameManager.recordGameSession('rocket-escape', stats);
  }

  draw() {
    // Fondo de espacio
    this.ctx.fillStyle = 'linear-gradient(to bottom, #000033, #330033)';
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#000033');
    gradient.addColorStop(1, '#330033');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Estrellas de fondo
    this.ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      const x = (this.distance * 0.1 + i * 50) % this.width;
      const y = (i * 13) % this.height;
      this.ctx.fillRect(x, y, 2, 2);
    }

    // Cohete
    this.ctx.save();
    this.ctx.translate(this.rocket.x, this.rocket.y);
    this.ctx.rotate(this.rocket.vy / 300);
    this.ctx.fillStyle = '#00ffff';
    this.ctx.fillRect(-this.rocket.width / 2, -this.rocket.height / 2, this.rocket.width, this.rocket.height);
    this.ctx.fillStyle = '#ffaa00';
    this.ctx.fillRect(-this.rocket.width / 2 + 3, this.rocket.height / 2 - 5, 3, 8);
    this.ctx.restore();

    // Obstáculos
    this.ctx.fillStyle = '#ff0055';
    this.pipes.forEach((pipe) => {
      this.ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });

    this.ctx.fillStyle = '#ffaa00';
    this.meteorites.forEach((meteor) => {
      this.ctx.beginPath();
      this.ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
    this.storms.forEach((storm) => {
      this.ctx.fillRect(storm.x, storm.y, storm.width, storm.height);
    });

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
  game = new RocketEscape(document.getElementById('gameCanvas'));
}

function startGame() {
  game.score = 0;
  game.distance = 0;
  game.lives = 3;
  game.gameTime = 0;
  game.rocket.y = game.height / 2;
  game.rocket.vy = 0;
  game.pipes = [];
  game.meteorites = [];
  game.storms = [];
  game.gameState = 'playing';
  document.getElementById('mainMenu').classList.remove('active');
  updateUI();
}

function resumeGame() {
  game.gameState = 'playing';
  document.getElementById('pauseMenu').classList.remove('active');
}

function showGameOverMenu() {
  document.getElementById('finalDistance').textContent = Math.floor(game.distance) + 'm';
  document.getElementById('gameOverMenu').classList.add('active');
}

function goHome() {
  window.location.href = '../index.html';
}

function updateUI() {
  document.getElementById('score').textContent = game.score;
  document.getElementById('distance').textContent = Math.floor(game.distance) + 'm';
  document.getElementById('lives').textContent = game.lives;
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
