import AbstractView from './abstract-view';

export default class TimerView extends AbstractView {
  constructor(gameState) {
    super();
    this.gameState = gameState;
  }

  get template() {
    return `<span class="timer-value-mins">${Math.floor(this.gameState.time / 60)}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${Math.floor(this.gameState.time % 60)}</span>`;
  }
}
