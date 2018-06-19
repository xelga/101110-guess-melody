const app = document.querySelector(`.app`);

export const renderScreen = (param) => {
  const main = app.querySelector(`.main`);
  main.innerHTML = ``;
  main.appendChild(param);
};

export const renderTimer = (param) => {
  const timer = app.querySelector(`.timer-value`);
  timer.innerHTML = ``;
  timer.appendChild(param);
};
