import {assert} from 'chai';
import {adaptServerResults} from './results-adapter.js';

const serverResults = [
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

const localResults = [1, 6];

describe(`Adapt server data`, () => {
  it(`must have several format remote and local data`, () => {
    assert.deepEqual(adaptServerResults(serverResults), localResults);
  });
});
