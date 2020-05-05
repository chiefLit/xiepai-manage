<template>
  <div class="store-manage-wrapper">
    <el-form>
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="pulldata">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="id" label="门店ID" />
      <el-table-column prop="name" label="门店名称" />
      <el-table-column prop="userPhone" label="所在地" >
        <template slot-scope="scope">{{scope.row.provinceName}} {{scope.row.cityName}} {{scope.row.countyName}} {{scope.row.address}}</template>
      </el-table-column>
      <el-table-column prop="dutyMan" label="负责人" />
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
  </div>
</template>

<script>
import * as storeApi from "@/api/store";

export default {
  name: "store-search",
  data() {
    return {
      formParams: {
        currentPage: 1,
        pageSize: 20
      },
      pageSizes: [20, 40, 80],
      totalRecords: 0,
      
      dataList: []
    };
  },
  beforeMount() {
    this.pulldata();
  },
  methods: {
    async pulldata() {
      const data = await storeApi.getStoreList(this.formParams);
      if (data.code !== 1) {
        this.$message.error(data.message);
      } else {
        this.dataList = data.object;
        this.totalRecords = data.page.totalRecords;
      }
    },
    edit(item) {
      console.log(item)
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
