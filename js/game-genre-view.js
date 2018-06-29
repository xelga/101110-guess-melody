import GameScreenView from './game-screen-view.js';

export default class GameGenreView extends GameScreenView {
  constructor(gameConfig, gameState, currentGameScreen) {
    super(gameConfig, gameState, currentGameScreen);
  }

  get templateGame() {
    return `<h2 class="title">${this.currentGameScreen.question}</h2>
      <form class="genre">
        ${this._genreAnswersTemplate}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>`;
  }

  get _genreAnswersTemplate() {
    let genreAnswersTemplate = ``;
    for (let i = 0; i < Object.keys(this.currentGameScreen.answers).length; i++) {
      genreAnswersTemplate += `<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-${i + 1}">
          <label class="genre-answer-check" for="a-${i + 1}"></label>
        </div>`;
    }
    return genreAnswersTemplate;
  }

  debug() {
    const answers = document.querySelectorAll(`.genre-answer`);

    for (let i = 0; i < Object.keys(this.currentGameScreen.answers).length; i++) {
      if (this.currentGameScreen.answers[`answer-${i + 1}`].isCorrect) {
        answers[i].style.border = `1px dashed #000`;
      }
    }
  }

  bind() {
    this.initializeAudio();
    super.bind();

    const genreAnswerButtons = this.element.querySelectorAll(`.genre-answer > input`);
    const buttonAnswer = this.element.querySelector(`.genre-answer-send`);

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
        const gameAnswer = this.currentGameScreen.answers[`answer-${answerNumber}`].isCorrect;
        const userAnswer = answerButton.checked;

        if (gameAnswer !== userAnswer) {
          isCorrect = false;
          break;
        }
        answerNumber += 1;
      }

      this.onAnswer(isCorrect);
    });
  }

  onAnswer() {
  }
}
