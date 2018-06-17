const app = document.querySelector(`.app`);

export const renderScreen = (param) => {
  const main = app.querySelector(`.main`);
  main.innerHTML = ``;
  main.appendChild(param);
};
