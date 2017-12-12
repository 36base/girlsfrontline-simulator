export function registerEquips(simulator, dollIndex) {
  simulator.on('statCalculate', (targetIndex, addStats) => {
    if (targetIndex === dollIndex) {
      const {equips} = simulator.getDollData(dollIndex);

      equips.forEach((equip) => {
        const {stats} = equip;

        Object.keys(stats).forEach((keys) => {
          addStats.add[keys] += stats[keys];
        });
      });
    }
  });
}

export default registerEquips;
