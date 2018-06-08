import {assert} from 'chai';
import {createTimer} from './timer.js';

describe(`Check timer`, () => {
  it(`should return timer object`, () => {
    assert.isObject(createTimer(20));
  });
  it(`should say that time is over`, () => {
    assert.isTrue(createTimer(1).tick().noTime);
  });
  it(`should return current time`, () => {
    assert.equal(createTimer(10).tick().currentTime, 9);
  });
  it(`should not allow wrong value of time`, () => {
    assert.throws(() => createTimer(-1), /Time value is wrong/);
  });
  it(`should not allow time value if it not a number`, () => {
    assert.throws(() => createTimer(``), /Time should be the type of number/);
  });
});
