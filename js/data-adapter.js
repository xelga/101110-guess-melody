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

let answerNumber = 1;
let isCorrect;
let src = ``;

const getDataArtistGame = (item) => {
  const answers = {};

  for (const answer of item.answers) {
    isCorrect = answer.isCorrect;

    if (isCorrect) {
      src = item.src;
    }
    answers[`answer-${answerNumber }`] = {
      trackData: {
        artist: answer.title,
        image: answer.image.url,
        src
      },
      isCorrect
    };

    answerNumber += 1;
  }

  return answers;
};

const getDataGenreGame = (item) => {
  const answers = {};

  for (const answer of item.answers) {
    answers[`answer-${answerNumber }`] = {
      trackData: {
        artist: ``,
        image: ``,
        src: answer.src
      },
      isCorrect: item.genre === answer.genre
    };

    answerNumber += 1;
  }

  return answers;
};

const getAnswers = (item) => {
  let answers;
  answerNumber = 1;

  if (item.type === `artist`) {
    answers = getDataArtistGame(item);
  } else {
    answers = getDataGenreGame(item);
  }

  return answers;
};

export const adaptServerData = (data) => {
  const adaptedData = data.map((item) => {
    return {
      type: item.type,
      question: item.question,
      answers: getAnswers(item)
    };
  });

  return adaptedData;
};
