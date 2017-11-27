import getBattleData from './battleData'

describe('`getBattleData()`', () => {
  test('returns battleData', () => {
    const battleData = getBattleData({
      dummyLink: 5,
      stats: {hp: 100}
    }, 'friendly')

    expect(battleData).toMatchObject({
      company: 'SANGVIS FERRI',
      team: 'friendly',
      hp: 500
    })
  })
})
