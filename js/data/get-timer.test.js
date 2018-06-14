import {assert} from 'chai';
import {createTimer} from './get-timer.js';

describe(`Check timer`, () => {
  it(`must return timer object`, () => {
    assert.isObject(createTimer(20));
  });
  it(`must say that the time is over`, () => {
    assert.isTrue(createTimer(1).tick().noTime);
  });
  it(`must return current time`, () => {
    assert.equal(createTimer(10).tick().currentTime, 9);
  });
  it(`must not allow incorrect time value`, () => {
    assert.throws(() => createTimer(-1), /The time value is incorrect/);
  });
  it(`must not allow the time value if it is not a number`, () => {
    assert.throws(() => createTimer(``), /The time must be the type of number/);
  });
});
