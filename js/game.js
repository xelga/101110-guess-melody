import {renderScreen} from './util.js';
import {gameConfig, gameState, gameScreens, userAnswers} from './data.js';
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
  };

  gameScreen.onAnswer = (isCorrect) => {
    userAnswers[gameState.currentGameScreenNumber] = {
      correct: isCorrect,
      time: 30
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
      }

    } else {
      renderScreen(result());
    }
  };

  return gameScreen.element;
};
