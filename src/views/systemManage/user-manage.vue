<template>
  <div class="user-manage-wrapper">
    <el-form :model="formParams" label-width="100px" ref="filterForm">
      <el-row type="flex" align="right" justify="start" :gutter="24">
        <el-col :span="6">
          <el-form-item label="账号ID" prop="userNmae">
            <el-input v-model="formParams.id" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号" prop="userNmae">
            <el-input v-model="formParams.userName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名" prop="userNmae">
            <el-input v-model="formParams.realName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" align="top" justify="start" :gutter="24">
        <el-col :span="12">
          <el-button type="primary" icon="el-icon-search" @click="pulldata">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="reset('filterForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="createUser">新增</el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="dataList" style="width: 100%">
      <el-table-column label="序号" width="50px">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="id" label="账号ID" />
      <el-table-column prop="userName" label="账号" />
      <el-table-column prop="realName" label="姓名" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="storeName" label="所属门店" />
      <el-table-column prop="roleIds" label="角色" />
      <el-table-column prop="status" label="账号状态">
        <template slot-scope="scope">{{{0: '正常', '-1': '禁用'}[scope.row.status]}}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{scope.row.createTime | parseTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="resetPassword(scope.row)">初始化密码</el-button>
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

    <UserForm v-model="showUserForm" :data="currUser" />
  </div>
</template>

<script>
import * as userApi from "@/api/user";

import UserForm from "./components/user-form";

export default {
  name: "user-search",
  components: { UserForm },
  data() {
    return {
      showUserForm: false,
      formParams: {
        id: "",
        userName: "",
        realName: "",
        currentPage: 1,
        pageSize: 20
      },
      pageSizes: [20, 40, 80],
      totalRecords: 0,
      currUser: {},
      dataList: []
    };
  },
  beforeMount() {
    this.pulldata();
  },
  methods: {
    async pulldata() {
      const data = await userApi.getUserList(this.formParams);
      this.dataList = data.object;
      this.totalRecords = data.page.totalRecords;
    },
    createUser() {
      this.showUserForm = true;
      this.currUser = {};
    },
    edit(item) {
      this.currUser = item;
      this.showUserForm = true;
    },
    async resetPassword(item) {
      this.$confirm("此操作将永久初始化当前用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const data = await userApi.restPassword({ id: item.id });
        this.$message.success("重置密码成功");
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.user-manage-wrapper {
  padding: 20px;
  .el-pagination {
    margin-top: 10px;
  }
}
</style>
