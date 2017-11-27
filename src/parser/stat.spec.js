import getStat from './stat'
import SimulateSlot from '../../data/SimulateSlot.json'
// import SimulateEnemy from '../../data/SimulateEnemy.json'

describe('`getStat()`', () => {
  test('returns stat', () => {
    const stat = getStat(SimulateSlot[1]['doll']['status'])
    const emptyStat = getStat()

    expect(stat).toMatchObject(
      { armor: 0,
        dodge: 50,
        hit: 50,
        hp: 105,
        pow: 48,
        range: 0,
        rate: 77,
        shield: 0,
        speed: 10,
        crit: 0,
        critDmg: 0,
        armorPiercing: 0,
        nightView: 0,
        coolDown: 0,
        bullet: 0 }
    )
    expect(emptyStat).toMatchObject(
      { armor: 0,
        dodge: 0,
        hit: 0,
        hp: 0,
        pow: 0,
        range: 0,
        rate: 0,
        shield: 0,
        speed: 0,
        crit: 0,
        critDmg: 0,
        armorPiercing: 0,
        nightView: 0,
        coolDown: 0,
        bullet: 0 }
    )
  })
})
