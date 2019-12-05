<template>
  <div class="popup-comfirm-send-wrapper">
    <el-form ref="form" label-width="120px">
      <el-tabs class="order-sub-list" shadow="never">
        <el-tab-pane v-for="(item, index) in data.orderSubVoList" :key="index" :label='item.goodzTitle'>
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="鞋子品牌">
                <el-input v-model="item.orderStoreCollectVo.brand" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="具体型号">
                <el-input v-model="item.orderStoreCollectVo.model" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="估算二手市场价">
                <el-input v-model="item.orderStoreCollectVo.amount" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left">请补充鞋子清洗完成照片</el-divider>
          <el-row class="image-card-container" :gutter="20">
            <template v-for="(sub, subIndex) in imageLists[index]">
              <div class="mr20" :key="subIndex">
                <el-upload class="image-uploader" :show-file-list='false' action="" accept="image/*" :http-request="httpRequestEx" :on-success="(value)=> onSuccess(value, index, subIndex)">
                  <el-image v-if="sub.url" :src="sub.url" fit="cover"></el-image>
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
                <div class="tacenter fs14">
                  <span>{{aspectToValue(subIndex)}}</span>
                </div>
              </div>
            </template>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-divider content-position="left"></el-divider>
      <el-divider content-position="left">补充物流信息</el-divider>
      <el-row :gutter="0">
        <el-col :span="6">
          <el-form-item label="寄回方式">
            <el-select v-model="sendWay" placeholder="请选择" disabled>
              <el-option v-for="item in sendWayList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物流公司">
            <el-select v-model="formParams.toUserExpressId" placeholder="请选择">
              <el-option v-for="item in expressCompanyList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="物流单号">
            <el-input v-model="formParams.toUserExpressNumber" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">收货地址</el-divider>
      <el-row :gutter="0" v-if="data.userAddressVo">
        <el-col :span="6">
          <el-form-item label="收货人">{{data.userAddressVo.linkName}}</el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机号码">{{data.userAddressVo.phone}}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="详细地址">{{data.userAddressVo.provinceName}} {{data.userAddressVo.cityName}} {{data.userAddressVo.countyName}} {{data.userAddressVo.address}}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
import * as commonApi from '@/api/common'
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
      aspectToValue,

      sendWay: 1,
      sendWayList: [
        { value: 1, label: '快递' },
        { value: 2, label: '平台配送' },
        { value: 3, label: '客户上门自取' },
      ],
      expressCompanyList: [],
      formParams: {
        orderId: null, //	是	int	订单ID
        toUserExpressId: null, //	是	int	选中的快递公司ID
        toUserExpressNumber: null, //	是	String	快递单号
        serviceResultSubParamList: [], //	是	list	ServiceResultSubParam 组成的list，ServiceResultSubParam说明
      }
    }
  },
  computed: {
    imageLists() {
      if (this.data && this.data.orderSubVoList) {
        return this.data.orderSubVoList.map(ele => [{ 'url': '' }, { 'url': '' }, { 'url': '' }, { 'url': '' }])
      } else {
        return []
      }
    }
  },
  beforeMount() {
    // console.log(this.data)
    this.getExpressCompanyList()
  },
  methods: {
    // 自定义上传的实现
    async getExpressCompanyList() {
      const data = await commonApi.getExpressCompanyList()
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.expressCompanyList = data.object.map(ele => {
          return {
            value: ele.id,
            label: ele.name
          }
        })
      }
    },
    httpRequestEx(obj) {
      return commonApi.uploadFile(obj.file, null)
    },
    onSuccess(data, index, subIndex) {
      // console.log(data)
      if (data.code !== 1) {
        this.message.error(data.message)
      } else {
        this.imageLists[index][subIndex].url = data.object.viewPath;
        this.$forceUpdate();
      }
    },
    calcParams() {
      
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-comfirm-send-wrapper {
  .order-sub-list {
    padding: 0 20px;
  }
  /deep/ .el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__content {
      padding: 0;
      padding-top: 10px;
      .image-card-container {
        padding-top: 0;
      }
      // background: #eee;
    }
  }
  .el-row {
    .el-col {
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
  .image-uploader {
    width: 200px;
    height: 100px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    line-height: 100px;
    font-size: 30px;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>