export const PLAYER_ADD_POINTS = 'PLAYER_ADD_POINTS';
export const PLAYER_FINISH_STATUS_SET = 'PLAYER_FINISH_STATUS_SET';

export const updateScore = (points = 1, hits = 1) => ({
  type: PLAYER_ADD_POINTS,
  points,
  hits,
});

export const setFinishedStatus = hasFinished => ({
  type: PLAYER_FINISH_STATUS_SET,
  hasFinished,
});
