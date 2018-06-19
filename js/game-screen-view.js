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
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">05</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">00</span>
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

  initializeAudio() {
    audio(this.element, this.currentGameScreen, this.currentGameScreen.type);
  }

  bind() {
    const playAgainButton = this.element.querySelector(`.play-again`);

    playAgainButton.addEventListener(`click`, (event) => {
      event.preventDefault();
      console.log(event.target);
      console.log(event.currentTarget);

      this.onPlayAgain();
    });
  }

  onPlayAgain() {
  }
}
