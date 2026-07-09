/**
 * QUANTUM DUEL
 * Juego tipo Pong con portales, gravedad dinámica y múltiples pelotas
 * 
 * Mecánica:
 * - Competencia 1v1 con portales que desvían la pelota
 * - Gravedad dinámica que cambia cada ronda
 * - Múltiples pelotas en juego
 * - Sistema de energía para activar portales
 */

class QuantumDuel {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gameState = 'menu'; // menu, playing, paused, gameOver
    this.difficulty = 'normal';
    this.round = 1;
    this.maxRounds = 5;
    this.score = { p1: 0, p2: 0 };
    this.gameTime = 0;
    
    // Objetos
    this.paddle1 = null;
    this.paddle2 = null;
    this.balls = [];
    this.portals = [];
    this.particles = [];
    
    // Física
    this.gravity = 0;
    this.maxBalls = 1;
    
    // Input
    this.keys = {};
    
    this.init();
  }

  init() {
    this.setupPaddles();
    this.setupBalls();
    this.setupInput();
    this.startGameLoop();
  }

  setupPaddles() {
    this.paddle1 = {
      x: 10,
      y: this.height / 2 - 40,
      width: 10,
      height: 80,
      speed: 300,
      vy: 0,
      energy: 100,
      maxEnergy: 100
    };

    this.paddle2 = {
      x: this.width - 20,
      y: this.height / 2 - 40,
      width: 10,
      height: 80,
      speed: 300,
      vy: 0,
      energy: 100,
      maxEnergy: 100
    };
  }

  setupBalls() {
    this.balls = [];
    this.portals = [];
    
    for (let i = 0; i < this.maxBalls; i++) {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * Math.PI / 6;
      const speed = 200 + this.round * 50;
      
      this.balls.push({
        x: this.width / 2 + (i - this.maxBalls / 2 + 0.5) * 20,
        y: this.height / 2 + (i - this.maxBalls / 2 + 0.5) * 20,
        radius: 5,
        vx: Math.cos(angle) * speed * (i % 2 === 0 ? 1 : -1),
        vy: Math.sin(angle) * speed,
        speed: speed
      });
    }

    // Actualizar gravedad por ronda
    this.gravity = (this.round - 1) * 50;
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      
      if (e.key === ' ') {
        e.preventDefault();
        this.activatePortal();
      }
      
      if (e.key === 'p' || e.key === 'P') {
        if (this.gameState === 'playing') {
          this.togglePause();
        }
      }
      
      if (e.key === 'Escape') {
        this.showMainMenu();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  togglePause() {
    if (this.gameState === 'playing') {
      this.gameState = 'paused';
      document.getElementById('pauseMenu').classList.add('active');
    } else if (this.gameState === 'paused') {
      this.gameState = 'playing';
      document.getElementById('pauseMenu').classList.remove('active');
    }
  }

  activatePortal() {
    if (this.gameState !== 'playing') return;

    // P1 Portal (arriba)
    if (this.paddle1.energy > 30) {
      this.paddle1.energy -= 30;
      this.portals.push({
        x: this.width / 3,
        y: 20,
        radius: 20,
        owner: 1,
        life: 2,
        maxLife: 2
      });
      AudioManager.playBeep();
    }

    // P2 Portal (abajo)
    if (this.paddle2.energy > 30) {
      this.paddle2.energy -= 30;
      this.portals.push({
        x: (this.width * 2) / 3,
        y: this.height - 20,
        radius: 20,
        owner: 2,
        life: 2,
        maxLife: 2
      });
      AudioManager.playBeep();
    }
  }

  update(dt) {
    if (this.gameState !== 'playing') return;

    this.gameTime += dt;

    // Controlar P1 (arriba/abajo)
    if (this.keys['ArrowUp']) {
      this.paddle1.vy = -this.paddle1.speed;
    } else if (this.keys['ArrowDown']) {
      this.paddle1.vy = this.paddle1.speed;
    } else {
      this.paddle1.vy *= 0.9;
    }

    // Controlar P2 (W/S)
    if (this.keys['w'] || this.keys['W']) {
      this.paddle2.vy = -this.paddle2.speed;
    } else if (this.keys['s'] || this.keys['S']) {
      this.paddle2.vy = this.paddle2.speed;
    } else {
      this.paddle2.vy *= 0.9;
    }

    // Actualizar posición de paletas
    this.paddle1.y += this.paddle1.vy * dt;
    this.paddle1.y = Math.max(0, Math.min(this.height - this.paddle1.height, this.paddle1.y));

    this.paddle2.y += this.paddle2.vy * dt;
    this.paddle2.y = Math.max(0, Math.min(this.height - this.paddle2.height, this.paddle2.y));

    // Regenerar energía
    this.paddle1.energy = Math.min(this.paddle1.maxEnergy, this.paddle1.energy + 20 * dt);
    this.paddle2.energy = Math.min(this.paddle2.maxEnergy, this.paddle2.energy + 20 * dt);

    // Actualizar pelotas
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const ball = this.balls[i];
      
      ball.vy += this.gravity * dt; // Gravedad dinámica
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Colisiones con techo/suelo
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > this.height) {
        ball.vy *= -1;
        ball.y = Math.max(ball.radius, Math.min(this.height - ball.radius, ball.y));
        AudioManager.playBeep();
      }

      // Colisión con P1
      if (this.checkPaddleCollision(ball, this.paddle1)) {
        ball.vx = Math.abs(ball.vx);
        const hitPos = (ball.y - this.paddle1.y) / this.paddle1.height;
        ball.vy += (hitPos - 0.5) * ball.speed * 0.5;
        AudioManager.playClick();
      }

      // Colisión con P2
      if (this.checkPaddleCollision(ball, this.paddle2)) {
        ball.vx = -Math.abs(ball.vx);
        const hitPos = (ball.y - this.paddle2.y) / this.paddle2.height;
        ball.vy += (hitPos - 0.5) * ball.speed * 0.5;
        AudioManager.playClick();
      }

      // Colisiones con portales
      this.portals.forEach((portal, idx) => {
        const dist = Math.hypot(ball.x - portal.x, ball.y - portal.y);
        if (dist < ball.radius + portal.radius) {
          // Teletransportar a portal opuesto
          if (portal.owner === 1) {
            ball.x = (this.width * 2) / 3;
            ball.y = this.height - 20;
          } else {
            ball.x = this.width / 3;
            ball.y = 20;
          }
          // Aumentar velocidad
          ball.vx *= 1.2;
          ball.vy *= 1.2;
          AudioManager.playSuccess();
          ParticleSystem.burstEffect(portal.x, portal.y, ['#ff00ff', '#00ffff']);
        }
      });

      // Punto para P2 (bola sale por izquierda)
      if (ball.x < 0) {
        this.score.p2++;
        this.balls.splice(i, 1);
        AudioManager.playSuccess();
        if (this.balls.length === 0) {
          this.checkWinCondition();
        }
        continue;
      }

      // Punto para P1 (bola sale por derecha)
      if (ball.x > this.width) {
        this.score.p1++;
        this.balls.splice(i, 1);
        AudioManager.playSuccess();
        if (this.balls.length === 0) {
          this.checkWinCondition();
        }
      }
    }

    // Actualizar portales
    this.portals = this.portals.filter((portal) => {
      portal.life -= dt;
      return portal.life > 0;
    });

    // Si no hay pelotas, crear nuevas
    if (this.balls.length === 0) {
      this.setupBalls();
    }

    ParticleSystem.update(dt);
  }

  checkPaddleCollision(ball, paddle) {
    const closestX = Math.max(paddle.x, Math.min(ball.x, paddle.x + paddle.width));
    const closestY = Math.max(paddle.y, Math.min(ball.y, paddle.y + paddle.height));

    const dist = Math.hypot(ball.x - closestX, ball.y - closestY);
    return dist < ball.radius + 10;
  }

  checkWinCondition() {
    if (this.score.p1 >= 5 || this.score.p2 >= 5) {
      if (this.round < this.maxRounds) {
        this.round++;
        this.setupBalls();
      } else {
        this.gameOver();
      }
    }
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    this.recordSession();
    this.showGameOverMenu();
  }

  recordSession() {
    const victory = this.score.p1 >= 3; // Gana si obtiene 3 o más puntos
    const stats = {
      victory: victory,
      score: Math.max(this.score.p1, this.score.p2),
      level: this.round,
      playTime: this.gameTime
    };
    GameManager.recordGameSession('quantum-duel', stats);
  }

  draw() {
    // Fondo
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Línea central punteada
    this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    this.ctx.setLineDash([5, 5]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Paletas
    this.ctx.fillStyle = '#00ff00';
    this.ctx.fillRect(this.paddle1.x, this.paddle1.y, this.paddle1.width, this.paddle1.height);
    this.ctx.fillRect(this.paddle2.x, this.paddle2.y, this.paddle2.width, this.paddle2.height);

    // Barras de energía
    this.ctx.fillStyle = '#ff00ff';
    const energyBarHeight = 5;
    this.ctx.fillRect(10, 10, (this.paddle1.energy / this.paddle1.maxEnergy) * 50, energyBarHeight);
    this.ctx.fillRect(this.width - 60, 10, (this.paddle2.energy / this.paddle2.maxEnergy) * 50, energyBarHeight);

    // Pelotas
    this.balls.forEach((ball) => {
      this.ctx.fillStyle = '#ffaa00';
      this.ctx.beginPath();
      this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    // Portales
    this.portals.forEach((portal) => {
      const alpha = portal.life / portal.maxLife;
      this.ctx.fillStyle = portal.owner === 1 ? `rgba(0, 255, 0, ${alpha * 0.5})` : `rgba(255, 0, 255, ${alpha * 0.5})`;
      this.ctx.beginPath();
      this.ctx.arc(portal.x, portal.y, portal.radius, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.strokeStyle = portal.owner === 1 ? '#00ff00' : '#ff00ff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });

    // Partículas
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

// ============ GLOBAL ============

let game = null;

function initGame() {
  const canvas = document.getElementById('gameCanvas');
  game = new QuantumDuel(canvas);
}

function startGame() {
  const selectedDifficulty = document.querySelector('.difficulty-btn.active');
  if (selectedDifficulty) {
    game.difficulty = selectedDifficulty.dataset.difficulty;
  }
  game.round = 1;
  game.score = { p1: 0, p2: 0 };
  game.gameTime = 0;
  game.maxBalls = game.difficulty === 'hard' ? 3 : game.difficulty === 'normal' ? 2 : 1;
  game.setupBalls();
  game.gameState = 'playing';
  document.getElementById('mainMenu').classList.remove('active');
  updateUI();
}

function resumeGame() {
  game.gameState = 'playing';
  document.getElementById('pauseMenu').classList.remove('active');
}

function showMainMenu() {
  game.gameState = 'paused';
  document.getElementById('mainMenu').classList.add('active');
}

function showGameOverMenu() {
  document.getElementById('finalScore1').textContent = game.score.p1;
  document.getElementById('finalScore2').textContent = game.score.p2;
  document.getElementById('gameOverMenu').classList.add('active');
}

function goHome() {
  window.location.href = '../index.html';
}

function updateUI() {
  document.getElementById('score1').textContent = game.score.p1;
  document.getElementById('score2').textContent = game.score.p2;
  document.getElementById('round').textContent = game.round;
}

document.querySelectorAll('.difficulty-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.difficulty-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  if (game.gameState === 'playing') {
    game.togglePause();
  }
});

document.getElementById('menuBtn').addEventListener('click', () => {
  showMainMenu();
});

window.addEventListener('load', () => {
  initGame();
  updateUI();
});
