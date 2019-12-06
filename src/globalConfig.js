export const orderOptions = [
  { value: 0, label: '待支付' },
  { value: 1, label: '等待物流信息' },
  { value: 2, label: '运输到店途中' },
  { value: 3, label: '到店核验中' },
  { value: 4, label: '清洗/修复中' },
  { value: 5, label: '清洗/修复完成' },
  { value: 6, label: '寄回中' },
  { value: 7, label: '订单完成' },
  { value: 8, label: '退款中' },
  { value: 9, label: '已退款' },
  { value: -1, label: '已取消' },
  { value: -2, label: '已关闭' }
]

// 订单状态
export function statusToValue(status) {
  status = Number(status)
  const currOrderOption = orderOptions.find(ele => ele.value === status)
  return currOrderOption ? currOrderOption.label : ''
  // return {
  //   0: '待支付', 1: '等待物流信息', 2: '运输到店途中', 3: '到店核验中', 4: '清洗/修复中', 5: '清洗/修复完成',
  //   6: '寄回中', 7: '订单完成', 8: '退款中', 9: '已退款', '-1': '已取消', '-2': '已关闭'
  // }[status]
}

// 渠道来源
export function channelToValue(channel) {
  channel = channel || 1
  return { 1: '小程序', 2: '官网', 3: '线下' }[channel]
}

// 拍照
export function aspectToValue(aspect) {
  return { 0: '鞋子正面', 1: '鞋子背面', 2: '鞋子侧面', 3: '鞋子底面' }[aspect]
}
