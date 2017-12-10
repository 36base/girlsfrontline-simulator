import {createAction, handleActions, handleAction} from 'redux-actions';

const UPDATE_FRAME = 'simulator.frame/UPDATE';
const UPDATE_OPTIONS = 'simulator.options/UPDATE';
const UPDATE_DOLLS = 'simulator.dolls/UPDATE';

export const updateFrame = createAction(UPDATE_FRAME, (frame) => frame);
export const updateOptions = createAction(UPDATE_OPTIONS, (options) => options);
export const updateDolls = createAction(UPDATE_DOLLS, (dolls) => dolls);

export const simulatorReducer = handleActions({
  [UPDATE_FRAME](state, {payload: frame}) {
    return {
      ...state,
      frame,
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
  dolls: [],
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
