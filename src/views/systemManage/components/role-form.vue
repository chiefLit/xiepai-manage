<template>
  <div class="role-form-wrapper">
    <el-form :model="roleData" ref="roleForm" label-position="right" label-width="100px">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="400px">
        <el-form-item prop="name" label="角色名称" size="mini">
          <el-input v-model="roleData.name"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态" size="mini">
          <el-select v-model="roleData.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
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
      title: "编辑角色",
      statusOptions: [
        { label: '正常', value: 0 },
        { label: '禁用', value: -1 },
      ],
      roleData: {
        id: '',
        name: '',
        status: 0,
        menus: []
      },
      dialogVisible: false
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
      val && this.getDetail();
    }
  },
  methods: {
    async getDetail() {
      const data = await userApi.getRoleDetail({ id: this.data.id })
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.roleData = data.object
      }
    },
    async submit() {
      const data = await userApi.updateRole(this.roleData);
      if (data.code !== 1) {
        this.$message.error(data.message)
      } else {
        this.$message.success('修改角色成功')
      }
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