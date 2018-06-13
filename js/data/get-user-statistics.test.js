import {assert} from 'chai';
import {getUserStatistics} from './get-user-statistics.js';

const getTestAnswers = () => {
  const userAnswers = [];
  for (let i = 0; i < 10; i++) {
    userAnswers[i] = {
      correct: true,
      time: 30
    };
  }

  return userAnswers;
};

describe(`Check the user's statistics`, () => {
  it(`must return a loss message when the time is over`, () => {
    const gameState = {
      'lives': 2,
      'time': 0,
      'current-game-screen': 1
    };
    assert.equal(getUserStatistics(getTestAnswers(), gameState), `Время вышло!<br>Вы не успели отгадать все мелодии`);
  });
  it(`must return a loss message when lives are over`, () => {
    const gameState = {
      'lives': 0,
      'time': 33,
      'current-game-screen': 1
    };
    assert.equal(getUserStatistics(getTestAnswers(), gameState), `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`);
  });
  it(`must return a win message when the user is alive`, () => {
    const gameState = {
      'lives': 3,
      'time': 3,
      'current-game-screen': 1
    };
    assert.equal(getUserStatistics(getTestAnswers(), gameState), `За&nbsp;5&nbsp;минуты и 00&nbsp;секунд
<br>вы&nbsp;набрали 10 баллов (0 быстрых)<br>совершив 0 ошибки`);
    const userAnswers = getTestAnswers();
    for (let i = 0; i < userAnswers.length; i++) {
      userAnswers[i].time = 20;
    }
    assert.equal(getUserStatistics(userAnswers, gameState), `За&nbsp;3&nbsp;минуты и 33&nbsp;секунд
<br>вы&nbsp;набрали 20 баллов (10 быстрых)<br>совершив 0 ошибки`);
    userAnswers[0].time = 32;
    userAnswers[1].correct = false;
    assert.equal(getUserStatistics(userAnswers, gameState), `За&nbsp;3&nbsp;минуты и 53&nbsp;секунд
<br>вы&nbsp;набрали 15 баллов (8 быстрых)<br>совершив 1 ошибки`);
    userAnswers[2].time = 32;
    userAnswers[3].correct = false;
    assert.equal(getUserStatistics(userAnswers, gameState), `За&nbsp;3&nbsp;минуты и 73&nbsp;секунд
<br>вы&nbsp;набрали 10 баллов (6 быстрых)<br>совершив 2 ошибки`);
  });
});
