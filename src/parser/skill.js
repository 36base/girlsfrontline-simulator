export default function getSkill($, activeTime) {
  return {
    activeTime: Number((activeTime * 30) || $.start_cd_time),
    startCoolDown: Number($.start_cd_time),
    coolDown: Number($.cd_time),
    duration: Number($.data_pool_1),
    actionId: Number($.action_id),
    dataPool: $.data_pool_2.split(',').map((item) => Number(item)),
    nightDataPool: $.night_data_pool_2.split(',').map((item) => Number(item)),
    buffTarget: $.buff_id_target === '0'
      ? undefined
      : $.buff_id_target.split(',').map((item) => {
        const data = item.split(':');

        return {
          type: Number(data[0]),
          target: Number(data[1]),
        };
      }),
    buffSelf: $.buff_id_self === '0'
      ? undefined
      : $.buff_id_self.split(',').map((item) => {
        const data = item.split(':');

        return {
          type: Number(data[0]),
          target: Number(data[1]),
        };
      }),
  };
}
