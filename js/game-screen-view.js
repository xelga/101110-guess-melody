import {getElementFromTemplate, renderModal} from './util.js';
import {getCircleTimerParam} from './data/get-circle-timer-param.js';
import AbstractView from './abstract-view';
import handleAudio from './audio.js';

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
    </svg>
    <div class="timer-value ${this._hurryTimerClass}"></div>
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

  get _hurryTimerClass() {
    let hurryTimerClass = ``;
    if (this.gameState.time < 30) {
      hurryTimerClass = `timer-value--finished`;
    }
    return hurryTimerClass;
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

  get _templateModalConfirm() {
    return `<section class="modal-confirm modal-confirm__wrap">
    <form class="modal-confirm__inner">
      <button class="modal-confirm__close" type="button">Закрыть</button>
      <h2 class="modal-confirm__title">Подтверждение</h2>
      <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal-confirm__btn-wrap">
        <button class="modal-confirm__btn">Ок</button>
        <button class="modal-confirm__btn">Отмена</button>
      </div>
    </form>
  </section>`;
  }

  renderTimer() {
    const mainLevel = document.querySelector(`.main--level`);
    const timerLine = mainLevel.querySelector(`.timer-line`);
    const radius = timerLine.getAttribute(`r`);
    const timer = mainLevel.querySelector(`.timer-value`);
    const pastTime = this.gameConfig.time - this.gameState.time;
    const circleTimerParam = getCircleTimerParam(radius, this.gameConfig.time, pastTime);

    timerLine.setAttribute(`stroke-dasharray`, circleTimerParam.stroke);
    timerLine.setAttribute(`stroke-dashoffset`, circleTimerParam.offset);
    timer.innerHTML = ``;
    timer.appendChild(getElementFromTemplate(this._templateTimer));
  }

  hurryUp() {
    const timer = document.querySelector(`.timer-value`);
    if (!(timer.classList.contains(`timer-value--finished`))) {
      timer.classList.add(`timer-value--finished`);
    }
  }

  initializeAudio() {
    handleAudio(this.element, this.currentGameScreen, this.currentGameScreen.type);
  }

  showModalConfirm() {
    renderModal(getElementFromTemplate(this._templateModalConfirm));
    const confirmModal = document.querySelector(`.modal-confirm`);
    const buttons = confirmModal.querySelectorAll(`.modal-confirm__btn`);
    const buttonClose = confirmModal.querySelector(`.modal-confirm__close`);

    const onButtonCloseClick = (event) => {
      event.preventDefault();
      this.onCancel();
    };

    buttons[0].addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onConfirm();
    });
    buttons[1].addEventListener(`click`, onButtonCloseClick);
    buttonClose.addEventListener(`click`, onButtonCloseClick);
  }

  closeModal() {
    const body = document.querySelector(`body`);
    const confirmModal = body.querySelector(`.modal-confirm`);
    body.removeChild(confirmModal);
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

  onConfirm() {
  }

  onCancel() {
  }
}
