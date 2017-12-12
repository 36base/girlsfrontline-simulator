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

  const {targetIndex, team} = simulator.getDoll(dollIndex);

  if (targetIndex) {
    if (team === 'friendly') {
      normalAttack(simulator, dollIndex);
    }
    // normalAttack(doll, simulator);
  }

  // simulator.once('frameEnd', () => {
  //   // 프레임 종료 시 유효 타겟이 없으면 제대(유닛) 이동
  //   if (!getNormalTarget(doll, simulator)) {
  //     const {speed} = getBattleStat(doll, simulator);
  //     let moveSpeed = speed;
  //
  //     if (doll.company === 'GRIFON') {
  //       moveSpeed = simulator.dolls
  //         .filter((target) => target.team === doll.team)
  //         .map((target) => getBattleStat(target, simulator).speed);
  //
  //       moveSpeed = Math.min(...moveSpeed);
  //     }
  //
  //     moveSpeed = moveSpeed / 5 / 30;
  //
  //     if (doll.team === 'friendly') {
  //       doll.posX += moveSpeed;
  //     } else {
  //       doll.posX -= moveSpeed;
  //     }
  //   }
  // });
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
