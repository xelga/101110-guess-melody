import {renderScreen, renderModal} from './util.js';
import GameModel from './data/game-model.js';
import Welcome from './welcome.js';
import Game from './game.js';
import Result from './result.js';
import ErrorModalView from './error-modal-view.js';
import serverApi from './server-api.js';

export default class Application {
  static setLoadedData(model) {
    return serverApi.loadData()
      .then((data) => {
        model.gameScreens = data;
        return data;
      })
      .catch(Application.showErrorModal);
  }

  static setLoadedResults(model) {
    return serverApi.loadResults()
      .then((data) => {
        model.otherUsersResults = data;
        return data;
      });
  }

  static showWelcome() {
    const gameModel = new GameModel();
    const welcome = new Welcome(gameModel);
    renderScreen(welcome.element);
    welcome.init();
    Application.setLoadedData(gameModel)
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
    if (model.gameState.lives > 0 && model.gameState.time > 0) {
      Application.setLoadedResults(model)
        .then((data) => {
          if (data.length !== 0) {
            result.showUsersComparison(model.otherUsersResults);
          } else {
            result.showMessage();
          }
        })
        .then(serverApi.saveResults(model))
        .catch(Application.showErrorModal);
    }
  }

  static showErrorModal(error) {
    const errorModal = new ErrorModalView(error);
    renderModal(errorModal.element);
  }
}
