/* eslint-disable complexity */
export default function getStat($ = {}, data = {}) {
  return {
    armor: Number($.armo || $.armor) || 0,
    dodge: Number($.avd || $.dodge) || 0,
    hit: Number($.hit) || 0,
    hp: Number($.hp || $.maxlife) || 0,
    pow: Number($.pow) || 0,
    // 철혈 인형만 가지고 있기 때문에 undefined인지 체크
    range: Number($.range) || 0,
    rate: Number($.asd || $.rate) || 0,
    // 철혈 인형만 가지고 있기 때문에 undefined인지 체크
    shield: Number($.shield) || 0,
    speed: Number($.mvs || $.speed) || 0,
    crit: Number(data.crit || $.critical_percent) || 0,
    critDmg: Number(data.critical_harm_rate) || 0,
    armorPiercing: Number(data.armor_piercing || $.armor_piercing) || 0,
    nightView: Number($.night_view_percent) || 0,
    coolDown: 0,
    bullet: Number(data.special) || Number($.bullet_number_up) || 0,
  };
}

export function getStatfromNumber(statNum) {
  switch (statNum) {
    case 1: return 'pow';
    case 2: return 'rate';
    case 3: return 'hit';
    case 4: return 'dodge';
    case 5: return 'crit';
    case 6: return 'coolDown';
    case 7: return 'bullet';
    case 8: return 'armor';
    case 9: return 'nightView';
    default: return undefined;
  }
}
