/* eslint-disable import/prefer-default-export */
export const isNightModeTime = () => {
  const hour = (new Date()).getHours();
  return hour >= 21 || hour < 5;
};
