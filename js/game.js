import {renderScreen} from './util.js';
import Application from './application.js';
import GameArtistView from './game-artist-view.js';
import GameGenreView from './game-genre-view.js';

export default class Game {
  constructor(model) {
    this.model = model;

    this._updateGame();
    this._getGameScreen();
    this._interval = null;
  }

  get element() {
    return this._gameScreen.element;
  }

  startGame() {
    this._gameScreen.renderTimer();
    this._startTimer();
    this._gameScreen.onPlayAgain = this._playAgain.bind(this);
    this._gameScreen.onAnswer = this._answer.bind(this);
  }

  _updateGame() {
    this.model.updateGame();
  }

  _continueGame() {
    this._getGameScreen();
    renderScreen(this.element);
    this._gameScreen.renderTimer();
    this._gameScreen.onPlayAgain = this._playAgain.bind(this);
    this._gameScreen.onAnswer = this._answer.bind(this);
  }

  _getGameScreen() {
    this.model.getCurrentGameScreen();

    if (this.model.currentGameScreen.type === `artist`) {
      this._gameScreen = new GameArtistView(this.model.gameConfig, this.model.gameState, this.model.currentGameScreen);
    } else {
      this._gameScreen = new GameGenreView(this.model.gameConfig, this.model.gameState, this.model.currentGameScreen);
    }
  }

  _startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();

      if (this.model.gameState.time <= 0) {
        this._stopTimer();
        Application.showResult(this.model);
      } else {
        this._gameScreen.renderTimer();
      }
    }, 1000);
  }

  _stopTimer() {
    clearTimeout(this._interval);
  }

  _answer(isCorrect) {
    const answerTime = this.model.gameState.previousAnswerTime - this.model.gameState.time;
    this.model.changePreviousAnswerTime();
    this.model.saveUserAnswer(isCorrect, answerTime);

    if (!isCorrect) {
      this.model.reduceLives();
    }

    if (this.model.gameState.lives > 0) {
      this.model.getNextGameScreenNumber();

      if (this.model.gameState.currentGameScreenNumber < this.model.gameScreens.length) {
        this.model.getCurrentGameScreen();
        this._continueGame();
      } else {
        this._stopTimer();
        Application.showResult(this.model);
      }

    } else {
      this._stopTimer();
      Application.showResult(this.model);
    }
  }

  _playAgain() {
    this._stopTimer();
    Application.showWelcome(this.model);
  }
}
