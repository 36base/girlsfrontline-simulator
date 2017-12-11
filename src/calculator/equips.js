export function registerEquips(simulator, dollIndex) {
  simulator.on('statCalculate', (target, addStats) => {
    const doll = simulator.getDoll(dollIndex);
    const {dollData: {equips}} = doll;

    if (target === doll) {
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
