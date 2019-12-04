<template>
  <div class="order-wash-detail">

    <detailBaseInfo :data="dataBaseInfo" />

    <detailOrderDetail :data="dataOrderDetail" />

    <detailExpressForm :data="dataExpressForm" />

    <detailShoesReceiveInfo :data="dataShoesReceive"/>

    <detailShoesSendInfo :data="dataShoesSend"/>

    <detailExpressTo :data="dataExpressTo" />
    
    <detailOrderLogs :data="dataOrderLogs" />
  </div>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
import * as orderApi from '@/api/order'

import detailBaseInfo from './components/detail/detailBaseInfo'
import detailOrderDetail from './components/detail/detailOrderDetail'
import detailExpressForm from './components/detail/detailExpressForm'
import detailExpressTo from './components/detail/detailExpressTo'
import detailOrderLogs from './components/detail/detailOrderLogs'
import detailShoesReceiveInfo from './components/detail/detailShoesReceiveInfo'
import detailShoesSendInfo from './components/detail/detailShoesSendInfo'

export default {
  components: { detailBaseInfo, detailOrderDetail, detailExpressForm, detailExpressTo, detailOrderLogs, detailShoesReceiveInfo, detailShoesSendInfo },
  data() {
    return {
      activeName: '',
      statusToValue,
      channelToValue,
      aspectToValue,
      data: {},

      dataBaseInfo: {},
      dataOrderDetail: {},

      // 收到快递信息
      dataExpressForm: {},
      // 送出快递信息
      dataExpressTo: {},

      // 收到后鞋子信息（洗之前）
      dataShoesReceive: {},
      // 送出前鞋子信息（洗了后）
      dataShoesSend: {},

      dataOrderLogs: [],
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
        this.data = data.object;
        // 基础信息
        this.dataBaseInfo = {
          number: data.object.number,
          applyTime: data.object.applyTime,
          channel: data.object.channel,
          phone: data.object.phone,
          status: data.object.status,
          endTime: data.object.endTime,
          userAddressVo: { ...data.object.userAddressVo }
        }

        this.dataOrderDetail = {
          orderSubVoList: [...data.object.orderSubVoList],
          userAddressVo: { ...data.object.userAddressVo },
          couponAmount: data.object.couponAmount,
          realPayPrice: data.object.realPayPrice,
          payOrderNumber: data.object.payOrderNumber
        }

        this.dataExpressForm = {
          toStoreExpressName: data.object.toStoreExpressName,
          toStoreExpressNumber: data.object.toStoreExpressNumber
        }

        this.dataExpressTo = {
          toUserExpressName: data.object.toUserExpressName,
          toUserExpressNumber: data.object.toUserExpressNumber
        }

        this.dataShoesReceive = {
          orderId: data.object.id,
          toUserExpressId: data.object.toUserExpressId,
          toUserExpressNumber: data.object.toUserExpressNumber,
          serviceResultSubParamList: data.object.orderSubVoList.map(ele => {
            return {
              // int	子订单ID
              orderSubId: ele.id,
              goodzTitle: ele.goodzTitle,
              // string	品牌
              brand: ele.orderStoreCollectVo.brand,
              // string	系列
              model: ele.orderStoreCollectVo.model,
              // double	评估价
              amount: ele.orderStoreCollectVo.amount,
              // string	备注
              remark: ele.orderStoreCollectVo.remark,
              // string	正面照片
              image0Url: ele.serviceImageList.find(ele => ele.step === 1 && ele.aspect === 0).url,
              // string	背面照片
              image1Url: ele.serviceImageList.find(ele => ele.step === 1 && ele.aspect === 1).url,
              // string	侧面照片
              image2Url: ele.serviceImageList.find(ele => ele.step === 1 && ele.aspect === 2).url,
              // string	底面照片
              image3Url: ele.serviceImageList.find(ele => ele.step === 1 && ele.aspect === 3).url,
            }
          })
        }

        this.dataShoesSend = {
          orderId: data.object.id,
          toUserExpressId: data.object.toUserExpressId,
          toUserExpressNumber: data.object.toUserExpressNumber,
          storeCollectSubParamList: data.object.orderSubVoList.map(ele => {
            return {
              // int	子订单ID
              orderSubId: ele.id,
              goodzTitle: ele.goodzTitle,
              // string	品牌
              brand: ele.orderStoreCollectVo.brand,
              // string	系列
              model: ele.orderStoreCollectVo.model,
              // double	评估价
              amount: ele.orderStoreCollectVo.amount,
              // string	备注
              remark: ele.orderStoreCollectVo.remark,
              // string	正面照片
              image0Url: ele.serviceImageList.find(ele => ele.step === 2 && ele.aspect === 0).url,
              // string	背面照片
              image1Url: ele.serviceImageList.find(ele => ele.step === 2 && ele.aspect === 1).url,
              // string	侧面照片
              image2Url: ele.serviceImageList.find(ele => ele.step === 2 && ele.aspect === 2).url,
              // string	底面照片
              image3Url: ele.serviceImageList.find(ele => ele.step === 2 && ele.aspect === 3).url,
            }
          })
        }

        this.dataOrderLogs = [...data.object.orderLogVos]
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
      // border-bottom: 1px solid #ebeef5;
      > .el-col {
        // border-right: 1px solid #ebeef5;
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
          width: 120px;
        }
        .value {
          padding-left: 10px;
          color: #999;
          display: flex;
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
  /deep/ .image-card-container {
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    .image-card {
      width: 200px;
      min-width: 200px;
      margin-right: 20px;
      margin-bottom: 10px
    }
    .el-image {
      width: 100%;
      height: 100px;
    }
  }
}
</style>