const tracks = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

export const gameConfig = {
  'time': 300, // sec
  'game-screens-number': 10,
  'start-screen-number': 0,
  'lives': 3
};

export const gameScreens = [
  {
    type: `artist`,
    answers: {
      'answer-1': {
        description: tracks[0],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[1],
        isCorrect: false
      },
      'answer-3': {
        description: tracks[2],
        isCorrect: false
      }
    }
  },
  {
    type: `genre`,
    answers: {
      'answer-1': {
        description: tracks[0],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[1],
        isCorrect: true
      },
      'answer-3': {
        description: tracks[2],
        isCorrect: true
      },
      'answer-4': {
        description: tracks[2],
        isCorrect: true
      }
    }
  },
  {
    type: `artist`,
    answers: {
      'answer-1': {
        description: tracks[2],
        isCorrect: false
      },
      'answer-2': {
        description: tracks[3],
        isCorrect: true
      },
      'answer-3': {
        description: tracks[4],
        isCorrect: false
      }
    }
  },
  {
    type: `artist`,
    answers: {
      'answer-1': {
        description: tracks[3],
        isCorrect: false
      },
      'answer-2': {
        description: tracks[4],
        isCorrect: false
      },
      'answer-3': {
        description: tracks[5],
        isCorrect: true
      }
    }
  },
  {
    type: `genre`,
    answers: {
      'answer-1': {
        description: tracks[0],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[1],
        isCorrect: true
      },
      'answer-3': {
        description: tracks[2],
        isCorrect: true
      },
      'answer-4': {
        description: tracks[3],
        isCorrect: false
      }
    }
  },
  {
    type: `genre`,
    answers: {
      'answer-1': {
        description: tracks[2],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[3],
        isCorrect: true
      },
      'answer-3': {
        description: tracks[4],
        isCorrect: false
      },
      'answer-4': {
        description: tracks[5],
        isCorrect: false
      }
    }
  },
  {
    type: `genre`,
    answers: {
      'answer-1': {
        description: tracks[5],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[1],
        isCorrect: false
      },
      'answer-3': {
        description: tracks[3],
        isCorrect: false
      },
      'answer-4': {
        description: tracks[2],
        isCorrect: false
      }
    }
  },
  {
    type: `artist`,
    answers: {
      'answer-1': {
        description: tracks[5],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[3],
        isCorrect: false
      },
      'answer-3': {
        description: tracks[4],
        isCorrect: false
      }
    }
  },
  {
    type: `genre`,
    answers: {
      'answer-1': {
        description: tracks[5],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[1],
        isCorrect: false
      },
      'answer-3': {
        description: tracks[3],
        isCorrect: false
      },
      'answer-4': {
        description: tracks[2],
        isCorrect: false
      }
    }
  },
  {
    type: `genre`,
    answers: {
      'answer-1': {
        description: tracks[5],
        isCorrect: true
      },
      'answer-2': {
        description: tracks[1],
        isCorrect: false
      },
      'answer-3': {
        description: tracks[3],
        isCorrect: false
      },
      'answer-4': {
        description: tracks[2],
        isCorrect: false
      }
    }
  }
];

export const userAnswers = [];

export const otherUsersResults = [4, 5, 8, 10, 11, 13, 15, 18, 19];
