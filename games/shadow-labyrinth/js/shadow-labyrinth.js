class ShadowLabyrinth {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameState = 'menu';
    this.score = 0;
    this.level = 1;
    this.vision = 50;
    this.gameTime = 0;
    this.maze = [];
    this.player = { x: 2, y: 2, vx: 0, vy: 0, speed: 150 };
    this.enemies = [];
    this.keys = {};
    this.init();
  }

  init() {
    this.generateMaze();
    window.addEventListener('keydown', (e) => { this.keys[e.key] = true; });
    window.addEventListener('keyup', (e) => { this.keys[e.key] = false; });
    this.startGameLoop();
  }

  generateMaze() {
    const size = 20;
    this.maze = Array(size).fill().map(() => Array(size).fill(1));
    this.maze[2][2] = 0;
    this.maze[size-3][size-3] = 0;
    this.enemies = [{ x: size - 3, y: size - 3 }];
  }

  update(dt) {
    if (this.gameState !== 'playing') return;
    this.gameTime += dt;
    
    if (this.keys['ArrowUp'] || this.keys['w']) this.player.y -= this.player.speed * dt;
    if (this.keys['ArrowDown'] || this.keys['s']) this.player.y += this.player.speed * dt;
    if (this.keys['ArrowLeft'] || this.keys['a']) this.player.x -= this.player.speed * dt;
    if (this.keys['ArrowRight'] || this.keys['d']) this.player.x += this.player.speed * dt;
    
    if (this.enemies.some(e => Math.hypot(e.x - this.player.x, e.y - this.player.y) < 1)) {
      this.gameOver();
    }
    ParticleSystem.update(dt);
  }

  gameOver() {
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    GameManager.recordGameSession('shadow-labyrinth', { victory: false, score: this.score, playTime: this.gameTime });
    document.getElementById('finalScore').textContent = this.score;
    document.getElementById('gameOverMenu').classList.add('active');
  }

  draw() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);
    const cellSize = this.width / 20;
    
    this.ctx.fillStyle = '#333333';
    this.maze.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      });
    });
    
    this.ctx.fillStyle = '#00ff00';
    this.ctx.beginPath();
    this.ctx.arc(this.player.x * cellSize + cellSize/2, this.player.y * cellSize + cellSize/2, cellSize/3, 0, Math.PI*2);
    this.ctx.fill();
    
    this.ctx.fillStyle = '#ff0055';
    this.enemies.forEach(e => {
      this.ctx.fillRect(e.x * cellSize, e.y * cellSize, cellSize, cellSize);
    });
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
function initGame() { game = new ShadowLabyrinth(document.getElementById('gameCanvas')); }
function startGame() { game.gameState = 'playing'; document.getElementById('mainMenu').classList.remove('active'); }
function resumeGame() { game.gameState = 'playing'; document.getElementById('pauseMenu').classList.remove('active'); }
function goHome() { window.location.href = '../index.html'; }
document.getElementById('pauseBtn').addEventListener('click', () => { if (game.gameState === 'playing') { game.gameState = 'paused'; document.getElementById('pauseMenu').classList.add('active'); } });
document.getElementById('menuBtn').addEventListener('click', goHome);
window.addEventListener('load', initGame);
