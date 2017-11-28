import {getAtkInterval, makeDamage} from './attack'
import {getBattleStat} from './battleStat'

export function activeSniping (doll, target, simulator, delay) {
  const {frameEvent, dollData} = doll
  const {skill: skillData} = dollData

  // 조준 시간동안 공격 억제
  doll['nextAtkFrame'] = 9999999

  const frameDelay = Math.round(delay * 30)
  frameEvent.push({
    frame: simulator['currentFrame'] + frameDelay,
    callback: () => {
      const stats = getBattleStat(doll, simulator)
      const {pow, rate} = stats
      const {dataPool} = skillData

      const skillDmg = Math.floor((pow * (dataPool[0] / 100)) * doll['currentDummy'])

      doll['nextAtkFrame'] = simulator['currentFrame'] + getAtkInterval(doll, rate)

      makeDamage(simulator, doll, target, skillDmg)
    }
  })
}
