import {renderTimer, renderScreen} from '../util.js';
import {gameState} from '../data.js';
import result from '../result.js';
import timerScreen from '../timer.js';

const ONE_SECOND = 1000;
let timer;

export const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`The time must be the type of number`);
  }

  if (time <= 0) {
    throw new Error(`The time value is incorrect`);
  }

  const timeParams = {
    currentTime: time,
    noTime: false,
    tick() {
      this.currentTime -= 1;

      if (this.currentTime <= 0) {
        this.noTime = true;
      }
      return timeParams;
    }
  };

  return timeParams;
};

export const startTimer = (time) => {
  let currentTime;

  timer = setTimeout(() => {
    currentTime = createTimer(time).tick().currentTime;
    gameState.time = currentTime;

    if (createTimer(time).tick().noTime) {
      stopTimer();
      renderScreen(result());
    } else {
      startTimer(currentTime);
      renderTimer(timerScreen());
    }
  }, ONE_SECOND);
};

export const stopTimer = () => {
  clearTimeout(timer);
};
