import {assert} from 'chai';
import {getUserPoints, returnUserAnswers} from './game-data.js';

describe(`Check user points calculating`, () => {
  it(`should return -1 when the user's answers: less than 10`, () => {
    const userAnswers = returnUserAnswers();
    userAnswers.shift();
    assert.equal(getUserPoints(userAnswers, 3), -1);
  });
  it(`should return -1 when attempts are wasted`, () => {
    const userAnswers = returnUserAnswers();
    userAnswers[7].correct = false;
    userAnswers[8].correct = false;
    userAnswers[9].correct = false;
    assert.equal(getUserPoints(userAnswers, 3), -1);
  });
  it(`should return points when user's answers: 10 right, 0 quick`, () => {
    assert.equal(getUserPoints(returnUserAnswers(), 3), 10);
  });
  it(`should return points when user's answers: 10 right, 10 quick`, () => {
    const userAnswers = returnUserAnswers();
    for (let i = 0; i < userAnswers.length; i++) {
      userAnswers[i].time = 20;
    }
    assert.equal(getUserPoints(userAnswers, 3), 20);
  });
  it(`should return points when user's answers: 10 right, a few quick`, () => {
    const userAnswers = returnUserAnswers();
    userAnswers[0].time = 20;
    assert.equal(getUserPoints(userAnswers, 3), 11);
    userAnswers[1].time = 10;
    userAnswers[2].time = 4;
    assert.equal(getUserPoints(userAnswers, 3), 13);
  });
  it(`should return points when user's answers: a few wrong, a few quick`, () => {
    const userAnswers = returnUserAnswers();
    userAnswers[0].time = 29;
    userAnswers[1].correct = false;
    assert.equal(getUserPoints(userAnswers, 2), 8);
    userAnswers[2].time = 4;
    userAnswers[2].correct = false;
    assert.equal(getUserPoints(userAnswers, 3), 5);
    userAnswers[4].time = 10;
    userAnswers[5].time = 11;
    userAnswers[6].time = 12;
    assert.equal(getUserPoints(userAnswers, 3), 8);
  });
  it(`should not allow wrong value of attempts`, () => {
    assert.throws(() => getUserPoints(returnUserAnswers(), -5), /Quantity of attempts is wrong/);
  });
  it(`should not allow attempts value if it not a number`, () => {
    assert.throws(() => getUserPoints(returnUserAnswers(), undefined), /Attempts should be the type of number/);
  });
  it(`should not allow answers value if it not a array`, () => {
    assert.throws(() => getUserPoints({}, 3), /Answers should be an array/);
  });
});
