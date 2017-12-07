import {getStatfromNumber} from './stat';

export default function getEffect($) {
  return {
    effectType: Number($.effect_guntype),
    effectCenter: Number($.effect_grid_center),
    effectPos: $.effect_grid_pos.split(',').map((item) => Number(item)),
    gridEffect: $.effect_grid_effect.split(';').map((item) => {
      const effect = item.split(',');

      return {
        type: getStatfromNumber(Number(effect[0])),
        value: Number(effect[1]),
      };
    }),
  };
}
