import {getUserPoints} from './data/get-user-points.js';
import {getUserResult} from './data/get-user-result.js';
import {getUserStatistics} from './data/get-user-statistics.js';
import AbstractView from './abstract-view';

export default class ResultView extends AbstractView {
  constructor(gameState, userAnswers) {
    super();
    this.gameState = gameState;
    this.userAnswers = userAnswers;
  }

  get template() {
    return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this._titleTemplate}</h2>
    <div class="main-stat">${getUserStatistics(this.userAnswers, this.gameState)}</div>
    ${this._usersComparisonTemplate}
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
  }

  get _titleTemplate() {
    let resultTitleTemplate = `Вы настоящий меломан!`;
    if (this.gameState.lives <= 0) {
      resultTitleTemplate = `Какая жалость!`;
    }

    if (this.gameState.time <= 0) {
      resultTitleTemplate = `Увы и ах!`;
    }
    return resultTitleTemplate;
  }

  get _usersComparisonTemplate() {
    let usersComparisonTemplate = ``;

    if (this.gameState.lives > 0 && this.gameState.time > 0) {
      usersComparisonTemplate = `<span class="main-comparison">Загрузка статистики...</span>`;
    }

    return usersComparisonTemplate;
  }

  renderUsersComparison(otherUsersResults) {
    const mainComparison = document.querySelector(`.main-comparison`);
    mainComparison.textContent = getUserResult(getUserPoints(this.userAnswers), otherUsersResults);
  }

  showMessage() {
    const mainComparison = document.querySelector(`.main-comparison`);
    mainComparison.textContent = `Вы первый, кто прошел эту игру!`;
  }

  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, () => {
      this.onPlay();
    });
  }

  onPlay() {
  }
}
