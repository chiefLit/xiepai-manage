<template>
  <div class="order-wash-detail">
    <el-card class="module-card" header="基本信息" v-if="0" shadow="never">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">订单编号</div>
          <div class="wp70 value">{{data.number}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">下单日期</div>
          <div class="wp70 value">{{data.applyTime|parseTime}}</div>
        </el-col>
        <el-col :span="6">
          <div class="wp30 name">渠道</div>
          <div class="wp70 value">{{channelToValue(data.channel)}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">用户姓名</div>
          <div class="wp70 value">{{data.phone}}</div>
        </el-col>
        <el-col :span="6">
          <div class="wp30 name">手机号</div>
          <div class="wp70 value">{{data.phone}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">订单状态</div>
          <div class="wp70 value">{{statusToValue(data.status)}}</div>
        </el-col>
        <el-col :span="6">
          <div class="wp30 name">订单关闭时间</div>
          <div class="wp70 value">{{data.endTime|parseTime}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">收货人信息</div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">收货人姓名</div>
          <div class="wp70 value">{{data.userAddressVo.linkName}}</div>
        </el-col>
        <el-col :span="6">
          <div class="wp30 name">手机号码</div>
          <div class="wp70 value">{{data.userAddressVo.phone}}</div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="18">
          <div class="wp10 name">详细地址</div>
          <div class="wp70 value">{{data.userAddressVo.provinceName}} {{data.userAddressVo.cityName}} {{data.userAddressVo.countyName}} {{data.userAddressVo.address}}</div>
        </el-col>
      </el-row>

    </el-card>

    <el-card class="module-card" header="订单内容" v-if="0" shadow="never">
      <el-tabs v-model="activeName" type="border-card" shadow="never">
        <el-tab-pane v-for="(item, index) in data.orderSubVoList" :key="index" :label='item.goodzTitle'>
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="6">
                <div class="wp30 name">清洗方式</div>
                <div class="wp70 value">{{data.userAddressVo.phone}}</div>
              </el-col>
              <el-col :span="6">
                <div class="wp30 name">价格</div>
                <div class="wp70 value">{{data.userAddressVo.phone}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="6">
                <div class="wp30 name">护理项目</div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div class="service-item" v-for="(sub, subIndex) in item.serviceDetailList" :key="subIndex">
                  {{sub.serviceName}} {{sub.price}}
                </div>
              </el-col>
            </el-row>
            <el-row class="image-card-container" :gutter="24">
              <el-card class="image-card" :body-style="{ padding: '0px' }" v-for="(sub, subIndex) in item.serviceImageList" :key="subIndex">
                <el-image :src="sub.url" fit="cover" :preview-src-list="[sub.url]"></el-image>
                <div style="padding: 14px;">
                  <span>{{aspectToValue(sub.aspect)}}</span>
                </div>
              </el-card>
            </el-row>
          </el-card>

        </el-tab-pane>
      </el-tabs>
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">收货人姓名</div>
            <div class="wp70 value">{{data.userAddressVo.linkName}}</div>
          </el-col>
          <el-col :span="6">
            <div class="wp30 name">平台优惠</div>
            <div class="wp70 value">{{data.userAddressVo.linkName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">平台优惠说明</div>
            <div class="wp70 value">--</div>
          </el-col>
          <el-col :span="6">
            <div class="wp30 name">优惠券</div>
            <div class="wp70 value">{{data.couponAmount}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">平台钱包支付</div>
            <div class="wp70 value">--</div>
          </el-col>
          <el-col :span="6">
            <div class="wp30 name">用户实际支付</div>
            <div class="wp70 value">{{data.realPayPrice}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">支付订单号</div>
            <div class="wp70 value">{{data.payOrderNumber}}</div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>

    <el-card class="module-card" header="物流信息" v-if="0" shadow="never">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="wp30 name">物流公司</div>
          <div class="wp70 value">{{data.toStoreExpressName}}</div>
        </el-col>
        <el-col :span="6">
          <div class="wp30 name">物流单号</div>
          <div class="wp70 value">{{data.toStoreExpressNumber}}</div>
        </el-col>
      </el-row>
      <div class="iframe-box">
        <iframe src="https://wwww.baidu.com" height="500" width="100%"></iframe>
      </div>
    </el-card>

    <el-card class="module-card" header="鞋子收货信息" shadow="never">
      <el-tabs v-model="activeName" type="border-card" shadow="never">
        <el-tab-pane v-for="(item, index) in data.orderSubVoList" :key="index" :label='item.goodzTitle'>
          <el-card shadow="never">
            <el-row :gutter="24">
              <el-col :span="6">
                <div class="wp30 name">鞋子品牌</div>
                <div class="wp70 value">{{data.userAddressVo.phone}}</div>
              </el-col>
              <el-col :span="6">
                <div class="wp30 name">具体型号</div>
                <div class="wp70 value">{{data.userAddressVo.phone}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="6">
                <div class="wp30 name">估算二手市场价</div>
                <div class="wp70 value">{{data.userAddressVo.phone}}</div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="24">
                <div class="service-item" v-for="(sub, subIndex) in item.serviceDetailList" :key="subIndex">
                  {{sub.serviceName}} {{sub.price}}
                </div>
              </el-col>
            </el-row>
            <el-row class="image-card-container" :gutter="24">
              <el-card class="image-card" :body-style="{ padding: '0px' }" v-for="(sub, subIndex) in item.serviceImageList" :key="subIndex">
                <el-image :src="sub.url" fit="cover" :preview-src-list="[sub.url]"></el-image>
                <div style="padding: 14px;">
                  <span>{{aspectToValue(sub.aspect)}}</span>
                </div>
              </el-card>
            </el-row>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <el-card shadow="never">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">收货人姓名</div>
            <div class="wp70 value">{{data.userAddressVo.linkName}}</div>
          </el-col>
          <el-col :span="6">
            <div class="wp30 name">平台优惠</div>
            <div class="wp70 value">{{data.userAddressVo.linkName}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">平台优惠说明</div>
            <div class="wp70 value">--</div>
          </el-col>
          <el-col :span="6">
            <div class="wp30 name">优惠券</div>
            <div class="wp70 value">{{data.couponAmount}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">平台钱包支付</div>
            <div class="wp70 value">--</div>
          </el-col>
          <el-col :span="6">
            <div class="wp30 name">用户实际支付</div>
            <div class="wp70 value">{{data.realPayPrice}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="wp30 name">支付订单号</div>
            <div class="wp70 value">{{data.payOrderNumber}}</div>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'

import * as orderApi from '@/api/order'
export default {
  data() {
    return {
      activeName: '',
      statusToValue,
      channelToValue,
      aspectToValue,
      data: {
        userAddressVo: {}
      }
    }
  },
  beforeMount() {
    this.pullData()
  },
  methods: {
    async pullData() {
      const data = await orderApi.getOrderDetail({ id: this.$route.params.id });
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.data = data.object
        console.log(this.data)
      }
    },
    handleClick() { }
  }
}
</script>
<style lang="scss" scoped>
.order-wash-detail {
  padding: 20px;
  /deep/ .module-card {
    margin-bottom: 20px;
    .el-card__header {
      padding: 8px 10px;
      font-weight: bold;
    }
    .el-card__body {
      padding: 0;
    }
    .el-row {
      border-bottom: 1px solid #ebeef5;
      > .el-col {
        border-right: 1px solid #ebeef5;
        display: flex;
        line-height: 30px;
        font-size: 14px;
        &.el-col-6 {
          min-width: 320px;
        }
        .name {
          text-align: right;
          min-width: 60px;
          font-weight: 500;
          min-width: 80px;
        }
        .value {
          padding-left: 10px;
          color: #999;
        }
      }
    }
    .el-tabs__content {
      padding: 0;
    }
  }
  .el-tabs--border-card {
    box-shadow: none;
  }
  .service-item {
    padding: 5px 15px;
  }
  .image-card-container {
    display: flex;
    padding: 20px;
    .image-card {
      width: 200px;
      margin-right: 20px;
    }
    .el-image {
      width: 100%;
      height: 100px;
    }
  }

  .iframe-box {
    // padding: 5px 0px;
    iframe {
      border: 1px solid #ebeef5;
    }
  }
}
</style>