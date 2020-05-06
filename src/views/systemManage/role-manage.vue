<template>
  <div class="role-manage-wrapper">
    <!-- <el-form>
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="6">
          <el-button type="primary" icon="el-icon-search" @click="pulldata">新增</el-button>
        </el-col>
      </el-row>
    </el-form>-->

    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="角色名称" />
      <!-- <el-table-column prop="userName" label="授权用户" /> -->
      <el-table-column prop="userPhone" label="状态">
        <template slot-scope="scope">{{{0: '正常', '-1': '禁用'}[scope.row.status]}}</template>
      </el-table-column>
      <!-- <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
      </el-table-column>-->
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="setMenu(scope.row)">角色菜单配置</el-button>
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

    <RoleForm v-model="showRoleForm" :data="currEditItem" />
    <RoleTree v-model="showRoleTree" :data="currTreeItem" />
  </div>
</template>

<script>
import * as userApi from "@/api/user";

import RoleForm from "./components/role-form";
import RoleTree from "./components/role-tree";

export default {
  name: "role-search",
  components: { RoleForm, RoleTree },
  data() {
    return {
      showRoleForm: false,
      showRoleTree: false,
      formParams: {
        currentPage: 1,
        pageSize: 20
      },
      pageSizes: [20, 40, 80],
      totalRecords: 0,

      dataList: [],
      currEditItem: {},
      currTreeItem: {},
    };
  },
  beforeMount() {
    this.pulldata();
  },
  methods: {
    async pulldata() {
      const data = await userApi.getRoleList(this.formParams);
      this.dataList = data.object;
      this.totalRecords = data.page.totalRecords;
    },
    edit(item) {
      this.currEditItem = item;
      this.showRoleForm = true;
    },
    setMenu(item) {
      this.currTreeItem = item;
      this.showRoleTree = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.role-manage-wrapper {
  padding: 20px;
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
