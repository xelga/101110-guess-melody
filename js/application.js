import {renderScreen, renderModal} from './util.js';
import GameModel from './data/game-model.js';
import Welcome from './welcome.js';
import Game from './game.js';
import Result from './result.js';
import ErrorModalView from './error-modal-view.js';
import {adaptServerData} from './data-adapter.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}`);
  }
};

export default class Application {
  static load(gameModel) {
    return window.fetch(`https://es.dump.academy/guess-melody/questions`)
      .then(checkStatus)
      .then((response) => response.json())
      .then((data) => {
        gameModel.gameScreens = adaptServerData(data);
        return data;
      })
      .catch(Application.showErrorModal);
  }

  static showWelcome() {
    const gameModel = new GameModel();
    const welcome = new Welcome(gameModel);
    renderScreen(welcome.element);
    welcome.init();
    Application.load(gameModel)
      .then((data) => {
        if (data) {
          welcome.letPlay();
        }
      });
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

  static showErrorModal(error) {
    const errorModal = new ErrorModalView(error);
    renderModal(errorModal.element);
  }
}
