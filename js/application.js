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

let gameModel;
const setModelGameData = (data) => {
  gameModel.gameScreens = adaptServerData(data);
  return data;
};

export default class Application {
  static showWelcome() {
    gameModel = new GameModel();
    const welcome = new Welcome(gameModel);
    renderScreen(welcome.element);
    welcome.init();
    window.fetch(`https://es.dump.academy/guess-melody/questions`).
    then(checkStatus).
    then((response) => response.json()).
    then(setModelGameData).
    then(() => welcome.letPlay()).
    catch(Application.showErrorModal);
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
