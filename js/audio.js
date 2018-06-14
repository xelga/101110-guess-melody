export default (gameScreenElement, currentGameScreen, gameType) => {
  const playerItems = gameScreenElement.querySelectorAll(`.player-wrapper`);
  let audioNumber = 1;
  let isFirst = true;

  if (gameType === `artist`) {
    for (let i = 0; i < Object.keys(currentGameScreen.answers).length; i++) {
      if (currentGameScreen.answers[`answer-${i + 1}`].isCorrect) {
        audioNumber = i + 1;
        break;
      }
    }
  }

  for (let player of playerItems) {
    const audio = player.querySelector(`audio`);
    const control = player.querySelector(`.player-control`);
    const status = player.querySelector(`.player-status`);

    audio.src = currentGameScreen.answers[`answer-${audioNumber}`].description.src;
    audio.addEventListener(`error`, () => {
      throw new Error(`Failed to download audio-${audioNumber}`);
    });
    status.textContent = `остановлен`;

    if (isFirst) {
      audio.addEventListener(`loadeddata`, () => {
        audio.play();
        control.classList.add(`player-control--pause`);
        status.textContent = `запущен`;
      });
    }

    control.addEventListener(`click`, (event) => {
      event.preventDefault();
      for (let playerActive of playerItems) {
        const controlActive = playerActive.querySelector(`.player-control`);
        if (controlActive !== event.target) {
          controlActive.classList.remove(`player-control--pause`);
          controlActive.parentNode.querySelector(`audio`).pause();
          controlActive.parentNode.querySelector(`.player-status`).textContent = `остановлен`;
        }
      }
      event.target.classList.toggle(`player-control--pause`);
      if (event.target.classList.contains(`player-control--pause`)) {
        event.target.parentNode.querySelector(`audio`).play();
        event.target.parentNode.querySelector(`.player-status`).textContent = `запущен`;
      } else {
        event.target.parentNode.querySelector(`audio`).pause();
        event.target.parentNode.querySelector(`.player-status`).textContent = `остановлен`;
      }
    });
    audioNumber += 1;
    isFirst = false;
  }
};
