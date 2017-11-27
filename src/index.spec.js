import Simulator from './index'
import SimulateSlot from '../data/NTW99.json'
import SimulateEnemy from '../data/Dreamer.json'

describe('`new Simulator()`', () => {
  const simulate = new Simulator()
  simulate.init(SimulateSlot, SimulateEnemy)
  test('Battle test', () => {
    simulate.start()
  })
})
