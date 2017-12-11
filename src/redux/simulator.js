import {createAction, handleActions, handleAction, combineActions} from 'redux-actions';

const FRAME_START = 'FRAME_START';
const OPTIONS_INIT = 'OPTIONS_INIT';
const DOLLS_INIT = 'DOLLS_INIT';
const TARGET_CHANGED = 'TARGET_CHANGED';
const BATTLESTAT_UPDATED = 'BATTLESTAT_UPDATED';
const COOLDOWN_INIT = 'COOLDOWN_INIT';
const SKILL_ACTIVE = 'SKILL_ACTIVE';

const DOLL_ACTIONS = [
  TARGET_CHANGED,
  BATTLESTAT_UPDATED,
  COOLDOWN_INIT,
  SKILL_ACTIVE,
];

export const startFrame = createAction(FRAME_START, (frame) => frame);
export const updateTarget = createAction(TARGET_CHANGED, (index, targetIndex) => ({
  index,
  doll: {...targetIndex},
}));
export const updateBattleStat = createAction(BATTLESTAT_UPDATED, (index, battleStats) => ({
  index,
  doll: {battleStats: {...battleStats}},
}));
export const initCoolDown = createAction(COOLDOWN_INIT, (index, nextActiveFrame) => ({
  index,
  doll: {nextActiveFrame},
}));
export const updateSkill = createAction(SKILL_ACTIVE, (index, {nextActiveFrame, activeFrame}) => ({
  index,
  doll: {nextActiveFrame, activeFrame},
}));

export const initDolls = createAction(DOLLS_INIT, (dolls) => dolls);
export const initOptions = createAction(OPTIONS_INIT, (options) => options);

export const simulatorReducer = handleActions({
  [FRAME_START](state, {payload: frame}) {
    return {
      ...state,
      frame,
    };
  },
  [combineActions(...DOLL_ACTIONS)](state, {payload: {index, doll}}) {
    const {dolls} = {...state};

    dolls[index] = {
      ...dolls[index],
      ...doll,
    };

    return {
      ...state,
      dolls: {
        ...dolls,
      },
    };
  },
  [DOLLS_INIT](state, {payload: dolls}) {
    return {
      ...state,
      dolls,
    };
  },
}, {
  frame: 0,
  dolls: {},
});

export const optionReducer = handleAction([OPTIONS_INIT], (state, {payload: options}) => {
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
