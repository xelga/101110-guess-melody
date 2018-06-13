export const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`The time must be the type of number`);
  }

  if (time <= 0) {
    throw new Error(`The time value is incorrect`);
  }

  const timeParams = {
    currentTime: time,
    noTime: false,
    tick() {
      this.currentTime -= 1;

      if (this.currentTime <= 0) {
        this.noTime = true;
      }
      return timeParams;
    }
  };

  return timeParams;
};
