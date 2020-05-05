<template>
  <div class="user-form-wrapper">
    <el-form ref="userForm" label-position="right" label-width="100px" :model="userData">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="400px">
        <el-form-item prop="userName" label="用户名" size="mini">
          <el-input v-model="userData.userName"></el-input>
        </el-form-item>
        <el-form-item prop="realName" label="姓名" size="mini">
          <el-input v-model="userData.realName"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码" size="mini">
          <el-input v-model="userData.phone"></el-input>
        </el-form-item>
        <el-form-item prop="storeId" label="所属店铺" size="mini">
          <el-select v-model="userData.storeId" placeholder="请选择">
            <el-option
              v-for="item in storeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="账号状态" size="mini">
          <el-select v-model="userData.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="roleIds" label="用户角色" size="mini">
          <el-input v-model="userData.roleIds"></el-input>
        </el-form-item> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import * as userApi from "@/api/user";
import * as storeApi from "@/api/store";
export default {
  props: {
    value: {
      default: false,
      type: Boolean
    },
    data: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      title: "",
      statusOptions: [
        { label: '正常', value: 0 },
        { label: '禁用', value: -1 },
      ],
      userData: {},
      storeOptions:[],
      dialogVisible: false
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
      if (val) this.userData = this.data.id ? { ...this.data } : {
        userName: '', 
        realName: '', 
        phone: '',
        storeId: 1, 
        status: 0, 
        roleIds: []
      }
      if (val) this.title = this.data.id ? '编辑用户' : '新增用户'
    }
  },
  mounted(){
    this.getStoreList()
  },
  methods: {
    async getStoreList() {
      const data = await storeApi.getStoreList({
        currentPage: 1,
        pageSize: 200
      });
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.storeOptions = data.object.map(ele => {
          return {
            label: ele.name,
            value: ele.id,
          }
        })
        console.log(JSON.stringify(this.statusOptions))
        console.log(JSON.stringify(this.storeOptions))
      }
    },
    async submit() {
      const promise = this.data.id ? userApi.updateUser : userApi.createUser
      const data = await promise(this.userData)
    },
    cancel() {
      this.dialogVisible = false
    },
  }
};
</script>
<style lang="scss" scoped>
.goodz-edit-wrapper {
}
</style>