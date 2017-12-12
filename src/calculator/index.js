import {moveDollX} from '../redux/simulator';
import {initNormalTarget} from './target';
import {normalAttack} from './attack';
import {registerEquips} from './equips';
import {registerEffect} from './effect';
import {registerSkill} from './skill';
import {initBattleStat} from './battleStat';

export function calculate(simulator, dollIndex) {
  // TODO: 타겟팅 스킬 사용 후 타겟 변경 대응
  initBattleStat(simulator, dollIndex);

  initNormalTarget(simulator, dollIndex);

  const {
    targetIndex,
    team,
  } = simulator.getDoll(dollIndex);

  if (targetIndex) {
    if (team === 'friendly') {
      normalAttack(simulator, dollIndex);
    }
  } else {
    // 유효 타겟이 없으면 제대(유닛) 이동
    simulator.once('frameEnd', () => {
      const {
        company,
        posX,
        battleStats: {speed},
      } = simulator.getDoll(dollIndex);

      let moveSpeed = speed;

      if (company === 'GRIFON') {
        moveSpeed = Object.keys(simulator.dolls)
          .map((key) => simulator.dolls[key])
          .filter((target) => target.team === team)
          .map((target) => target.battleStats.speed);

        moveSpeed = Math.min(...moveSpeed);
      }

      moveSpeed = moveSpeed / 5 / 30;

      if (moveSpeed > 0) {
        if (team === 'friendly') {
          simulator.dispatch(moveDollX(dollIndex, posX + moveSpeed));
        } else {
          simulator.dispatch(moveDollX(dollIndex, posX - moveSpeed));
        }
      }
    });
  }
}

export function registerEvents(simulator, dollIndex) {
  const {dollData: {effect, equips, skill}} = simulator.getDoll(dollIndex);

  if (effect) {
    registerEffect(simulator, dollIndex);
  }

  if (equips) {
    registerEquips(simulator, dollIndex);
  }

  if (skill) {
    registerSkill(simulator, dollIndex);
  }
}
