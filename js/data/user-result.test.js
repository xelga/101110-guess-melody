import {assert} from 'chai';
import {getUserResult} from './user-result.js';

describe(`Check user results`, () => {
  it(`should return loss-message when time is over`, () => {
    const otherUsersResults = [4, 5];
    const userResult = {
      points: 10,
      lives: 3,
      time: -10 // sec
    };
    assert.equal(getUserResult(userResult, otherUsersResults), `Время вышло! Вы не успели отгадать все мелодии`);
  });
  it(`should return loss-message when lives is over`, () => {
    const otherUsersResults = [4, 5];
    const userResult = {
      points: 10,
      lives: 0,
      time: 150 // sec
    };
    assert.equal(getUserResult(userResult, otherUsersResults), `У вас закончились все попытки. Ничего, повезёт в следующий раз!`);
  });
  it(`should return win-message when user have time and lives`, () => {
    const otherUsersResults = [4, 5, 8, 10, 11, 13, 15, 19, 20];
    const userResult = {
      points: 18,
      lives: 2,
      time: 1 // sec
    };
    assert.equal(getUserResult(userResult, otherUsersResults), `Вы заняли 3 место из 10 игроков. Это лучше, чем у 70% игроков`);
    const newOtherUsersResults = [2, 5, 8, 10];
    const newUserResult = {
      points: 1,
      lives: 2,
      time: 1 // sec
    };
    assert.equal(getUserResult(newUserResult, newOtherUsersResults), `Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`should return win-message when user have time and lives and other users have equal points`, () => {
    const firstOtherUsersResults = [4, 5, 8, 10, 11, 13, 15, 20, 20];
    const firstUserResult = {
      points: 20,
      lives: 2,
      time: 1 // sec
    };
    assert.equal(getUserResult(firstUserResult, firstOtherUsersResults), `Вы заняли 1 место из 10 игроков. Это лучше, чем у 70% игроков`);
    const secondOtherUsersResults = [20, 20, 20, 20, 20, 20, 15, 20, 20];
    const secondUserResult = {
      points: 20,
      lives: 2,
      time: 1 // sec
    };
    assert.equal(getUserResult(secondUserResult, secondOtherUsersResults), `Вы заняли 1 место из 10 игроков. Это лучше, чем у 10% игроков`);
    const thirdOtherUsersResults = [1, 5, 1, 1];
    const thirdUserResult = {
      points: 1,
      lives: 2,
      time: 1 // sec
    };
    assert.equal(getUserResult(thirdUserResult, thirdOtherUsersResults), `Вы заняли 2 место из 5 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`should not allow user result value if it not an object`, () => {
    const otherUsersResults = [1, 5, 1, 1];
    assert.throws(() => getUserResult([], otherUsersResults), /User result should be an object/);
  });
  it(`should not allow other users results value if it not an array`, () => {
    const userResult = {
      points: 1,
      lives: 2,
      time: 1 // sec
    };
    assert.throws(() => getUserResult(userResult, {}), /Other users results should be an array/);
  });
});
