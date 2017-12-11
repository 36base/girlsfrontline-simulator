import {createAction, handleActions, handleAction} from 'redux-actions';

const UPDATE_FRAME = 'simulator.frame';
const UPDATE_OPTIONS = 'simulator.options';
const UPDATE_DOLLS = 'simulator.dolls';
const UPDATE_DOLL = 'simulator.dolls[key]';

export const updateFrame = createAction(UPDATE_FRAME, (frame) => frame);
export const updateDoll = createAction(UPDATE_DOLL, (key, doll) => ({
  key,
  doll,
}));

export const updateDolls = createAction(UPDATE_DOLLS, (dolls) => dolls);
export const updateOptions = createAction(UPDATE_OPTIONS, (options) => options);

export const simulatorReducer = handleActions({
  [UPDATE_FRAME](state, {payload: frame}) {
    return {
      ...state,
      frame,
    };
  },
  [UPDATE_DOLL](state, {payload: {key, doll}}) {
    const {dolls} = state;

    dolls[key] = {
      ...dolls[key],
      ...doll,
    };

    return {
      ...state,
      dolls,
    };
  },
  [UPDATE_DOLLS](state, {payload: dolls}) {
    return {
      ...state,
      dolls,
    };
  },
}, {
  frame: 0,
  dolls: {},
});

export const optionReducer = handleAction([UPDATE_OPTIONS], (state, {payload: options}) => {
  const currentOptions = {...state};

  if (typeof options === 'object') {
    Object.keys(options).forEach((key) => {
      currentOptions[key] = options[key];
    });
  }

  return {
    ...currentOptions,
  };
}, {
  night: false,
  realMode: false,
});
