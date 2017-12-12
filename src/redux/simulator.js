import {createAction, handleActions, handleAction, combineActions} from 'redux-actions';

export const FRAME_START = 'FRAME_START';
const OPTIONS_INIT = 'OPTIONS_INIT';
const DOLLS_INIT = 'DOLLS_INIT';
const TARGET_CHANGED = 'TARGET_CHANGED';
const BATTLESTAT_UPDATED = 'BATTLESTAT_UPDATED';
const COOLDOWN_INIT = 'COOLDOWN_INIT';
const SKILL_ACTIVE = 'SKILL_ACTIVE';
const BULLET_RELOAD = 'BULLET_RELOAD';
const ATTACK_BASIC = 'ATTACK_BASIC';
const DOLL_HURT = 'DOLL_HURT';
const ATTACK_DELAY_UPDATE = 'ATTACK_DELAY_UPDATE';

const DOLL_ACTIONS = [
  TARGET_CHANGED,
  BATTLESTAT_UPDATED,
  COOLDOWN_INIT,
  SKILL_ACTIVE,
  BULLET_RELOAD,
  ATTACK_BASIC,
  DOLL_HURT,
  ATTACK_DELAY_UPDATE,
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
export const updateAtkFrame = createAction(DOLL_HURT, (index, nextAtkFrame) => ({
  index,
  doll: {
    nextAtkFrame,
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
