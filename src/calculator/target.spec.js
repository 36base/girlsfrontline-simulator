import Simulator from '../index';
import SimulateSlot from '../../data/SimulateSlot.json';
import SimulateEnemy from '../../data/Drone.json';
import {getNormalTarget} from './target';

describe('`getBattleData()`', () => {
  test('returns targetData', () => {
    const simulate = new Simulator();

    simulate.init(SimulateSlot, SimulateEnemy);

    const target = getNormalTarget(simulate.dolls[0], simulate);

    expect(target).toMatchObject({
      company: 'SANGVIS FERRI',
      team: 'enemy',
      hp: 30000,
      posX: 7,
      posY: 4,
    });
  });
});
