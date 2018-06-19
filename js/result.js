import {renderScreen} from './util.js';
import {gameState, userAnswers} from './data.js';
import welcome from './welcome.js';
import ResultView from './result-view.js';

export default () => {
  const result = new ResultView(gameState, userAnswers);
  result.onPlay = () => {
    renderScreen(welcome());
  };

  return result.element;
};
