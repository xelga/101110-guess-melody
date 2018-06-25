const app = document.querySelector(`.app`);

export const getElementFromTemplate = (template) => {
  const element = document.createElement(`template`);
  element.innerHTML = template.trim();
  return element.content;
};

export const renderScreen = (param) => {
  const main = app.querySelector(`.main`);
  main.innerHTML = ``;
  main.appendChild(param);
};

export const renderModal = (param) => {
  const body = document.querySelector(`body`);
  body.appendChild(param);
};
