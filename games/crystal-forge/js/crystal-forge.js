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

// ============ HELPERS VISUALES ============

/**
 * Dibuja un cristal hexagonal con facetas y brillo
 */
function drawCrystalBlock(ctx, x, y, w, h, color, health, maxHealth) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const damageRatio = health / maxHealth;

  ctx.save();

  // Sombra exterior
  ctx.shadowColor = color;
  ctx.shadowBlur = 8 * damageRatio;

  // Cuerpo principal del cristal (rectángulo con esquinas cortadas)
  const cut = 4;
  ctx.beginPath();
  ctx.moveTo(x + cut, y);
  ctx.lineTo(x + w - cut, y);
  ctx.lineTo(x + w, y + cut);
  ctx.lineTo(x + w, y + h - cut);
  ctx.lineTo(x + w - cut, y + h);
  ctx.lineTo(x + cut, y + h);
  ctx.lineTo(x, y + h - cut);
  ctx.lineTo(x, y + cut);
  ctx.closePath();

  // Degradado de relleno
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, color + 'ff');
  grad.addColorStop(0.4, color + 'aa');
  grad.addColorStop(1, color + '44');
  ctx.fillStyle = grad;
  ctx.fill();

  // Borde brillante
  ctx.strokeStyle = health > 1 ? '#ffffff88' : '#ffffff44';
  ctx.lineWidth = health > 1 ? 1.5 : 0.5;
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Faceta superior (brillo)
  ctx.beginPath();
  ctx.moveTo(x + cut, y);
  ctx.lineTo(x + w - cut, y);
  ctx.lineTo(x + w * 0.6, y + h * 0.35);
  ctx.lineTo(x + w * 0.2, y + h * 0.35);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,' + (0.25 * damageRatio) + ')';
  ctx.fill();

  // Grietas si tiene daño
  if (health < maxHealth) {
    ctx.strokeStyle = 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1;
    // Grieta diagonal
    ctx.beginPath();
    ctx.moveTo(cx - 4, y + 3);
    ctx.lineTo(cx + 2, cy);
    ctx.lineTo(cx - 2, y + h - 3);
    ctx.stroke();
    if (health < maxHealth - 1) {
      ctx.beginPath();
      ctx.moveTo(x + w * 0.7, y + 4);
      ctx.lineTo(x + w * 0.5, cy - 2);
      ctx.stroke();
    }
  }

  // Indicador de vida restante (puntos)
  for (let i = 0; i < health; i++) {
    ctx.beginPath();
    ctx.arc(x + w - 5 - i * 6, y + h - 5, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Dibuja un power-up con icono dibujado en canvas y label visible
 */
function drawPowerUpIcon(ctx, pu) {
  const x = pu.x, y = pu.y;
  const r = 14;
  const t = pu.rotation;
  const pulse = Math.sin(t * 3) * 1.5 + r;

  ctx.save();

  // Anillo exterior pulsante
  ctx.shadowColor = pu.color;
  ctx.shadowBlur = 20;
  ctx.strokeStyle = pu.color + '88';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, pulse + 2, 0, Math.PI * 2);
  ctx.stroke();

  // Fondo hexagonal
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + t * 0.3;
    const px2 = x + r * Math.cos(angle);
    const py2 = y + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
  }
  ctx.closePath();

  const bgGrad = ctx.createRadialGradient(x - 3, y - 3, 0, x, y, r);
  bgGrad.addColorStop(0, pu.color + 'cc');
  bgGrad.addColorStop(1, pu.color + '33');
  ctx.fillStyle = bgGrad;
  ctx.fill();
  ctx.strokeStyle = pu.color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Icono específico según tipo
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  switch (pu.type) {
    case 'expand': {
      // Flechas apuntando hacia los lados
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3, -3); ctx.lineTo(6, 0); ctx.lineTo(3, 3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(-6, 0); ctx.lineTo(-3, 3); ctx.stroke();
      // Paleta pequeña
      ctx.fillRect(-5, 3, 10, 3);
      break;
    }
    case 'slowball': {
      // Reloj de arena
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-5, -6); ctx.lineTo(5, -6);
      ctx.lineTo(0, 0);
      ctx.lineTo(5, 6); ctx.lineTo(-5, 6);
      ctx.lineTo(0, 0); ctx.closePath();
      ctx.stroke();
      // Arena (mitad inferior llena)
      ctx.beginPath();
      ctx.moveTo(-4, 6); ctx.lineTo(4, 6); ctx.lineTo(0, 2); ctx.closePath();
      ctx.fill();
      break;
    }
    case 'multiball': {
      // Tres esferas pequeñas
      ctx.shadowColor = '#ffaa00';
      ctx.shadowBlur = 6;
      [[0, -5], [-4, 3], [4, 3]].forEach(([ox, oy]) => {
        ctx.beginPath();
        ctx.arc(ox, oy, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      break;
    }
    case 'shield': {
      // Escudo con forma real
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(5, -3);
      ctx.lineTo(5, 2);
      ctx.quadraticCurveTo(5, 7, 0, 7);
      ctx.quadraticCurveTo(-5, 7, -5, 2);
      ctx.lineTo(-5, -3);
      ctx.closePath();
      ctx.stroke();
      // Cruz interna
      ctx.beginPath(); ctx.moveTo(0, -3); ctx.lineTo(0, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-3, 0); ctx.lineTo(3, 0); ctx.stroke();
      break;
    }
  }

  ctx.restore();

  // Etiqueta de texto DEBAJO del icono
  ctx.font = 'bold 7px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = pu.color;
  ctx.shadowColor = pu.color;
  ctx.shadowBlur = 5;
  ctx.fillText(pu.label, x, y + r + 2);
  ctx.shadowBlur = 0;

  ctx.restore();
}

/**
 * Dibuja el boss como un cristal maligno flotante
 */
function drawBoss(ctx, boss, t) {
  const cx = boss.x + boss.width / 2;
  const cy = boss.y + boss.height / 2;
  const hpRatio = boss.health / boss.maxHealth;
  const pulse = Math.sin(t * 4) * 3;

  ctx.save();
  ctx.shadowColor = boss.color;
  ctx.shadowBlur = 20 + pulse;

  // Cuerpo principal: diamante
  ctx.beginPath();
  ctx.moveTo(cx, boss.y - 10 + pulse);
  ctx.lineTo(cx + boss.width / 2, cy);
  ctx.lineTo(cx, boss.y + boss.height + 5 - pulse);
  ctx.lineTo(cx - boss.width / 2, cy);
  ctx.closePath();

  const grad = ctx.createRadialGradient(cx - 5, cy - 5, 0, cx, cy, boss.width / 2 + 10);
  grad.addColorStop(0, '#ff88ff');
  grad.addColorStop(0.5, boss.color);
  grad.addColorStop(1, '#440044');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#ffaaff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Facetas internas
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, boss.y - 10 + pulse); ctx.lineTo(cx, cy);
  ctx.moveTo(cx + boss.width / 2, cy); ctx.lineTo(cx, cy);
  ctx.moveTo(cx - boss.width / 2, cy); ctx.lineTo(cx, cy);
  ctx.stroke();

  // Ojo maligno central
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#ff0055';
  ctx.beginPath();
  ctx.ellipse(cx, cy - 2, 8, 5, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ff0055';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy - 2, 4, 4, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#000000';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx + 2, cy - 4, 1.5, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff88';
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // Barra de HP del boss (ancha, encima)
  const barW = 120;
  const barX = cx - barW / 2;
  const barY = boss.y - 20;
  ctx.fillStyle = '#220022';
  ctx.fillRect(barX, barY, barW, 8);
  const hpColor = hpRatio > 0.5 ? '#ff00ff' : hpRatio > 0.25 ? '#ffaa00' : '#ff0055';
  ctx.fillStyle = hpColor;
  ctx.fillRect(barX, barY, barW * hpRatio, 8);
  ctx.strokeStyle = '#ffffff44';
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barW, 8);
  ctx.font = 'bold 8px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('BOSS', cx, barY - 3);

  ctx.restore();
}

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
    this.mouseX = -1; // -1 = sin mouse activo
    
    this.init();
    this.setupResponsive();
  }

  /**
   * Redimensiona el canvas para adaptarse a la pantalla sin deformar
   */
  setupResponsive() {
    const resize = () => {
      const container = this.canvas.parentElement;
      if (!container) return;
      const maxW = container.clientWidth - 20;
      const maxH = window.innerHeight - 140; // espacio para UI
      const ratio = 800 / 600;
      let w = Math.min(maxW, 800);
      let h = w / ratio;
      if (h > maxH) { h = maxH; w = h * ratio; }
      this.canvas.style.width  = Math.floor(w) + 'px';
      this.canvas.style.height = Math.floor(h) + 'px';
    };
    resize();
    window.addEventListener('resize', resize);
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
          type: Math.random() < 0.2 ? 'special' : 'normal',
          hitCooldown: 0  // evita daño múltiple por frame
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
      // Convertir coordenadas del mouse al espacio del canvas (puede estar escalado)
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.width / rect.width;
      this.mouseX = (e.clientX - rect.left) * scaleX;
    });

    // Resetear mouse si sale del canvas
    this.canvas.addEventListener('mouseleave', () => {
      this.mouseX = -1;
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

    // Usar ratón (mouseX ya está en coordenadas de canvas)
    if (this.mouseX >= 0) {
      const targetX = this.mouseX - this.paddle.width / 2;
      const diff = targetX - this.paddle.x;
      this.paddle.vx = Math.max(-speed * 3, Math.min(speed * 3, diff * 0.5));
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

    // Actualizar cooldown de bloques
    this.blocks.forEach(b => { if (b.hitCooldown > 0) b.hitCooldown -= dt; });

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

      // Cooldown: solo puede recibir daño una vez por rebote
      if (block.hitCooldown > 0) continue;
      
      if (this.checkCircleRectCollision(this.ball, block)) {
        block.health--;
        block.hitCooldown = 0.3; // 300ms inmune tras ser golpeado
        this.score += 10 * (block.health + 1);

        // Cambiar color según vida restante
        const colors = ['#ff0055', '#ff00ff', '#00ffff', '#00ff00'];
        block.color = colors[Math.max(0, block.health - 1)];

        AudioManager.playSuccess();
        ParticleSystem.burstEffect(block.x + block.width / 2, block.y + block.height / 2, 
          ['#ff00ff', '#00ffff', '#00ff00']);

        // Crear power-up solo al destruir
        if (block.health <= 0) {
          this.blocks.splice(i, 1);
          this.crystals++;
          if (Math.random() < 0.25) {
            this.createPowerUp(block.x + block.width / 2, block.y + block.height / 2);
          }
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
      { type: 'expand',   label: 'ANCHO',    color: '#00ff88', duration: 10 },
      { type: 'slowball', label: 'LENTO',    color: '#00ddff', duration: 15 },
      { type: 'multiball',label: 'x3 BOLA', color: '#ffaa00', duration: 8  },
      { type: 'shield',   label: 'ESCUDO',   color: '#ff44ff', duration: 20 }
    ];

    const powerUp = types[Math.floor(Math.random() * types.length)];
    
    this.powerUps.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 60,
      vy: Math.random() * 80 + 40,
      rotation: 0,
      rotationSpeed: Math.random() * 3 + 1,
      ...powerUp
    });
  }

  updatePowerUps(dt) {
    for (let i = this.powerUps.length - 1; i >= 0; i--) {
      const pu = this.powerUps[i];
      pu.y += pu.vy * dt;
      pu.vy += 200 * dt; // Gravedad
      pu.rotation += pu.rotationSpeed * dt; // Animar rotación

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
    if (this.gameState === 'gameOver') return; // Evitar doble llamada
    this.gameState = 'gameOver';
    AudioManager.playGameOver();
    this.recordSession();
    this.showGameOverMenu();
  }

  victory() {
    if (this.gameState === 'victory') return; // Evitar doble llamada
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
    const ctx = this.ctx;

    // ─── Fondo con gradiente y estrellas ───
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, '#080c24');
    bgGrad.addColorStop(1, '#0a0e27');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Estrellas de fondo (basadas en gameTime para shimmer)
    if (!this._stars) {
      this._stars = Array.from({ length: 60 }, () => ({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 1.2 + 0.3,
        phase: Math.random() * Math.PI * 2
      }));
    }
    this._stars.forEach(s => {
      const alpha = 0.3 + 0.4 * Math.sin(this.gameTime * 1.5 + s.phase);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,200,255,${alpha})`;
      ctx.fill();
    });

    // Grid mágico sutil
    ctx.strokeStyle = 'rgba(0, 200, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i < this.width; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, this.height); ctx.stroke();
    }
    for (let j = 0; j < this.height; j += 40) {
      ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(this.width, j); ctx.stroke();
    }

    // ─── Bloques (cristales con facetas) ───
    this.blocks.forEach(block => {
      drawCrystalBlock(ctx, block.x, block.y, block.width, block.height,
        block.color, block.health, block.maxHealth);
    });

    // ─── Boss ───
    if (this.boss) {
      drawBoss(ctx, this.boss, this.gameTime);
    }

    // ─── Paleta holográfica ───
    const px = this.paddle.x, py = this.paddle.y;
    const pw = this.paddle.width, ph = this.paddle.height;
    const pGrad = ctx.createLinearGradient(px, py, px, py + ph);
    pGrad.addColorStop(0, '#88ffcc');
    pGrad.addColorStop(0.4, '#00ff88');
    pGrad.addColorStop(1, '#006644');
    ctx.save();
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 12;
    // Forma de paleta con esquinas redondeadas
    const pr = 6;
    ctx.beginPath();
    ctx.moveTo(px + pr, py);
    ctx.lineTo(px + pw - pr, py);
    ctx.quadraticCurveTo(px + pw, py, px + pw, py + pr);
    ctx.lineTo(px + pw, py + ph - pr);
    ctx.quadraticCurveTo(px + pw, py + ph, px + pw - pr, py + ph);
    ctx.lineTo(px + pr, py + ph);
    ctx.quadraticCurveTo(px, py + ph, px, py + ph - pr);
    ctx.lineTo(px, py + pr);
    ctx.quadraticCurveTo(px, py, px + pr, py);
    ctx.closePath();
    ctx.fillStyle = pGrad;
    ctx.fill();
    ctx.strokeStyle = '#aaffdd';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Reflejo superior
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.moveTo(px + pr, py);
    ctx.lineTo(px + pw - pr, py);
    ctx.lineTo(px + pw - pr, py + ph * 0.4);
    ctx.lineTo(px + pr, py + ph * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // ─── Pelota mágica con glow y núcleo ───
    const bx = this.ball.x, by = this.ball.y, br = this.ball.radius + 2;
    ctx.save();
    // Aura exterior
    ctx.shadowColor = '#ffcc44';
    ctx.shadowBlur = 20;
    const ballGrad = ctx.createRadialGradient(bx - 1, by - 1, 0, bx, by, br);
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.3, '#ffee88');
    ballGrad.addColorStop(0.7, '#ffaa00');
    ballGrad.addColorStop(1, '#ff6600');
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = ballGrad;
    ctx.fill();
    // Punto brillante
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(bx - 1, by - 1, br * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fill();
    ctx.restore();

    // ─── Power-ups con iconos dibujados ───
    this.powerUps.forEach(pu => drawPowerUpIcon(ctx, pu));

    // ─── Partículas ───
    ParticleSystem.draw(ctx);
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
  game.gameState = 'menu';
  // Cerrar TODOS los paneles antes de abrir el menú principal
  document.getElementById('pauseMenu').classList.remove('active');
  document.getElementById('gameOverMenu').classList.remove('active');
  document.getElementById('victoryMenu').classList.remove('active');
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
