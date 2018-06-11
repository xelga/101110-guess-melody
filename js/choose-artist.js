import {getElementFromTemplate, renderScreen} from './util.js';
import chooseGenreScreen from './choose-genre.js';
import chooseArtistScreen from './choose-artist.js';
import welcomeScreen from './welcome-screen.js';
import livesWastedScreen from './loss-lives-wasted.js';
import winScreen from './win-screen.js';

export default (config, gameState, gameScreens, userAnswers) => {
  const gameStateTemplate = `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle cx="390" cy="390" r="370" class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
    ${new Array(config.lives - gameState.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>`;

  const template = `<section class="main main--level main--level-artist">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    ${gameStateTemplate}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="${gameScreens[gameState[`current-game-screen`]].answers[`answer-1`].description.image}"
                 alt="${gameScreens[gameState[`current-game-screen`]].answers[`answer-1`].description.artist}" width="134" height="134">
            ${gameScreens[gameState[`current-game-screen`]].answers[`answer-1`].description.artist}
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-2" name="answer" value="val-2"/>
          <label class="main-answer" for="answer-2">
            <img class="main-answer-preview" src="${gameScreens[gameState[`current-game-screen`]].answers[`answer-2`].description.image}"
                 alt="${gameScreens[gameState[`current-game-screen`]].answers[`answer-2`].description.artist}" width="134" height="134">
            ${gameScreens[gameState[`current-game-screen`]].answers[`answer-2`].description.artist}
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-3" name="answer" value="val-3"/>
          <label class="main-answer" for="answer-3">
            <img class="main-answer-preview" src="${gameScreens[gameState[`current-game-screen`]].answers[`answer-3`].description.image}"
                 alt="${gameScreens[gameState[`current-game-screen`]].answers[`answer-3`].description.artist}" width="134" height="134">
            ${gameScreens[gameState[`current-game-screen`]].answers[`answer-3`].description.artist}
          </label>
        </div>
      </form>
    </div>
  </section>`;
  const element = getElementFromTemplate(template);
  const answerButtons = element.querySelectorAll(`.main-answer`);
  const playAgainButton = element.querySelector(`.play-again`);

  for (let answerButton of answerButtons) {
    answerButton.addEventListener(`click`, (event) => {
      const userAnswer = event.currentTarget.getAttribute(`for`);
      const isCorrect = gameScreens[gameState[`current-game-screen`]].answers[userAnswer].isCorrect;

      if (!isCorrect) {
        gameState.lives -= 1;
      }

      userAnswers[gameState[`current-game-screen`]] = {
        correct: isCorrect,
        time: 30
      };

      if (gameState.lives > 0) {
        gameState[`current-game-screen`] += 1;
        if (gameState[`current-game-screen`] < gameScreens.length) {
          if (gameScreens[gameState[`current-game-screen`]].type === `artist`) {
            renderScreen(chooseArtistScreen(config, gameState, gameScreens, userAnswers));
          } else {
            renderScreen(chooseGenreScreen(config, gameState, gameScreens, userAnswers));
          }
        } else {
          renderScreen(winScreen(config, gameState, userAnswers));
        }
      } else {
        renderScreen(livesWastedScreen());
      }
    });
  }

  playAgainButton.addEventListener(`click`, () => {
    event.preventDefault();
    renderScreen(welcomeScreen(config));
  });

  return element;
};
