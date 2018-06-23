import {gameConfig, gameState, userAnswers} from '../data.js';

export default class GameModel {
  constructor() {
    this._gameConfig = gameConfig;
    this._gameState = gameState;
    this._userAnswers = userAnswers;
  }

  get gameConfig() {
    return this._gameConfig;
  }

  get gameState() {
    return this._gameState;
  }

  get gameScreens() {
    return this._gameScreens;
  }

  get currentGameScreen() {
    return this._currentGameScreen;
  }

  get userAnswers() {
    return this._userAnswers;
  }

  set gameScreens(data) {
    this._gameScreens = data;
  }

  getCurrentGameScreen() {
    this._currentGameScreen = this._gameScreens[this._gameState.currentGameScreenNumber];
  }

  updateGame() {
    this._userAnswers.length = 0;
    this._gameState.lives = this._gameConfig.lives;
    this._gameState.time = this._gameConfig.time;
    this._gameState.currentGameScreenNumber = this._gameConfig.startScreenNumber;
    this._gameState.previousAnswerTime = this._gameConfig.time;
  }

  tick() {
    this._gameState.time -= 1;
  }

  changePreviousAnswerTime() {
    this._gameState.previousAnswerTime = this._gameState.time;
  }

  saveUserAnswer(isCorrect, answerTime) {
    this._userAnswers[this._gameState.currentGameScreenNumber] = {
      correct: isCorrect,
      time: answerTime
    };
  }

  reduceLives() {
    this._gameState.lives -= 1;
  }

  getNextGameScreenNumber() {
    this._gameState.currentGameScreenNumber += 1;
  }
}
