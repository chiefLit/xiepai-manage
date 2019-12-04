<template name="component-name">
  <el-card class="module-card" header="鞋子清洗完成照片" shadow="never">
    <el-tabs  shadow="never">
      <el-tab-pane v-for="(item, index) in data.storeCollectSubParamList" :key="index" :label='item.goodzTitle'>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class=" name">鞋子品牌</div>
            <div class=" value">{{item.brand}}</div>
          </el-col>
          <el-col :span="6">
            <div class=" name">具体型号</div>
            <div class=" value">{{item.brand}}</div>
          </el-col>
          <el-col :span="6">
            <div class=" name">估算二手市场价</div>
            <div class=" value">{{item.amount}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class=" name">备注</div>
            <div class=" value">{{item.remark}}</div>
          </el-col>
        </el-row>
        <el-row class="image-card-container" :gutter="20">
          <template v-for="(sub, subIndex) in [item.image0Url, item.image1Url, item.image2Url, item.image3Url]">
            <el-card class="image-card" :body-style="{ padding: '0px' }" shadow="never" :key="subIndex">
              <el-image :src="sub" fit="cover" :preview-src-list="[sub]"></el-image>
              <div class="tacenter fs14">
                <span>{{aspectToValue(subIndex)}}</span>
              </div>
            </el-card>
          </template>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      statusToValue,
      channelToValue,
      aspectToValue
    }
  },
}
</script>
<style lang="scss" scoped>
.service-item {
  padding: 5px 15px;
}
.el-tabs {
  margin: 0 20px
}
</style>