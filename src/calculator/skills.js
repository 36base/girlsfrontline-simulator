/* eslint-disable import/prefer-default-export */
import {updateAtkFrame} from '../redux/simulator';
import {getAtkInterval, makeDamage} from './attack';

export function activeSniping(simulator, dollIndex, {delay}) {
  const {frameEvent, dollData: {skill: {dataPool}}} = simulator.getDoll(dollIndex);

  // 조준 시간동안 공격 억제
  simulator.dispatch(updateAtkFrame(dollIndex, 999999));

  const frameDelay = Math.round(delay * 30);
  frameEvent.push({
    frame: simulator.currentFrame + frameDelay,
    callback() {
      const {battleStats: {pow, rate}, currentDummy, targetIndex} = simulator.getDoll(dollIndex);

      const skillDmg = Math.floor((pow * (dataPool[0] / 100)) * currentDummy);

      const atkFrame = simulator.currentFrame + getAtkInterval(simulator, dollIndex, {rate});
      simulator.dispatch(updateAtkFrame(dollIndex, atkFrame));

      makeDamage(simulator, {attacker: dollIndex, victim: targetIndex, damage: skillDmg});
    },
  });
}
