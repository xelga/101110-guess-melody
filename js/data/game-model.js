import {gameConfig, gameState, gameScreens, userAnswers} from '../data.js';
import {createTimer} from './get-timer';

export default class GameModel {
  constructor() {
    this._getGameConfig();
    this._getGameState();
    this._getGameScreens();
    this._getUserAnswers();
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

  get noTime() {
    return this._noTime;
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
    const timer = createTimer(this._gameState.time).tick();
    this._gameState.time = timer.currentTime;
    this._noTime = timer.noTime;
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

  _getGameConfig() {
    this._gameConfig = gameConfig;
  }

  _getGameState() {
    this._gameState = gameState;
  }

  _getGameScreens() {
    this._gameScreens = gameScreens;
  }

  _getUserAnswers() {
    this._userAnswers = userAnswers;
  }
}
