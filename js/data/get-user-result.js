const compareNumbers = (a, b) => b - a;

export const getUserResult = (points, otherUsersPoints) => {
  if (typeof points !== `number`) {
    throw new Error(`"Points must be the type of number`);
  }

  if (!Array.isArray(otherUsersPoints)) {
    throw new Error(`"Other users results" must be an array`);
  }

  const pointsStatistics = otherUsersPoints.slice();
  const playersNumber = otherUsersPoints.length + 1;
  let userPlace = 0;
  let playersWithEqualPoints = 0;

  for (let i = 0; i < pointsStatistics.length; i++) {
    if (pointsStatistics[i] === points) {
      playersWithEqualPoints += 1;
    }
  }
  pointsStatistics.push(points);
  pointsStatistics.sort(compareNumbers);

  for (let i = 0; i < pointsStatistics.length; i++) {
    if (pointsStatistics[i] === points) {
      userPlace = i + 1;
      break;
    }
  }
  const userSuccessRate = (playersNumber - playersWithEqualPoints - userPlace) / (playersNumber) * 100;

  return `Вы заняли ${userPlace} место из ${playersNumber} игроков. Это лучше, чем у ${userSuccessRate}% игроков`;
};
