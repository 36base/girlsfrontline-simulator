import SimulateSlot from '../../data/SimulateSlot.json';
// import SimulateEnemy from '../../data/SimulateEnemy.json'
import getSkill from './skill';

describe('`getSkill()`', () => {
  test('returns skill', () => {
    const skill = getSkill(SimulateSlot[1].doll.skill[0]);

    expect(skill).toMatchObject({
      activeTime: 120,
      startCoolDown: 120,
      coolDown: 600,
      duration: 270,
      actionId: 400,
      dataPool: [125],
      nightDataPool: [0],
      buffTarget: undefined,
      buffSelf: [{type: 104, target: 1}],
    });
  });
});
