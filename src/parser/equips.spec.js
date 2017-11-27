import getEquips from './equips'
import SimulateSlot from '../../data/SimulateSlot.json'
// import SimulateEnemy from '../../data/SimulateEnemy.json'

describe('`getEffect()`', () => {
  test('returns equips', () => {
    const equips = getEquips(SimulateSlot[1]['setting'])

    expect(equips[2]).toMatchObject({
      name: '.300BLK고속탄',
      reinforce: 10,
      stats: {
        armor: 0,
        dodge: 0,
        hit: -1,
        hp: 0,
        pow: 16,
        range: 0,
        rate: 0,
        shield: 0,
        speed: 0,
        crit: 0,
        critDmg: 0,
        armorPiercing: 0,
        nightView: 0,
        coolDown: 0,
        bullet: 0
      }
    })
  })
})
