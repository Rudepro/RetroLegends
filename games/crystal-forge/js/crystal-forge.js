/**
 * CRYSTAL FORGE
 * Juego tipo Arkanoid con cristales mágicos, power-ups y jefes
 * 
 * Mecánica:
 * - Purificar cristales rompiendo sus bloques
 * - Controlar una esfera mágica con una paleta
 * - Coleccionar power-ups
 * - Enfrentar cristales especiales y jefes
 */

class CrystalForge {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gameState = 'menu'; // menu, playing, paused, gameOver, victory
    this.difficulty = 'normal';
    this.level = 1;
    this.score = 0;
    this.lives = 3;
    this.crystals = 0;
    this.gameTime = 0;
    
    // Objetos del juego
    this.paddle = null;
    this.ball = null;
    this.blocks = [];
    this.powerUps = [];
    this.particles = [];
    this.enemies = [];
    
    // Input
    this.keys = {};
    this.mouseX = 0;
    
    this.init();
  }

  init() {
    this.setupPaddle();
    this.setupBall();
    this.setupLevel();
    this.setupInput();
    this.startGameLoop();
  }

  setupPaddle() {
    this.paddle = {
      x: this.width / 2 - 50,
      y: this.height - 30,
      width: 100,
      height: 15,
      speed: 400,
      vx: 0
    };
  }

  setupBall() {
    this.ball = {
      x: this.paddle.x + this.paddle.width / 2,
      y: this.paddle.y - 10,
      radius: 4,
      vx: 0,
      vy: 0,
      speed: 300,
      attached: true
    };
  }

  setupLevel() {
    this.blocks = [];
    this.powerUps = [];
    
    // Configuración por dificultad y nivel
    const configs = {
      easy: { cols: 8, rows: 3, speed: 250 },
      normal: { cols: 10, rows: 4, speed: 300 },
      hard: { cols: 12, rows: 5, speed: 350 }
    };
    
    const config = configs[this.difficulty];
    const blockWidth = (this.width - 20) / config.cols;
    const blockHeight = 20;
    
    // Crear bloques
    for (let row = 0; row < config.rows + this.level - 1; row++) {
      for (let col = 0; col < config.cols; col++) {
        const colors = ['#00ff00', '#00ffff', '#ff00ff'];
        const health = row === 0 ? 1 : row === 1 ? 2 : 3;
        
        this.blocks.push({
          x: 10 + col * blockWidth,
          y: 50 + row * (blockHeight + 5),
          width: blockWidth - 4,
          height: blockHeight,
          health: health,
          maxHealth: health,
          color: colors[health - 1],
          type: Math.random() < 0.2 ? 'special' : 'normal'
        });
      }
    }

    // Crear jefe cada 3 niveles
    if (this.level % 3 === 0) {
      this.createBoss();
    }

    this.ball.speed = config.speed;
  }

  createBoss() {
    this.boss = {
      x: this.width / 2,
      y: 30,
      width: 60,
      height: 30,
      health: 20,
      maxHealth: 20,
      vx: 150,
      shootTimer: 0,
      color: '#ff00ff'
    };
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (this.gameState === 'playing' && this.ball.attached) {
          this.ball.attached = false;
          const angle = Math.PI / 4;
          this.ball.vx = Math.cos(angle) * this.ball.speed;
          this.ball.vy = -Math.sin(angle) * this.ball.speed;
          AudioManager.playBeep();
        }
      }
      
      if (e.key === 'p' || e.key === 'P') {
        if (this.gameState === 'playing') {
          this.togglePause();
        } else if (this.gameState === 'paused') {
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

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
    });

    this.canvas.addEventListener('click', () => {
      if (this.gameState === 'playing' && this.ball.attached) {
        this.ball.attached = false;
        const angle = Math.PI / 4;
        this.ball.vx = Math.cos(angle) * this.ball.speed;
        this.ball.vy = -Math.sin(angle) * this.ball.speed;
        AudioManager.playBeep();
      }
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

  update(dt) {
    if (this.gameState !== 'playing') return;

    this.gameTime += dt;

    // Controlar paleta
    const speed = this.paddle.speed * dt;
    if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
      this.paddle.vx = -speed;
    } else if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
      this.paddle.vx = speed;
    } else {
      this.paddle.vx *= 0.8;
    }

    // Usar ratón
    if (this.mouseX > 0) {
      const targetX = this.mouseX - this.canvas.getBoundingClientRect().left - this.paddle.width / 2;
      const diff = targetX - this.paddle.x;
      this.paddle.vx = Math.max(-speed, Math.min(speed, diff * 0.3));
    }

    this.paddle.x += this.paddle.vx;
    this.paddle.x = Math.max(0, Math.min(this.width - this.paddle.width, this.paddle.x));

    // Actualizar pelota
    if (this.ball.attached) {
      this.ball.x = this.paddle.x + this.paddle.width / 2;
      this.ball.y = this.paddle.y - this.ball.radius - 2;
    } else {
      this.ball.x += this.ball.vx * dt;
      this.ball.y += this.ball.vy * dt;

      // Colisiones con paredes
      if (this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.width) {
        this.ball.vx *= -1;
        this.ball.x = Math.max(this.ball.radius, Math.min(this.width - this.ball.radius, this.ball.x));
        AudioManager.playBeep();
      }

      if (this.ball.y - this.ball.radius < 0) {
        this.ball.vy *= -1;
        this.ball.y = this.ball.radius;
        AudioManager.playBeep();
      }

      // Perder vida
      if (this.ball.y > this.height) {
        this.lives--;
        if (this.lives <= 0) {
          this.gameOver();
        } else {
          this.resetBall();
          AudioManager.playError();
        }
      }

      // Colisiones con paleta
      if (this.checkPaddleCollision()) {
        AudioManager.playClick();
        ParticleSystem.burstEffect(this.paddle.x + this.paddle.width / 2, this.paddle.y, ['#00ff00', '#00ffff']);
      }

      // Colisiones con bloques
      this.checkBlockCollisions();

      // Colisiones con jefe
      if (this.boss) {
        this.checkBossCollision();
      }
    }

    // Actualizar power-ups
    this.updatePowerUps(dt);

    // Actualizar jefe
    if (this.boss) {
      this.updateBoss(dt);
    }

    // Actualizar partículas
    ParticleSystem.update(dt);

    // Verificar victoria
    if (this.blocks.length === 0 && !this.boss) {
      this.victory();
    }
  }

  checkPaddleCollision() {
    if (this.ball.vy > 0) {
      const distance = Math.hypot(
        this.ball.x - Math.max(this.paddle.x, Math.min(this.ball.x, this.paddle.x + this.paddle.width)),
        this.ball.y - Math.max(this.paddle.y, Math.min(this.ball.y, this.paddle.y + this.paddle.height))
      );

      if (distance < this.ball.radius + 10) {
        this.ball.vy = -Math.abs(this.ball.vy);
        
        // Ajustar ángulo según donde golpee
        const hitPos = (this.ball.x - this.paddle.x) / this.paddle.width;
        this.ball.vx = (hitPos - 0.5) * this.ball.speed * 1.5;

        return true;
      }
    }
    return false;
  }

  checkBlockCollisions() {
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const block = this.blocks[i];
      
      if (this.checkCircleRectCollision(this.ball, block)) {
        block.health--;
        this.score += 10 * block.health;

        // Cambiar color con daño
        const colors = ['#ff0055', '#ff00ff', '#00ffff', '#00ff00'];
        block.color = colors[Math.max(0, block.health - 1)];

        AudioManager.playSuccess();
        ParticleSystem.burstEffect(block.x + block.width / 2, block.y + block.height / 2, 
          ['#ff00ff', '#00ffff', '#00ff00']);

        // Crear power-up
        if (Math.random() < 0.15) {
          this.createPowerUp(block.x + block.width / 2, block.y + block.height / 2);
        }

        // Remover si está destruido
        if (block.health <= 0) {
          this.blocks.splice(i, 1);
          this.crystals++;
        }

        // Rebotar
        this.ball.vy *= -1;
        break;
      }
    }
  }

  checkBossCollision() {
    const distance = Math.hypot(
      this.ball.x - (this.boss.x + this.boss.width / 2),
      this.ball.y - (this.boss.y + this.boss.height / 2)
    );

    if (distance < this.ball.radius + 30) {
      this.boss.health--;
      this.score += 50;
      
      if (this.boss.health <= 0) {
        AudioManager.playExplosion();
        ParticleSystem.burstEffect(this.boss.x + this.boss.width / 2, this.boss.y + this.boss.height / 2,
          ['#ff00ff', '#ffaa00', '#ff0055']);
        this.boss = null;
      }

      this.ball.vy *= -1;
    }
  }

  checkCircleRectCollision(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

    const distance = Math.hypot(circle.x - closestX, circle.y - closestY);
    return distance < circle.radius + 5;
  }

  createPowerUp(x, y) {
    const types = [
      { type: 'expand', name: 'Expandir', color: '#00ff00', duration: 10 },
      { type: 'slowball', name: 'Desacelerar', color: '#00ffff', duration: 15 },
      { type: 'multiball', name: 'Multibola', color: '#ffaa00', duration: 8 },
      { type: 'shield', name: 'Escudo', color: '#ff00ff', duration: 20 }
    ];

    const powerUp = types[Math.floor(Math.random() * types.length)];
    
    this.powerUps.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 100,
      vy: Math.random() * 100 + 50,
      ...powerUp
    });
  }

  updatePowerUps(dt) {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const pu = this.powerUps[i];
      pu.y += pu.vy * dt;
      pu.vy += 200 * dt; // Gravedad

      // Colisión con paleta
      if (pu.y > this.paddle.y - 20 && pu.y < this.paddle.y + 20 &&
          pu.x > this.paddle.x && pu.x < this.paddle.x + this.paddle.width) {
        this.activatePowerUp(pu);
        this.powerUps.splice(i, 1);
        AudioManager.playPowerUp();
      } else if (pu.y > this.height) {
        this.powerUps.splice(i, 1);
      }
    }
  }

  activatePowerUp(powerUp) {
    switch (powerUp.type) {
      case 'expand':
        this.paddle.width = Math.min(150, this.paddle.width + 30);
        break;
      case 'slowball':
        this.ball.speed *= 0.7;
        break;
      case 'multiball':
        // Crear segunda bola
        this.spawnAdditionalBall();
        break;
      case 'shield':
        this.lives++;
        break;
    }
  }

  spawnAdditionalBall() {
    // Simplificado para esta versión
    this.score += 50;
  }

  updateBoss(dt) {
    if (!this.boss) return;

    // Movimiento
    this.boss.x += this.boss.vx * dt;
    if (this.boss.x < 0 || this.boss.x + this.boss.width > this.width) {
      this.boss.vx *= -1;
    }

    // Disparar
    this.boss.shootTimer -= dt;
    if (this.boss.shootTimer <= 0) {
      this.bossShoots();
      this.boss.shootTimer = 1;
    }
  }

  bossShoots() {
    // Efecto visual
    ParticleSystem.burstEffect(this.boss.x + this.boss.width / 2, this.boss.y + this.boss.height,
      ['#ff0055', '#ffaa00']);
  }

  resetBall() {
    this.ball.attached = true;
    this.ball.x = this.paddle.x + this.paddle.width / 2;
    this.ball.y = this.paddle.y - this.ball.radius - 2;
    this.ball.vx = 0;
    this.ball.vy = 0;
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    this.recordSession();
    this.showGameOverMenu();
  }

  victory() {
    this.gameState = 'victory';
    AudioManager.playSuccess();
    this.recordSession(true);
    this.showVictoryMenu();
  }

  recordSession(victory = false) {
    const stats = {
      victory: victory,
      score: this.score,
      level: this.level,
      playTime: this.gameTime
    };
    GameManager.recordGameSession('crystal-forge', stats);
  }

  draw() {
    // Fondo
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Grid
    this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < this.width; i += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.height);
      this.ctx.stroke();
    }

    // Bloques
    this.blocks.forEach((block) => {
      this.ctx.fillStyle = block.color;
      this.ctx.fillRect(block.x, block.y, block.width, block.height);
      
      // Borde
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(block.x, block.y, block.width, block.height);
    });

    // Jefe
    if (this.boss) {
      this.ctx.fillStyle = this.boss.color;
      this.ctx.fillRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(this.boss.x, this.boss.y, this.boss.width, this.boss.height);

      // Barra de salud
      this.ctx.fillStyle = '#ff0055';
      this.ctx.fillRect(this.boss.x, this.boss.y - 10, (this.boss.health / this.boss.maxHealth) * this.boss.width, 5);
    }

    // Paleta
    this.ctx.fillStyle = '#00ff00';
    this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);

    // Pelota
    this.ctx.fillStyle = '#ffaa00';
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    // Power-ups
    this.powerUps.forEach((pu) => {
      this.ctx.fillStyle = pu.color;
      this.ctx.fillRect(pu.x - 8, pu.y - 8, 16, 16);
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(pu.x - 8, pu.y - 8, 16, 16);
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

// ============ GLOBAL GAME INSTANCE ============

let game = null;

function initGame() {
  const canvas = document.getElementById('gameCanvas');
  game = new CrystalForge(canvas);
}

function startGame() {
  const selectedDifficulty = document.querySelector('.difficulty-btn.active');
  if (selectedDifficulty) {
    game.difficulty = selectedDifficulty.dataset.difficulty;
  }
  game.level = 1;
  game.score = 0;
  game.lives = 3;
  game.crystals = 0;
  game.gameTime = 0;
  game.setupLevel();
  game.resetBall();
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
  document.getElementById('finalScore').textContent = game.score;
  document.getElementById('gameOverMenu').classList.add('active');
}

function showVictoryMenu() {
  document.getElementById('victoryScore').textContent = game.score;
  document.getElementById('victoryMenu').classList.add('active');
}

function nextLevel() {
  game.level++;
  game.setupLevel();
  game.resetBall();
  game.gameState = 'playing';
  document.getElementById('victoryMenu').classList.remove('active');
  updateUI();
}

function goHome() {
  window.location.href = '../index.html';
}

function updateUI() {
  document.getElementById('score').textContent = game.score;
  document.getElementById('level').textContent = game.level;
  document.getElementById('lives').textContent = game.lives;
  document.getElementById('crystals').textContent = game.crystals;
}

// Dificultad selector
document.querySelectorAll('.difficulty-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.difficulty-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Botones de control
document.getElementById('pauseBtn').addEventListener('click', () => {
  if (game.gameState === 'playing') {
    game.togglePause();
  }
});

document.getElementById('menuBtn').addEventListener('click', () => {
  showMainMenu();
});

// Inicializar cuando cargue el documento
window.addEventListener('load', () => {
  initGame();
  updateUI();
});
