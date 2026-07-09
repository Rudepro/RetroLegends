![Retro Legends Logo](assets/img/RetroLegends.png)

# 📚 GUÍA DE BUENAS PRÁCTICAS - Retro Legends

Convenciones y mejores prácticas para mantener el código limpio y escalable.

**GitHub**: [github.com/Rudepro/retro-legends](https://github.com/Rudepro/retro-legends)

---

## 🎯 Principios Fundamentales

1. **KISS** (Keep It Simple, Stupid)
   - Código simple es más mantenible
   - Evitar sobre-ingeniería
   - Una responsabilidad por función/clase

2. **DRY** (Don't Repeat Yourself)
   - Extraer código repetido a funciones
   - Usar utilidades compartidas
   - Evitar copy-paste

3. **YAGNI** (You Ain't Gonna Need It)
   - Solo implementar lo que se necesita
   - No especular sobre futuros features
   - Refactorizar cuando sea evidente la necesidad

4. **SOLID** (en lo posible sin frameworks)
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

---

## 📝 Convenciones de Código

### Nombres

```javascript
// Variables: camelCase
let playerScore = 0;
const canvasWidth = 800;

// Constantes: UPPER_SNAKE_CASE
const DEFAULT_SPEED = 200;
const MAX_ENEMIES = 50;

// Clases: PascalCase
class CrystalForge { }
class GameManager { }

// Métodos/Funciones: camelCase
function calculateDistance() { }
player.takeDamage();

// Booleanos: is*, has*, should*
let isGameOver = false;
let hasActivePowerUp = true;
let shouldRender = true;

// ID de elementos: snake-case con prefijo
const pauseBtn = document.getElementById('pause-btn');
const gameCanvas = document.getElementById('game-canvas');
```

### Comentarios

```javascript
// Comentario de una línea para explicar qué
// No usar para código obvio

// ✗ Malo
let x = 5; // Establecer x a 5

// ✓ Bien
let paddleSpeed = 300; // Velocidad máxima de la paleta

// Comentarios de bloque para contexto importante
/*
 * Sistema de colisión:
 * 1. Actualizar posiciones
 * 2. Detectar collisiones AABB
 * 3. Resolver respuesta física
 */

// JSDoc para funciones públicas
/**
 * Calcula la distancia entre dos puntos
 * @param {number} x1 - Primera coordenada X
 * @param {number} y1 - Primera coordenada Y
 * @param {number} x2 - Segunda coordenada X
 * @param {number} y2 - Segunda coordenada Y
 * @returns {number} Distancia euclidiana
 */
function calculateDistance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}
```

---

## 🏗️ Patrones de Código

### Módulos Sistema (IIFE)

```javascript
// ✓ Patrón correcto
const MyModule = (() => {
  // Private state
  const state = {
    data: 0
  };
  
  // Private methods
  const privateMethod = () => {
    return state.data * 2;
  };
  
  // Public API
  return {
    init: () => {
      // Inicializar
    },
    getData: () => state.data,
    setData: (value) => {
      state.data = value;
    }
  };
})();

// Uso
MyModule.init();
MyModule.setData(42);
console.log(MyModule.getData()); // 42
```

### Clases de Juegos

```javascript
// ✓ Patrón correcto
class MiJuego {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    // Game state
    this.state = 'menu';
    this.score = 0;
    this.gameTime = 0;
    
    // Game objects
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    
    // Input state
    this.keys = {};
    
    this.init();
  }
  
  init() {
    this.setupInput();
    this.startGameLoop();
  }
  
  setupInput() {
    // Event listeners
  }
  
  update(dt) {
    // Update logic
  }
  
  draw() {
    // Render logic
  }
  
  startGameLoop() {
    let lastTime = Date.now();
    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      
      this.update(dt);
      this.draw();
      
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
```

### Gestión de Eventos

```javascript
// ✓ Bien: Centralized event handling
class Game {
  constructor() {
    this.keys = {};
    this.setupInput();
  }
  
  setupInput() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e));
    window.addEventListener('keyup', (e) => this.onKeyUp(e));
    this.canvas.addEventListener('click', (e) => this.onClick(e));
  }
  
  onKeyDown(e) {
    this.keys[e.key] = true;
    if (e.key === ' ') this.jump();
    if (e.key === 'Escape') this.showMenu();
  }
  
  onKeyUp(e) {
    this.keys[e.key] = false;
  }
  
  onClick(e) {
    // Handle click
  }
}

// ✗ Evitar: Múltiples listeners
window.addEventListener('keydown', () => player.move());
window.addEventListener('keydown', () => camera.shake());
window.addEventListener('keydown', () => audio.play());
```

---

## 🎮 Rendimiento

### Canvas Rendering

```javascript
// ✗ Malo: Resetting todo
draw() {
  this.ctx.clearRect(0, 0, this.width, this.height);
  
  // Dibujar muchas veces
  for (let i = 0; i < 1000; i++) {
    this.drawEntity(entities[i]);
  }
}

// ✓ Bien: Reutilizar contexto
draw() {
  // Clear una vez
  this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
  this.ctx.fillRect(0, 0, this.width, this.height);
  
  // Batch similar entities
  this.ctx.fillStyle = '#ff0000';
  for (const enemy of this.enemies) {
    this.ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  }
  
  this.ctx.fillStyle = '#00ff00';
  for (const bullet of this.bullets) {
    this.ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h);
  }
}
```

### Object Pooling (Optimización)

```javascript
// Para sistemas con muchos objetos (partículas)
class ParticlePool {
  constructor(size = 100) {
    this.pool = [];
    this.active = [];
    
    for (let i = 0; i < size; i++) {
      this.pool.push(new Particle());
    }
  }
  
  acquire(x, y, vx, vy) {
    let p;
    if (this.pool.length > 0) {
      p = this.pool.pop();
      p.reset(x, y, vx, vy);
    } else {
      p = new Particle(x, y, vx, vy);
    }
    this.active.push(p);
    return p;
  }
  
  release(particle) {
    const idx = this.active.indexOf(particle);
    if (idx !== -1) {
      this.active.splice(idx, 1);
      this.pool.push(particle);
    }
  }
  
  update(dt) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i];
      p.update(dt);
      if (p.isDead()) {
        this.release(p);
      }
    }
  }
}
```

### Evitar Memory Leaks

```javascript
// ✗ Malo: Event listener sin cleanup
class Game {
  init() {
    window.addEventListener('click', () => this.onClick());
  }
  // Si se instancia múltiples veces, se acumulan listeners
}

// ✓ Bien: Guardar referencia para cleanup
class Game {
  constructor() {
    this.clickHandler = (e) => this.onClick(e);
  }
  
  init() {
    window.addEventListener('click', this.clickHandler);
  }
  
  destroy() {
    window.removeEventListener('click', this.clickHandler);
  }
}
```

---

## 🧪 Testing & Debugging

### Console Logging

```javascript
// ✓ Estructura buena de logging
class Logger {
  static log(message, data = null) {
    console.log(`[LOG] ${message}`, data || '');
  }
  
  static error(message, error = null) {
    console.error(`[ERROR] ${message}`, error || '');
  }
  
  static warn(message, data = null) {
    console.warn(`[WARN] ${message}`, data || '');
  }
  
  static debug(message, data = null) {
    if (DEBUG_MODE) {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  }
}

// Uso
Logger.log('Game started');
Logger.error('Player died', { score: 100 });
Logger.debug('Update loop', { dt: 0.016, fps: 60 });
```

### Breakpoints en DevTools

```javascript
// Técnica 1: Debugger statement
if (someCondition) {
  debugger; // Pausa aquí
}

// Técnica 2: Console assertions
console.assert(player.health > 0, 'Player should have health');

// Técnica 3: Conditional breakpoints
// En DevTools: Right-click línea → Add conditional breakpoint
// Expresión: this.score > 1000
```

---

## 🎨 Estilo CSS

### Organización

```css
/* 1. Reset y bases */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Courier New', monospace; }

/* 2. Variables CSS */
:root {
  --primary: #00ff00;
  --secondary: #ff00ff;
  --spacing: 1rem;
}

/* 3. Layout global */
.container { display: flex; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

/* 4. Componentes */
.btn { /* estilos */ }
.btn-primary { /* estilos */ }
.btn-secondary { /* estilos */ }

/* 5. Utilidades */
.text-center { text-align: center; }
.mb-1 { margin-bottom: var(--spacing); }

/* 6. Responsive */
@media (max-width: 768px) {
  /* Tablet */
}

@media (max-width: 480px) {
  /* Mobile */
}
```

### Naming Convention BEM (opcional)

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier */
.card--active { }
.card--disabled { }

/* Uso */
<div class="card card--active">
  <div class="card__header">Título</div>
  <div class="card__body">Contenido</div>
</div>
```

---

## 🚀 Optimización Web

### Load Time

```javascript
// ✓ Script loading strategy
// En HTML head: async para scripts independientes
<script async src="analytics.js"></script>

// En HTML body antes de cerrar: defer para scripts dependientes
<script defer src="main.js"></script>
<script defer src="game.js"></script>

// O IIFE para lazy initialization
window.addEventListener('load', () => {
  initGame();
});
```

### Bundle Size

```javascript
// ✓ Tree-shaking (si fuera modular)
// Solo importar lo que usas
import { calculateDistance } from './utils.js';

// No hagas esto
import * as Utils from './utils.js';

// ✓ Minificar en producción
// Original: 500KB
// Minificado: 150KB
// Gzipped: 50KB
```

---

## 📋 Checklist Pre-Deployment

- [ ] Código sin console.log() de debug
- [ ] Sin warnings en consola
- [ ] Probado en 2+ navegadores
- [ ] Probado en mobile (F12 device mode)
- [ ] Rendimiento: 60 FPS en gameplay
- [ ] Audio funciona en todos lados
- [ ] LocalStorage funciona
- [ ] No hay memory leaks (DevTools → Memory)
- [ ] All assets cargan correctamente
- [ ] Responsive en todos los breakpoints

---

## 🔒 Seguridad

### Validación de Entrada

```javascript
// ✓ Validar datos de usuario
function setPlayerName(name) {
  // Validar tipo
  if (typeof name !== 'string') {
    throw new Error('Name must be string');
  }
  
  // Validar longitud
  if (name.length < 1 || name.length > 50) {
    throw new Error('Name must be 1-50 characters');
  }
  
  // Sanitizar
  const sanitized = name.trim().substring(0, 50);
  
  Storage.setPlayerName(sanitized);
}
```

### XSS Prevention

```javascript
// ✗ Peligroso: Inyección de HTML
const name = getUserInput();
document.getElementById('name').innerHTML = name; // XSS risk!

// ✓ Seguro: Usar textContent
document.getElementById('name').textContent = name;

// ✓ O sanitizar explícitamente
const div = document.createElement('div');
div.textContent = name;
element.appendChild(div);
```

---

## 🐛 Debugging Común

### FPS Bajo

```javascript
// Verificar qué toma tiempo
console.time('update');
this.update(dt);
console.timeEnd('update'); // Imprime: update: 2.5ms

console.time('draw');
this.draw();
console.timeEnd('draw'); // Imprime: draw: 8.3ms

// Usar DevTools Performance tab
```

### Memory Leak

```javascript
// En DevTools → Memory → Take snapshot
// Comparar 2 snapshots después de cerrar juego
// Si memoria no baja = potential leak

// Verificación manual
console.log('Active listeners:', document._events?.length || 0);
console.log('DOM nodes:', document.querySelectorAll('*').length);
```

### Comportamiento Aleatorio

```javascript
// Set seed para reproducibilidad (testing)
Math.seedrandom = function() {
  let x = Math.sin(12345) * 10000;
  return x - Math.floor(x);
};

// En producción usar Math.random() normal
```

---

## 📖 Documentación

### README por módulo

```javascript
/**
 * Storage Module
 * 
 * Gestión de datos persistentes usando LocalStorage
 * 
 * API Pública:
 * - Storage.getProfile() → { name, avatar, id }
 * - Storage.setPlayerName(name) → void
 * - Storage.getStatistics() → { totalTime, victories, ... }
 * - Storage.recordGameSession(gameId, stats) → void
 * 
 * Eventos:
 * - 'storage-changed' cuando datos se actualizan
 * 
 * Limitaciones:
 * - LocalStorage: 5-10MB máximo por dominio
 * - No funciona en modo incógnito algunos navegadores
 * - No sincroniza entre dominios
 * 
 * Ejemplo:
 * Storage.setPlayerName('Juan');
 * const name = Storage.getProfile().name; // 'Juan'
 */
```

---

## 🎓 Recursos

- **MDN Web Docs**: https://developer.mozilla.org
- **Google Developers**: https://developers.google.com
- **Web.dev**: https://web.dev/performance/
- **Clean Code**: Robert C. Martin
- **You Don't Know JS**: Kyle Simpson

---

**Mantén el código limpio, legible y eficiente.**

🕹️ **RETRO LEGENDS**
