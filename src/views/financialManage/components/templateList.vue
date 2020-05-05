<template>
  <div class="financial-list-wrapper">
    <el-form :model="formParams" label-width="100px" ref="filterForm" class="list-form">
      <!--通用筛选项-->
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker
              v-model="formParams.startTime"
              type="date"
              placeholder="开始日期"
              :picker-options="startPickerOptions"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束日期" prop="endTime">
            <el-date-picker
              v-model="formParams.endTime"
              type="date"
              placeholder="结束日期"
              :picker-options="endPickerOptions"
              value-format="timestamp"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户手机号" prop="phone">
            <el-input v-model="formParams.phone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-form-item label="门店" prop="storeId">
            <el-select v-model="formParams.storeId" placeholder="请选择">
              <el-option
                v-for="item in storeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支付方式" prop="channel">
            <el-select v-model="formParams.channel" placeholder="请选择">
              <el-option
                v-for="item in payChannelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="pulldata">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="reset('filterForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-alert :title="amountDesc" type="error" :closable="false"></el-alert>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="payOrderId" label="流水号" />
      <el-table-column label="时间">
        <template slot-scope="scope">{{scope.row.operateTime | parseTime}}</template>
      </el-table-column>
      <el-table-column prop="userName" label="用户名称" />
      <el-table-column prop="userPhone" label="手机号码" />
      <el-table-column prop="orderNumber" label="关联订单号" />
      <el-table-column prop="storeName" label="门店" />
      <el-table-column label="金额">
        <template slot-scope="scope">{{scope.row.amount ? scope.row.amount.toFixed(2) : "--"}}</template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">{{{0: '微信'}[scope.row.payChannel]}}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{{0: '支付', '-1': '退款'}[scope.row.trend]}}</template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="pulldata"
      @current-change="pulldata"
      :current-page.sync="formParams.currentPage"
      :page-sizes="pageSizes"
      :page-size.sync="formParams.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRecords"
    ></el-pagination>
  </div>
</template>

<script>
import * as fundlogApi from "@/api/fundlog";
import * as storeApi from "@/api/store";

export default {
  name: "fundlog-search",
  props: {
    status: {
      type: String | Number
    }
  },
  data() {
    return {
      payChannelList: [
        { label: '全部', value: null },
        { label: '微信', value: 0 }
      ],
      storeList: [],

      pageSizes: [20, 40, 80],
      totalRecords: 0,

      formParams: {
        startTime: null,
        endTime: null,
        phone: "",
        channel: null,
        storeId: null,

        currentPage: 1,
        pageSize: 20
      },
      dataList: [],
      amountDesc: ''
    };
  },
  computed: {
    startPickerOptions: {
      get() {
        return {
          disabledDate: time =>
            this.formParams.endTime ? time > this.formParams.endTime : false
        };
      }
    },
    endPickerOptions: {
      get() {
        return {
          disabledDate: time =>
            this.formParams.startTime ? time < this.formParams.startTime : false
        };
      }
    }
  },
  beforeMount() {
    this.getStoreList();
    this.pulldata();
  },
  methods: {
    async pulldata() {
      const data = await fundlogApi.findPlatformFundlog(this.formParams);
      if (data.code !== 1) {
        this.$message.error(data.message);
      } else {
        this.dataList = data.object;
        this.totalRecords = data.page.totalRecords;
        this.amountDesc = `当前汇总：总金额：${data.map.sumAmount || '0.00'} 笔数：${data.map.count || '0'} 笔`
      }
    },

    async getStoreList() {
      const data = await storeApi.getStoreList({ currentPage: 1, pageSize: 20 });
      if (data.code !== 1) {
        this.$message.error(data.message);
      } else {
        const storeList = data.object.map(ele => {
          return {
            label: ele.name,
            value: ele.id
          };
        });
        this.storeList = [{ label: "全部", value: null }, ...storeList];
      }
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.financial-list-wrapper {
  padding: 20px;
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
