import {assert} from 'chai';
import {getUserPoints} from './user-points.js';

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

describe(`Check the user's points calculating:`, () => {
  it(`must return points when the user's answers are: 10 correct, 0 quick`, () => {
    assert.equal(getUserPoints(getTestAnswers(), 3), 10);
  });
  it(`must return points when the user's answers are: 10 correct, 10 quick`, () => {
    const userAnswers = getTestAnswers();
    for (let i = 0; i < userAnswers.length; i++) {
      userAnswers[i].time = 20;
    }
    assert.equal(getUserPoints(userAnswers, 3), 20);
  });
  it(`must return points when the user's answers are: 10 correct, a few quick`, () => {
    const userAnswers = getTestAnswers();
    userAnswers[0].time = 20;
    assert.equal(getUserPoints(userAnswers, 3), 11);
    userAnswers[1].time = 10;
    userAnswers[2].time = 4;
    assert.equal(getUserPoints(userAnswers, 3), 13);
  });
  it(`must return points when the user's answers are: a few incorrect, a few quick`, () => {
    const userAnswers = getTestAnswers();
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
  it(`must not allow answers value if it is not an array`, () => {
    assert.throws(() => getUserPoints({}, 3), /Answers must be an array/);
  });
});
