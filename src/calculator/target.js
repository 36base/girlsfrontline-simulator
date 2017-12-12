import {updateTarget} from '../redux/simulator';

export function initNormalTarget(simulator, dollIndex, customGunType) {
  const doll = simulator.getDoll(dollIndex);
  const {dolls} = simulator;
  const {targetIndex, dollData, company} = doll;
  const currentTarget = simulator.getDoll(targetIndex);
  const gunType = customGunType || dollData.gunType;

  const range = getRange(simulator, dollIndex);

  // 타겟이 살아있고, 사거리 안에 있을때는 따로 타겟을 구하지 않는다.
  if (currentTarget && currentTarget.hp > 0 &&
    doll.getDistance(currentTarget.posX, currentTarget.posY) <= range
  ) {
    return;
  }

  let target = 0;

  // 철혈 인형일 경우 타겟팅 범위는 사거리 - 1이 됨.
  const targetRange = company === 'SANGVIS FERRI'
    ? range - 1
    : range;

  const enemies = Object.keys(dolls)
    .filter((key) => dolls[key].team !== doll.team)
    .filter((key) => dolls[key].hp > 0)
    // 사거리 안의 적을 필터링
    .filter((key) => doll.getDistance(dolls[key].posX, dolls[key].posY) <= targetRange)
    // 거리 순서로 오름차순 정렬
    .sort((a, b) => doll.getDistance(dolls[a].posX, dolls[a].posY) - doll.getDistance(dolls[b].posX, dolls[b].posY));

  if (enemies.length > 0) {
    // 철혈 소속이거나 AR일 때 가장 가까운 적
    if (company === 'SANGVIS FERRI' || gunType === 2) {
      target = enemies[0];
    // RF일 때 가장 먼 적
    } else if (gunType === 3) {
      target = enemies[enemies.length - 1];
    } else {
      // 기타 다른 인형일 경우 랜덤 타겟
      target = enemies[Math.floor(Math.random() * enemies.length)];
    }
  }

  if (target !== targetIndex) {
    simulator.dispatch(updateTarget(dollIndex, target));
  }
}

export function getRange(simulator, dollIndex) {
  const {dolls} = simulator;
  const {dollData, company, team} = simulator.getDoll(dollIndex);

  if (company === 'GRIFON') {
    const friendly = Object.keys(dolls)
      .filter((key) => dolls[key].team === team)
      .map((key) => dolls[key]);

    // 1열에 있으면 -(-2) + 7 = 9
    // 2열에 있으면 -(0) + 7 = 7
    const range = -dollData.posX + 7;

    // 아군이 3열에 존재하면 추가 사거리 +2
    return friendly.some((item) => item.dollData.posX > 1)
      ? range + 2
      : range;
  } else if (company === 'SANGVIS FERRI') {
    return dollData.stats.range;
  }

  return 0;
}
