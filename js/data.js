export const gameConfig = {
  time: 300, // sec
  gameScreensNumber: 10,
  startScreenNumber: 0,
  lives: 3,
  debug: false
};

export const gameState = {
  lives: gameConfig.lives,
  time: gameConfig.time,
  currentGameScreenNumber: gameConfig.startScreenNumber,
  previousAnswerTime: gameConfig.time
};
