import Simulator from '../index';
import SimulateSlot from '../../data/SimulateSlot.json';
import SimulateEnemy from '../../data/SimulateEnemy.json';
import {getBattleStat} from './battleStat';

describe('`getBattleStat()`', () => {
  test('returns battleStat', () => {
    const simulate = new Simulator();

    simulate.init(SimulateSlot, SimulateEnemy);

    const battleStat = getBattleStat(simulate.dolls[0], simulate);

    expect(battleStat).toMatchObject({
      armor: 0,
      dodge: 50,
      hit: 59,
      hp: 105,
      pow: 74.2,
      range: 0,
      rate: 94.9,
      shield: 0,
      speed: 10,
      crit: 74,
      critDmg: 0,
      armorPiercing: 10,
      nightView: 0,
      coolDown: 100,
      bullet: 0,
    });
  });
});
