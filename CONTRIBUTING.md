![Retro Legends Logo](assets/img/RetroLegends.png)

# 👥 CONTRIBUTING - Retro Legends

Guía para contribuir al proyecto **Retro Legends** en GitHub.

**Repositorio**: [github.com/Rudepro/retro-legends](https://github.com/Rudepro/retro-legends)

---

## 🙋 ¿Cómo Contribuir?

### Tipos de Contribución

1. **Reportar Bugs** 🐛
   - Encontraste un error
   - El juego falla
   - Behavior inesperado

2. **Sugerir Features** ✨
   - Nueva mecánica de juego
   - Mejora de UI
   - Optimización de rendimiento

3. **Código** 💻
   - Corregir bugs
   - Agregar features
   - Optimizar código
   - Mejorar documentación

4. **Traducción** 🌍
   - Localización a otros idiomas
   - Mejora de textos en español

5. **Arte & Diseño** 🎨
   - Sprites pixel art
   - Temas de colores
   - Animaciones

---

## 🐛 Reportar un Bug

### Paso 1: Verificar que sea un bug

- [ ] Probé en navegador moderno (Chrome, Firefox)
- [ ] Probé con caché limpio
- [ ] Probé en modo normal (no incógnito)
- [ ] El problema es reproducible

### Paso 2: Buscar issues existentes

Ir a: **GitHub Issues** → Buscar por palabras clave

### Paso 3: Crear nuevo issue

Título claro:
```
❌ [BUG] El audio no funciona en iPhone
❌ [BUG] Crystal Forge falla después de 5 niveles
❌ [BUG] LocalStorage no guarda puntos
```

Descripción completa:

```markdown
## Descripción
Breve descripción del problema

## Pasos para reproducir
1. Abrir el juego X
2. Hacer acción Y
3. Observar comportamiento Z

## Comportamiento esperado
Debería ocurrir esto

## Comportamiento actual
Pero ocurre esto

## Información del sistema
- Navegador: Chrome 120.0
- OS: Windows 11
- Dispositivo: Desktop / Mobile / Tablet

## Logs/Capturas
Adjuntar screenshot o error de consola
```

### Ejemplo de buen bug report

```markdown
## Descripción
El marcador de puntos no se actualiza en Galaxy Defender cuando se destruyen enemigos

## Pasos para reproducir
1. Abrir Galaxy Defender
2. Iniciar juego (dificultad normal)
3. Disparar y destruir 3-4 enemigos
4. Ver que el marcador sigue en 0

## Comportamiento esperado
El marcador debe mostrar 30-40 puntos (10 pts por enemigo)

## Comportamiento actual
El marcador siempre muestra 0

## Información del sistema
- Navegador: Firefox 121
- OS: Ubuntu 22.04
- Dispositivo: Desktop

## Logs
Console error: "Cannot read property 'score' of undefined"
```

---

## ✨ Sugerir una Feature

### Formato

```markdown
## Feature Request: [Descripción corta]

## Descripción
¿Qué debería existir? ¿Por qué?

## Caso de uso
¿Quién lo usaría? ¿Para qué?

## Ejemplos
Screenshots, mockups, o referencias de otros juegos

## Contexto adicional
Links, ideas, inspiración
```

### Ejemplo

```markdown
## Feature Request: Modo Multijugador en Quantum Duel

## Descripción
Permitir que 2 jugadores jueguen en la misma computadora (mismo teclado)

## Caso de uso
- Competencia amistosa en la misma máquina
- Pantalla compartida en reuniones

## Ejemplos
- Pong clásico tenía modo local multiplayer
- Super Smash Bros funciona así

## Contexto
Algunos usuarios pidieron poder jugar contra un amigo localmente
```

---

## 💻 Contribuir Código

### Paso 1: Preparar Ambiente

```bash
# 1. Fork el proyecto en GitHub
# Click "Fork" en https://github.com/Rudepro/retro-legends

# 2. Clonar tu fork
git clone https://github.com/[tu-usuario]/retro-legends.git
cd retro-legends

# 3. Agregar upstream (original)
git remote add upstream https://github.com/Rudepro/retro-legends.git

# 4. Crear rama feature
git checkout -b feature/mi-nueva-feature
```

### Paso 2: Hacer Cambios

Seguir estas pautas:

```javascript
// 1. Nombres descriptivos
let enemySpeed = 150;  // ✓ Bien
let es = 150;         // ✗ Mal

// 2. Funciones pequeñas y focalizadas
function updatePlayerMovement() {  // ✓ Bien
  // Lógica de movimiento solamente
}

// 3. Comentarios útiles
// ✓ Bien: Explica el por qué
// El speed se multiplica por nivel para aumentar dificultad progresivamente
let speed = baseSpeed * (1 + this.level * 0.1);

// ✗ Mal: Obvio
let speed = baseSpeed * (1 + this.level * 0.1); // Multiplicar speed

// 4. Código DRY (Don't Repeat Yourself)
// ✗ Mal: Repetido
this.ctx.fillStyle = '#ff0000';
this.ctx.fillRect(x1, y1, 20, 20);
this.ctx.fillStyle = '#ff0000';
this.ctx.fillRect(x2, y2, 20, 20);

// ✓ Bien: Extraído
this.ctx.fillStyle = '#ff0000';
[{x: x1, y: y1}, {x: x2, y: y2}].forEach(pos => {
  this.ctx.fillRect(pos.x, pos.y, 20, 20);
});
```

### Paso 3: Testing

```javascript
// Pruebas manuales
1. Abrir el juego afectado
2. Reproducir la nueva feature
3. Verificar que no breaks nada existente
4. Probar en 2+ navegadores
5. Probar en mobile (F12 device mode)
```

### Paso 4: Commit

```bash
# Commits con mensaje claro
git add .
git commit -m "feat: agregar velocidad ajustable en configuración

- Nuevo slider en settings para ajustar velocidad de juegos
- Rango: 0.5x a 2x
- Se guarda en localStorage"

# Formato de mensaje: type(scope): subject
# Types: feat, fix, docs, refactor, test, chore
# Scope: storage, audio, crystal-forge, etc.
# Subject: descripción breve en presente
```

### Paso 5: Push y Pull Request

```bash
# Push a tu fork
git push origin feature/mi-nueva-feature

# En GitHub: Ir a tu fork → "Contribute" → "Open Pull Request"
```

### Paso 6: Descripción del PR

```markdown
## Descripción
¿Qué cambios hace este PR?

## Relacionado a
Cierra #123 (si es bug fix)
Feature #456 (si es feature request)

## Cambios Principales
- Cambio 1
- Cambio 2
- Cambio 3

## Testing
- [ ] Probado en Chrome
- [ ] Probado en Firefox
- [ ] Probado en mobile
- [ ] No hay regressions

## Checklist
- [ ] Código sigue convenciones
- [ ] Sin console.log() de debug
- [ ] Documentación actualizada
- [ ] Commits están limpios
```

### Ejemplo de buen PR

```markdown
## Descripción
Agrega verificación de rendimiento en AudioManager para evitar clicks

## Relacionado a
Cierra #42

## Cambios Principales
- Agregar debounce de 100ms en cambios de volumen
- Cachear contexto de audio para no recrearlo
- Mejorar manejo de errores en playTone()

## Testing
- [x] Probado en Chrome (FPS stable)
- [x] Probado en Firefox (sin clicks)
- [x] Probado en Edge (todo OK)
- [x] Mobile: audio perfecto

## Performance
- Antes: Audio con clickings ocasionales
- Después: Audio limpio, 60 FPS sostenidos
- Tamaño: No cambió (mismo archivo size)
```

---

## 🎨 Contribuir Arte

### Sprites Pixel Art

Formato recomendado:
- Resolución: 16x16, 32x32, 64x64
- Formato: PNG con transparencia
- Paleta: Máximo 16 colores (retro)
- Nombrado: `[game-id]-[element]-[size].png`

Ejemplo:
- `crystal-forge-paddle-32x8.png`
- `galaxy-defender-enemy-20x20.png`

### Temas de Colores

Crear archivo `theme-[nombre].css`:
```css
:root {
  --primary-neon: #00ff00;
  --secondary-neon: #ff00ff;
  --tertiary-neon: #00ffff;
  --dark-bg: #0a0e27;
  --darker-bg: #050812;
}
```

---

## 🌍 Traducción

### Agregar idioma

1. Crear archivo `i18n/[idioma].json`:

```json
{
  "menu.play": "Play",
  "menu.settings": "Settings",
  "game.paused": "Paused",
  "game.over": "Game Over"
}
```

2. Actualizar en HTML:

```javascript
// En storage.js
if (this.settings.language === 'en') {
  const strings = await fetch('i18n/en.json').then(r => r.json());
  element.textContent = strings['menu.play'];
}
```

---

## 📋 Guías Específicas

### Agregar un Nuevo Juego

Ver: [QUICKSTART.md - Agregar Nuevo Juego](QUICKSTART.md#Agregar-un-Nuevo-Juego)

### Mejorar Performance

Ver: [BEST_PRACTICES.md - Rendimiento](BEST_PRACTICES.md#-Rendimiento)

### Cambios en Storage

Ver: [ARCHITECTURE.md - Storage.js](ARCHITECTURE.md#storagejs---sistema-de-almacenamiento)

---

## ✅ Checklist Pre-Commit

Antes de hacer commit:

- [ ] Código funciona localmente
- [ ] Sin console.log() de debug
- [ ] Sin errores en consola
- [ ] Probado en 2+ navegadores
- [ ] Probado en mobile
- [ ] Sigue convenciones de código
- [ ] Comentarios útiles agregados
- [ ] Documentación actualizada
- [ ] Commits limpios con mensajes claros

---

## 🚀 Proceso de Review

1. **Autor del PR** → Sube cambios y solicita review
2. **Reviewers** → Comprueban código, hacen preguntas
3. **Ajustes** → Autor realiza cambios solicitados
4. **Aprobación** → Mínimo 1-2 aprobaciones
5. **Merge** → El proyecto se actualiza

### Cómo recibir feedback constructivo

- Ser abierto a sugerencias
- Preguntar si no entiendes
- Agradecer el feedback
- Hacer los cambios solicitados rápidamente

### Cómo dar feedback constructivo

- Ser respetuoso y amable
- Explicar el por qué
- Sugerir alternativas
- Celebrar lo que está bien

---

## 🎓 Recursos

### Documentación del Proyecto
- [README.md](README.md) - Visión general
- [QUICKSTART.md](QUICKSTART.md) - Comenzar rápido
- [ARCHITECTURE.md](ARCHITECTURE.md) - Diseño técnico
- [BEST_PRACTICES.md](BEST_PRACTICES.md) - Estándares de código
- [DEPLOYMENT.md](DEPLOYMENT.md) - Despliegue

### Control de Versiones
- Git Basics: https://git-scm.com/book/es/v2
- GitHub Flow: https://guides.github.com/introduction/flow/
- Semantic Commits: https://www.conventionalcommits.org/es

### Desarrollo Web
- MDN Web Docs: https://developer.mozilla.org/es/
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- Web Audio API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

---

## 💬 Preguntas Frecuentes

**P: ¿Por dónde empiezo?**
R: Revisa issues etiquetados "good first issue" o "help wanted"

**P: ¿Puedo cambiar la arquitectura?**
R: Primero abre una issue/discussion. Los cambios grandes necesitan consenso.

**P: ¿Cuánto tiempo tarda un PR en mergearse?**
R: Típicamente 1-2 semanas dependiendo de la complejidad

**P: ¿Hay código de conducta?**
R: Sí, mantén la comunidad respetuosa y acogedora

**P: ¿Puedo ganar dinero con esto?**
R: Es un proyecto educativo/open-source. No hay compensación monetaria.

---

## 🙏 Agradecimientos

Gracias por considerar contribuir a Retro Legends.

Tu tiempo y energía son valiosos para la comunidad.

¡Cada contribución, sin importar tamaño, es apreciada! 🎮

---

**Juntos hacemos Retro Legends mejor.**

🕹️ **RETRO LEGENDS - Comunidad Abierta**
