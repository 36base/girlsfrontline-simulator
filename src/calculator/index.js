import {getNormalTarget} from './target';
import {normalAttack} from './attack';
import {registerEquips} from './equips';
import {registerEffect} from './effect';
import {registerSkill} from './skill';
import {getBattleStat} from './battleStat';

export function calculate(doll, simulator) {
  doll.currentTarget = getNormalTarget(doll, simulator);

  if (doll.currentTarget) {
    // if (doll['team'] === 'friendly') {
    //   normalAttack(doll, simulator)
    // }
    normalAttack(doll, simulator);
  }

  // 그래프에서는 1 ~ 900프레임까지 900개의 데이터를 요구하기 때문에
  // 0 데미지를 준 것으로 기록해서 데이터를 갱신하기 위함임
  simulator.emit('onDamage', doll, 0, simulator.currentFrame, 0);

  simulator.once('frameEnd', () => {
    // 프레임 종료 시 유효 타겟이 없으면 제대(유닛) 이동
    if (!getNormalTarget(doll, simulator)) {
      const {speed} = getBattleStat(doll, simulator);
      let moveSpeed = speed;

      if (doll.company === 'GRIFON') {
        moveSpeed = simulator.dolls
          .filter((target) => target.team === doll.team)
          .map((target) => getBattleStat(target, simulator).speed);

        moveSpeed = Math.min(...moveSpeed);
      }

      moveSpeed = moveSpeed / 5 / 30;

      if (doll.team === 'friendly') {
        doll.posX += moveSpeed;
      } else {
        doll.posX -= moveSpeed;
      }
    }
  });
}

export function registerEvents(doll, simulator) {
  registerEquips(doll, simulator);
  registerEffect(doll, simulator);
  registerSkill(doll, simulator);
}
