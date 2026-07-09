class EchoesOfDarkness {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameState = 'menu';
    this.score = 0;
    this.level = 1;
    this.health = 100;
    this.gameTime = 0;
    this.player = { x: 50, y: 50, width: 25, height: 25, vx: 0, vy: 0, speed: 200 };
    this.enemies = [];
    this.items = [];
    this.walls = [];
    this.keys = {};
    this.init();
  }

  init() {
    this.generateDungeon();
    window.addEventListener('keydown', (e) => { this.keys[e.key] = true; });
    window.addEventListener('keyup', (e) => { this.keys[e.key] = false; });
    this.startGameLoop();
  }

  generateDungeon() {
    this.walls = [];
    for (let i = 0; i < 5 + this.level; i++) {
      this.walls.push({
        x: Math.random() * (this.width - 40),
        y: Math.random() * (this.height - 40),
        width: 40,
        height: 40
      });
    }
    this.enemies = [];
    for (let i = 0; i < 2 + this.level; i++) {
      this.enemies.push({
        x: Math.random() * (this.width - 30),
        y: Math.random() * (this.height - 30),
        width: 20,
        height: 20,
        vx: (Math.random() - 0.5) * 100,
        vy: (Math.random() - 0.5) * 100,
        speed: 80 + this.level * 20
      });
    }
    this.items.push({
      x: Math.random() * (this.width - 20),
      y: Math.random() * (this.height - 20),
      width: 15,
      height: 15,
      type: 'potion'
    });
  }

  update(dt) {
    if (this.gameState !== 'playing') return;
    this.gameTime += dt;

    if (this.keys['ArrowUp'] || this.keys['w']) this.player.vy = -this.player.speed;
    else if (this.keys['ArrowDown'] || this.keys['s']) this.player.vy = this.player.speed;
    else this.player.vy *= 0.9;

    if (this.keys['ArrowLeft'] || this.keys['a']) this.player.vx = -this.player.speed;
    else if (this.keys['ArrowRight'] || this.keys['d']) this.player.vx = this.player.speed;
    else this.player.vx *= 0.9;

    this.player.x += this.player.vx * dt;
    this.player.y += this.player.vy * dt;

    this.player.x = Math.max(0, Math.min(this.width - this.player.width, this.player.x));
    this.player.y = Math.max(0, Math.min(this.height - this.player.height, this.player.y));

    this.walls.forEach(wall => {
      if (this.checkCollision(this.player, wall)) {
        this.player.x = Math.max(0, Math.min(this.width - this.player.width, this.player.x));
        this.player.y = Math.max(0, Math.min(this.height - this.player.height, this.player.y));
      }
    });

    this.enemies.forEach(enemy => {
      enemy.x += enemy.vx * dt;
      enemy.y += enemy.vy * dt;
      
      if (Math.random() < 0.02) {
        enemy.vx = (Math.random() - 0.5) * enemy.speed * 2;
        enemy.vy = (Math.random() - 0.5) * enemy.speed * 2;
      }

      if (this.checkCollision(this.player, enemy)) {
        this.health -= 10;
        if (this.health <= 0) this.gameOver();
      }
    });

    this.items = this.items.filter(item => {
      if (this.checkCollision(this.player, item)) {
        this.score += 50;
        AudioManager.playSuccess();
        return false;
      }
      return true;
    });

    ParticleSystem.update(dt);
  }

  checkCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x &&
           a.y < b.y + b.height && a.y + a.height > b.y;
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    GameManager.recordGameSession('echoes-of-darkness', { victory: false, score: this.score, playTime: this.gameTime });
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOverMenu').classList.add('active');
  }

  draw() {
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = '#333333';
    this.walls.forEach(w => this.ctx.fillRect(w.x, w.y, w.width, w.height));

    this.ctx.fillStyle = '#ff0055';
    this.enemies.forEach(e => this.ctx.fillRect(e.x, e.y, e.width, e.height));

    this.ctx.fillStyle = '#ffaa00';
    this.items.forEach(i => this.ctx.fillRect(i.x, i.y, i.width, i.height));

    this.ctx.fillStyle = '#00ff00';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
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
      document.getElementById('level').textContent = this.level;
      document.getElementById('health').textContent = Math.max(0, this.health) + '%';
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}

let game = null;
function initGame() { game = new EchoesOfDarkness(document.getElementById('gameCanvas')); }
function startGame() { game.gameState = 'playing'; document.getElementById('mainMenu').classList.remove('active'); }
function resumeGame() { game.gameState = 'playing'; document.getElementById('pauseMenu').classList.remove('active'); }
function goHome() { window.location.href = '../index.html'; }
document.getElementById('pauseBtn').addEventListener('click', () => { if (game.gameState === 'playing') { game.gameState = 'paused'; document.getElementById('pauseMenu').classList.add('active'); } });
document.getElementById('menuBtn').addEventListener('click', goHome);
window.addEventListener('load', initGame);
