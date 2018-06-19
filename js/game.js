import {renderScreen} from './util.js';
import {gameConfig, gameState, gameScreens, userAnswers} from './data.js';
import {stopTimer} from './data/get-timer.js';
import welcome from "./welcome";
import game from './game.js';
import result from './result.js';
import GameArtistView from './game-artist-view.js';
import GameGenreView from './game-genre-view.js';

export default () => {
  const currentGameScreen = gameScreens[gameState.currentGameScreenNumber];
  let gameScreen;

  if (currentGameScreen.type === `artist`) {
    gameScreen = new GameArtistView(gameConfig, gameState, currentGameScreen);
  } else {
    gameScreen = new GameGenreView(gameConfig, gameState, currentGameScreen);
  }

  gameScreen.onPlayAgain = () => {
    renderScreen(welcome());
    stopTimer();
  };

  gameScreen.onAnswer = (isCorrect) => {
    const answerTime = gameState.previousAnswerTime - gameState.time;
    gameState.previousAnswerTime = gameState.time;

    userAnswers[gameState.currentGameScreenNumber] = {
      correct: isCorrect,
      time: answerTime
    };

    if (!isCorrect) {
      gameState.lives -= 1;
    }

    if (gameState.lives > 0) {
      gameState.currentGameScreenNumber += 1;

      if (gameState.currentGameScreenNumber < gameScreens.length) {
        renderScreen(game());
      } else {
        renderScreen(result());
        stopTimer();
      }

    } else {
      renderScreen(result());
      stopTimer();
    }
  };

  return gameScreen.element;
};
