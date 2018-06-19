import {renderScreen} from './util.js';
import {gameConfig, gameState, userAnswers} from './data.js';
import {startTimer} from './data/get-timer.js';
import game from './game.js';
import WelcomeView from './welcome-view.js';

export default () => {
  const updateGame = () => {
    userAnswers.length = 0;
    gameState.lives = gameConfig.lives;
    gameState.time = gameConfig.time;
    gameState.currentGameScreenNumber = gameConfig.startScreenNumber;
    gameState.answerTime = 0;
  };

  updateGame();

  const welcome = new WelcomeView(gameConfig);
  welcome.onPlay = () => {
    renderScreen(game());
    startTimer(gameConfig.time);
  };

  return welcome.element;
};
