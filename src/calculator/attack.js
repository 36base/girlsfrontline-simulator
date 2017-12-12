import {reloadBullet, basicAttack, execDamage} from '../redux/simulator';

export function getAtkInterval(simulator, dollIndex, {rate, bullet}) {
  const {dollData: {gunType}, currentBullet} = simulator.getDoll(dollIndex);
  const realRate = rate > 108 ? 108 : rate;

  if (bullet > 0) {
    if (currentBullet <= 0) {
      simulator.dispatch(reloadBullet(bullet));
      return getReloadInterval(gunType, rate, bullet);
    }
  }

  // MG일 경우 초당 약 3발(10 frame)으로 설정
  return gunType === 5
    ? 10
    : Math.ceil(50 / realRate / 0.03333334);
}

function getReloadInterval(gunType, rate, bullet) {
  switch (gunType) {
    // MG
    case 5:
      return (3 + (200 / rate)) * 30;
    // SG
    case 6:
      return (1.5 + (0.5 * bullet)) * 30;
    default:
      return 0;
  }
}

export function normalAttack(simulator, dollIndex) {
  const {nextAtkFrame, targetIndex, currentDummy, currentBullet, battleStats: stats} = simulator.getDoll(dollIndex);
  const {battleStats: targetStats} = simulator.getDoll(targetIndex);
  const {currentFrame, options} = simulator;
  const {realMode} = options;

  // 공격 주기 체크
  if (nextAtkFrame === 0 || nextAtkFrame <= currentFrame) {
    // 공격자 스탯
    const {pow, hit, crit, rate, bullet, critDmg, armorPiercing} = stats;
    // 피격자 스탯
    const {dodge: enemyDodge, armor: enemyArmor} = targetStats;

    const framePow = pow;
    // 명중 기대값(명중률) = 명중 / (명중 + 적 회피)
    const frameHit = hit / (hit + enemyDodge);
    // 크리티컬 확률
    const frameCrit = crit / 100;

    let frameDmg = 0;

    if (realMode) {
      // 크리티컬 데미지 증가율 = 1 + ((50 + 추가 크증뎀) / 100)
      const frameCritDmg = Math.random() <= frameCrit ? 1 + ((50 + critDmg) / 100) : 1;

      // 화력 x 크리티컬 데미지 증가율
      frameDmg = framePow * frameCritDmg;
    } else {
      // 크리티컬 기대값 = 1 + ((50 + 추가 크증뎀) / 100) x 크리티컬 확률
      const frameCritMul = 1 + (((50 + critDmg) / 100) * frameCrit);

      // 화력 x 크리티컬 기대값
      frameDmg = framePow * frameCritMul;
    }

    // 관통 수치 = 장갑 관통 - 타겟 장갑
    const framePiercing = armorPiercing - enemyArmor;

    if (framePiercing <= 2) {
      if ((frameDmg + framePiercing) <= Math.floor(frameDmg / 10)) {
        frameDmg = 1;
      } else {
        frameDmg += framePiercing;
      }
    } else if ((frameDmg + 2) <= Math.floor(frameDmg / 10)) {
      frameDmg = Math.floor(frameDmg / 10);
    } else {
      frameDmg += 2;
    }

    if (realMode) {
      // 더미별 명중 계산
      let dummyDmg = 0;
      for (let i = 0; i < currentDummy; i++) {
        dummyDmg += Math.random() <= frameHit ? frameDmg : 0;
      }

      frameDmg = dummyDmg;
    } else {
      // 데미지 * 명중 기대값 * 더미
      frameDmg = frameDmg * frameHit * currentDummy;
    }

    frameDmg = Math.floor(frameDmg);

    const atkInterval = currentFrame + getAtkInterval(simulator, dollIndex, {rate, bullet});
    simulator.dispatch(basicAttack(dollIndex, {nextAtkFrame: atkInterval, currentBullet}));

    makeDamage(simulator, {
      attacker: dollIndex,
      victim: targetIndex,
      damage: frameDmg,
    });
  }
}

export function makeDamage(simulator, {attacker, victim, damage, linkProtection = true}) {
  const {currentFrame: frame} = simulator;
  const {dollData: {codeName: attackerName}} = simulator.getDoll(attacker);
  const {dollData: {codeName: targetName, stats: {targetBaseHP}}, hp: targetHP} = simulator.getDoll(victim);

  let finalDamage = damage;

  if (finalDamage > targetHP) {
    finalDamage = targetHP;
  }

  if (linkProtection && finalDamage > targetBaseHP) {
    finalDamage = targetBaseHP;
  }

  simulator.emit('onDamage', attacker, victim, finalDamage);
  simulator.dispatch(execDamage(victim, {hp: targetHP, damage: finalDamage}));

  console.log(`${frame}프레임, 캐릭터 ${attackerName}가 타겟 ${targetName}을(를) 공격하여 ${finalDamage}데미지를 입힘 (남은 체력: ${targetHP - finalDamage})`);
}
