import {getUserPoints} from "./get-user-points.js";

const getDeclension = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const getQuickAnswersDeclension = (number) => number === 1 ? `быстрый` : `быстрых`;

const minutes = [`минуту`, `минуты`, `минут`];
const seconds = [`секуну`, `секунды`, `секунд`];
const points = [`балл`, `балла`, `баллов`];
const mistakes = [`ошибку`, `ошибки`, `ошибок`];

export const getUserStatistics = (userAnswers, gameState) => {
  if (!Array.isArray(userAnswers)) {
    throw new Error(`The user's answers must be an array`);
  }

  if (typeof gameState !== `object` || Array.isArray(gameState)) {
    throw new Error(`The game's state must be an object`);
  }

  if (gameState.time <= 0) {
    return `Время вышло!<br>Вы не успели отгадать все мелодии`;
  }

  if (gameState.lives <= 0) {
    return `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
  }

  const userTime = userAnswers.reduce((acc, it) => acc + it.time, 0);
  const quickAnswers = (userAnswers.filter((it) => it.time < 30 && it.correct)).length;
  const mistakesNumber = (userAnswers.filter((it) => it.correct === false)).length;
  const minutesDeclension = getDeclension(Math.floor(userTime / 60), minutes);
  const secondsDeclension = getDeclension(Math.floor(userTime % 60), seconds);
  const pointsDeclension = getDeclension(getUserPoints(userAnswers), points);
  const mistakesDeclension = getDeclension(mistakesNumber, mistakes);
  const quickAnswersDeclension = getQuickAnswersDeclension(quickAnswers);

  return `За&nbsp;${Math.floor(userTime / 60)}&nbsp;${minutesDeclension} и ${Math.floor(userTime % 60)}&nbsp;${secondsDeclension}
<br>вы&nbsp;набрали ${getUserPoints(userAnswers)} ${pointsDeclension} (${quickAnswers} ${quickAnswersDeclension})
<br>совершив ${mistakesNumber} ${mistakesDeclension}`;
};
