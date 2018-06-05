export const getElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template.trim();
  return element;
};

const app = document.querySelector(`.app`);

export const renderScreen = (element) => {
  const main = app.querySelector(`.main`);
  main.innerHTML = ``;
  main.appendChild(element);
};
