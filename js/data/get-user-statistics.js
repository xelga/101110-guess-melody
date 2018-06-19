import {getUserPoints} from "./get-user-points.js";

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
  const mistakes = (userAnswers.filter((it) => it.correct === false)).length;

  return `За&nbsp;${Math.floor(userTime / 60)}&nbsp;минуты и ${Math.floor(userTime % 60)}&nbsp;секунд
<br>вы&nbsp;набрали ${getUserPoints(userAnswers)} баллов (${quickAnswers} быстрых)<br>совершив ${mistakes} ошибки`;
};
