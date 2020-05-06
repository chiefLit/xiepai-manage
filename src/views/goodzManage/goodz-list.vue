<template>
  <div class="template-list-wrapper">
    <el-form :model="formParams" label-width="100px" ref="filterForm" class="list-form">
      <!--通用筛选项-->
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-form-item label="商品ID" prop="goodzId">
            <el-input v-model="formParams.goodzId" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品名称" prop="title">
            <el-input v-model="formParams.title" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
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
          <el-form-item label="状态" prop="status">
            <el-select v-model="formParams.status" placeholder="请选择">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" align="top" justify="start" :gutter="24">
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
      <el-table-column prop="id" label="商品ID" />
      <el-table-column prop="title" label="商品名称" />
      <el-table-column prop="storeName" label="所属门店" />
      <el-table-column prop="type" label="类别">
        <template slot-scope="scope">{{{0: '服务类', 1: '商品类'}[scope.row.type]}}</template>
      </el-table-column>
      <el-table-column prop="optionType" label="商品类型" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{{'-1': '下架', 0: '正常'}[scope.row.status]}}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
      </el-table-column>
      <el-table-column prop label="创建人">
        <template>--</template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="80px">
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

    <EditComponent :editItem="editItem" v-model="editDialogVisible" />
  </div>
</template>

<script>
import * as orderApi from "@/api/order";
import * as goodzApi from "@/api/goodz";
import * as storeApi from "@/api/store";
import { statusToValue, channelToValue, orderOptions } from "@/globalConfig";

import EditComponent from "./components/edit"

export default {
  name: "filter-search",
  components: { EditComponent },
  data() {
    return {
      statusList: [
        { label: "全部", value: null },
        { label: "正常", value: 0 },
        { label: "下架", value: -1 }
      ],
      storeList: [],

      editDialogVisible: false,
      editItem: {},

      pageSizes: [20, 40, 80],
      totalRecords: 0,

      formParams: {
        goodzId: null,
        title: "",
        status: null,
        storeId: null,

        currentPage: 1,
        pageSize: 20
      },
      dataList: []
    };
  },
  beforeMount() {
    this.getStoreList();
    this.pulldata();
  },
  methods: {
    async pulldata() {
      const data = await goodzApi.getGoodzList(this.formParams);
      this.dataList = data.object;
      this.totalRecords = data.page.totalRecords;
    },

    async getStoreList() {
      const data = await storeApi.getStoreList({ currentPage: 1, pageSize: 20 });
      const storeList = data.object.map(ele => {
        return {
          label: ele.name,
          value: ele.id
        };
      });
      this.storeList = [{ label: "全部", value: null }, ...storeList];
    },

    filter() {
      this.$emit("get-filter-options", this.formParams);
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    },

    edit(item) {
      this.editItem = item
      this.editDialogVisible = true
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
