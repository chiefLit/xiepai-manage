// 订单状态
export function statusToValue(status) {
  return {
    0: '待支付', 1: '等待物流信息', 2: '运输到店途中', 3: '到店核验中', 4: '清洗/修复中', 5: '清洗/修复完成',
    6: '寄回中', 7: '订单完成', 8: '退款中', 9: '已退款', '-1': '已取消', '-2': '已关闭'
  }[status]
}

// 渠道来源
export function channelToValue(channel) {
  channel = channel || 1
  return { 1: '小程序', 2: '官网', 3: '线下' }[channel]
}

// 拍照
export function aspectToValue(aspect) {
  return { 0: '鞋子正面', 1: '鞋子背面', 2: '鞋子侧面', 3: '鞋子低面' }[aspect]
}
