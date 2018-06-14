import {getElementFromTemplate, renderScreen} from './util.js';
import {gameScreens, userAnswers} from './data.js';
import gameScreen from './game-screen.js';

export default (gameConfig) => {
  const template = `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${gameConfig.time / 60} минут ответить на все вопросы.<br>
      Ошибиться можно ${gameConfig.lives - 1} раза.<br>
      Удачи!
    </p>
  </section>`;
  const element = getElementFromTemplate(template);
  const playButton = element.querySelector(`.main-play`);
  userAnswers.length = 0;
  const gameState = {
    'lives': gameConfig.lives,
    'time': gameConfig.time,
    'current-game-screen': gameConfig[`start-screen-number`]
  };
  playButton.addEventListener(`click`, () => {
    renderScreen(gameScreen(gameConfig, gameState, gameScreens));
  });

  return element;
};
