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

---

### 💎 Crystal Forge
**Género:** Arkanoid / Breakout mejorado

**Descripción:**  
Purifica cristales mágicos rompiendo sus bloques con una esfera de energía controlada por paleta. Cada bloque tiene forma de cristal con facetas y se resiste a múltiples golpes, mostrando grietas visibles al recibir daño. Sobrevive las rondas, recoge power-ups y enfrenta a un jefe en los niveles múltiplos de 3.

**Objetivo:** Destruir todos los bloques del nivel sin perder las 3 vidas.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `←` `→` / `A` `D` | Mover paleta |
| `Ratón` | Mover paleta (movimiento seguido) |
| `ESPACIO` / `Clic` | Lanzar la esfera |
| `P` | Pausa / Reanudar |
| `ESC` | Volver al menú |

**Bloques — Sistema de HP:**
| Color | HP | Golpes necesarios |
|-------|----|-------------------|
| 🟢 Verde | 1 | 1 golpe |
| 🩵 Cyan | 2 | 2 golpes |
| 🟣 Magenta | 3 | 3 golpes |

> Los bloques son inmunes 300ms tras recibir un golpe para evitar daño múltiple por frame.

**⚡ Power-ups** *(aparecen al destruir un bloque, 25% de probabilidad)*:

| Power-up | Color | Efecto |
|----------|-------|--------|
| **ANCHO** | 🟢 Verde | Amplía la paleta en +30px (máx. 150px) |
| **LENTO** | 🩵 Cyan | Reduce la velocidad de la pelota ×0.7 |
| **×3 BOLA** | 🟠 Naranja | Bonus de puntos (+50) *(segunda bola próximamente)* |
| **ESCUDO** | 🟣 Magenta | Gana una vida extra |

**🧌 Boss:** Aparece en niveles múltiplos de 3. Tiene forma de diamante con ojo maligno, 20 HP y se mueve horizontalmente. Barra de salud visible que cambia de color (morado → naranja → rojo).

**Dificultades:**
- **Fácil:** 8 columnas × 3 filas, velocidad 250
- **Normal:** 10 columnas × 4 filas, velocidad 300  
- **Difícil:** 12 columnas × 5 filas, velocidad 350

**Código:** [`games/crystal-forge/js/crystal-forge.js`](games/crystal-forge/js/crystal-forge.js)

---

### ⚡ Quantum Duel
**Género:** Pong evolucionado / Duelo 1v1

**Descripción:**  
Competencia local 1 vs IA donde además de controlar una paleta debes gestionar un sistema de energía para crear portales cuánticos que desvían la pelota. La gravedad aumenta cada ronda, haciendo el juego progresivamente más desafiante.

**Objetivo:** Ganar 3 de 5 rondas anotando goles (la pelota cruza el borde contrario).

**Controles:**
| Tecla | Acción |
|-------|--------|
| `↑` `↓` | Mover paleta (P1 / IA) |
| `ESPACIO` | Crear portal cuántico (consume energía) |
| `P` | Pausa |
| `ESC` | Menú |

**⚡ Mecánicas especiales:**

| Mecánica | Descripción |
|----------|-------------|
| **Energía** | Barra de 0–100 que se recarga sola (20/s). Crear un portal consume energía |
| **Portal cuántico** | Teletransporta la pelota al otro lado del campo |
| **Gravedad dinámica** | Aumenta 50 unidades por ronda (0 → 50 → 100 → 150 → 200) |
| **Multibola** | En dificultad Hard, se añade una segunda pelota por ronda |

**Puntuación:** 1 punto por gol. Gana quien llegue primero a la puntuación objetivo de rondas.

**Código:** [`games/quantum-duel/js/quantum-duel.js`](games/quantum-duel/js/quantum-duel.js)

---

### 🧬 BioCore
**Género:** Snake con evolución / Mutaciones

**Descripción:**  
Controla un organismo vivo que crece al consumir alimento. Al comer comida de mutación (30% probabilidad), el ADN del organismo evoluciona aleatoriamente, cambiando su comportamiento. El mapa es toroidal: al salir por un borde, el organismo reaparece por el lado contrario.

**Objetivo:** Crecer lo máximo posible sin colisionar contigo mismo.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `↑` `↓` `←` `→` | Cambiar dirección |

**🍖 Tipos de alimento:**

| Alimento | Probabilidad | Puntos | Efecto |
|----------|-------------|--------|--------|
| Normal | 70% | +10 | Crece un segmento |
| **Mutación** | 30% | +50 | Crece + activa mutación aleatoria + +30 ADN |

**🧬 Mutaciones** *(se activan al comer alimento de mutación)*:

| Mutación | Efecto |
|----------|--------|
| **Velocidad** | Incrementa la velocidad de movimiento ×1.1 |
| **Tamaño** | Añade un segmento extra al cuerpo inmediatamente |
| **Regeneración** | Duplica el segmento de cola |

**Puntuación:**
- Alimento normal: **+10 pts**
- Alimento mutación: **+50 pts**

**Código:** [`games/biocore/js/biocore.js`](games/biocore/js/biocore.js)

---

### 🌑 Shadow Labyrinth
**Género:** Maze / Sigilo

**Descripción:**  
Navega un laberinto de 20×20 celdas generado proceduralmente en oscuridad casi total. Un enemigo rojo te persigue desde el extremo opuesto del mapa. La supervivencia depende de conocer el laberinto y evitar al perseguidor.

**Objetivo:** Sobrevivir el mayor tiempo posible sin ser alcanzado por el enemigo.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `↑` `↓` `←` `→` | Mover |
| `W` `A` `S` `D` | Alternativo |
| `P` | Pausa |

**⚙️ Mecánicas:**

| Mecánica | Descripción |
|----------|-------------|
| **Laberinto 20×20** | Generado proceduralmente con celdas de pared y paso |
| **Radio de visión** | Campo de visión limitado a 50px alrededor del jugador |
| **Enemigo perseguidor** | Rojo, inicia en la esquina opuesta y avanza hacia el jugador |
| **Game Over** | Si la distancia al enemigo es < 1 celda |

**Puntuación:** Basada en el tiempo de supervivencia.

**Código:** [`games/shadow-labyrinth/js/shadow-labyrinth.js`](games/shadow-labyrinth/js/shadow-labyrinth.js)

---

### 🚀 Rocket Escape
**Género:** Flappy Bird / Endless Runner

**Descripción:**  
Pilota un cohete a través del espacio evitando tuberías, meteoritos y tormentas. La gravedad jala constantemente el cohete hacia abajo; debes impulsar repetidamente para mantenerte en vuelo. La dificultad aumenta con la distancia recorrida.

**Objetivo:** Recorrer la mayor distancia posible y superar obstáculos para acumular puntos.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `ESPACIO` / `↑` | Impulso hacia arriba |
| `Clic` | Impulso hacia arriba |

**⚠️ Obstáculos:**

| Obstáculo | Velocidad | Descripción |
|-----------|-----------|-------------|
| **Tuberías** | 200 px/s | Pares con hueco central, generadas cada 2 segundos |
| **Meteoritos** | 250 px/s | Movimiento errático vertical aleatorio |
| **Tormentas** | 180 px/s | Zonas de peligro extendidas |

**⚡ Mecánicas:**

| Mecánica | Descripción |
|----------|-------------|
| **Gravedad** | 400 px/s² jalando el cohete hacia abajo |
| **Impulso** | Velocidad vertical de -250 px/s al activarse |
| **Vidas** | 3 vidas; pierde 1 al colisionar o salir de pantalla |
| **Scoring** | +10 puntos por tubería superada |
| **Distancia** | Calculada como `tiempo × 100` metros |

**Puntuación:** +10 pts por cada par de tuberías superado. La distancia (metros) se registra por separado.

**Código:** [`games/rocket-escape/js/rocket-escape.js`](games/rocket-escape/js/rocket-escape.js)

---

### 🏛️ Forgotten Temple
**Género:** Plataformas retro

**Descripción:**  
Explora un templo antiguo saltando entre plataformas flotantes y evitando trampas mortales en el suelo. La física incluye gravedad real, salto con inercia y plataformas de diferentes alturas. Recolecta reliquias para aumentar tu puntuación.

**Objetivo:** Sobrevivir el mayor tiempo posible evitando trampas y caídas al vacío.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `←` `→` / `A` `D` | Mover horizontalmente |
| `ESPACIO` / `↑` / `W` | Saltar (solo en suelo) |
| `P` | Pausa |

**⚙️ Mecánicas:**

| Mecánica | Descripción |
|----------|-------------|
| **Gravedad** | 600 px/s² constante |
| **Salto** | Velocidad vertical de -300 px/s, solo desde suelo |
| **Trampas** | Zonas rojas en el suelo: contacto = pierde vida |
| **Caída al vacío** | Si `y > height` pierde una vida |
| **Vidas** | 3 vidas; al morir, el jugador reaparece en Y=50 |

**🏺 Sistema de reliquias:** Objetos coleccionables que otorgan puntos extra *(en desarrollo)*.

**Plataformas predefinidas:**
- Suelo completo en `y = height - 20`
- Plataforma media en `(100, 400)` ancho 200
- Plataforma alta en `(500, 300)` ancho 200

**Código:** [`games/forgotten-temple/js/forgotten-temple.js`](games/forgotten-temple/js/forgotten-temple.js)

---

### 🌌 Galaxy Defender
**Género:** Space Shooter / Defensa galáctica

**Descripción:**  
Defiende la galaxia de oleadas de drones enemigos disparando proyectiles de energía. Cada disparo consume 10 unidades de energía; la energía se recarga automáticamente. Las oleadas aumentan en número y velocidad con cada ronda superada.

**Objetivo:** Eliminar todas las oleadas enemigas sin ser alcanzado por ningún dron.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `←` `→` / `A` `D` | Mover nave |
| `ESPACIO` / `Clic` | Disparar proyectil de energía |
| `P` | Pausa |

**⚡ Sistema de energía:**

| Acción | Energía |
|--------|---------|
| Disparo | -10 |
| Recarga automática | +20/segundo |
| Máximo | 100 |

> Si la energía < 10, no se puede disparar.

**👾 Oleadas de enemigos:**

| Ronda | Enemigos | Velocidad base |
|-------|----------|----------------|
| 1 | 4 drones | 130 px/s |
| 2 | 5 drones | 160 px/s |
| N | 3+N drones | 100 + N×30 px/s |

**Puntuación:** +10 puntos por cada drone eliminado.

**Código:** [`games/galaxy-defender/js/galaxy-defender.js`](games/galaxy-defender/js/galaxy-defender.js)

---

### 🗝️ Echoes of Darkness
**Género:** Dungeon Crawler / Acción top-down

**Descripción:**  
Explora mazmorras procedurales oscuras llenas de enemigos errantes y recoge pociones para sobrevivir. La salud se agota con cada contacto enemigo. Al superar un nivel, la mazmorra se regenera con más enemigos y obstáculos.

**Objetivo:** Explorar la mazmorra, recoger todos los ítems y sobrevivir a los enemigos.

**Controles:**
| Tecla | Acción |
|-------|--------|
| `↑` `↓` `←` `→` | Mover |
| `W` `A` `S` `D` | Alternativo |
| `P` | Pausa |

**🧪 Ítems coleccionables:**

| Ítem | Efecto | Puntos |
|------|--------|--------|
| **Poción** | Recogida otorga puntos | +50 pts |

**👹 Enemigos:**

| Propiedad | Valor |
|-----------|-------|
| Movimiento | Errático (cambio de dirección aleatorio cada ~50 frames) |
| Velocidad base | 80 px/s |
| Escalado | +20 px/s por nivel |
| Daño al jugador | -10 HP por contacto |

**💖 Salud:** Comienza en 100 HP. Al llegar a 0, game over.

**Nivel siguiente:** Se activa cuando todos los ítems son recogidos *(en desarrollo)*.

**Código:** [`games/echoes-of-darkness/js/echoes-of-darkness.js`](games/echoes-of-darkness/js/echoes-of-darkness.js)

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
