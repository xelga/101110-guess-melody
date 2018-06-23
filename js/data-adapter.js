/* Входной формат данных:
[
  {
    type: `artist`,
    question: `Кто исполняет эту песню?`,
    src: `path/to/file.mp3`,
    answers: [
      {
        'image': {
          url: `http://placehold.it/705x455`,
          width: 300,
          height: 300
        },
        'title': `Пелагея`,
        'isCorrect': false
      },
      {
        'image': {
          url: `http://placehold.it/705x455`,
          width: 300,
          height: 300
        },
        'title': `Краснознамённая дивизия имени моей Бабушки`,
        'isCorrect': false
      },
      {
        'image': {
          url: `http://placehold.it/705x455`,
          width: 300,
          height: 300
        },
        'title': `Кровосток`,
        'isCorrect': true
      }
    ]
  },
  {
    type: `genre`,
    question: `Выберите все песни в жанре R'n'B`,
    genre: `rnb`,
    answers: [
      {
        'src': `/path/to/file.mp3`,
        'genre': `rnb`
      },
      {
        'src': `/path/to/file.mp3`,
        'genre': `blues`
      },
      {
        'src': `/path/to/file.mp3`,
        'genre': `rock`
      },
      {
        'src': `/path/to/file.mp3`,
        'genre': `rnb`
      }
    ]
  }
];
*/

/* Выходной формат данных:
  [
  {
    type: `artist`,
    question: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {
        trackData: {
          artist: `Пелагея`,
          image: `http://placehold.it/705x455`,
          src: ``
        },
        isCorrect: false
      },
      'answer-2': {
        trackData: {
          artist: `Краснознамённая дивизия имени моей Бабушки`,
          image: `http://placehold.it/705x455`,
          src: ``
        },
        isCorrect: false
      },
      'answer-3': {
        trackData: {
          artist: `Кровосток`,
          image: `http://placehold.it/705x455`,
          src: `path/to/file.mp3`
        },
        isCorrect: true
      }
    }
  },
  {
    type: `genre`,
    question: `Выберите все песни в жанре R'n'B`,
    answers: {
      'answer-1': {
        trackData: {
          artist: ``,
          image: ``,
          src: `/path/to/file.mp3`
        },
        isCorrect: true
      },
      'answer-2': {
        trackData: {
          artist: ``,
          image: ``,
          src: `/path/to/file.mp3`
        },
        isCorrect: false
      },
      'answer-3': {
        trackData: {
          artist: ``,
          image: ``,
          src: `/path/to/file.mp3`
        },
        isCorrect: false
      },
      'answer-4': {
        trackData: {
          artist: ``,
          image: ``,
          src: `/path/to/file.mp3`
        },
        isCorrect: true
      }
    }
  }
];
*/
let adaptedData = [];
let adaptedDataItem = 0;
let adaptedDataAnswerNumber = 1;
let isCorrect;
let src = ``;

const getDataArtistGame = (gameScreenData) => {
  for (const answer of gameScreenData.answers) {
    isCorrect = answer.isCorrect;

    if (isCorrect) {
      src = gameScreenData.src;
    }

    adaptedData[adaptedDataItem].answers[`answer-${adaptedDataAnswerNumber }`] = {
      trackData: {
        artist: answer.title,
        image: answer.image.url,
        src
      },
      isCorrect
    };

    adaptedDataAnswerNumber += 1;
  }
};

const getDataGenreGame = (gameScreenData) => {
  for (const answer of gameScreenData.answers) {
    adaptedData[adaptedDataItem].answers[`answer-${adaptedDataAnswerNumber }`] = {
      trackData: {
        artist: ``,
        image: ``,
        src: answer.src
      },
      isCorrect: gameScreenData.genre === answer.genre
    };

    adaptedDataAnswerNumber += 1;
  }
};

export const adaptServerData = (data) => {
  for (const gameScreenData of data) {
    adaptedDataAnswerNumber = 1;

    adaptedData[adaptedDataItem] = {
      type: gameScreenData.type,
      question: gameScreenData.question,
      answers: {}
    };

    if (gameScreenData.type === `artist`) {
      getDataArtistGame(gameScreenData);
    } else {
      getDataGenreGame(gameScreenData);
    }

    adaptedDataItem += 1;
  }

  return adaptedData;
};
