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

  const template = `<section class="main main--level main--level-genre">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    ${gameStateTemplate}
    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

  const element = getElementFromTemplate(template);
  const answerButtons = element.querySelectorAll(`.genre-answer > input`);
  const buttonAnswer = element.querySelector(`.genre-answer-send`);
  const playAgainButton = element.querySelector(`.play-again`);

  buttonAnswer.disabled = true;

  for (let answerButton of answerButtons) {
    answerButton.addEventListener(`click`, () => {
      for (let answerButtonChecked of answerButtons) {
        if (answerButtonChecked.checked) {
          buttonAnswer.disabled = false;
          break;
        } else {
          buttonAnswer.disabled = true;
        }
      }
    });
  }

  buttonAnswer.addEventListener(`click`, (event) => {
    event.preventDefault();
    let isCorrect = true;
    let answerNumber = 1;

    for (let answerButton of answerButtons) {
      const gameAnswer = gameScreens[gameState[`current-game-screen`]].answers[`answer-${answerNumber}`].isCorrect;
      const userAnswer = answerButton.checked;
      if (gameAnswer !== userAnswer) {
        isCorrect = false;
        break;
      }
      answerNumber += 1;
    }

    userAnswers[gameState[`current-game-screen`]] = {
      correct: isCorrect,
      time: 30
    };

    if (!isCorrect) {
      gameState.lives -= 1;
    }

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

  playAgainButton.addEventListener(`click`, () => {
    event.preventDefault();
    renderScreen(welcomeScreen(config));
  });

  return element;
};
