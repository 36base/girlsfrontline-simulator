export default function getBattleData(dollData, team) {
  const company = dollData.effect ? 'GRIFON' : 'SANGVIS FERRI';
  return {
    company,
    team,
    hp: dollData.dummyLink * dollData.stats.hp,
    posX: getBattlePosX(dollData.posX, company, team),
    posY: dollData.posY,
    // 현재 남은 더미를 반환
    get currentDummy() {
      return Math.ceil(this.hp / dollData.stats.hp);
    },
    targetIndex: 0,
    nextAtkFrame: 0,
    nextActiveFrame: 0,
    activeFrame: 0,
    // 남은 탄환
    currentBullet: 0,
    battleStats: {},
    // 특정 프레임에 호출되는 함수가 저장됩니다.
    // Ex) 3초 후 저격 등
    frameEvent: [],
    getDistance(posX, posY = 0) {
      return this.company === 'GRIFON'
        // 그리폰 인형일 경우 x좌표로 계산
        ? Math.abs(this.posX - posX)
        // 철혈 인형일 경우 반지름으로 계산
        : Math.sqrt(((this.posX - posX) ** 2) + ((this.posY - posY) ** 2));
    },
  };
}

function getBattlePosX(posX, company, team) {
  if (team === 'friendly' && company === 'SANGVIS FERRI') {
    return -posX;
  } else if (team === 'enemy' && company === 'GRIFON') {
    return -posX + 20;
  }

  return posX;
}
