![Retro Legends Logo](assets/img/RetroLegends.png)

# 🕹️ RETRO LEGENDS - Plataforma Arcade Moderna

**Revive los Clásicos. Descubre Nuevas Leyendas.**

[![GitHub](https://img.shields.io/badge/GitHub-Rudepro-black?style=flat&logo=github)](https://github.com/Rudepro/retro-legends)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Índice

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Características](#características)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Requisitos Técnicos](#requisitos-técnicos)
5. [Instalación y Uso](#instalación-y-uso)
6. [Los Juegos](#los-juegos)
7. [Sistema Central](#sistema-central)
8. [Agregar Nuevos Juegos](#agregar-nuevos-juegos)
9. [Personalización](#personalización)
10. [Roadmap](#roadmap)

---

## 📖 Descripción del Proyecto

**Retro Legends** es una plataforma web completa de videojuegos arcade modernos desarrollada con **HTML5, CSS3 y JavaScript ES6+**, sin frameworks ni dependencias externas.

No es una colección de clones, sino un ecosistema de títulos originales con **identidad propia, mecánicas innovadoras y una experiencia completamente nueva** inspirada en los grandes éxitos de los años 80 y 90.

### Filosofía

- **100% Puro**: HTML5, CSS3, JavaScript vanilla
- **Sin Dependencias**: Cero frameworks, cero librerías externas
- **Modular**: Cada juego es completamente independiente
- **Escalable**: Diseñado para crecer fácilmente
- **Profesional**: Código limpio, documentado y optimizado

---

## ✨ Características

### 🎮 Juegos Completos (8)

1. **Crystal Forge** (Arkanoid mejorado)
   - Purifica cristales con esfera mágica
   - Power-ups dinámicos
   - Sistema de jefes
   - Múltiples niveles

2. **Quantum Duel** (Pong evolucionado)
   - Portales cuánticos
   - Gravedad dinámica
   - Múltiples pelotas
   - Competencia 1v1

3. **BioCore** (Snake con evolución)
   - Organismo viviente que muta
   - Sistema de ADN
   - Biomas diferentes
   - Crecimiento progresivo

4. **Shadow Labyrinth** (Pac-Man reimaginado)
   - Laberinto oscuro
   - Sigilo e inteligencia
   - IA desafiante
   - Fragmentos de memoria

5. **Rocket Escape** (Flappy Bird mejorado)
   - Pilota un cohete
   - Meteoritos y tormentas
   - Planetas explorados
   - Distancias progresivas

6. **Forgotten Temple** (Plataformas retro)
   - Exploración de templos
   - Rompecabezas complejos
   - Trampas mortales
   - Reliquias coleccionables

7. **Galaxy Defender** (Shooter espacial)
   - Defensa galáctica
   - Gestión de energía
   - Oleadas escalables
   - Jefes épicos

8. **Echoes of Darkness** (Dungeon Crawler)
   - Mazmorras procedurales
   - Gestión de inventario
   - NPCs interactivos
   - Sistema de habilidades

### 📊 Sistema de Progresión

- **Perfil de Jugador**: Nombre, avatar, estadísticas personales
- **Estadísticas Globales**: Tiempo jugado, victorias, derrotas, puntos totales
- **Sistema de Logros**: 10+ logros desbloqueables
- **Desbloqueos**: Personajes y contenido exclusivo
- **Guardado Automático**: LocalStorage para persistencia

### 🎵 Audio

- **Retro Synth**: Música original sintetizada
- **Efectos Arcade**: Sonidos auténticos
- **Control de Volumen**: Ajustes granulares
- **Web Audio API**: Generación de sonido en tiempo real

### 🎨 Visuales

- **Pixel Art Retro**: Estética arcade moderna
- **CRT Mode**: Scanlines y efecto retro opcional
- **Partículas**: Sistema de efectos dinámicos
- **Glow Effects**: Iluminación neón cyberpunk
- **Animaciones Suaves**: Transiciones profesionales

### ⚙️ Configuración

- Activar/desactivar música y efectos
- Control de volumen
- Modo CRT (scanlines, glow)
- Mostrar FPS
- Reiniciar progreso
- Selector de idioma
- Tema claro/oscuro

---

## 🏗️ Estructura del Proyecto

```
RetroLegends/
├── index.html                    # Landing page principal
├── games.json                    # Configuración de juegos
│
├── assets/
│   ├── css/
│   │   ├── main.css             # Estilos globales
│   │   ├── landing.css          # Estilos landing
│   │   └── game.css             # Estilos comunes de juegos
│   │
│   ├── js/
│   │   ├── storage.js           # Sistema de almacenamiento
│   │   ├── audio.js             # Gestor de audio
│   │   ├── particles.js         # Sistema de partículas
│   │   ├── effects.js           # Efectos visuales
│   │   ├── game-manager.js      # Gestor central de juegos
│   │   └── landing.js           # Lógica de landing page
│   │
│   ├── img/                     # Imágenes y assets
│   ├── audio/                   # Archivos de sonido
│   ├── fonts/                   # Fuentes personalizadas
│   └── icons/                   # Iconos SVG/PNG
│
├── pages/
│   ├── crystal-forge.html
│   ├── quantum-duel.html
│   ├── biocore.html
│   ├── shadow-labyrinth.html
│   ├── rocket-escape.html
│   ├── forgotten-temple.html
│   ├── galaxy-defender.html
│   └── echoes-of-darkness.html
│
├── games/
│   ├── crystal-forge/
│   │   ├── js/crystal-forge.js
│   │   └── assets/
│   │
│   ├── quantum-duel/
│   │   ├── js/quantum-duel.js
│   │   └── assets/
│   │
│   ├── biocore/
│   │   ├── js/biocore.js
│   │   └── assets/
│   │
│   ├── shadow-labyrinth/
│   │   ├── js/shadow-labyrinth.js
│   │   └── assets/
│   │
│   ├── rocket-escape/
│   │   ├── js/rocket-escape.js
│   │   └── assets/
│   │
│   ├── forgotten-temple/
│   │   ├── js/forgotten-temple.js
│   │   └── assets/
│   │
│   ├── galaxy-defender/
│   │   ├── js/galaxy-defender.js
│   │   └── assets/
│   │
│   └── echoes-of-darkness/
│       ├── js/echoes-of-darkness.js
│       └── assets/
│
└── README.md                     # Este archivo
```

---

## 💻 Requisitos Técnicos

- **Navegador Moderno**: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- **JavaScript ES6+**: Clases, Arrow Functions, Destructuring, etc.
- **APIs Utilizadas**:
  - Canvas API (gráficos)
  - Web Audio API (sonido)
  - LocalStorage (persistencia)
  - Intersection Observer (animaciones)

### Compatibilidad

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android)
- ✅ Mobile (iOS, Android)
- ✅ Responsive en todos los tamaños

---

## 🚀 Instalación y Uso

### Opción 1: Local (Recomendado para desarrollo)

```bash
# 1. Clonar o descargar el proyecto
git clone <repo-url>
cd RetroLegends

# 2. Abrir con servidor local (Python)
python -m http.server 8000

# 3. Abrir en navegador
http://localhost:8000

# 4. Alternativa con Node.js
npx http-server
```

### Opción 2: Servidor Web

```bash
# Subir todos los archivos a un servidor web
# Asegurarse de que:
# 1. Todos los archivos están en la raíz
# 2. MIME types estén configurados correctamente
# 3. CORS habilitado (si es necesario)
```

### Opción 3: Direct File (Limitado)

```bash
# Simplemente abrir index.html en un navegador
# Nota: LocalStorage funciona, pero algunas APIs pueden estar restringidas
```

---

## 🎮 Los Juegos

### Crystal Forge (Arkanoid Mejorado)

**Mecánica**: Rompe cristales con una esfera mágica controlada por paleta

**Controles**:
- ← → Mover paleta
- ESPACIO Golpear
- P Pausa
- ESC Menú

**Características**:
- 3 niveles de dificultad
- Power-ups: Expandir, Desacelerar, Multibola, Escudo
- Jefes en niveles especiales
- Sistema progresivo de 10+ niveles

**Código**: `games/crystal-forge/js/crystal-forge.js`

---

### Quantum Duel (Pong Evolucionado)

**Mecánica**: Duelo 1v1 con portales y gravedad dinámica

**Controles P1**:
- ↑ ↓ Mover
- ESPACIO Crear portal

**Controles P2**:
- W S Mover
- ESPACIO Crear portal

**Características**:
- Portales que teletransportan la pelota
- Gravedad dinámica que aumenta cada ronda
- Múltiples pelotas en dificultad Hard
- 5 rondas competitivas

**Código**: `games/quantum-duel/js/quantum-duel.js`

---

### BioCore (Snake con Evolución)

**Mecánica**: Controla un organismo que evoluciona comiendo y mutando

**Controles**:
- ↑ ↓ ← → Mover

**Características**:
- Organismo que crece
- Sistema de mutaciones (velocidad, tamaño, regeneración)
- ADN coleccionable
- Biomas diferentes

**Código**: `games/biocore/js/biocore.js`

---

### Shadow Labyrinth (Pac-Man Reimaginado)

**Mecánica**: Navega un laberinto oscuro con IA enemiga

**Controles**:
- ↑ ↓ ← → Mover
- W A S D Alternativo

**Características**:
- Generación procedural de laberintos
- IA perseguidora adaptativa
- Oscuridad como mecánica central
- Fragmentos de memoria ocultos

**Código**: `games/shadow-labyrinth/js/shadow-labyrinth.js`

---

### Rocket Escape (Flappy Bird Mejorado)

**Mecánica**: Pilota un cohete a través de obstáculos espaciales

**Controles**:
- ESPACIO ↑ Impulsar
- Clic Impulsar

**Características**:
- Meteoritos y tormentas
- Múltiples planetas
- Crecimiento de dificultad
- Efectos de espacio dinámicos

**Código**: `games/rocket-escape/js/rocket-escape.js`

---

### Forgotten Temple (Plataformas Retro)

**Mecánica**: Explora un templo con plataformas, trampas y rompecabezas

**Controles**:
- ← → Mover
- ESPACIO ↑ Saltar
- W Alternativo para saltar

**Características**:
- Generación procedural de niveles
- Trampas mortales
- Reliquias coleccionables
- Plataformas móviles

**Código**: `games/forgotten-temple/js/forgotten-temple.js`

---

### Galaxy Defender (Shooter Espacial)

**Mecánica**: Defiende la galaxia de invasiones de drones

**Controles**:
- ← → Mover
- Clic Disparar
- ESPACIO Disparar

**Características**:
- Oleadas escalables
- Gestión de energía
- Múltiples tipos de enemigos
- Jefes finales

**Código**: `games/galaxy-defender/js/galaxy-defender.js`

---

### Echoes of Darkness (Dungeon Crawler)

**Mecánica**: Explora mazmorras procedurales, derrota enemigos y recolecta ítems

**Controles**:
- ↑ ↓ ← → Mover
- W A S D Alternativo

**Características**:
- Mapas procedurales
- Gestión de inventario
- NPCs con diálogos
- Sistema de habilidades progresivo

**Código**: `games/echoes-of-darkness/js/echoes-of-darkness.js`

---

## 🔧 Sistema Central

### Storage.js - Sistema de Almacenamiento

```javascript
// Perfil del jugador
Storage.getProfile()                    // Obtener perfil actual
Storage.setPlayerName('Nombre')        // Establecer nombre
Storage.setPlayerAvatar(0-15)          // Establecer avatar

// Configuración
Storage.getSettings()                  // Obtener configuración
Storage.updateSettings({ music: true })

// Estadísticas
Storage.getStatistics()                // Estadísticas globales
Storage.getGameStats('game-id')        // Estadísticas por juego
Storage.addGameStats('game-id', stats)

// Logros
Storage.getAchievements()              // Todos los logros
Storage.unlockAchievement('id')        // Desbloquear logro
Storage.isAchievementUnlocked('id')

// Progreso
Storage.getProgress()                  // Progreso global
Storage.getGameProgress('game-id')     // Progreso específico
Storage.setGameProgress('game-id', data)

// Desbloqueos
Storage.isGameUnlocked('game-id')      // Verificar juego desbloqueado
Storage.unlockGame('game-id')          // Desbloquear juego
Storage.isCharacterUnlocked('char-id')
Storage.unlockCharacter('char-id')

// Reset
Storage.resetAllData()                 // Borrar todo (desarrollo)
```

### AudioManager.js - Gestor de Audio

```javascript
// Volumen
AudioManager.setMasterVolume(0.8)
AudioManager.setMusicVolume(0.7)
AudioManager.setSFXVolume(0.8)

// Efectos
AudioManager.playBeep()                // Bip simple
AudioManager.playClick()               // Clic de botón
AudioManager.playSuccess()             // Éxito (3 notas)
AudioManager.playError()               // Error (2 notas)
AudioManager.playPowerUp()             // Power-up (5 notas)
AudioManager.playExplosion()           // Explosión
AudioManager.playGameOver()            // Game Over

// Música
AudioManager.playRetroSynthLoop(120)   // Música ambient
AudioManager.stopMusic()               // Detener
```

### ParticleSystem.js - Sistema de Partículas

```javascript
// Crear efecto burst
ParticleSystem.burstEffect(x, y, colors)

// Crear efecto trail (rastro)
ParticleSystem.trailEffect(x, y, vx, vy, color)

// Actualizar
ParticleSystem.update(deltaTime)

// Dibujar
ParticleSystem.draw(canvasContext)

// Limpiar
ParticleSystem.clear()
```

### VisualEffects.js - Efectos Visuales

```javascript
// CRT
VisualEffects.applyCRTEffect(canvas, intensity)

// Glow
VisualEffects.createGlowEffect(text, color, blur)

// Pixelación
VisualEffects.pixelate(canvas, pixelSize)

// Transiciones
VisualEffects.fadeTransition(element, duration)
VisualEffects.slideInTransition(element, duration, direction)
VisualEffects.pulseEffect(element, duration)
VisualEffects.floatingEffect(element, distance, duration)
```

### GameManager.js - Gestor Central

```javascript
// Cargar configuración
await GameManager.loadGames()

// Obtener juegos
GameManager.getAllGames()              // Todos los juegos
GameManager.getGame('game-id')         // Juego específico
GameManager.getUnlockedGames()         // Solo desbloqueados

// Registrar sesión
GameManager.recordGameSession('game-id', {
  victory: true,
  score: 100,
  playTime: 300,
  coins: 50
})

// Navegar a juego
GameManager.playGame('game-id')        // Redirige a juego
```

---

## ➕ Agregar Nuevos Juegos

### Paso 1: Registrar en games.json

```json
{
  "id": "mi-juego",
  "name": "Mi Juego",
  "title": "Mi Juego Épico",
  "description": "Descripción breve del juego",
  "genre": "Acción",
  "difficulty": "Media",
  "path": "pages/mi-juego.html",
  "image": "assets/img/mi-juego.png",
  "unlocks": {
    "achievements": ["achievement-id"],
    "characters": ["game-id:character-id"]
  },
  "playable": true,
  "releaseDate": "2025-01-15"
}
```

### Paso 2: Crear estructura de carpetas

```bash
mkdir -p games/mi-juego/js
mkdir -p games/mi-juego/assets
```

### Paso 3: Crear página HTML

`pages/mi-juego.html`:
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Juego - Retro Legends</title>
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/game.css">
  <style>
    /* Estilos específicos */
  </style>
</head>
<body>
  <div class="game-container">
    <canvas id="gameCanvas" width="800" height="600"></canvas>
  </div>
  
  <script src="../assets/js/storage.js"></script>
  <script src="../assets/js/audio.js"></script>
  <script src="../assets/js/particles.js"></script>
  <script src="../assets/js/effects.js"></script>
  <script src="../assets/js/game-manager.js"></script>
  <script src="js/mi-juego.js"></script>
</body>
</html>
```

### Paso 4: Crear lógica del juego

`games/mi-juego/js/mi-juego.js`:
```javascript
class MiJuego {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.gameState = 'menu';     // menu, playing, paused, gameOver
    this.score = 0;
    this.gameTime = 0;
    
    this.init();
  }

  init() {
    this.setupInput();
    this.startGameLoop();
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      if (e.key === ' ' && this.gameState === 'playing') {
        // Acción del juego
      }
      if (e.key === 'p' || e.key === 'P') {
        this.togglePause();
      }
      if (e.key === 'Escape') {
        this.showMenu();
      }
    });
  }

  update(dt) {
    if (this.gameState !== 'playing') return;
    
    this.gameTime += dt;
    
    // Lógica de actualización
    
    ParticleSystem.update(dt);
  }

  draw() {
    // Dibujar fondo
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.8)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Dibujar elementos del juego
    
    // Dibujar partículas
    ParticleSystem.draw(this.ctx);
  }

  recordSession() {
    const stats = {
      victory: this.score > 100,
      score: this.score,
      playTime: this.gameTime
    };
    GameManager.recordGameSession('mi-juego', stats);
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

// Inicialización global
let game = null;

function initGame() {
  game = new MiJuego(document.getElementById('gameCanvas'));
}

function startGame() {
  game.gameState = 'playing';
}

function showMenu() {
  game.gameState = 'menu';
}

window.addEventListener('load', initGame);
```

### Paso 5: Prueba

1. Abrir landing page
2. Verificar que el juego aparece en la grilla
3. Clic en "Jugar"
4. Probar controles y mecánica

---

## 🎨 Personalización

### Colores y Tema

En `assets/css/main.css`:
```css
:root {
  --primary-neon: #00ff00;      /* Color principal */
  --secondary-neon: #ff00ff;    /* Color secundario */
  --tertiary-neon: #00ffff;     /* Color terciario */
  --dark-bg: #0a0e27;           /* Fondo oscuro */
  --darker-bg: #050812;         /* Fondo más oscuro */
  --text-primary: #00ff00;
  --text-secondary: #aaaaaa;
}
```

### Tipografía

Cambiar font-family en:
```css
body {
  font-family: 'Courier New', monospace;
}
```

### Sonidos

Crear nuevos efectos en `AudioManager`:
```javascript
const playCustomSound = () => {
  const freq = 440; // Frecuencia en Hz
  const duration = 0.1; // Segundos
  const type = 'sine'; // sine, square, triangle, sawtooth
  AudioManager.playTone(freq, duration, type, 0.3); // 0.3 = volumen
};
```

---

## 📊 Roadmap

### Versión 1.0 (Actual)
- ✅ 8 juegos completos
- ✅ Sistema de perfil y estadísticas
- ✅ Logros y desbloqueos
- ✅ Audio retro synth
- ✅ Efectos visuales (CRT, partículas)
- ✅ Responsive design
- ✅ Documentación completa

### Versión 1.1 (Próxima)
- 🔲 10+ juegos adicionales
- 🔲 Modo multijugador online
- 🔲 Leaderboards globales
- 🔲 Customización de avatares
- 🔲 Editor de niveles

### Versión 2.0 (Futuro)
- 🔲 PWA (Progressive Web App)
- 🔲 Sincronización en la nube
- 🔲 Comunidad y compartir logros
- 🔲 Monetización (cosméticos)
- 🔲 API REST para múltiples plataformas

---

## 🐛 Troubleshooting

### El juego no carga

1. Verificar que todos los scripts estén correctamente enlazados
2. Abrir consola (F12) y revisar errores
3. Asegurar que se usa un servidor local (no file://)

### LocalStorage no funciona

1. Verificar que el navegador soporta LocalStorage
2. En modo incógnito, usar sesión normal
3. Limpiar cache del navegador

### Audio no se reproduce

1. Verificar que el navegador permite Web Audio API
2. Asegurar que no está silenciado
3. Revisar permisos de CORS si es remoto

### Rendimiento bajo

1. Reducir número de partículas
2. Desactivar CRT mode
3. Usar navegador moderno (Chrome, Firefox)
4. Cerrar otras pestañas

---

## 📝 Buenas Prácticas

### Código Limpio

- Usar nombres descriptivos
- Funciones pequeñas y focalizadas
- Comentarios en lógica compleja
- Evitar variables globales

### Rendimiento

- Usar `requestAnimationFrame` para animaciones
- Cachear elementos del DOM
- Limpiar listeners de eventos
- Optimizar dibujo en Canvas

### Accesibilidad

- Contraste de colores adecuado
- Navegación por teclado completa
- ARIA labels donde sea posible
- Textos legibles

### Testing

- Probar en navegadores diferentes
- Probar en dispositivos móviles
- Verificar rendimiento (DevTools)
- Testear controles accesibles

---

## 🎓 Recursos de Aprendizaje

### Canvas API
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

### Web Audio API
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

### LocalStorage
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

### Optimización
- https://developer.chrome.com/docs/devtools/

---

## 📄 Licencia

Este proyecto está licenciado bajo MIT License.

---

## 👨‍💻 Contribuir

Las contribuciones son bienvenidas:

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📞 Soporte

Para reportar bugs o sugerencias:
- Crear issue en GitHub
- Contactar por email
- Abrir discussion en comunidad

---

## 🙏 Agradecimientos

Inspirado en los clásicos del arcade de los 80s y 90s:
- Arkanoid
- Pong
- Snake
- Pac-Man
- Flappy Bird
- Platformers
- Space Shooters
- Dungeon Crawlers

---

**Hecho con ❤️ usando HTML5, CSS3 y JavaScript ES6+**

Revive los Clásicos. Descubre Nuevas Leyendas.

🕹️ **RETRO LEGENDS**
