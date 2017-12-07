import SimulateSlot from '../data/NTW99.json';
import SimulateEnemy from '../data/Dreamer.json';
import Simulator from './index';

describe('`new Simulator()`', () => {
  // const simulate = new Simulator()
  const simulate = new Simulator({realMode: true});
  simulate.init(SimulateSlot, SimulateEnemy);
  test('Battle test', () => {
    simulate.start();
  });
});
