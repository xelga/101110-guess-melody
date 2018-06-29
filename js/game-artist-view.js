import GameScreenView from './game-screen-view';

export default class GameArtistView extends GameScreenView {
  constructor(gameConfig, gameState, currentGameScreen) {
    super(gameConfig, gameState, currentGameScreen);
  }

  get templateGame() {
    return `<h2 class="title main-title">${this.currentGameScreen.question}</h2>
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
      ${this._artistAnswersTemplate}
      </form>`;
  }

  get _artistAnswersTemplate() {
    let artistAnswersTemplate = ``;
    for (let i = 0; i < Object.keys(this.currentGameScreen.answers).length; i++) {
      artistAnswersTemplate += `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${i + 1}" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-${i + 1}">
            <img class="main-answer-preview" src="${this.currentGameScreen.answers[`answer-${i + 1}`].trackData.image}"
            alt="${this.currentGameScreen.answers[`answer-${i + 1}`].trackData.artist}" width="134" height="134">
            ${this.currentGameScreen.answers[`answer-${i + 1}`].trackData.artist}
          </label>
         </div>`;
    }
    return artistAnswersTemplate;
  }

  debug() {
    const answers = document.querySelectorAll(`.main-answer-wrapper`);

    for (let i = 0; i < Object.keys(this.currentGameScreen.answers).length; i++) {
      if (this.currentGameScreen.answers[`answer-${i + 1}`].isCorrect) {
        answers[i].style.border = `1px dashed #000`;
      }
    }
  }

  bind() {
    this.initializeAudio();
    super.bind();

    const artistAnswerButtons = this.element.querySelectorAll(`.main-answer`);

    for (let answerButton of artistAnswerButtons) {
      answerButton.addEventListener(`click`, (event) => {
        const userAnswer = event.currentTarget.getAttribute(`for`);
        const isCorrect = this.currentGameScreen.answers[userAnswer].isCorrect;

        this.onAnswer(isCorrect);
      });
    }
  }

  onAnswer() {
  }
}
