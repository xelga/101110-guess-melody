import AbstractView from './abstract-view';

export default class WelcomeView extends AbstractView {
  constructor(gameConfig) {
    super();
    this.gameConfig = gameConfig;
  }

  get template() {
    return `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <span class="main-loader">Пожалуйста, дождитесь загрузки игры...</span>
    <button class="main-play" disabled>Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${this.gameConfig.time / 60} минут ответить на все вопросы.<br>
      Ошибиться можно ${this.gameConfig.lives - 1} раза.<br>
      Удачи!
    </p>
  </section>`;
  }

  letPlay() {
    const main = document.querySelector(`.main`);
    const loader = main.querySelector(`.main-loader`);
    const playButton = main.querySelector(`.main-play`);
    loader.classList.add(`main-loader--hidden`);
    playButton.disabled = false;
  }

  bind() {
    const playButton = this.element.querySelector(`.main-play`);

    playButton.addEventListener(`click`, () => {
      this.onPlay();
    });
  }

  onPlay() {
  }
}
