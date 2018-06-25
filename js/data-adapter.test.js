import {assert} from 'chai';
import {adaptServerData} from './data-adapter.js';

const serverData = [
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

const localData = [
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

describe(`Adapt server data`, () => {
  it(`must have several format remote and local data`, () => {
    assert.deepEqual(adaptServerData(serverData), localData);
  });
});
