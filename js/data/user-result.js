const compareNumbers = (a, b) => b - a;

export const getUserResult = (userResult, otherUsersResults) => {
  if (typeof userResult !== `object` || Array.isArray(userResult)) {
    throw new Error(`User result should be an object`);
  }

  if (!Array.isArray(otherUsersResults)) {
    throw new Error(`Other users results should be an array`);
  }

  if (userResult.time <= 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  if (userResult.lives <= 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  const pointsStatistics = otherUsersResults.slice();
  const userPoints = userResult.points;
  const playersNumber = otherUsersResults.length + 1;
  let userPlace = 0;
  let playersWithEqualPoints = 0;

  for (let i = 0; i < pointsStatistics.length; i++) {
    if (pointsStatistics[i] === userPoints) {
      playersWithEqualPoints += 1;
    }
  }
  pointsStatistics.push(userPoints);
  pointsStatistics.sort(compareNumbers);

  for (let i = 0; i < pointsStatistics.length; i++) {
    if (pointsStatistics[i] === userPoints) {
      userPlace = i + 1;
      break;
    }
  }
  const userSuccessRate = (playersNumber - playersWithEqualPoints - userPlace) / (playersNumber) * 100;

  return `Вы заняли ${userPlace} место из ${playersNumber} игроков. Это лучше, чем у ${userSuccessRate}% игроков`;
};
