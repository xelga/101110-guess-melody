import AbstractView from './abstract-view';
import audio from './audio.js';

export default class GameScreenView extends AbstractView {
  constructor(gameConfig, gameState, currentGameScreen) {
    super();
    this.gameConfig = gameConfig;
    this.gameState = gameState;
    this.currentGameScreen = currentGameScreen;
  }

  get template() {
    return `<section class="main main--level main--level-${this.currentGameScreen.type}">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        </div>
    </svg>
    <div class="main-mistakes">
        ${new Array(this.gameConfig.lives - this.gameState.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>
    <div class="main-wrap">
    ${this.templateGame}
    </div>
    </section>`;
  }

  get templateGame() {
    return ``;
  }

  get _min() {
    let min = Math.floor(this.gameState.time / 60);
    min = min <= 9 ? `0${min}` : min;
    return min;
  }

  get _sec() {
    let sec = Math.floor(this.gameState.time % 60);
    sec = sec <= 9 ? `0${sec}` : sec;
    return sec;
  }

  get _templateTimer() {
    return `<span class="timer-value-mins">${this._min}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this._sec}</span>`;
  }

  renderTimer() {
    const element = document.createElement(`template`);
    element.innerHTML = this._templateTimer.trim();
    const timer = document.querySelector(`.timer-value`);
    timer.innerHTML = ``;
    timer.appendChild(element.content);
  }

  initializeAudio() {
    audio(this.element, this.currentGameScreen, this.currentGameScreen.type);
  }

  bind() {
    const playAgainButton = this.element.querySelector(`.play-again`);

    playAgainButton.addEventListener(`click`, (event) => {
      event.preventDefault();

      this.onPlayAgain();
    });
  }

  onPlayAgain() {
  }
}
