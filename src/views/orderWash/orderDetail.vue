<template>
  <div class="order-wash-detail">

    <detailBaseInfo :data="dataBaseInfo" />

    <detailOrderDetail :data="dataOrderDetail" />

    <detailExpressForm :data="dataExpressForm" />

    <detailShoesReceiveInfo :data="dataShoesReceive" />

    <detailShoesSendInfo :data="dataShoesSend" />

    <detailExpressTo :data="dataExpressTo" />

    <div class="button-container">
      <!-- 0: '待支付', 1: '等待物流信息', 2: '运输到店途中', 3: '到店核验中', 4: '清洗/修复中', 5: '清洗/修复完成',
      6: '寄回中', 7: '订单完成', 8: '退款中', 9: '已退款', '-1': '已取消', '-2': '已关闭' -->

      <el-button type="danger" @click="cancelOrder">取消订单</el-button>
      <el-button @click="dialogVisible1=true">确认已收到鞋子</el-button>
      <el-button type="primary" @click="dialogVisible2=true">清洗完成</el-button>
      <el-button type="primary" @click="completeOrder">订单完成</el-button>
    </div>

    <detailOrderLogs :data="dataOrderLogs" />

    <el-dialog title="确认收货" :visible.sync="dialogVisible1" width="80%">
      <popupConfirmReceipt :data="dataOrderDetail" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible1=false">确认收鞋</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认完成" :visible.sync="dialogVisible2" width="80%">
      <popupConfirmSend :data="dataOrderDetail" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2=false">取消</el-button>
        <el-button type="primary" @click="dialogVisible2=false">确认完成</el-button>
      </span>
    </el-dialog>
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

import popupConfirmReceipt from './components/popup-confirmReceipt'
import popupConfirmSend from './components/popup-confirmSend'

export default {
  components: {    detailBaseInfo, detailOrderDetail, detailExpressForm, detailExpressTo, detailOrderLogs,
    detailShoesReceiveInfo, detailShoesSendInfo, popupConfirmReceipt, popupConfirmSend  },
  data() {
    return {
      dialogVisible1: false,
      dialogVisible2: false,

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
    cancelOrder() {
      this.$confirm('确定删除该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await orderApi.orderCancel({ orderId: this.$route.query.id })
        if (data.code !== 1) {
          this.$message.error(data.message)
        } else {
          this.$message.success('订单已取消')
          this.pulldata()
        }
      })
    },
    completeOrder() { },
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
      // padding: 0;
    }
    .el-row {
      // border-bottom: 1px solid #ebeef5;
      > .el-col {
        // border-right: 1px solid #ebeef5;
        display: flex;
        line-height: 30px;
        font-size: 14px;
        .name {
          text-align: right;
          min-width: 60px;
          font-weight: 500;
          min-width: 80px;
          width: 120px;
        }
        .value {
          padding-left: 10px;
          color: #666;
          display: flex;
        }
      }
    }
    .el-tabs {
      // border-bottom: 1px solid #ebeef5;
      .el-tabs__header {
        margin-bottom: 0;
      }
      .el-tabs__content {
        padding: 0;
        padding-top: 10px;
        background: #eee;
      }
    }
  }
  .el-tabs--border-card {
    box-shadow: none;
  }
  /deep/ .image-card-container {
    display: flex;
    padding: 20px 20px 10px 20px;
    flex-wrap: wrap;
    .image-card {
      width: 200px;
      min-width: 200px;
      margin-right: 20px;
      margin-bottom: 10px;
    }
    .el-image {
      width: 100%;
      height: 100px;
    }
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .el-button {
      margin-right: 20px;
    }
  }

  /deep/ .el-dialog__body {
    padding: 0;
  }
}
</style>