<template>
  <div class="order-wash-detail">
    <el-card header="基本信息">
      <el-form label-position="right" label-width="150px" :show-message="false">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="订单编号">{{data.number}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单日期">{{data.applyTime|parseTime}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道">{{channelToValue(data.channel)}}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="用户姓名">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单自动关闭时间">{{}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="用户姓名">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单自动关闭时间">{{}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="用户姓名">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单自动关闭时间">{{}}</el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="收货人姓名">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态">{{}}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="详细地址">{{}}</el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>
  </div>
</template>
<script>

const statusToValue = status => {
  return {    0: '待支付', 1: '等待物流信息', 2: '运输到店途中', 3: '到店核验中', 4: '清洗/修复中', 5: '清洗/修复完成',
    6: '寄回中', 7: '订单完成', 8: '退款中', 9: '已退款', '-1': '已取消', '-2': '已关闭'  }[status]
}

const channelToValue = channel => {
  channel = channel || 1
  return {1: '小程序',2: '官网',3: '线下'}[channel]
}
import * as orderApi from '@/api/order'
export default {
  data() {
    return {
      statusToValue,
      channelToValue,
      data: {}
    }
  },
  beforeMount() {
    this.pullData()
  },
  methods: {
    async pullData() {
      const data = await orderApi.getOrderDetail({id: this.$route.params.id});
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.data = data.object
        console.log(this.data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.order-wash-detail {
  padding: 20px;
  /deep/ .el-form-item__label {
    background: #eee;
  }
}
</style>