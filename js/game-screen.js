import {getElementFromTemplate, renderScreen} from './util.js';
import welcomeScreen from './welcome-screen.js';
import resultScreen from './result-screen.js';
import gameScreen from './game-screen.js';

export default (gameConfig, gameState, gameScreens, userAnswers) => {
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
    ${new Array(gameConfig.lives - gameState.lives).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>`;

  const gameScreenTemplate = `<section class="main main--level main--level-${gameScreens[gameState[`current-game-screen`]].type}">
    <a class="play-again play-again__wrap" href="#">
      <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
    </a>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
    </svg>
   ${gameStateTemplate}
    <div class="main-wrap">
    </div>
  </section>`;

  const gameTypeArtistTemplate = `<h2 class="title main-title">Кто исполняет эту песню?</h2>
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
                 alt="${gameScreens[gameState[`current-game-screen`]].answers[`answer-2`].description.artist}" width="134" height="134">${gameScreens[gameState[`current-game-screen`]].answers[`answer-2`].description.artist}
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
        </form>`;

  const gameTypeGenreTemplate = `<h2 class="title">Выберите инди-рок треки</h2>
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
      </form>`;

  const element = getElementFromTemplate(gameScreenTemplate);
  const playAgainButton = element.querySelector(`.play-again`);

  const renderGameType = (gameScreenElement, gameType) => {
    const container = gameScreenElement.querySelector(`.main-wrap`);
    container.innerHTML = ``;
    container.appendChild(gameType);
  };

  playAgainButton.addEventListener(`click`, () => {
    event.preventDefault();
    renderScreen(welcomeScreen(gameConfig));
  });

  if (gameScreens[gameState[`current-game-screen`]].type === `artist`) {
    renderGameType(element, getElementFromTemplate(gameTypeArtistTemplate));

    const artistAnswerButtons = element.querySelectorAll(`.main-answer`);

    for (let answerButton of artistAnswerButtons) {
      answerButton.addEventListener(`click`, (event) => {
        const userAnswer = event.currentTarget.getAttribute(`for`);
        const isCorrect = gameScreens[gameState[`current-game-screen`]].answers[userAnswer].isCorrect;

        if (!isCorrect) {
          gameState.lives -= 1;
        }

        userAnswers[gameState[`current-game-screen`]] = {
          correct: isCorrect,
          time: 21
        };

        if (gameState.lives > 0) {
          gameState[`current-game-screen`] += 1;
          if (gameState[`current-game-screen`] < gameScreens.length) {
            renderScreen(gameScreen(gameConfig, gameState, gameScreens, userAnswers));
          } else {
            renderScreen(resultScreen(gameConfig, gameState, userAnswers));
          }
        } else {
          renderScreen(resultScreen(gameConfig, gameState, userAnswers));
        }
      });
    }
  } else {
    renderGameType(element, getElementFromTemplate(gameTypeGenreTemplate));

    const genreAnswerButtons = element.querySelectorAll(`.genre-answer > input`);
    const buttonAnswer = element.querySelector(`.genre-answer-send`);

    buttonAnswer.disabled = true;

    for (let answerButton of genreAnswerButtons) {
      answerButton.addEventListener(`click`, () => {
        for (let answerButtonChecked of genreAnswerButtons) {
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

      for (let answerButton of genreAnswerButtons) {
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
          renderScreen(gameScreen(gameConfig, gameState, gameScreens, userAnswers));
        } else {
          renderScreen(resultScreen(gameConfig, gameState, userAnswers));
        }
      } else {
        renderScreen(resultScreen(gameConfig, gameState, userAnswers));
      }
    });
  }

  return element;
};
