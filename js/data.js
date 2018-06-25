export const gameConfig = {
  time: 300, // sec
  gameScreensNumber: 10,
  startScreenNumber: 0,
  lives: 3
};

export const gameState = {
  lives: gameConfig.lives,
  time: gameConfig.time,
  currentGameScreenNumber: gameConfig.startScreenNumber,
  previousAnswerTime: gameConfig.time
};

export const userAnswers = [];

export const otherUsersResults = [4, 5, 8, 10, 11, 13, 15, 18, 19];
