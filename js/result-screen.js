import {getElementFromTemplate, renderScreen} from './util.js';
import welcomeScreen from './welcome-screen.js';
import {otherUsersResults} from './data.js';
import {getUserPoints} from './data/get-user-points.js';
import {getUserResult} from './data/get-user-result.js';
import {getUserStatistics} from './data/get-user-statistics.js';

export default (config, gameState, userAnswers) => {
  let resultTitleTemplate = `Вы настоящий меломан!`;
  if (gameState.lives <= 0) {
    resultTitleTemplate = `Какая жалость!`;
  }

  if (gameState.time <= 0) {
    resultTitleTemplate = `Увы и ах!`;
  }
  const resultScreenTemplate = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${resultTitleTemplate}</h2>
    <div class="main-stat">${getUserStatistics(userAnswers, gameState)}</div>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const element = getElementFromTemplate(resultScreenTemplate);
  const replayButton = element.querySelector(`.main-replay`);

  const renderUsersComparison = () => {
    const usersComparisonTemplate = `<span class="main-comparison">${getUserResult(getUserPoints(userAnswers), otherUsersResults)}</span>`;
    const comparisonElement = getElementFromTemplate(usersComparisonTemplate);
    const main = element.querySelector(`.main`);
    main.insertBefore(comparisonElement, replayButton);
  };

  if (gameState.lives > 0 && gameState.time > 0) {
    renderUsersComparison();
  }

  replayButton.addEventListener(`click`, () => {
    renderScreen(welcomeScreen(config));
  });

  return element;
};
