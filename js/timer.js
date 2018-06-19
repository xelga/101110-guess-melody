import {gameState} from './data.js';
import TimerView from './timer-view.js';

export default () => {
  const timer = new TimerView(gameState);

  return timer.element;
};
