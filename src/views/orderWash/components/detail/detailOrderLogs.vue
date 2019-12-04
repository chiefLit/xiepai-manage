<template name="component-name">
  <el-card class="module-card" header="订单日志" shadow="never">
    <el-table :data="data" style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作内容" />
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          {{statusToValue(scope.row.status)}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="说明" />
      <!-- <el-table-column prop="user" label="操作人" /> -->
      <!-- <el-table-column prop="operate" label="说明" />
      <el-table-column prop="address" label="操作日期" />
      <el-table-column label="操作端口">
        <template slot-scope="scope">{{channelToValue(scope.row.channel)}}</template>
      </el-table-column>
      <el-table-column prop="user" label="操作人" /> -->
    </el-table>
  </el-card>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
export default {
  props: {
    // orderId	int	订单ID
    // operate	int	操作内容
    // status	int	操作后状态，参见订单状态表
    // remark	int	该次操作的说明
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      statusToValue,
      channelToValue
    }
  },
}
</script>