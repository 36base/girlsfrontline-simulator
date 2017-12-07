import getStat from './stat';
import getEquips from './equips';
import getEffect from './effect';
import getSkill from './skill';
import getBattleData from './battleData';

export default function getDoll($, team, index) {
  // 아군은 doll, 철혈은 data에 데이터가 있음.
  const data = $.doll || $.data;
  const {setting} = $;

  // setting에 레벨 데이터가 있음.
  const level = setting ? Number(setting.char_level) : 0;

  // 장비 파싱
  const equips = setting ? getEquips(setting) : undefined;

  // 진형 버프 파싱
  const effect = data.effect_grid_center
    ? getEffect(data)
    : undefined;

  // 스킬 파싱
  const skill = data.skill
    ? getSkill(data.skill[setting.skill_level - 1], setting.skill_time)
    : undefined;

  const dollData = {
    codeName: data.code,
    level,
    dummyLink: Number($.dummylink) || getDummyLink(level),
    gunType: Number(data.type),
    posX: Number($.posX) || getPosX(index),
    posY: Number($.posY) || getPosY(index),
    stats: {
      ...getStat(data.status || data, data),
    },
    gridPos: getGridPos(index),
    equips,
    effect,
    skill,
  };

  const battleData = getBattleData(dollData, team);

  return {
    ...battleData,
    dollData,
  };
}

function getDummyLink(level) {
  if (level >= 90) {
    return 5;
  } else if (level >= 70) {
    return 4;
  } else if (level >= 30) {
    return 3;
  } else if (level >= 10) {
    return 2;
  }

  return 1;
}

// 현재 위치 집어넣음...
// 123
// 456
// 789
// 1,4,7은 맨 뒤 2,5,8은 중간 3,6,9는 맨 앞임.
function getGridPos(idx) {
  switch (idx) {
    case 1: return 9;
    case 2: return 14;
    case 3: return 19;
    case 4: return 8;
    case 5: return 13;
    case 6: return 18;
    case 7: return 7;
    case 8: return 12;
    case 9: return 17;
    default: return 0;
  }
}

function getPosX(idx) {
  switch (idx) {
    case 1:
    case 4:
    case 7:
      return -2;
    case 2:
    case 5:
    case 8:
      return 0;
    case 3:
    case 6:
    case 9:
      return 2;
    default:
      return 0;
  }
}

function getPosY(idx) {
  switch (idx) {
    case 1:
    case 2:
    case 3:
      return 8;
    case 4:
    case 5:
    case 6:
      return 4;
    case 7:
    case 8:
    case 9:
      return 0;
    default:
      return 0;
  }
}
