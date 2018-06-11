const QUICK_ANSWER = 30; // sec
const ANSWER_POINT = 1;
const FAST_ANSWER_POINT = 2;
const WRONG_ANSWER_POINT = 2;

export const getUserPoints = (userAnswers) => {
  let points = 0;

  if (!Array.isArray(userAnswers)) {
    throw new Error(`Answers must be an array`);
  }

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i].correct) {
      if (userAnswers[i].time < QUICK_ANSWER) {
        points += FAST_ANSWER_POINT;
      } else {
        points += ANSWER_POINT;
      }
    } else {
      points -= WRONG_ANSWER_POINT;
    }
  }

  return points;
};
