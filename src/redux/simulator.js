import {createAction, handleActions, handleAction} from 'redux-actions';

const UPDATE_FRAME = 'simulator.frame';
const UPDATE_OPTIONS = 'simulator.options';

export const updateFrame = createAction(UPDATE_FRAME, (frame) => frame);
export const updateOptions = createAction(UPDATE_OPTIONS, (options) => options);

export const simulatorReducer = handleActions({
  [UPDATE_FRAME](state, {payload: frame}) {
    return {
      ...state,
      frame,
    };
  },
}, {
  frame: 0,
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
