import {getElementFromTemplate, renderScreen} from './util.js';
import {gameScreens, userAnswers} from './data.js';
import chooseArtistScreen from './choose-artist.js';
import chooseGenreScreen from './choose-genre.js';

export default (config) => {
  const template = `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;${config.time / 60} минут ответить на все вопросы.<br>
      Ошибиться можно ${config.lives - 1} раза.<br>
      Удачи!
    </p>
  </section>`;
  const element = getElementFromTemplate(template);
  const playButton = element.querySelector(`.main-play`);
  userAnswers.length = 0;
  const gameState = {
    'lives': config.lives,
    'time': config.time,
    'current-game-screen': config[`start-screen-number`]
  };
  playButton.addEventListener(`click`, () => {
    if (gameScreens[gameState[`current-game-screen`]].type === `artist`) {
      renderScreen(chooseArtistScreen(config, gameState, gameScreens, userAnswers));
    } else {
      renderScreen(chooseGenreScreen(config, gameState, gameScreens, userAnswers));
    }
  });

  return element;
};
