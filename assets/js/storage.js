/**
 * STORAGE.JS
 * Sistema centralizado de almacenamiento usando LocalStorage
 * Maneja: perfil, configuración, estadísticas, logros, progreso
 */

const Storage = (() => {
  const STORAGE_KEYS = {
    PROFILE: 'rl_profile',
    SETTINGS: 'rl_settings',
    ACHIEVEMENTS: 'rl_achievements',
    STATISTICS: 'rl_statistics',
    PROGRESS: 'rl_progress',
    UNLOCKS: 'rl_unlocks'
  };

  // ============ INICIALIZACIÓN ============

  /**
   * Inicializa todo el sistema de storage
   */
  const init = () => {
    if (!getProfile()) {
      setProfile(getDefaultProfile());
    }
    if (!getSettings()) {
      setSettings(getDefaultSettings());
    }
    if (!getAchievements()) {
      setAchievements(getDefaultAchievements());
    }
    if (!getStatistics()) {
      setStatistics(getDefaultStatistics());
    }
    if (!getProgress()) {
      setProgress({});
    }
    if (!getUnlocks()) {
      setUnlocks(getDefaultUnlocks());
    }
  };

  // ============ PERFIL ============

  const getDefaultProfile = () => ({
    id: `player_${Date.now()}`,
    name: `Jugador_${Math.floor(Math.random() * 9999)}`,
    avatar: Math.floor(Math.random() * 16),
    createdAt: new Date().toISOString(),
    lastPlayed: new Date().toISOString()
  });

  const getProfile = () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  };

  const setProfile = (profile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  };

  const updateProfile = (updates) => {
    const profile = getProfile();
    Object.assign(profile, updates);
    profile.lastPlayed = new Date().toISOString();
    setProfile(profile);
    return profile;
  };

  const setPlayerName = (name) => {
    return updateProfile({ name: name.substring(0, 20) });
  };

  const setPlayerAvatar = (avatar) => {
    return updateProfile({ avatar: avatar % 16 });
  };

  // ============ CONFIGURACIÓN ============

  const getDefaultSettings = () => ({
    music: true,
    musicVolume: 0.7,
    sfx: true,
    sfxVolume: 0.8,
    fullscreen: false,
    crtMode: false,
    showFPS: false,
    language: 'es',
    theme: 'dark'
  });

  const getSettings = () => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  };

  const setSettings = (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  };

  const updateSettings = (updates) => {
    const settings = getSettings();
    Object.assign(settings, updates);
    setSettings(settings);
    return settings;
  };

  // ============ ESTADÍSTICAS ============

  const getDefaultStatistics = () => ({
    totalPlayTime: 0,
    gamesPlayed: 0,
    totalVictories: 0,
    totalDefeats: 0,
    totalCoins: 0,
    totalScore: 0,
    gamesStats: {}
  });

  const getStatistics = () => {
    const data = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    return data ? JSON.parse(data) : null;
  };

  const setStatistics = (stats) => {
    localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
  };

  const updateStatistics = (updates) => {
    const stats = getStatistics();
    Object.assign(stats, updates);
    setStatistics(stats);
    return stats;
  };

  const addGameStats = (gameId, stats) => {
    const allStats = getStatistics();
    if (!allStats.gamesStats[gameId]) {
      allStats.gamesStats[gameId] = {
        played: 0,
        victories: 0,
        defeats: 0,
        highScore: 0,
        totalPlayTime: 0,
        lastPlayed: null
      };
    }
    Object.assign(allStats.gamesStats[gameId], stats);
    allStats.gamesStats[gameId].lastPlayed = new Date().toISOString();
    setStatistics(allStats);
    return allStats;
  };

  const getGameStats = (gameId) => {
    const stats = getStatistics();
    return stats.gamesStats[gameId] || null;
  };

  // ============ LOGROS ============

  const getDefaultAchievements = () => ({
    list: [
      { id: 'first-game', name: 'Primer Juego', description: 'Juega tu primer juego', unlocked: false, unlockedAt: null },
      { id: 'thousand-points', name: '1000 Puntos', description: 'Consigue 1000 puntos totales', unlocked: false, unlockedAt: null },
      { id: 'ten-victories', name: '10 Victorias', description: 'Obtén 10 victorias', unlocked: false, unlockedAt: null },
      { id: 'forjador', name: 'Forjador', description: 'Completa Crystal Forge', unlocked: false, unlockedAt: null },
      { id: 'coleccionista', name: 'Coleccionista', description: 'Desbloquea todos los juegos', unlocked: false, unlockedAt: null },
      { id: 'veterano', name: 'Veterano', description: 'Juega durante 10 horas totales', unlocked: false, unlockedAt: null }
    ]
  });

  const getAchievements = () => {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : null;
  };

  const setAchievements = (achievements) => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  };

  const unlockAchievement = (achievementId) => {
    const achievements = getAchievements();
    const achievement = achievements.list.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      setAchievements(achievements);
      return true;
    }
    return false;
  };

  const isAchievementUnlocked = (achievementId) => {
    const achievements = getAchievements();
    const achievement = achievements.list.find(a => a.id === achievementId);
    return achievement ? achievement.unlocked : false;
  };

  // ============ PROGRESO ============

  const getProgress = () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  };

  const setProgress = (progress) => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  };

  const setGameProgress = (gameId, progress) => {
    const allProgress = getProgress();
    allProgress[gameId] = { ...progress, updatedAt: new Date().toISOString() };
    setProgress(allProgress);
  };

  const getGameProgress = (gameId) => {
    const allProgress = getProgress();
    return allProgress[gameId] || null;
  };

  // ============ DESBLOQUEOS ============

  const getDefaultUnlocks = () => ({
    unlockedGames: ['crystal-forge'],
    unlockedCharacters: [],
    unlockedItems: []
  });

  const getUnlocks = () => {
    const data = localStorage.getItem(STORAGE_KEYS.UNLOCKS);
    return data ? JSON.parse(data) : null;
  };

  const setUnlocks = (unlocks) => {
    localStorage.setItem(STORAGE_KEYS.UNLOCKS, JSON.stringify(unlocks));
  };

  const unlockGame = (gameId) => {
    const unlocks = getUnlocks();
    if (!unlocks.unlockedGames.includes(gameId)) {
      unlocks.unlockedGames.push(gameId);
      setUnlocks(unlocks);
      return true;
    }
    return false;
  };

  const isGameUnlocked = (gameId) => {
    const unlocks = getUnlocks();
    return unlocks.unlockedGames.includes(gameId);
  };

  const unlockCharacter = (characterId) => {
    const unlocks = getUnlocks();
    if (!unlocks.unlockedCharacters.includes(characterId)) {
      unlocks.unlockedCharacters.push(characterId);
      setUnlocks(unlocks);
      return true;
    }
    return false;
  };

  const isCharacterUnlocked = (characterId) => {
    const unlocks = getUnlocks();
    return unlocks.unlockedCharacters.includes(characterId);
  };

  // ============ RESET ============

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.STATISTICS);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.UNLOCKS);
    init();
  };

  // ============ EXPORTAR ============

  return {
    init,
    // Perfil
    getProfile,
    setProfile,
    updateProfile,
    setPlayerName,
    setPlayerAvatar,
    // Configuración
    getSettings,
    setSettings,
    updateSettings,
    // Estadísticas
    getStatistics,
    setStatistics,
    updateStatistics,
    addGameStats,
    getGameStats,
    // Logros
    getAchievements,
    setAchievements,
    unlockAchievement,
    isAchievementUnlocked,
    // Progreso
    getProgress,
    setProgress,
    setGameProgress,
    getGameProgress,
    // Desbloqueos
    getUnlocks,
    setUnlocks,
    unlockGame,
    isGameUnlocked,
    unlockCharacter,
    isCharacterUnlocked,
    // Reset
    resetAllData
  };
})();

// Inicializar al cargar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Storage.init());
} else {
  Storage.init();
}
