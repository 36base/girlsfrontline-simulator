import {getBattleStat} from './battleStat'
import {damageLog} from './logger'

export function getAtkInterval (doll, rate, bullet) {
  const {dollData} = doll
  const realRate = rate > 108 ? 108 : rate

  if (doll['nextAtkFrame'] === 0) {
    doll['currentBullet'] = bullet
  }

  if (bullet > 0) {
    if (doll['currentBullet'] <= 0) {
      doll['currentBullet'] = bullet
      return getReloadInterval(doll, rate, bullet)
    }
    doll['currentBullet']--
  }

  // MG일 경우 초당 3발(10프레임)으로 설정
  return dollData['gunType'] === 5
    ? 10
    : Math.ceil(50 / realRate / 0.03333334)
}

function getReloadInterval (doll, rate, bullet) {
  const {dollData} = doll

  switch (dollData['gunType']) {
    // MG
    case 5:
      return (3 + (200 / rate)) * 30
    // SG
    case 6:
      return (1.5 + 0.5 * bullet) * 30
    default:
      return 0
  }
}

export function normalAttack (doll, simulator) {
  const {currentFrame, options} = simulator
  const {realMode} = options

  // 공격 주기 체크
  if (doll['nextAtkFrame'] === 0 || doll['nextAtkFrame'] <= currentFrame) {
    const {currentTarget: target, currentDummy} = doll
    const stats = getBattleStat(doll, simulator)
    const targetStats = getBattleStat(target, simulator)

    // 공격자 스탯
    const {pow, hit, crit, rate, bullet, critDmg, armorPiercing} = stats
    // 피격자 스탯
    const {dodge: enemyDodge, armor: enemyArmor} = targetStats

    const framePow = pow
    // 명중 기대값(명중률) = 명중 / (명중 + 적 회피)
    const frameHit = hit / (hit + enemyDodge)
    // 크리티컬 확률
    const frameCrit = crit / 100

    let frameDmg = 0

    if (realMode) {
      // 크리티컬 데미지 증가율 = 1 + ((50 + 추가 크증뎀) / 100)
      const frameCritDmg = Math.random() <= frameCrit ? 1 + ((50 + critDmg) / 100) : 1

      // 화력 x 크리티컬 데미지 증가율
      frameDmg = framePow * frameCritDmg
    } else {
      // 크리티컬 기대값 = 1 + ((50 + 추가 크증뎀) / 100) x 크리티컬 확률
      const frameCritMul = 1 + ((50 + critDmg) / 100) * frameCrit

      // 화력 x 크리티컬 기대값
      frameDmg = framePow * frameCritMul
    }

    // 관통 수치 = 장갑 관통 - 타겟 장갑
    const framePiercing = (armorPiercing - enemyArmor)

    frameDmg = framePiercing <= 2
      // 기본 데미지 + 관통 수치 <= (올림) 기본 데미지 / 10
      ? (frameDmg + framePiercing) <= Math.floor(frameDmg / 10)
        ? 1
        : frameDmg + framePiercing
      // 기본 데미지 + 2 <= (올림) 기본 데미지 / 10
      : (frameDmg + 2) <= Math.floor(frameDmg / 10)
        ? Math.floor(frameDmg / 10)
        : frameDmg + 2

    if (realMode) {
      // 더미별 명중 계산
      let dummyDmg = 0
      for (let i = 0; i < currentDummy; i++) {
        dummyDmg += Math.random() <= frameHit ? frameDmg : 0
      }
      frameDmg = dummyDmg
    } else {
      // 데미지 * 명중 기대값 * 더미
      frameDmg *= frameHit * currentDummy
    }

    frameDmg = Math.floor(frameDmg)

    makeDamage(currentFrame, doll, target, frameDmg)

    doll['nextAtkFrame'] = currentFrame + getAtkInterval(doll, rate, bullet)

    return frameDmg
  }
}

export function makeDamage (frame, doll, target, damage, linkProtection = true) {
  const {dollData, frameData} = doll
  const {dollData: targetData} = target

  let finalDamage = damage

  if (damage > 0) {
    if (linkProtection && finalDamage > targetData['stats']['hp']) {
      finalDamage = targetData['stats']['hp']
    }
    target['hp'] -= finalDamage
    console.log(`${frame}프레임, 캐릭터 ${dollData['codeName']}가 타겟 ${targetData['codeName']}을(를) 공격하여 ${finalDamage}데미지를 입힘 (남은 체력: ${target['hp']})`)

    // 오버딜 구현
    if (target['hp'] < 0) {
      finalDamage += target['hp']
    }
  } else {
    console.log(`${frame}프레임, 캐릭터 ${dollData['codeName']}가 타겟 ${targetData['codeName']}을(를) 공격했으나 빗나갔습니다! (남은 체력: ${target['hp']})`)
  }

  damageLog(frameData, frame, finalDamage)
}
