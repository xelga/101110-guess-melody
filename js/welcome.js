import WelcomeView from './welcome-view.js';
import Application from './application.js';

export default class Welcome {
  constructor(model) {
    this.model = model;
    this.welcome = new WelcomeView(this.model.gameConfig);
  }

  get element() {
    return this.welcome.element;
  }

  init() {
    this.welcome.onPlay = this._startGame.bind(this);
  }

  letPlay() {
    this.welcome.letPlay();
  }

  _startGame() {
    Application.showGame(this.model);
  }
}
