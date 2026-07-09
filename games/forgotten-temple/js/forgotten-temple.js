class ForgottenTemple {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameState = 'menu';
    this.score = 0;
    this.relics = 0;
    this.lives = 3;
    this.gameTime = 0;
    this.player = { x: 50, y: 50, width: 20, height: 20, vx: 0, vy: 0, speed: 200 };
    this.platforms = [];
    this.traps = [];
    this.keys = {};
    this.init();
  }

  init() {
    this.generateLevel();
    window.addEventListener('keydown', (e) => { this.keys[e.key] = true; });
    window.addEventListener('keyup', (e) => { this.keys[e.key] = false; });
    this.startGameLoop();
  }

  generateLevel() {
    this.platforms = [
      { x: 0, y: this.height - 20, width: this.width, height: 20 },
      { x: 100, y: 400, width: 200, height: 20 },
      { x: 500, y: 300, width: 200, height: 20 }
    ];
    this.traps = [
      { x: 250, y: this.height - 50, width: 100, height: 10 }
    ];
  }

  update(dt) {
    if (this.gameState !== 'playing') return;
    this.gameTime += dt;
    
    if (this.keys['ArrowLeft'] || this.keys['a']) this.player.vx = -this.player.speed;
    else if (this.keys['ArrowRight'] || this.keys['d']) this.player.vx = this.player.speed;
    else this.player.vx *= 0.9;

    if ((this.keys['ArrowUp'] || this.keys['w'] || this.keys[' ']) && this.onGround()) {
      this.player.vy = -300;
    }

    this.player.vy += 600 * dt;
    this.player.x += this.player.vx * dt;
    this.player.y += this.player.vy * dt;

    this.platforms.forEach(p => {
      if (this.player.vy > 0 && this.player.y + this.player.height <= p.y + 10 &&
          this.player.x < p.x + p.width && this.player.x + this.player.width > p.x) {
        this.player.vy = 0;
        this.player.y = p.y - this.player.height;
      }
    });

    if (this.player.y > this.height) this.loseLife();

    this.traps.forEach(trap => {
      if (this.player.x < trap.x + trap.width && this.player.x + this.player.width > trap.x &&
          this.player.y < trap.y + trap.height && this.player.y + this.player.height > trap.y) {
        this.loseLife();
      }
    });

    ParticleSystem.update(dt);
  }

  onGround() {
    return this.platforms.some(p => 
      this.player.y + this.player.height >= p.y &&
      this.player.y + this.player.height <= p.y + 15 &&
      this.player.x < p.x + p.width && this.player.x + this.player.width > p.x
    );
  }

  loseLife() {
    this.lives--;
    if (this.lives <= 0) this.gameOver();
    else this.player.y = 50;
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    GameManager.recordGameSession('forgotten-temple', { victory: false, score: this.score, playTime: this.gameTime });
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOverMenu').classList.add('active');
  }

  draw() {
    this.ctx.fillStyle = 'rgba(58, 42, 26, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.ctx.fillStyle = '#ffaa00';
    this.platforms.forEach(p => this.ctx.fillRect(p.x, p.y, p.width, p.height));
    
    this.ctx.fillStyle = '#ff0055';
    this.traps.forEach(t => this.ctx.fillRect(t.x, t.y, t.width, t.height));
    
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
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }
}

let game = null;
function initGame() { game = new ForgottenTemple(document.getElementById('gameCanvas')); }
function startGame() { game.gameState = 'playing'; document.getElementById('mainMenu').classList.remove('active'); }
function resumeGame() { game.gameState = 'playing'; document.getElementById('pauseMenu').classList.remove('active'); }
function goHome() { window.location.href = '../index.html'; }
document.getElementById('pauseBtn').addEventListener('click', () => { if (game.gameState === 'playing') { game.gameState = 'paused'; document.getElementById('pauseMenu').classList.add('active'); } });
document.getElementById('menuBtn').addEventListener('click', goHome);
window.addEventListener('load', initGame);
