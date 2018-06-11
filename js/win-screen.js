import {getElementFromTemplate, renderScreen} from './util.js';
import welcomeScreen from './welcome-screen.js';
import {otherUsersResults} from './data.js';
import {getUserPoints} from './data/user-points.js';
import {getUserResult} from './data/user-result.js';

export default (config, gameState, userAnswers) => {
  const template = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;${Math.floor(userAnswers.reduce((acc, it) => acc + it.time, 0) / 60)}&nbsp;минуты и 
${(userAnswers.reduce((acc, it) => acc + it.time, 0) / 60).toFixed(2).slice(2)}&nbsp;секунд
      <br>вы&nbsp;набрали ${getUserPoints(userAnswers)} баллов (${(userAnswers.filter((it) => it.time < 30)).length} быстрых)
      <br>совершив ${config.lives - gameState.lives} ошибки</div>
    <span class="main-comparison">${getUserResult(getUserPoints(userAnswers), otherUsersResults)}</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;
  const element = getElementFromTemplate(template);
  const replayButton = element.querySelector(`.main-replay`);

  replayButton.addEventListener(`click`, () => {
    renderScreen(welcomeScreen(config));
  });

  return element;
};
