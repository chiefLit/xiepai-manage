<template>
  <div class="template-list-wrapper">

    <el-form :model="formParams" label-width="100px" ref="filterForm" class="list-form">
      <!--通用筛选项-->
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker v-model="formParams.startTime" type="date" placeholder="开始日期" :picker-options="startPickerOptions" value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker v-model="formParams.endTime" type="date" placeholder="结束日期" :picker-options="endPickerOptions" value-format="timestamp">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户手机号" prop="phone">
            <el-input v-model="formParams.phone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户名称" prop="userNmae">
            <el-input v-model="formParams.userNmae" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6" v-if="!statusDisable">
          <el-form-item label="订单状态" prop="status">
            <el-select v-model="formParams.status" placeholder="请选择">
              <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="门店" prop="storeName">
            <el-select v-model="formParams.storeName" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="pulldata">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="reset('filterForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column prop="date" label="序号" width="50px">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="number" label="订单号" />
      <el-table-column label="下单时间">
        <template slot-scope="scope">
          {{scope.row.applyTime | parseTime}}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="用户名称" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="channel" label="渠道">
        <template slot-scope="scope">
          {{channelToValue(scope.row.channel)}}
        </template>
      </el-table-column>
      <el-table-column label="订单总价" >
        <template slot-scope="scope">{{scope.row.totalPrice ? scope.row.totalPrice.toFixed(2) : "--"}}</template>
      </el-table-column>
      <el-table-column label="用户实付金额" >
        <template slot-scope="scope">{{scope.row.realPayAmount ? scope.row.realPayAmount.toFixed(2) : "--"}}</template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">{{statusToValue(scope.row.status)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template slot-scope="scope">
          <el-button type="text" @click="toDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="pulldata" @current-change="pulldata" :current-page.sync="formParams.currentPage" :page-sizes="pageSizes" :page-size.sync="formParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalRecords">
    </el-pagination>
  </div>
</template>

<script>
import * as orderApi from '@/api/order'
import { statusToValue, channelToValue, orderOptions } from '@/globalConfig'

export default {
  name: 'filter-search',
  props: {
    status: {
      type: String | Number
    }
  },
  data() {
    return {
      statusToValue,
      channelToValue,
      orderOptions,

      pageSizes: [20, 40, 80],
      totalRecords: 0,
      statusDisable: false,

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
    if (this.status !== null && this.status !== undefined) {
      this.formParams.status = this.status
      this.statusDisable = true
    }
    this.pulldata()
  },
  methods: {
    async pulldata() {
      const data = await orderApi.getOrderList(this.formParams)
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.dataList = data.object;
        this.totalRecords = data.page.totalRecords;
      }
    },

    filter() {
      this.$emit('get-filter-options', this.formParams);
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    },

    toDetail(item) {
      this.$router.push({
        path: `/order/wash/detail?id=${item.id}`
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.template-list-wrapper {
  padding: 20px;
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
