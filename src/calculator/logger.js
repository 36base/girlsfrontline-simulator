
export function damageLog (frameData, frame, damage) {
  // 현재 프레임에 이미 공격했는지 여부
  if (frameData[frame - 1]) {
    frameData[frame - 1] += damage
  } else {
    const lastDmg = frameData[frameData.length - 1]

    frameData.push(lastDmg ? lastDmg + damage : damage)
  }
}
