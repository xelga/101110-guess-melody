import {getElementFromTemplate, renderScreen} from './util.js';
import {userAnswers} from './data.js';
import welcomeScreen from './welcome-screen.js';
import resultScreen from './result-screen.js';
import gameScreen from './game-screen.js';
import renderAudio from './audio.js';

export default (gameConfig, gameState, gameScreens) => {
  const currentGameScreen = gameScreens[gameState.currentGameScreenNumber];

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

  const gameTypeArtistTemplate = `<h2 class="title main-title">${currentGameScreen.question}</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
      </form>`;

  const gameTypeGenreTemplate = `<h2 class="title">${currentGameScreen.question}</h2>
      <form class="genre">
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>`;

  const gameScreenTemplate = `<section class="main main--level main--level-${currentGameScreen.type}">
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

  const renderGameType = (gameScreenElement, gameType) => {
    const container = gameScreenElement.querySelector(`.main-wrap`);
    container.innerHTML = ``;
    container.appendChild(gameType);
  };

  const renderArtistAnswers = (gameScreenElement, number) => {
    const artistAnswerTemplate = `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-${number}">
            <img class="main-answer-preview" src="${currentGameScreen.answers[`answer-${number}`].trackData.image}"
            alt="${currentGameScreen.answers[`answer-${number}`].trackData.artist}" width="134" height="134">
            ${currentGameScreen.answers[`answer-${number}`].trackData.artist}
          </label>
         </div>`;
    const artistAnswer = getElementFromTemplate(artistAnswerTemplate);
    const container = gameScreenElement.querySelector(`.main-list`);
    container.appendChild(artistAnswer);
  };

  const renderGenreAnswers = (gameScreenElement, number) => {
    const genreAnswerTemplate = `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-${number}">
          <label class="genre-answer-check" for="a-${number}"></label>
        </div>`;
    const artistAnswer = getElementFromTemplate(genreAnswerTemplate);
    const container = gameScreenElement.querySelector(`.genre`);
    const buttonAnswer = gameScreenElement.querySelector(`.genre-answer-send`);
    container.insertBefore(artistAnswer, buttonAnswer);
  };

  const element = getElementFromTemplate(gameScreenTemplate);
  const playAgainButton = element.querySelector(`.play-again`);

  playAgainButton.addEventListener(`click`, () => {
    event.preventDefault();
    renderScreen(welcomeScreen(gameConfig));
  });

  const changeGameState = (isCorrect) => {
    if (!isCorrect) {
      gameState.lives -= 1;
    }

    if (gameState.lives > 0) {
      gameState.currentGameScreenNumber += 1;
      if (gameState.currentGameScreenNumber < gameScreens.length) {
        renderScreen(gameScreen(gameConfig, gameState, gameScreens));
      } else {
        renderScreen(resultScreen(gameConfig, gameState, userAnswers));
      }
    } else {
      renderScreen(resultScreen(gameConfig, gameState, userAnswers));
    }
  };

  const saveUserAnswer = (isCorrect) => {
    userAnswers[gameState.currentGameScreenNumber] = {
      correct: isCorrect,
      time: 30
    };
  };

  if (currentGameScreen.type === `artist`) {
    renderGameType(element, getElementFromTemplate(gameTypeArtistTemplate));
    renderAudio(element, currentGameScreen, `artist`);

    for (let i = 0; i < Object.keys(currentGameScreen.answers).length; i++) {
      renderArtistAnswers(element, i + 1);
    }

    const artistAnswerButtons = element.querySelectorAll(`.main-answer`);

    for (let answerButton of artistAnswerButtons) {
      answerButton.addEventListener(`click`, (event) => {
        const userAnswer = event.currentTarget.getAttribute(`for`);
        const isCorrect = currentGameScreen.answers[userAnswer].isCorrect;

        saveUserAnswer(isCorrect);
        changeGameState(isCorrect);
      });
    }
  } else {
    renderGameType(element, getElementFromTemplate(gameTypeGenreTemplate));

    for (let i = 0; i < Object.keys(currentGameScreen.answers).length; i++) {
      renderGenreAnswers(element, i + 1);
    }

    renderAudio(element, currentGameScreen);

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
        const gameAnswer = currentGameScreen.answers[`answer-${answerNumber}`].isCorrect;
        const userAnswer = answerButton.checked;

        if (gameAnswer !== userAnswer) {
          isCorrect = false;
          break;
        }
        answerNumber += 1;
      }

      saveUserAnswer(isCorrect);
      changeGameState(isCorrect);
    });
  }

  return element;
};
