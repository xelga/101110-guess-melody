import {assert} from 'chai';
import {getUserResult} from './get-user-result.js';

describe(`Check the user's results`, () => {
  it(`must return a win message when the user's result is unique`, () => {
    const otherUsersResults = [4, 5, 8, 10, 11, 13, 15, 19, 20];
    assert.equal(getUserResult(18, otherUsersResults), `Вы заняли 3 место из 10 игроков. Это лучше, чем у 70% игроков`);
    const newOtherUsersResults = [2, 5, 8, 10];
    assert.equal(getUserResult(1, newOtherUsersResults), `Вы заняли 5 место из 5 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`must return a win message when the user's result is not unique`, () => {
    const firstOtherUsersResults = [4, 5, 8, 10, 11, 13, 15, 20, 20];
    assert.equal(getUserResult(20, firstOtherUsersResults), `Вы заняли 1 место из 10 игроков. Это лучше, чем у 70% игроков`);
    const secondOtherUsersResults = [20, 20, 20, 20, 20, 20, 15, 20, 20];
    assert.equal(getUserResult(20, secondOtherUsersResults), `Вы заняли 1 место из 10 игроков. Это лучше, чем у 10% игроков`);
    const thirdOtherUsersResults = [1, 5, 1, 1];
    assert.equal(getUserResult(1, thirdOtherUsersResults), `Вы заняли 2 место из 5 игроков. Это лучше, чем у 0% игроков`);
  });
  it(`must not allow points value if it is not a number`, () => {
    const otherUsersResults = [4, 5, 8, 10, 11, 13, 15, 19, 20];
    assert.throws(() => getUserResult(undefined, otherUsersResults), /Points must be the type of number/);
  });
  it(`must not allow "other users results" value if it is not an array`, () => {
    assert.throws(() => getUserResult(1, {}), /"Other users results" must be an array/);
  });
});
