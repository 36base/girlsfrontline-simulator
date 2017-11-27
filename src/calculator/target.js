
export function getNormalTarget (doll, simulator, customGunType) {
  const {dolls} = simulator
  const {currentTarget, dollData, company} = doll
  const gunType = customGunType || dollData['gunType']

  let range = getRange(doll, simulator)

  // 타겟이 살아있고, 사거리 안에 있을때는 따로 타겟을 구하지 않는다.
  if (currentTarget && currentTarget['hp'] > 0 &&
    doll.getDistance(currentTarget['posX'], currentTarget['posY']) <= range
  ) {
    return currentTarget
  }

  // 철혈 인형일 경우 타겟팅 범위는 사거리 - 1이 됨.
  const targetRange = company === 'SANGVIS FERRI'
    ? range - 1
    : range

  const enemies = dolls
    .filter((enemy) => enemy['team'] !== doll['team'])
    .filter((enemy) => enemy['hp'] > 0)
    // 사거리 안의 적을 필터링
    .filter((enemy) => {
      // if (company === 'SANGVIS FERRI') {
      //   console.log(doll.getDistance(enemy['posX'], enemy['posY']))
      // }
      return doll.getDistance(enemy['posX'], enemy['posY']) <= targetRange
    })
    // 거리 순서로 오름차순 정렬
    .sort((a, b) => {
      return doll.getDistance(a['posX'], a['posY']) - doll.getDistance(b['posX'], b['posY'])
    })

  // 철혈 소속이거나 AR일 때 가장 가까운 적 반환
  if (company === 'SANGVIS FERRI' || gunType === 2) {
    return enemies[0]
  // RF일 때 가장 먼 적 반환
  } else if (gunType === 3) {
    return enemies[enemies.length - 1]
  }

  // 기타 다른 인형일 경우 랜덤 타겟 반환
  return enemies[ Math.floor(Math.random() * enemies.length) ]
}

export function getRange (doll, simulator) {
  const {dolls} = simulator
  const {dollData, company} = doll

  if (company === 'GRIFON') {
    const friendly = dolls.filter((item) => item['team'] === doll['team'])

    // 1열에 있으면 -(-2) + 7 = 9
    // 2열에 있으면 -(0) + 7 = 7
    const range = -dollData['posX'] + 7

    // 아군이 3열에 존재하면 추가 사거리 +2
    return friendly.some((item) => item['dollData']['posX'] > 1)
      ? range + 2
      : range
  } else if (company === 'SANGVIS FERRI') {
    return dollData['stats']['range']
  }
}
