export const ADD_POINTS = 'ADD_POINTS';

export const updateScore = (points = 1) => ({
  type: ADD_POINTS,
  points,
});
