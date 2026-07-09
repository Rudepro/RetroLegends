![Retro Legends Logo](assets/img/RetroLegends.png)

# 📑 ÍNDICE CENTRAL - Retro Legends

Navegación rápida a toda la documentación del proyecto.

**GitHub**: [github.com/Rudepro/retro-legends](https://github.com/Rudepro/retro-legends)

---

## 🚀 Para Empezar

### 1️⃣ **[QUICKSTART.md](QUICKSTART.md)** - Guía de Inicio Rápido ⭐ LEER PRIMERO
- Setup en 5 minutos
- Cómo jugar los 8 juegos
- Estructura de carpetas
- Troubleshooting común

### 2️⃣ **[EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md)** - Resumen Ejecutivo
- Visión del proyecto
- Indicadores clave
- Arquitectura general
- Métricas de calidad

### 3️⃣ **[README.md](README.md)** - Documentación Principal
- Descripción completa
- Características detalladas
- Los 8 juegos explicados
- Sistema central documentado
- Cómo agregar juegos nuevos

---

## 👨‍💻 Para Desarrolladores

### 4️⃣ **[ARCHITECTURE.md](ARCHITECTURE.md)** - Diseño Técnico
- Patrones de arquitectura
- Módulos del sistema central (5 módulos)
- Estructura de juegos
- Flujo de datos
- Consideraciones de rendimiento

### 5️⃣ **[BEST_PRACTICES.md](BEST_PRACTICES.md)** - Estándares de Código
- Convenciones de nombrado
- Patrones de código
- Optimizaciones de rendimiento
- Testing y debugging
- Estilo CSS

### 6️⃣ **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guía de Contribución
- Cómo reportar bugs
- Cómo sugerir features
- Cómo contribuir código
- Proceso de PR
- Código de conducta

---

## 🚀 Para Desplegar

### 7️⃣ **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía de Despliegue
- 5 opciones de hosting (GitHub Pages, Netlify, Vercel, VPS, Docker)
- Configuración detallada para cada plataforma
- Seguridad y monitoreo
- Troubleshooting post-deploy
- Estadísticas de rendimiento

---

## 🎮 Los 8 Juegos

| Juego | Tipo | Archivo | Dificultad |
|-------|------|---------|-----------|
| **Crystal Forge** | Arkanoid | `pages/crystal-forge.html` | 🟡 Media |
| **Quantum Duel** | Pong | `pages/quantum-duel.html` | 🟠 Media-Alta |
| **BioCore** | Snake | `pages/biocore.html` | 🟡 Media |
| **Shadow Labyrinth** | Maze | `pages/shadow-labyrinth.html` | 🔴 Difícil |
| **Rocket Escape** | Flappy | `pages/rocket-escape.html` | 🟡 Media |
| **Forgotten Temple** | Platform | `pages/forgotten-temple.html` | 🔴 Difícil |
| **Galaxy Defender** | Shooter | `pages/galaxy-defender.html` | 🟠 Media-Alta |
| **Echoes of Darkness** | Dungeon | `pages/echoes-of-darkness.html` | 🔴 Difícil |

---

## 📂 Estructura de Carpetas

```
RetroLegends/
├── 📄 README.md                  # Documentación principal
├── 📄 QUICKSTART.md              # Guía rápida ⭐
├── 📄 EXECUTIVE_SUMMARY.md       # Resumen ejecutivo
├── 📄 ARCHITECTURE.md            # Diseño técnico
├── 📄 BEST_PRACTICES.md          # Estándares de código
├── 📄 CONTRIBUTING.md            # Guía de contribución
├── 📄 DEPLOYMENT.md              # Despliegue
├── 📄 INDEX.md                   # Este archivo
├── 📄 games.json                 # Config de juegos
├── 📄 .gitignore                 # Control de versiones
│
├── 📁 index.html                 # Landing page principal
│
├── 📁 assets/
│   ├── css/
│   │   ├── main.css              # Estilos globales (700+ líneas)
│   │   ├── landing.css           # Estilos landing
│   │   └── game.css              # Estilos de juegos
│   │
│   ├── js/
│   │   ├── storage.js            # Sistema de almacenamiento (400+ líneas)
│   │   ├── audio.js              # Gestor de audio (250+ líneas)
│   │   ├── particles.js          # Partículas (120+ líneas)
│   │   ├── effects.js            # Efectos visuales (250+ líneas)
│   │   ├── game-manager.js       # Orquestación (250+ líneas)
│   │   └── landing.js            # Lógica landing (200+ líneas)
│   │
│   ├── img/                      # Imágenes y assets
│   ├── audio/                    # Archivos de sonido
│   ├── fonts/                    # Fuentes personalizadas
│   └── icons/                    # Iconos SVG/PNG
│
├── 📁 pages/
│   ├── crystal-forge.html        # Arkanoid
│   ├── quantum-duel.html         # Pong
│   ├── biocore.html              # Snake
│   ├── shadow-labyrinth.html     # Maze
│   ├── rocket-escape.html        # Flappy
│   ├── forgotten-temple.html     # Platform
│   ├── galaxy-defender.html      # Shooter
│   └── echoes-of-darkness.html   # Dungeon
│
└── 📁 games/
    ├── 📁 crystal-forge/
    │   ├── js/crystal-forge.js   # Lógica del juego
    │   └── assets/
    │
    ├── 📁 quantum-duel/
    │   ├── js/quantum-duel.js
    │   └── assets/
    │
    ├── 📁 biocore/
    │   ├── js/biocore.js
    │   └── assets/
    │
    ├── 📁 shadow-labyrinth/
    │   ├── js/shadow-labyrinth.js
    │   └── assets/
    │
    ├── 📁 rocket-escape/
    │   ├── js/rocket-escape.js
    │   └── assets/
    │
    ├── 📁 forgotten-temple/
    │   ├── js/forgotten-temple.js
    │   └── assets/
    │
    ├── 📁 galaxy-defender/
    │   ├── js/galaxy-defender.js
    │   └── assets/
    │
    └── 📁 echoes-of-darkness/
        ├── js/echoes-of-darkness.js
        └── assets/
```

---

## 🔑 Módulos del Sistema Central

### 1. **Storage.js** (400+ líneas)
Gestión de datos persistentes con LocalStorage

**APIs Principales:**
- `Storage.getProfile()` / `Storage.setProfile()`
- `Storage.getSettings()` / `Storage.updateSettings()`
- `Storage.getStatistics()` / `Storage.addGameStats()`
- `Storage.getAchievements()` / `Storage.unlockAchievement()`
- `Storage.getProgress()` / `Storage.setGameProgress()`

**Ver:** [ARCHITECTURE.md - Storage](ARCHITECTURE.md#storagejs---sistema-de-almacenamiento)

### 2. **AudioManager.js** (250+ líneas)
Síntesis de sonido retro con Web Audio API

**APIs Principales:**
- `AudioManager.init()`
- `AudioManager.playTone(freq, duration, type, volume)`
- `AudioManager.playBeep()`, `playSuccess()`, `playError()`, etc.
- `AudioManager.setMasterVolume()`, `setMusicVolume()`, `setSFXVolume()`
- `AudioManager.playRetroSynthLoop()`

**Ver:** [ARCHITECTURE.md - AudioManager](ARCHITECTURE.md#audiomanagerjs)

### 3. **ParticleSystem.js** (120+ líneas)
Sistema de partículas para efectos visuales

**APIs Principales:**
- `ParticleSystem.createEmitter(x, y, count, colors, speed)`
- `ParticleSystem.burstEffect(x, y, colors)`
- `ParticleSystem.trailEffect(x, y, vx, vy, color)`
- `ParticleSystem.update(dt)`
- `ParticleSystem.draw(ctx)`
- `ParticleSystem.clear()`

**Ver:** [ARCHITECTURE.md - ParticleSystem](ARCHITECTURE.md#particlesystemjs)

### 4. **VisualEffects.js** (250+ líneas)
Efectos visuales CSS y Canvas

**APIs Principales:**
- `VisualEffects.applyCRTEffect(canvas, intensity)`
- `VisualEffects.pixelate(canvas, pixelSize)`
- `VisualEffects.fadeTransition(element, duration)`
- `VisualEffects.slideInTransition(element, duration, direction)`
- `VisualEffects.pulseEffect(element, duration)`
- `VisualEffects.floatingEffect(element, distance, duration)`

**Ver:** [ARCHITECTURE.md - VisualEffects](ARCHITECTURE.md#visualeffectsjs)

### 5. **GameManager.js** (250+ líneas)
Orquestación central de juegos y logros

**APIs Principales:**
- `GameManager.loadGames()` - Carga games.json
- `GameManager.getGame(id)`, `getAllGames()`, `getUnlockedGames()`
- `GameManager.recordGameSession(gameId, stats)`
- `GameManager.checkAchievements(gameId, stats)`
- `GameManager.playGame(gameId)`

**Ver:** [ARCHITECTURE.md - GameManager](ARCHITECTURE.md#gamemanagerjs)

---

## 🎮 Estructura de Juegos

Cada juego sigue este patrón (ejemplo):

```javascript
class MiJuego {
  constructor(canvas) { }
  init() { }
  update(dt) { }
  draw() { }
  recordSession() { }
  startGameLoop() { }
}
```

**Archivos por juego:**
- `pages/[id].html` - Interfaz
- `games/[id]/js/[id].js` - Lógica
- `games/[id]/assets/` - Recursos

---

## 📊 Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de código | 3500+ |
| Archivos creados | 51 |
| Directorios | 20+ |
| Módulos sistema | 5 |
| Juegos | 8 |
| Logros | 10+ |
| Líneas documentación | 2000+ |
| Archivos MD | 7 |
| Dependencias externas | 0 |

---

## 🚀 Quick Start

1. **Clonar/descargar**
   ```bash
   git clone <repo-url>
   cd RetroLegends
   ```

2. **Iniciar servidor**
   ```bash
   python -m http.server 8000
   ```

3. **Abrir en navegador**
   ```
   http://localhost:8000
   ```

4. **¡Jugar!**
   - Explorar landing page
   - Seleccionar juego
   - Disfrutar

---

## 🔗 Enlaces Rápidos

### Documentación
- [README.md](README.md) - Completa
- [QUICKSTART.md](QUICKSTART.md) - Rápida ⭐
- [ARCHITECTURE.md](ARCHITECTURE.md) - Técnica
- [BEST_PRACTICES.md](BEST_PRACTICES.md) - Código
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribuir
- [DEPLOYMENT.md](DEPLOYMENT.md) - Desplegar

### Archivos Principales
- [index.html](index.html) - Landing page
- [games.json](games.json) - Configuración
- [assets/css/main.css](assets/css/main.css) - Estilos
- [assets/js/storage.js](assets/js/storage.js) - Storage

### Juegos
- [Crystal Forge](pages/crystal-forge.html)
- [Quantum Duel](pages/quantum-duel.html)
- [BioCore](pages/biocore.html)
- [Shadow Labyrinth](pages/shadow-labyrinth.html)
- [Rocket Escape](pages/rocket-escape.html)
- [Forgotten Temple](pages/forgotten-temple.html)
- [Galaxy Defender](pages/galaxy-defender.html)
- [Echoes of Darkness](pages/echoes-of-darkness.html)

---

## ❓ FAQ Rápido

**P: ¿Por dónde empiezo?**
R: Lee [QUICKSTART.md](QUICKSTART.md)

**P: ¿Cómo agregar un juego?**
R: Ver [README.md - Agregar Nuevos Juegos](README.md#agregar-nuevos-juegos)

**P: ¿Cómo desplegar?**
R: Consulta [DEPLOYMENT.md](DEPLOYMENT.md)

**P: ¿Cómo contribuir?**
R: Lee [CONTRIBUTING.md](CONTRIBUTING.md)

**P: ¿Dónde está la arquitectura?**
R: [ARCHITECTURE.md](ARCHITECTURE.md)

**P: ¿Buenas prácticas?**
R: [BEST_PRACTICES.md](BEST_PRACTICES.md)

---

## 🎓 Nivel de Referencia

### Novato 🟢
1. [QUICKSTART.md](QUICKSTART.md) - Setup
2. Jugar los 8 juegos
3. Explorar código de un juego

### Intermedio 🟡
1. [README.md](README.md) - Entender features
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Aprender diseño
3. Modificar un juego existente

### Avanzado 🔴
1. [BEST_PRACTICES.md](BEST_PRACTICES.md) - Estándares
2. [ARCHITECTURE.md](ARCHITECTURE.md) - Profundidad
3. Crear nuevo juego
4. [CONTRIBUTING.md](CONTRIBUTING.md) - Contribuir

---

## ✅ Checklist de Lectura Recomendada

- [ ] [QUICKSTART.md](QUICKSTART.md) - 10 minutos
- [ ] [EXECUTIVE_SUMMARY.md](EXECUTIVE_SUMMARY.md) - 5 minutos
- [ ] [README.md](README.md) - 20 minutos
- [ ] Jugar todos los 8 juegos - 30 minutos
- [ ] [ARCHITECTURE.md](ARCHITECTURE.md) - 30 minutos
- [ ] [BEST_PRACTICES.md](BEST_PRACTICES.md) - 20 minutos

---

## 📞 Soporte

- Documentación completa: Ver archivos .md
- Reportar bugs: [CONTRIBUTING.md](CONTRIBUTING.md)
- Sugerir features: [CONTRIBUTING.md](CONTRIBUTING.md)
- Desplegar: [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Última actualización:** Enero 2025

🕹️ **RETRO LEGENDS - Documentación Central**

*Revive los Clásicos. Descubre Nuevas Leyendas.*
