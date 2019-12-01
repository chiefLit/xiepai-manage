<template>
  <div class="template-list-wrapper">

    <el-form :model="formParams"
             label-width="100px"
             ref="filterForm"
             class="list-form">
      <!--通用筛选项-->
      <el-row type="flex"
              align="top"
              justify="start"
              :gutter="24">
        <el-col :span="6">
          <el-form-item label="开始日期"
                        prop="startTime">
            <el-date-picker v-model="formParams.startTime"
                            type="date"
                            placeholder="开始日期"
                            :picker-options="startPickerOptions"
                            value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期"
                        prop="endTime">
            <el-date-picker v-model="formParams.endTime"
                            type="date"
                            placeholder="结束日期"
                            :picker-options="endPickerOptions"
                            value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户手机号"
                        prop="phone">
            <el-input v-model="formParams.phone"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名称"
                        prop="userNmae">
            <el-input v-model="formParams.userNmae"
                      placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex"
              align="top"
              justify="start"
              :gutter="24">
        <el-col :span="6">
          <el-form-item label="订单状态"
                        prop="status">
            <el-select v-model="formParams.status"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门店"
                        prop="storeName">
            <el-select v-model="formParams.storeName"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="$emit('get-filter-options', formParams)">搜索</el-button>
          <el-button type="primary"
                     icon="el-icon-refresh"
                     @click="reset('filterForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- <el-table :data="tableData"
              style="width: 100%">
      <el-table-column prop="date"
                       label="日期"
                       width="180" />
      <el-table-column prop="name"
                       label="姓名"
                       width="180" />
      <el-table-column prop="address"
                       label="地址" />
    </el-table> -->

    <!-- <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage4"
                   :page-sizes="[100, 200, 300, 400]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="400">
    </el-pagination> -->
  </div>
</template>

<script>
import * as orderApi from '@/api/order'
console.log(orderApi)
export default {
  name: 'filter-search',
  props: {
    downloadExcelUrl: {
      type: String
    }
  },
  data() {
    return {
      options: [{ name: 1, label: 'label' }],
      formParams: {
        startTime: null,
        endTime: null,
        phone: "",
        userNmae: "",
        status: null,
        storeName: "",

        currentPage: 1,
        pageSize: 20
      },
      dataList: []
    }
  },
  computed: {
    startPickerOptions: {
      get() {
        return { disabledDate: (time) => this.formParams.endTime ? time > this.formParams.endTime : false }
      }
    },
    endPickerOptions: {
      get() {
        return { disabledDate: (time) => this.formParams.startTime ? time < this.formParams.startTime : false }
      }
    }
  },
  beforeMount() {
    this.pulldata()
  },
  methods: {
    async pulldata() {
      const data = await orderApi.getOrderList(this.formParams)
      console.log(data)
    },
    filter() {
      this.$emit('get-filter-options', this.formParams);
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    },

    async downloadExcel() {
      if (!this.downloadExcelUrl) return
      // let url = this.downloadExcelUrl;
      let params = '';

      this.formParams.startTime && (params = `${params}&startTime=${this.formParams.startTime}`);
      this.formParams.startTime && (params = `${params}&endTime=${this.formParams.endTime}`);

      window.open(`${this.downloadExcelUrl}?${params}&storeName=${this.formParams.storeName}`);
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.template-list-wrapper {
  padding: 20px;
}
</style>
