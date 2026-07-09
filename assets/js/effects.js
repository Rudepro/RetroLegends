/**
 * EFFECTS.JS
 * Efectos visuales: CRT, scanlines, glow, transiciones
 */

const VisualEffects = (() => {
  let crtCanvas = null;
  let crtContext = null;

  const initCRT = (targetCanvas) => {
    crtCanvas = document.createElement('canvas');
    crtCanvas.width = targetCanvas.width;
    crtCanvas.height = targetCanvas.height;
    crtContext = crtCanvas.getContext('2d');
  };

  const applyCRTEffect = (canvas, intensity = 0.3) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Aplicar scanlines
    for (let i = 0; i < canvas.height; i += 2) {
      const offset = i * canvas.width * 4;
      for (let j = 0; j < canvas.width * 4; j += 4) {
        data[offset + j] *= (1 - intensity);
        data[offset + j + 1] *= (1 - intensity);
        data[offset + j + 2] *= (1 - intensity);
      }
    }

    ctx.putImageData(imageData, 0, 0);

    // Aplicar curvatura de pantalla (simulada)
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    for (let i = 0; i < canvas.height; i += 4) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  };

  const createGlowEffect = (text, color = '#00ff00', blur = 10) => {
    const div = document.createElement('div');
    div.style.textShadow = `
      0 0 ${blur}px ${color},
      0 0 ${blur * 2}px ${color},
      0 0 ${blur * 3}px ${color}
    `;
    return div;
  };

  const pixelate = (canvas, pixelSize = 4) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = Math.ceil(width / pixelSize);
    smallCanvas.height = Math.ceil(height / pixelSize);

    const smallCtx = smallCanvas.getContext('2d');
    smallCtx.drawImage(canvas, 0, 0, smallCanvas.width, smallCanvas.height);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(smallCanvas, 0, 0, width, height);
  };

  const fadeTransition = (element, duration = 500) => {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    setTimeout(() => {
      element.style.opacity = '1';
    }, 10);
  };

  const slideInTransition = (element, duration = 500, direction = 'left') => {
    const startPos = direction === 'left' ? '-100%' : '100%';
    element.style.transform = `translateX(${startPos})`;
    element.style.transition = `transform ${duration}ms ease-out`;
    setTimeout(() => {
      element.style.transform = 'translateX(0)';
    }, 10);
  };

  const pulseEffect = (element, duration = 500) => {
    element.style.animation = `pulse ${duration}ms ease-in-out`;
  };

  const floatingEffect = (element, distance = 10, duration = 2000) => {
    element.style.animation = `floating ${duration}ms ease-in-out infinite`;
    const keyframes = `
      @keyframes floating {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-${distance}px); }
      }
    `;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
  };

  // CSS para animaciones
  const injectAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      @keyframes glitch {
        0% { transform: translateX(0); }
        20% { transform: translateX(2px); }
        40% { transform: translateX(-2px); }
        60% { transform: translateX(2px); }
        80% { transform: translateX(-2px); }
        100% { transform: translateX(0); }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      @keyframes neon-glow {
        0%, 100% { text-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00; }
        50% { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00; }
      }

      .retro-glow {
        text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        color: #00ff00;
      }

      .retro-glitch {
        animation: glitch 0.3s;
      }

      .retro-float {
        animation: float 2s ease-in-out infinite;
      }

      .retro-neon {
        animation: neon-glow 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
  };

  injectAnimationStyles();

  return {
    initCRT,
    applyCRTEffect,
    createGlowEffect,
    pixelate,
    fadeTransition,
    slideInTransition,
    pulseEffect,
    floatingEffect,
    injectAnimationStyles
  };
})();
