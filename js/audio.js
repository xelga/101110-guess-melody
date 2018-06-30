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

    audio.src = currentGameScreen.answers[`answer-${audioNumber}`].trackData.src;
    audio.addEventListener(`error`, () => {
      throw new Error(`Failed to download audio`);
    });
    status.textContent = `загружается`;
    control.disabled = true;

    if (isFirst) {
      audio.addEventListener(`loadeddata`, () => {
        const currentPlayerItems = document.querySelectorAll(`.player`);
        if (!currentPlayerItems[0].contains(audio)) {
          return;
        }

        control.disabled = false;
        audio.play();
        control.classList.add(`player-control--pause`);
        status.textContent = `запущен`;
      });
    } else {
      audio.addEventListener(`loadeddata`, () => {
        control.disabled = false;
        status.textContent = `остановлен`;
      });
    }

    control.addEventListener(`click`, (event) => {
      event.preventDefault();
      for (let playerActive of playerItems) {
        const controlActive = playerActive.querySelector(`.player-control`);
        if (controlActive !== event.target) {
          controlActive.classList.remove(`player-control--pause`);
          controlActive.parentNode.querySelector(`audio`).pause();
          if (controlActive.parentNode.querySelector(`.player-status`).textContent !== `загружается`) {
            controlActive.parentNode.querySelector(`.player-status`).textContent = `остановлен`;
          }
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
