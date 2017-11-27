import getStat from './stat'

export default function getEquips ($) {
  const {eqs} = $

  return eqs.map((item) => {
    const {data: equip, reinforce} = item
    const statData = {}

    if (equip) {
      // 장비 데이터는 스탯 데이터가 "최소, 최대"로 되어있기 때문에
      // 항상 최대로 적용하기 위한 작업
      Object.keys(equip).forEach((keys) => {
        const splitData = equip[keys].split(',')

        statData[keys] = splitData[splitData.length - 1]
      })

      return {
        name: equip['name'].replace('\r\n', ''),
        reinforce: reinforce,
        stats: {...getStat(statData)}
      }
    }
    return undefined
  }).filter((item) => item !== undefined)
}
