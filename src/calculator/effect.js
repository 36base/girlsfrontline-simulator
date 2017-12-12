export function registerEffect(simulator, dollIndex) {
  simulator.on('statCalculate', (targetIndex, addStats) => {
    const {gridPos, gunType, dummyLink, effect} = simulator.getDollData(dollIndex);
    const {effectType, effectCenter, effectPos, gridEffect} = effect;
    const {gridPos: targetGridPos, gunType: targetGunType} = simulator.getDollData(targetIndex);

    const posContrast = effectCenter === 0 ? 0 : effectCenter - 13;
    const posCompensate = effectCenter - gridPos;

    // 버프 적용 칸에 들어와 있을 때
    if (effectPos.some((pos) => (pos - posCompensate + posContrast) === targetGridPos)) {
      // 버프 적용 대상인지 확인
      if (effectType === 0 || targetGunType === effectType) {
        gridEffect.forEach((elem) => {
          const {type, value} = elem;

          // 버프를 주는 인형이 HG일 시 편제에 따라 가산치를 줌
          const applyValue = gunType === 1
            ? value * (1 + ((dummyLink - 1) * 0.25))
            : value;

          if (type) {
            if (type === 'crit') {
              addStats.add[type] += applyValue;
            } else {
              addStats.effectMul[type] += applyValue / 100;
            }
          }
        });
      }
    }
  });
}

export default registerEffect;
