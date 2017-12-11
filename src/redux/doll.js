import {createAction, handleActions} from 'redux-actions';

const UPDATE_DOLLS = 'simulator.dolls';
const UPDATE_DOLL = 'simulator.dolls[key]';

export const updateDoll = createAction(UPDATE_DOLL, (key, doll) => ({
  key,
  doll,
}));

export const updateDolls = createAction(UPDATE_DOLLS, (dolls) => dolls);

export const dollReducer = handleActions({
  [UPDATE_DOLL](state, {payload: {key, doll}}) {
    const newState = {...state};

    newState[key] = {
      ...newState[key],
      ...doll,
    };

    return {
      ...newState,
    };
  },
  [UPDATE_DOLLS](state, {payload: dolls}) {
    return {
      ...dolls,
    };
  },
}, {});
