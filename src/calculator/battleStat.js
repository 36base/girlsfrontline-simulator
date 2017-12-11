import getStat from '../parser/stat';
import {updateDoll} from '../redux/simulator';

export function getBattleStat(simulator, dollIndex) {
  const doll = simulator.getDoll(dollIndex);
  const {dollData: {gunType, stats: baseStats}} = doll;
  const stats = {...baseStats};

  // stat파서에 인수를 넣지 않으면 기본값(0)으로 반환됨
  const addStats = {
    add: getStat(),
    effectMul: getStat(),
    skillMul: getStat(),
  };

  // 곱연산들은 기본값 1(배수)로 설정
  Object.keys(getStat()).forEach((key) => {
    addStats.effectMul[key] = 1;
    addStats.skillMul[key] = 1;
  });

  /**
  * 스탯을 연산 할 때 호출됩니다.
  * @event Simulator#statCalculate
  * @prop {Object} doll 스탯을 계산할 인형 오브젝트
  * @prop {Object} addStats 해당 인형의 스탯 증가량
  */
  simulator.emit('statCalculate', doll, addStats);

  Object.keys(stats).forEach((keys) => {
    if (keys === 'coolDown') {
      stats[keys] = 100;
    }

    const {add, effectMul, skillMul} = addStats;
    // (기본 스탯 + 스탯 증가량) x 진형 버프(배율) x 스킬 버프(배율)
    stats[keys] = (stats[keys] + add[keys]) * effectMul[keys] * skillMul[keys];

    // 크리티컬 초과 문제 해결
    if (keys === 'crit') {
      if (stats[keys] > 100) {
        stats[keys] = 100;
      }
    // 사속 초과 문제 해결
    } else if (keys === 'rate') {
      let maxRate = 120;
      // RF or AR
      if (gunType === 3 || gunType === 4) {
        maxRate = 108;
      // SG
      } else if (gunType === 5) {
        maxRate = 60;
      }

      if (stats[keys] > maxRate) {
        stats[keys] = maxRate;
      }
    // 쿨타임 감소 초과 문제 해결
    } else if (keys === 'coolDown') {
      stats[keys] = 200 - stats[keys];

      if (stats[keys] < 70) {
        stats[keys] = 70;
      }
    }
  });

  simulator.dispatch(updateDoll(dollIndex, {battleStats: stats}));
}

export default getBattleStat;
