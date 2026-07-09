class GalaxyDefender {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameState = 'menu';
    this.score = 0;
    this.wave = 1;
    this.energy = 100;
    this.maxEnergy = 100;
    this.gameTime = 0;
    this.player = { x: this.width / 2, y: this.height - 50, width: 30, height: 30, vx: 0, speed: 300 };
    this.enemies = [];
    this.projectiles = [];
    this.keys = {};
    this.shootTimer = 0;
    this.init();
  }

  init() {
    this.spawnWave();
    window.addEventListener('keydown', (e) => { this.keys[e.key] = true; });
    window.addEventListener('keyup', (e) => { this.keys[e.key] = false; });
    this.canvas.addEventListener('click', () => { if (this.gameState === 'playing') this.shoot(); });
    this.startGameLoop();
  }

  spawnWave() {
    for (let i = 0; i < 3 + this.wave; i++) {
      this.enemies.push({
        x: Math.random() * (this.width - 30),
        y: 20 + Math.random() * 60,
        width: 20,
        height: 20,
        vy: 100 + this.wave * 30,
        vx: (Math.random() - 0.5) * 100
      });
    }
  }

  shoot() {
    if (this.energy > 10) {
      this.projectiles.push({
        x: this.player.x + this.player.width / 2,
        y: this.player.y,
        width: 5,
        height: 15,
        vy: -400
      });
      this.energy -= 10;
      AudioManager.playBeep();
    }
  }

  update(dt) {
    if (this.gameState !== 'playing') return;
    this.gameTime += dt;

    if (this.keys['ArrowLeft'] || this.keys['a']) this.player.vx = -this.player.speed;
    else if (this.keys['ArrowRight'] || this.keys['d']) this.player.vx = this.player.speed;
    else this.player.vx *= 0.8;

    this.player.x += this.player.vx * dt;
    this.player.x = Math.max(0, Math.min(this.width - this.player.width, this.player.x));

    this.projectiles = this.projectiles.filter(p => {
      p.y += p.vy * dt;
      return p.y > 0;
    });

    this.enemies = this.enemies.filter(e => {
      e.x += e.vx * dt;
      e.y += e.vy * dt;
      e.vx += (Math.random() - 0.5) * 50 * dt;

      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        if (p.x < e.x + e.width && p.x + p.width > e.x &&
            p.y < e.y + e.height && p.y + p.height > e.y) {
          this.projectiles.splice(i, 1);
          this.score += 10;
          AudioManager.playSuccess();
          return false;
        }
      }

      if (e.y > this.height) return false;
      if (this.player.x < e.x + e.width && this.player.x + this.player.width > e.x &&
          this.player.y < e.y + e.height && this.player.y + this.player.height > e.y) {
        this.gameOver();
      }
      return true;
    });

    this.energy = Math.min(this.maxEnergy, this.energy + 20 * dt);

    if (this.enemies.length === 0) {
      this.wave++;
      this.spawnWave();
    }

    ParticleSystem.update(dt);
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    GameManager.recordGameSession('galaxy-defender', { victory: false, score: this.score, playTime: this.gameTime });
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOverMenu').classList.add('active');
  }

  draw() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#000033');
    gradient.addColorStop(1, '#330033');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#00ff00';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

    this.ctx.fillStyle = '#ff00ff';
    this.enemies.forEach(e => this.ctx.fillRect(e.x, e.y, e.width, e.height));

    this.ctx.fillStyle = '#ffaa00';
    this.projectiles.forEach(p => this.ctx.fillRect(p.x, p.y, p.width, p.height));
  }

  startGameLoop() {
    let lastTime = Date.now();
    const gameLoop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      this.update(dt);
      this.draw();
      document.getElementById('score').textContent = this.score;
      document.getElementById('wave').textContent = this.wave;
      document.getElementById('energy').textContent = Math.floor(this.energy) + '%';
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}

let game = null;
function initGame() { game = new GalaxyDefender(document.getElementById('gameCanvas')); }
function startGame() { game.gameState = 'playing'; document.getElementById('mainMenu').classList.remove('active'); }
function resumeGame() { game.gameState = 'playing'; document.getElementById('pauseMenu').classList.remove('active'); }
function goHome() { window.location.href = '../index.html'; }
document.getElementById('pauseBtn').addEventListener('click', () => { if (game.gameState === 'playing') { game.gameState = 'paused'; document.getElementById('pauseMenu').classList.add('active'); } });
document.getElementById('menuBtn').addEventListener('click', goHome);
window.addEventListener('load', initGame);
