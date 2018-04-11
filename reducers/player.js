import { weapons } from '../config';
import { ADD_POINTS } from '../actions/player';

const INITIAL_STATE = {
  score: 0,
  hits: 0,
  weapon: weapons.ROCKET,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_POINTS:
      return {
        ...state,
        score: state.score + action.points,
        hits: state.hits + action.hits,
      };

    default:
      return state;
  }
};

export default reducer;
