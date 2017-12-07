export function registerEquips(doll, simulator) {
  const {dollData} = doll;
  const {equips} = dollData;

  if (equips) {
    simulator.on('statCalculate', (target, addStats) => {
      if (target === doll) {
        equips.forEach((equip) => {
          const {stats} = equip;

          Object.keys(stats).forEach((keys) => {
            addStats.add[keys] += stats[keys];

            // if (stats[keys] > 0) {
            //   console.log(`from ${dollData['codeName']}, ${equip['name']}, ${keys} +${stats[keys]}`)
            // }
          });
        });
      }
    });
  }
}

export default registerEquips;
