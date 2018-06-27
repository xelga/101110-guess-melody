export const getCircleTimerParam = (radius, time, pastTime) => {
  const stroke = Math.round(2 * Math.PI * radius);
  const step = stroke / time;
  const offset = step * pastTime;

  return {stroke, offset};
};
