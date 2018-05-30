'use strict';

const SCREEN_DEFAULT_NUMBER = 0;
const ARROW_LEFT_KEYCODE = 37;
const ARROW_RIGHT_KEYCODE = 39;
const ARROWS_TEMPLATE = `<div class="arrows__wrap">
    <style>
      .arrows__wrap {
        position: absolute;
        top: 135px;
        left: 50%;
        margin-left: -56px;
      }
      .arrows__btn {
        background: none;
        border: 2px solid black;
        padding: 5px 20px;
      }
    </style>
    <button class="arrows__btn"><-</button>
    <button class="arrows__btn">-></button>
</div>`;

const templates = document.querySelector(`#templates`).content.querySelectorAll(`.main`);
const screens = [];
const app = document.querySelector(`.app`);
const main = app.querySelector(`.main`);

app.insertAdjacentHTML(`beforeend`, ARROWS_TEMPLATE);

const arrowsButton = app.querySelectorAll(`.arrows__btn`);
const arrowLeft = arrowsButton[0];
const arrowRight = arrowsButton[1];

for (let i = 0; i < templates.length; i++) {
  screens.push(templates[i]);
}

let currentScreen = SCREEN_DEFAULT_NUMBER;

const showScreen = (number) => {
  if (number >= 0 && number < screens.length) {
    main.innerHTML = screens[number].innerHTML;
    main.className = screens[number].className;
    currentScreen = number;
  }

  return currentScreen;
};

showScreen(SCREEN_DEFAULT_NUMBER);

document.addEventListener(`keydown`, function (event) {
  if (event.keyCode === ARROW_LEFT_KEYCODE) {
    showScreen(currentScreen - 1);
  }

  if (event.keyCode === ARROW_RIGHT_KEYCODE) {
    showScreen(currentScreen + 1);
  }
});

arrowLeft.addEventListener(`click`, function () {
  showScreen(currentScreen - 1);
});

arrowRight.addEventListener(`click`, function () {
  showScreen(currentScreen + 1);
});
