/**
 * AUDIO.JS
 * Sistema de audio centralizado con Web Audio API
 * Retro synth, efectos arcade y control de volumen
 */

const AudioManager = (() => {
  let audioContext = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let currentMusic = null;
  let isInitialized = false;

  // ============ INICIALIZACIÓN ============

  const init = () => {
    if (isInitialized) return;

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      
      // Crear nodos de ganancia maestros
      masterGain = audioContext.createGain();
      musicGain = audioContext.createGain();
      sfxGain = audioContext.createGain();

      masterGain.connect(audioContext.destination);
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);

      // Configurar volúmenes desde storage
      const settings = Storage.getSettings();
      setMasterVolume(0.8);
      setMusicVolume(settings.musicVolume);
      setSFXVolume(settings.sfxVolume);

      isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API no disponible:', e);
    }
  };

  // ============ CONTROL DE VOLUMEN ============

  const setMasterVolume = (volume) => {
    if (masterGain) masterGain.gain.value = Math.max(0, Math.min(1, volume));
  };

  const setMusicVolume = (volume) => {
    if (musicGain) musicGain.gain.value = Math.max(0, Math.min(1, volume));
  };

  const setSFXVolume = (volume) => {
    if (sfxGain) sfxGain.gain.value = Math.max(0, Math.min(1, volume));
  };

  const getMusicVolume = () => musicGain ? musicGain.gain.value : 0;
  const getSFXVolume = () => sfxGain ? sfxGain.gain.value : 0;

  // ============ SINTETIZADOR RETRO ============

  const playTone = (frequency, duration, type = 'sine', volume = 0.3) => {
    if (!audioContext) return;

    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const env = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    osc.type = type;
    osc.frequency.value = frequency;
    
    filter.type = 'lowpass';
    filter.frequency.value = 2000;

    // Envolvente ADSR
    env.gain.setValueAtTime(volume, now);
    env.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.connect(filter);
    filter.connect(env);
    env.connect(sfxGain);

    osc.start(now);
    osc.stop(now + duration);
  };

  // ============ EFECTOS SFX ============

  const playBeep = () => {
    playTone(523.25, 0.05, 'sine', 0.15);
  };

  const playClick = () => {
    playTone(880, 0.03, 'square', 0.1);
  };

  const playSuccess = () => {
    playTone(523.25, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(659.25, 0.1, 'sine', 0.2), 100);
    setTimeout(() => playTone(783.99, 0.2, 'sine', 0.2), 200);
  };

  const playError = () => {
    playTone(146.83, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(146.83, 0.1, 'sine', 0.2), 100);
  };

  const playPowerUp = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const freq = 400 + (i * 100);
        playTone(freq, 0.05, 'triangle', 0.15);
      }, i * 50);
    }
  };

  const playExplosion = () => {
    playTone(150, 0.3, 'square', 0.25);
    playTone(100, 0.3, 'square', 0.2);
    playTone(80, 0.3, 'square', 0.15);
  };

  const playGameOver = () => {
    playTone(392, 0.2, 'sine', 0.2);
    setTimeout(() => playTone(349.23, 0.2, 'sine', 0.2), 200);
    setTimeout(() => playTone(329.63, 0.2, 'sine', 0.2), 400);
    setTimeout(() => playTone(293.66, 0.4, 'sine', 0.2), 600);
  };

  // ============ MÚSICA ============

  const playRetroSynthLoop = (bpm = 120) => {
    if (!audioContext) return;

    const beatDuration = (60 / bpm) * 1000;
    const pattern = [
      { freq: 440, duration: beatDuration / 4 },
      { freq: 523.25, duration: beatDuration / 4 },
      { freq: 659.25, duration: beatDuration / 4 },
      { freq: 523.25, duration: beatDuration / 4 }
    ];

    const playPattern = (index = 0) => {
      if (!currentMusic) return;

      const note = pattern[index % pattern.length];
      playTone(note.freq, note.duration / 1000, 'triangle', 0.1);

      setTimeout(() => {
        playPattern(index + 1);
      }, note.duration);
    };

    currentMusic = setInterval(() => {
      playPattern();
    }, beatDuration);
  };

  const stopMusic = () => {
    if (currentMusic) {
      clearInterval(currentMusic);
      currentMusic = null;
    }
  };

  // ============ EXPORTAR ============

  return {
    init,
    setMasterVolume,
    setMusicVolume,
    setSFXVolume,
    getMusicVolume,
    getSFXVolume,
    playTone,
    playBeep,
    playClick,
    playSuccess,
    playError,
    playPowerUp,
    playExplosion,
    playGameOver,
    playRetroSynthLoop,
    stopMusic
  };
})();

// Inicializar al interactuar
document.addEventListener('click', () => {
  if (!AudioManager.init.__called) {
    AudioManager.init();
    AudioManager.init.__called = true;
  }
}, { once: true });
