<template>
  <div class="popup-comfirm-receipt-wrapper">
    <el-dialog title="确认收货" :visible.sync="showDialog" width="80%">
      <el-form ref="form" label-width="120px">
        <el-tabs shadow="never" type="border-card">
          <el-tab-pane v-for="(item, index) in data.orderSubVoList" :key="index" :label='item.goodzTitle'>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class=" name">清洗方式</div>
                <div class="value">
                  <template v-for="(sub, subIndex) in item.serviceDetailList">
                    <div class="mr20" :key="subIndex" v-if="sub.classifyCode === '000001'">
                      {{sub.serviceName}} {{sub.price}}
                    </div>
                  </template>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <div class=" name">护理项目</div>
                <div class="value">
                  <template v-for="(sub, subIndex) in item.serviceDetailList">
                    <div class="mr20" :key="subIndex" v-if="sub.classifyCode === '000002'">
                      {{sub.serviceName}} {{sub.price}}
                    </div>
                  </template>
                </div>
              </el-col>
            </el-row>
            <el-row class="image-card-container" :gutter="20">
              <template v-for="(sub, subIndex) in item.serviceImageList">
                <el-card class="image-card" :body-style="{ padding: '0px' }" :key="subIndex" v-if="sub.step === 0" shadow="never">
                  <el-image :src="sub.url" fit="cover" :preview-src-list="[sub.url]"></el-image>
                  <div class="tacenter fs14">
                    <span>{{aspectToValue(sub.aspect)}}</span>
                  </div>
                </el-card>
              </template>
            </el-row>

            <el-divider content-position="left">补充鞋子信息</el-divider>
            <el-row :gutter="0" v-if="formParams.storeCollectSubParamList">
              <el-col :span="6">
                <el-form-item label="鞋子品牌">
                  <el-input v-model="formParams.storeCollectSubParamList[index].brand" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="具体型号">
                  <el-input v-model="formParams.storeCollectSubParamList[index].model" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="估算二手市场价">
                  <el-input v-model="formParams.storeCollectSubParamList[index].amount" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="formParams.storeCollectSubParamList[index].remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

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

          </el-tab-pane>
        </el-tabs>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确认收鞋</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { statusToValue, channelToValue, aspectToValue } from '@/globalConfig'
import * as commonApi from '@/api/common'
import * as orderApi from '@/api/order'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
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

      showDialog: false,

      imageLists: [],
      formParams: {
        storeCollectSubParamList: []
      }
    }
  },
  watch: {
    value(val) {
      this.showDialog = val
    },
    showDialog(val) {
      this.$emit('input', val)
    }
  },
  beforeMount() {

    this.imageLists = this.data.orderSubVoList.map(ele => [{ 'url': '' }, { 'url': '' }, { 'url': '' }, { 'url': '' }])

    const storeCollectSubParamList = this.data.orderSubVoList.map(ele => {
      return {
        orderSubId: ele.id, //	是	int	子订单ID
        brand: '', //	是	string	品牌
        model: '', //	是	string	系列
        amount: '', //	否	double	评估价
        remark: '', //	否	string	正面照片
        image0: '', //	是	string	正面照片
        image1: '', //	是	string	背面照片
        image2: '', //	是	string	侧面照片
        image3: '' //	是	string	底部照片
      }
    })
    this.formParams = {
      orderId: this.data.id,
      storeCollectSubParamList
    }
  },
  methods: {
    close() {
      this.showDialog = false
    },
    // 自定义上传的实现
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
      let errorMessage = ""
      for (let i = 0; i < this.formParams.storeCollectSubParamList.length; i++) {
        const ele = this.formParams.storeCollectSubParamList[i];

        if (!ele.brand) {
          errorMessage = `第${i + 1}双鞋的鞋子品牌没有填写`
          break
        }
        if (!ele.model) {
          errorMessage = `第${i + 1}双鞋的具体型号没有填写`
          break
        }
        if (!ele.amount) {
          errorMessage = `第${i + 1}双鞋的估算二手市场价没有填写`
          break
        }

        let shouldBreak = false

        for (let j = 0; j < this.imageLists[i].length; j++) {
          const sub = this.imageLists[i][j];
          if (sub.url) {
            ele[`image${j}`] = sub.url
          } else {
            errorMessage = `第${i + 1}双鞋的第${j + 1}张照片没有上传`
            shouldBreak = true;
            break
          }
        }
        if (shouldBreak) break
      }
      if (errorMessage) {
        this.$message.error(errorMessage)
        return false
      } else {
        return true
      }
    },

    async submit() {
      if (!this.calcParams()) return
      const data = await orderApi.storeCollect(this.formParams)
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.$message.success('提交成功')
        this.$emit('reload-page')
        this.close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.popup-comfirm-receipt-wrapper {
  /deep/ .el-tabs {
    .el-tabs__header {
      margin-bottom: 0;
    }
    .el-tabs__content {
      padding: 0;
      padding-top: 10px;
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