/**
 * PARTICLES.JS
 * Sistema de partículas para efectos visuales
 * Pixel art style, animaciones retro
 */

const ParticleSystem = (() => {
  class Particle {
    constructor(x, y, vx, vy, life, color, size = 2) {
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.life = life;
      this.maxLife = life;
      this.color = color;
      this.size = size;
    }

    update(dt = 0.016) {
      this.x += this.vx * dt;
      this.y += this.vy * dt;
      this.vy += 200 * dt; // Gravedad
      this.life -= dt;
    }

    isDead() {
      return this.life <= 0;
    }

    getAlpha() {
      return Math.max(0, this.life / this.maxLife);
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.getAlpha();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  const emitters = [];

  const createEmitter = (x, y, count, colors, speed = 100) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, vx, vy, 1, color, 3));
    }
    return particles;
  };

  const burstEffect = (x, y, colors) => {
    const particles = createEmitter(x, y, 12, colors, 200);
    emitters.push(particles);
    return particles;
  };

  const trailEffect = (x, y, vx, vy, color) => {
    const particles = [];
    for (let i = 0; i < 3; i++) {
      particles.push(new Particle(x, y, vx * 0.5, vy * 0.5, 0.3, color, 2));
    }
    emitters.push(particles);
  };

  const update = (dt = 0.016) => {
    for (let i = emitters.length - 1; i >= 0; i--) {
      const emitter = emitters[i];
      for (let j = emitter.length - 1; j >= 0; j--) {
        emitter[j].update(dt);
        if (emitter[j].isDead()) {
          emitter.splice(j, 1);
        }
      }
      if (emitter.length === 0) {
        emitters.splice(i, 1);
      }
    }
  };

  const draw = (ctx) => {
    for (const emitter of emitters) {
      for (const particle of emitter) {
        particle.draw(ctx);
      }
    }
  };

  const clear = () => {
    emitters.length = 0;
  };

  return {
    createEmitter,
    burstEffect,
    trailEffect,
    update,
    draw,
    clear
  };
})();
