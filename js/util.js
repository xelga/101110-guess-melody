export const getElementFromTemplate = (template) => {
  const element = document.createElement(`template`);
  element.innerHTML = template.trim();
  return element.content;
};

const app = document.querySelector(`.app`);

export const renderScreen = (param) => {
  const element = param();
  const main = app.querySelector(`.main`);
  main.innerHTML = ``;
  main.appendChild(element);
};
