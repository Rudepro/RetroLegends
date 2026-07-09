![Retro Legends Logo](assets/img/RetroLegends.png)

# 🚀 QUICKSTART - Retro Legends

Guía rápida para empezar a usar Retro Legends.

**Repositorio**: [github.com/Rudepro/retro-legends](https://github.com/Rudepro/retro-legends)

---

## ⚡ Inicio Rápido (5 minutos)

### 1. Clonar/Descargar el Proyecto

```bash
cd RetroLegends
```

### 2. Iniciar Servidor Local

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server
```

### 3. Abrir en Navegador

```
http://localhost:8000
```

---

## 📂 Estructura Clave

```
RetroLegends/
├── index.html                 # Landing page (INICIO)
├── games.json                 # Configuración de juegos
├── assets/
│   ├── css/main.css          # Estilos globales
│   ├── js/                   # Sistema central (storage, audio, etc.)
│   └── img/                  # Imágenes y assets
├── pages/                    # HTML de juegos
└── games/                    # Lógica JavaScript de juegos
```

---

## 🎮 Juegos Disponibles

| Juego | Tipo | Ruta | Dificultad |
|-------|------|------|-----------|
| **Crystal Forge** | Arkanoid | `pages/crystal-forge.html` | Media |
| **Quantum Duel** | Pong | `pages/quantum-duel.html` | Media-Alta |
| **BioCore** | Snake | `pages/biocore.html` | Media |
| **Shadow Labyrinth** | Maze | `pages/shadow-labyrinth.html` | Difícil |
| **Rocket Escape** | Flappy Bird | `pages/rocket-escape.html` | Media |
| **Forgotten Temple** | Platformer | `pages/forgotten-temple.html` | Difícil |
| **Galaxy Defender** | Shooter | `pages/galaxy-defender.html` | Media-Alta |
| **Echoes of Darkness** | Dungeon | `pages/echoes-of-darkness.html` | Difícil |

---

## 🔨 Desarrollo

### Añadir un Nuevo Juego

#### Paso 1: Registrar en `games.json`

```json
{
  "id": "nuevo-juego",
  "name": "Nuevo Juego",
  "title": "Mi Nuevo Juego",
  "description": "Descripción breve",
  "genre": "Acción",
  "difficulty": "Media",
  "path": "pages/nuevo-juego.html",
  "image": "assets/img/nuevo-juego.png",
  "unlocks": {
    "achievements": [],
    "characters": []
  },
  "playable": true,
  "releaseDate": "2025-01-20"
}
```

#### Paso 2: Crear estructura

```bash
mkdir -p games/nuevo-juego/js
mkdir -p games/nuevo-juego/assets
```

#### Paso 3: HTML en `pages/nuevo-juego.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo Juego - Retro Legends</title>
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/game.css">
</head>
<body>
  <canvas id="gameCanvas" width="800" height="600"></canvas>
  
  <script src="../assets/js/storage.js"></script>
  <script src="../assets/js/audio.js"></script>
  <script src="../assets/js/particles.js"></script>
  <script src="../assets/js/effects.js"></script>
  <script src="../assets/js/game-manager.js"></script>
  <script src="js/nuevo-juego.js"></script>
</body>
</html>
```

#### Paso 4: Lógica en `games/nuevo-juego/js/nuevo-juego.js`

```javascript
class NuevoJuego {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.gameState = 'menu';
    this.score = 0;
    this.gameTime = 0;
  }

  update(dt) {
    if (this.gameState !== 'playing') return;
    this.gameTime += dt;
    ParticleSystem.update(dt);
  }

  draw() {
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  recordSession() {
    GameManager.recordGameSession('nuevo-juego', {
      victory: this.score > 100,
      score: this.score,
      playTime: this.gameTime
    });
  }
}
```

---

## 🎨 Sistema Central

### Storage.js - Datos Persistentes

```javascript
// Guardar
Storage.setPlayerName('Mi Nombre');
Storage.updateSettings({ music: true });
Storage.addGameStats('game-id', { score: 100 });

// Cargar
const profile = Storage.getProfile();
const stats = Storage.getStatistics();
const achievements = Storage.getAchievements();
```

### AudioManager.js - Sonidos

```javascript
AudioManager.playBeep();              // Sonido simple
AudioManager.playSuccess();           // Éxito
AudioManager.playError();             // Error
AudioManager.playPowerUp();           // Power-up
AudioManager.playGameOver();          // Game Over

// Control de volumen
AudioManager.setMasterVolume(0.8);
AudioManager.setMusicVolume(0.7);
AudioManager.setSFXVolume(0.8);
```

### ParticleSystem.js - Efectos

```javascript
ParticleSystem.burstEffect(x, y, ['#ff0000', '#ffaa00']);
ParticleSystem.trailEffect(x, y, vx, vy, '#00ff00');
ParticleSystem.update(deltaTime);
ParticleSystem.draw(canvasContext);
```

### GameManager.js - Control Central

```javascript
await GameManager.loadGames();
const unlockedGames = GameManager.getUnlockedGames();
GameManager.recordGameSession('game-id', stats);
GameManager.playGame('game-id');
```

---

## 🎮 Controles Estándar

| Acción | Tecla |
|--------|-------|
| Mover Izquierda | ← / A |
| Mover Derecha | → / D |
| Mover Arriba | ↑ / W |
| Mover Abajo | ↓ / S |
| Acción Principal | ESPACIO |
| Pausa | P |
| Menú | ESC |

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| "Cannot read 'getContext'" | Verificar que canvas existe en HTML |
| No se reproduce audio | Hacer clic en página primero (autoplay policy) |
| LocalStorage no guarda | Usar servidor (no file://) |
| Juego muy lento | Reducir cantidad de enemigos/partículas |
| Canvas en blanco | Verificar dimensiones (width/height) |

---

## 📝 Variables de Entorno (opcional)

En localStorage, se guardan automáticamente:
- `retro-legends-profile` - Perfil del jugador
- `retro-legends-settings` - Configuración
- `retro-legends-stats` - Estadísticas
- `retro-legends-achievements` - Logros desbloqueados
- `retro-legends-progress` - Progreso por juego
- `retro-legends-unlocks` - Juegos/caracteres desbloqueados

---

## 📱 Responsive Design

Breakpoints incluidos:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Extra Small**: < 480px

Todos los juegos se adaptan automáticamente.

---

## 🎯 Checklist de Nuevo Juego

- [ ] Registrado en `games.json`
- [ ] Carpeta en `games/[id]/js/`
- [ ] HTML en `pages/[id].html`
- [ ] Clase JavaScript con update() y draw()
- [ ] Integración con ParticleSystem
- [ ] Integración con AudioManager
- [ ] recordGameSession() al terminar
- [ ] Controles funcionales
- [ ] Modal de menú/pausa/game over
- [ ] Probado en desktop y mobile

---

## 💡 Tips de Desarrollo

1. **Usar DevTools**: F12 → Console para revisar errores
2. **Probar FPS**: Activar en settings (muestra frame rate)
3. **Debugging**: Agregar `console.log()` en update()
4. **Responsive**: Probar con F12 → Device Toolbar
5. **Performance**: DevTools → Performance → Record

---

## 📚 Recursos

- **MDN Web Docs**: https://developer.mozilla.org
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **LocalStorage**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

## ❓ Preguntas Frecuentes

**P: ¿Cómo agregar más juegos?**
R: Ver sección "Añadir un Nuevo Juego" arriba.

**P: ¿Puedo usar frameworks?**
R: No, el proyecto está limitado a vanilla HTML/CSS/JS.

**P: ¿Cómo personalizar colores?**
R: Editar variables CSS en `assets/css/main.css` (línea 1-10).

**P: ¿Cómo desactivar audio?**
R: Settings → Desactivar música/SFX o mover volumen a 0.

**P: ¿Funciona sin internet?**
R: Sí, solo necesita un servidor local (no funciona file://).

---

**¡Listo para empezar! Abre `http://localhost:8000` en tu navegador.**

🕹️ **Revive los Clásicos. Descubre Nuevas Leyendas.**
