import {renderScreen} from './util.js';
import GameModel from './data/game-model.js';
import Welcome from './welcome.js';
import Game from './game.js';
import Result from './result.js';

export default class Application {
  static showWelcome() {
    const model = new GameModel();
    const welcome = new Welcome(model);
    renderScreen(welcome.element);
    welcome.init();
  }

  static showGame(model) {
    const game = new Game(model);
    renderScreen(game.element);
    game.startGame();
  }

  static showResult(model) {
    const result = new Result(model);
    renderScreen(result.element);
    result.init();
  }
}
