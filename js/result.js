import ResultView from './result-view.js';
import Application from './application.js';

export default class Result {
  constructor(model) {
    this.model = model;
    this.result = new ResultView(this.model.gameState, this.model.userAnswers);
  }

  get element() {
    return this.result.element;
  }

  init() {
    this.result.onPlay = this._startGame.bind(this);
  }

  _startGame() {
    Application.showGame(this.model);
  }
}
