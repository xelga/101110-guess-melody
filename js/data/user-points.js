const FAST_ANSWER = 30; // sec
const LIVES_QUANTITY = 3;
const ANSWER_POINT = 1;
const FAST_ANSWER_POINT = 2;
const WRONG_ANSWER_POINT = 2;
export const QUESTION_QUANTITY = 10;

export const getUserPoints = (answers, livesQuantity) => {
  let points = 0;
  let currentLivesQuantity = livesQuantity;

  if (typeof livesQuantity !== `number`) {
    throw new Error(`Lives should be the type of number`);
  }

  if (!Array.isArray(answers)) {
    throw new Error(`Answers should be an array`);
  }

  if (currentLivesQuantity <= 0 || currentLivesQuantity > LIVES_QUANTITY) {
    throw new Error(`Quantity of lives is wrong`);
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
        currentLivesQuantity -= 1;
        if (currentLivesQuantity === 0) {
          return -1;
        }
      }
    }
  }

  return points;
};
