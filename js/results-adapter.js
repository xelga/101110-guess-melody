import {getUserPoints} from './data/get-user-points.js';
/* Входной формат данных:
[
  [
    {
      correct: true,
      time: 5
    },
    {
      correct: false,
      time: 15
    },
    {
      correct: true,
      time: 35
    }
  ],
  [
    {
      correct: true,
      time: 5
    },
    {
      correct: true,
      time: 15
    },
    {
      correct: true,
      time: 25
    }
  ]
];
*/

/* Выходной формат данных:
  [1, 6];
*/

export const adaptServerResults = (data) => {
  const adaptedResults = data.map((item) => {
    return getUserPoints(item);
  });

  return adaptedResults;
};
