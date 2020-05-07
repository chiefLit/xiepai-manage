<template>
  <div class="role-tree-wrapper">
    <el-dialog :title="title" :visible.sync="dialogVisible" width="700px">
      <!-- <el-tree
        :data="totalMenuOptions"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        @check="checkChange"
      ></el-tree>-->
      <el-table
        ref="multipleTable"
        :data="totalMenuOptions"
        tooltip-effect="dark"
        row-key="id"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        default-expand-all
        :tree-props="{children: 'children'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="code" label="CODE"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <el-tag
              :type="{ 0: 'primary', 1: 'danger', 2: 'success' }[scope.row.type]"
              disable-transitions
            >{{ { 0: '菜单', 1: '按钮', 2: '数据' }[scope.row.type] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permissionUrl" label="权限URL">
          <template slot-scope="scope">{{ scope.row.permissionUrl || '无' }}</template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import * as userApi from "@/api/user";
import * as menuApi from "@/api/menu";

// 路由生成pageTree
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

// 接口返回各种列表
function handlerMenuTree(items) {
  return items.map(item => {
    let res = {
      id: item.id,
      label: item.name
    };
    if (item.children && item.children.length)
      res.children = handlerMenuTree(item.children);
    return res;
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
      totalMenuOptions: [],
      checkedOptions: [],
      checkedOptions: [],
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
        this.title = `${this.data.name}-页面权限配置`;
        this.getDetail();
      } else {
        this.checkedOptions = [];
      }
    }
  },
  beforeMount() {
    this.pullMenus();
  },
  methods: {
    async getDetail() {
      const data = await userApi.getRoleDetail({ id: this.data.id });
      this.initCheckedOptions(this.totalMenuOptions, data.object.menus)
      this.toggleSelection(this.checkedOptions)
    },
    // 获取详情之后初始换已选中menu列表
    initCheckedOptions(total, checkedIds) {
      total.map(item => {
        if (checkedIds.some(id => id === item.id)) {
          this.checkedOptions.push(item)
        }
        if (item.children && item.children.length) {
          this.initCheckedOptions(item.children, checkedIds)
        }
      })
    },
    // 选中操作
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    async submit() {
      const params = {
        id: this.data.id,
        menus: this.checkedOptions.map(item => item.id)
      }
      const data = await userApi.updateRole(params);
      this.$message.success("角色页面权限配置成功");
      this.cancel();
    },
    cancel() {
      this.dialogVisible = false;
    },
    async pullMenus() {
      const data = await menuApi.getTreeList();
      this.totalMenuOptions = data.object;
    },
    handleSelectionChange(items) {
      this.checkedOptions = items
    },
    // checkChange(node, list) {
    //   this.checkedOptions = [...list.checkedOptions, ...list.halfCheckedOptions];
    // },
  }
};
</script>
<style lang="scss" scoped>
.role-tree-wrapper {
}
</style>