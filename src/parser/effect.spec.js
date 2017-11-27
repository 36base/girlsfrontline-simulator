import getEffect from './effect'
import SimulateSlot from '../../data/SimulateSlot.json'
// import SimulateEnemy from '../../data/SimulateEnemy.json'

describe('`getEffect()`', () => {
  test('returns effect', () => {
    const effect = getEffect(SimulateSlot[1]['doll'])

    expect(effect).toMatchObject({
      effectType: 2,
      effectCenter: 13,
      effectPos: [ 17, 18, 19 ],
      gridEffect: [ { type: 'rate', value: 10 }, { type: 'dodge', value: 12 } ]
    })
  })
})
