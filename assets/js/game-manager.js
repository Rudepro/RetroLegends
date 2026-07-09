/**
 * GAME-MANAGER.JS
 * Gestor central de juegos, estadísticas y progreso
 */

const GameManager = (() => {
  let games = [];
  let currentGame = null;

  /**
   * Carga la configuración de juegos desde games.json
   */
  const loadGames = async () => {
    try {
      const response = await fetch('./games.json');
      const data = await response.json();
      games = data.games;
      return games;
    } catch (error) {
      console.error('Error cargando games.json:', error);
      return [];
    }
  };

  /**
   * Obtiene todos los juegos
   */
  const getAllGames = () => games;

  /**
   * Obtiene un juego por ID
   */
  const getGame = (gameId) => {
    return games.find(g => g.id === gameId);
  };

  /**
   * Obtiene juegos desbloqueados
   */
  const getUnlockedGames = () => {
    return games.filter(g => Storage.isGameUnlocked(g.id));
  };

  /**
   * Registra estadísticas de una partida
   */
  const recordGameSession = (gameId, stats) => {
    const currentStats = Storage.getGameStats(gameId) || {
      played: 0,
      victories: 0,
      defeats: 0,
      highScore: 0,
      totalPlayTime: 0
    };

    currentStats.played++;
    if (stats.victory) currentStats.victories++;
    else currentStats.defeats++;

    if (stats.score && stats.score > currentStats.highScore) {
      currentStats.highScore = stats.score;
    }

    if (stats.playTime) {
      currentStats.totalPlayTime += stats.playTime;
    }

    Storage.addGameStats(gameId, currentStats);

    // Actualizar estadísticas globales
    const allStats = Storage.getStatistics();
    allStats.gamesPlayed++;
    if (stats.victory) allStats.totalVictories++;
    else allStats.totalDefeats++;

    if (stats.score) allStats.totalScore += stats.score;
    if (stats.coins) allStats.totalCoins += stats.coins;
    if (stats.playTime) allStats.totalPlayTime += stats.playTime;

    Storage.updateStatistics(allStats);

    // Desbloquear logros
    checkAchievements(gameId, stats);

    // Desbloquear contenido
    unlockGameContent(gameId);
  };

  /**
   * Verifica y desbloquea logros
   */
  const checkAchievements = (gameId, stats) => {
    // Primer juego
    if (!Storage.isAchievementUnlocked('first-game')) {
      Storage.unlockAchievement('first-game');
    }

    // Estadísticas globales
    const allStats = Storage.getStatistics();
    
    if (allStats.totalScore >= 1000 && !Storage.isAchievementUnlocked('thousand-points')) {
      Storage.unlockAchievement('thousand-points');
    }

    if (allStats.totalVictories >= 10 && !Storage.isAchievementUnlocked('ten-victories')) {
      Storage.unlockAchievement('ten-victories');
    }

    if (allStats.totalPlayTime >= 36000 && !Storage.isAchievementUnlocked('veterano')) {
      Storage.unlockAchievement('veterano');
    }

    // Logros específicos de juego
    const game = getGame(gameId);
    if (game && stats.victory && !Storage.isAchievementUnlocked(game.id)) {
      Storage.unlockAchievement(game.id);
    }

    // Coleccionista
    const unlockedGames = getUnlockedGames();
    if (unlockedGames.length === games.length && !Storage.isAchievementUnlocked('coleccionista')) {
      Storage.unlockAchievement('coleccionista');
    }
  };

  /**
   * Desbloquea contenido de otros juegos al completar uno
   */
  const unlockGameContent = (completedGameId) => {
    const game = getGame(completedGameId);
    if (!game || !game.unlocks) return;

    // Desbloquear personajes
    if (game.unlocks.characters) {
      game.unlocks.characters.forEach(characterId => {
        Storage.unlockCharacter(characterId);
      });
    }

    // Desbloquear juegos
    if (game.unlocks.games) {
      game.unlocks.games.forEach(gameId => {
        Storage.unlockGame(gameId);
      });
    }
  };

  /**
   * Obtiene el progreso de un juego
   */
  const getGameProgress = (gameId) => {
    return Storage.getGameProgress(gameId);
  };

  /**
   * Guarda el progreso de un juego
   */
  const saveGameProgress = (gameId, progress) => {
    Storage.setGameProgress(gameId, progress);
  };

  /**
   * Navega a un juego
   */
  const playGame = (gameId) => {
    const game = getGame(gameId);
    if (game && Storage.isGameUnlocked(gameId)) {
      currentGame = game;
      window.location.href = game.path;
    } else {
      console.warn(`Juego no disponible o bloqueado: ${gameId}`);
    }
  };

  return {
    loadGames,
    getAllGames,
    getGame,
    getUnlockedGames,
    recordGameSession,
    checkAchievements,
    unlockGameContent,
    getGameProgress,
    saveGameProgress,
    playGame,
    getCurrentGame: () => currentGame
  };
})();

// Cargar juegos al iniciar
GameManager.loadGames();
