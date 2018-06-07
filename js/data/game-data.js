const QUESTION_QUANTITY = 10;
const FAST_ANSWER = 30; // sec
const ATTEMPTS_QUANTITY = 3;
const ANSWER_POINT = 1;
const FAST_ANSWER_POINT = 2;
const WRONG_ANSWER_POINT = 2;

export const returnUserAnswers = () => [
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  },
  {
    correct: true,
    time: 30
  }
];

export const getUserPoints = (answers, attemptsQuantity) => {
  let points = 0;
  let currentAttemptsQuantity = attemptsQuantity;

  if (typeof attemptsQuantity !== `number`) {
    throw new Error(`Attempts should be the type of number`);
  }

  if (!Array.isArray(answers)) {
    throw new Error(`Answers should be an array`);
  }

  if (currentAttemptsQuantity <= 0 || currentAttemptsQuantity > ATTEMPTS_QUANTITY) {
    throw new Error(`Quantity of attempts is wrong`);
  }

  if (answers.length !== QUESTION_QUANTITY) {
    return -1;
  }

  if (answers.length === QUESTION_QUANTITY) {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct) {
        if (answers[i].time < FAST_ANSWER) {
          points += FAST_ANSWER_POINT;
        } else {
          points += ANSWER_POINT;
        }
      } else {
        points -= WRONG_ANSWER_POINT;
        currentAttemptsQuantity -= 1;
        if (currentAttemptsQuantity === 0) {
          return -1;
        }
      }
    }
  }

  return points;
};
