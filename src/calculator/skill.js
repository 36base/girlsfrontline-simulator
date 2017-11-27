import {activeSniping} from './skills'
import {getNormalTarget} from './target'
import {getBattleStat} from './battleStat'

export function registerSkill (doll, simulator) {
  const {dollData} = doll
  const {skill: skillData} = dollData

  if (skillData) {
    const {activeTime, startCoolDown, coolDown, duration, nightDataPool, dataPool, buffTarget, buffSelf} = skillData

    let nextActiveFrame = activeTime
    let activeFrame = 0

    // frameEvent에 등록된 액티브 스킬 처리
    simulator.on('frameStart', () => {
      if (doll['hp'] > 0) {
        const {frameEvent} = doll
        if (frameEvent.length > 0) {
          frameEvent.forEach((event) => {
            const {frame: eventFrame, callback} = event

            if (eventFrame === simulator['currentFrame']) {
              callback()
            }
          })
        }
      }
    })

    simulator.on('frameStart', () => {
      if (nextActiveFrame && nextActiveFrame <= simulator['currentFrame']) {
        // 타겟이 없으면 스킬을 발동하지 않음
        if (doll['currentTarget']) {
          const {coolDown: coolDownMul} = getBattleStat(doll, simulator)

          nextActiveFrame = simulator['currentFrame'] + (coolDown * coolDownMul)
          activeFrame = simulator['currentFrame'] + (duration || 0)

          // 패시브 처리
          if (startCoolDown <= 0) {
            nextActiveFrame = 999999
            activeFrame = 999999
          }

          const durTime = (duration / 30).toFixed(1) || 0
          const coolTime = (coolDown / 30).toFixed(1)
          console.log(`${simulator['currentFrame']}프레임, ${dollData['codeName']} 스킬 발동! 지속시간 ${durTime}초, 쿨타임 ${coolTime}초`)

          activeSkill(doll, simulator, skillData['actionId'])
        }
      }
    })

    simulator.on('statCalculate', (target, addStats) => {
      if (simulator['currentFrame'] < activeFrame) {
        let buffData = []

        if (simulator['options']['night']) {
          buffData = nightDataPool || dataPool
        } else {
          buffData = dataPool
        }

        let buffIndex = 0

        if (buffTarget) {
          buffTarget.forEach((buff) => {
            // buffData.type이 200을 넘으면 적에게 적용됨.
            const buffTeam = buff['type'] < 200
            const buffType = getBuffType(buff['type'])
            const buffValue = (buffData[buffIndex] / 100)

            if ((buffTeam && target['team'] === doll['team']) || (!buffTeam && target['team'] !== doll['team'])) {
              addStats['skillMul'][buffType] *= buffValue
            }
            buffIndex++
          })
        }
        if (target === doll && buffSelf) {
          buffSelf.forEach((buff) => {
            const buffType = getBuffType(buff['type'])
            const buffValue = (buffData[buffIndex] / 100)

            addStats['skillMul'][buffType] *= buffValue

            buffIndex++
          })
        }
      }
    })
  }
}

function activeSkill (doll, simulator, activeId) {
  switch (activeId) {
    // NTW-20 & M99
    case 202:
    case 203:
      // 가장 먼 적을 타겟으로(RF 타겟팅 적용)
      const target = getNormalTarget(doll, simulator, 3)
      // doll, simulator, filter, delay
      activeSniping(doll, target, simulator, 2.0)
      break
    case 204:
    case 214:
      break
    // 필요없음(더미)
    case 113:
    default:
      break
  }
}

function getBuffType (type) {
  const typeNum = Number(type)
  switch (typeNum) {
    case 101:
    case 201:
      return 'pow'
    case 104:
    case 109:
    case 216:
      return 'rate'
    case 103:
    case 203:
      return 'hit'
    case 106:
      return 'crit'
    case 110:
    case 202:
      return 'dodge'
    default:
      console.log(`UNKNOWN SKILL ${typeNum}`)
      return 0
  }
}
