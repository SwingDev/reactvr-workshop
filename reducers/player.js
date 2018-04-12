import {
  PLAYER_ADD_POINTS,
  PLAYER_FINISH_STATUS_SET,
} from '../actions/player';

const INITIAL_STATE = {
  score: 0,
  hits: 0,
  time: Date.now(),
  hasFinished: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_ADD_POINTS:
      return {
        ...state,
        score: state.score + action.points,
        hits: state.hits + action.hits,
      };

    case PLAYER_FINISH_STATUS_SET:
      if (action.hasFinished === false) {
        return {
          ...INITIAL_STATE,
          time: Date.now(),
        };
      }

      return {
        ...state,
        hasFinished: action.hasFinished,
        time: Date.now() - state.time,
      };

    default:
      return state;
  }
};

export default reducer;
