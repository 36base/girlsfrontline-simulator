import SimulateSlot from '../../data/SimulateSlot.json';
import SimulateEnemy from '../../data/SimulateEnemy.json';
import getDoll from './doll';

describe('`getDoll()`', () => {
  test('returns doll', () => {
    const doll = getDoll(SimulateSlot[1], 'friendly', 1);
    const enemy = getDoll(SimulateEnemy[0], 'enemy');

    expect(doll).toMatchObject({
      dollData: {
        codeName: 'ST AR-15',
        level: 90,
        dummyLink: 5,
        gunType: 4,
        posX: -2,
        posY: 8,
      },
    });

    expect(enemy).toMatchObject({
      dollData: {
        codeName: '철혈 돌격병[말벌]',
        level: 0,
        dummyLink: 1,
        gunType: 3,
        posX: 16,
        posY: 0,
      },
    });
  });
});
