import {createAction, handleActions, handleAction, combineActions} from 'redux-actions';

export const FRAME_START = 'FRAME_START';
const DOLLS_INIT = 'DOLLS_INIT';
const OPTIONS_INIT = 'OPTIONS_INIT';

const ATTACK_BASIC = 'ATTACK_BASIC';
const ATTACK_DELAY_UPDATE = 'ATTACK_DELAY_UPDATE';
const BATTLESTAT_UPDATED = 'BATTLESTAT_UPDATED';
const BULLET_RELOAD = 'BULLET_RELOAD';
const COOLDOWN_INIT = 'COOLDOWN_INIT';
const DOLL_HURT = 'DOLL_HURT';
const DOLL_MOVE_X = 'DOLL_MOVE_X';
const SKILL_ACTIVE = 'SKILL_ACTIVE';
const TARGET_CHANGED = 'TARGET_CHANGED';

const DOLL_ACTIONS = [
  ATTACK_BASIC,
  ATTACK_DELAY_UPDATE,
  BATTLESTAT_UPDATED,
  BULLET_RELOAD,
  COOLDOWN_INIT,
  DOLL_HURT,
  DOLL_MOVE_X,
  SKILL_ACTIVE,
  TARGET_CHANGED,
];

export const startFrame = createAction(FRAME_START, (frame) => frame);
export const updateTarget = createAction(TARGET_CHANGED, (index, targetIndex) => ({
  index,
  doll: {targetIndex},
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
export const reloadBullet = createAction(BULLET_RELOAD, (index, bullet) => ({
  index,
  doll: {bullet},
}));
export const basicAttack = createAction(ATTACK_BASIC, (index, {nextAtkFrame, currentBullet}) => {
  let bullet = currentBullet;
  if (bullet > 0) {
    bullet--;
  }

  return {
    index,
    doll: {
      nextAtkFrame,
      currentBullet: bullet,
    },
  };
});
export const execDamage = createAction(DOLL_HURT, (index, {hp, damage}) => ({
  index,
  doll: {
    hp: hp - damage,
  },
}));
export const updateAtkFrame = createAction(ATTACK_DELAY_UPDATE, (index, nextAtkFrame) => ({
  index,
  doll: {
    nextAtkFrame,
  },
}));
export const moveDollX = createAction(DOLL_MOVE_X, (index, posX) => ({
  index,
  doll: {
    posX,
  },
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
