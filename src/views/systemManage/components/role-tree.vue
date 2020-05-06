<template>
  <div class="role-tree-wrapper">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="400px">
      <el-tree :data="treeOptions" show-checkbox node-key="id" :props="defaultProps" @check="checkChange"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as userApi from "@/api/user";

function handlerRoutes(items) {
  return items
    .filter(item => item.meta && item.meta.routeable)
    .map(item => {
      if (item.meta && item.meta.routeable) {
        let res = {
          id: item.name,
          label: item.meta && item.meta.title
        };
        if (item.children) res.children = handlerRoutes(item.children);
        return res;
      }
    });
}

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
      title: "角色页面权限配置",
      treeOptions: handlerRoutes(this.$router.options.routes),
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "label"
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
      if (val && this.data.id) {
        this.getDetail();
      } else {
        this.checkedKeys = []
      }
    }
  },
  methods: {
    async getDetail() {
      const data = await userApi.getRoleDetail({ id: this.data.id });
      this.checkedKeys = data.object.menus;
      console.log('111111')
      console.log(this.checkedKeys)
      console.log('--------')
    },
    async submit() {
      console.log(this.checkedKeys)
      const data = await userApi.updateRole({
        id: this.data.id,
        menus: this.checkedKeys
      });
      this.$message.success("角色页面权限配置成功");
      this.cancel()
    },
    cancel() {
      this.dialogVisible = false;
    },
    checkChange(node, list) {
      this.checkedKeys = [ ...list.checkedKeys, ...list.halfCheckedKeys ]
    }
  }
};
</script>
<style lang="scss" scoped>
.role-tree-wrapper {
}
</style>