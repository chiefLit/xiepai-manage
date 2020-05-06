<template>
  <div class="store-manage-wrapper">
    <!-- <el-form>
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="create">新增</el-button>
        </el-col>
      </el-row>
    </el-form>-->

    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="id" label="门店ID" />
      <el-table-column prop="name" label="门店名称" />
      <el-table-column prop="userPhone" label="所在地">
        <template
          slot-scope="scope"
        >{{scope.row.provinceName}} {{scope.row.cityName}} {{scope.row.countyName}} {{scope.row.address}}</template>
      </el-table-column>
      <el-table-column prop="dutyMan" label="负责人" />
      <!-- <el-table-column prop="linkMan" label="联系人" /> -->
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{{0: '正常', 1: '关闭'}[scope.row.status]}}</template>
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
        </template>
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

    <StoreForm v-model="showStoreForm" :data="currItem" />
  </div>
</template>

<script>
import * as storeApi from "@/api/store";

import StoreForm from "./components/store-form";

export default {
  name: "store-search",
  components: { StoreForm },
  data() {
    return {
      showStoreForm: false,
      formParams: {
        currentPage: 1,
        pageSize: 20
      },
      pageSizes: [20, 40, 80],
      totalRecords: 0,

      currItem: {},

      dataList: []
    };
  },
  beforeMount() {
    this.pulldata();
  },
  methods: {
    async pulldata() {
      const data = await storeApi.getStoreList(this.formParams);
      this.dataList = data.object;
      this.totalRecords = data.page.totalRecords;
    },
    create() {
      this.currItem = {};
      this.showStoreForm = true;
    },
    edit(item) {
      this.currItem = item;
      this.showStoreForm = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.store-manage-wrapper {
  padding: 20px;
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
