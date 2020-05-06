<template>
  <div class="goodz-edit-wrapper">
    <el-form
      ref="goodzEditForm"
      label-width="150px"
      size="mini"
      label-position="right"
      :inline="true"
      :model="detail"
    >
      <el-dialog title="商品编辑" :visible.sync="editDialogVisible" width="400px">
        <el-form-item label="商品名称" size="mini">{{detail.title}}</el-form-item>
        <el-form-item label="商品类别" size="mini">{{{0: '服务类', 1: '商品类'}[detail.type]}}</el-form-item>
        <el-form-item label="商品类型" size="mini">{{detail.optionType}}</el-form-item>
        <el-form-item label="所属门店" size="mini">{{detail.storeName}}</el-form-item>
        <el-form-item label="商品状态" size="mini">{{{'-1': '下架', 0: '正常'}[detail.status]}}</el-form-item>

        <el-divider></el-divider>

        <el-form-item
          :label="item.name"
          size="mini"
          v-for="(item, index) in detail.serviceItemVoList"
          :key="index"
          :rules="[
            { required: true, message: '价格不能为空'},
            { type: 'number', message: '价格必须为数字值'}
          ]"
          :prop="`serviceItemVoList[${index}].price`"
        >
          <el-input-number v-model="item.price" :controls="false"></el-input-number>
        </el-form-item>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editCancel">取 消</el-button>
          <el-button type="primary" @click="editSure('goodzEditForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import * as goodzApi from "@/api/goodz";
export default {
  props: {
    value: {
      default: false,
      type: Boolean
    },
    editItem: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      detail: {
        serviceItemVoList: []
      },
      editDialogVisible: false
    };
  },
  watch: {
    value(val) {
      this.editDialogVisible = val;
    },
    editDialogVisible(val) {
      this.$emit("input", val);
      val && this.getDetail();
    }
  },
  methods: {
    async getDetail() {
      const data = await goodzApi.getGoodzDetail({ goodzId: this.editItem.id });
      this.detail = data.object;
    },
    async updateGoodz() {
      let params = {
        goodzId: this.detail.id,
        status: this.detail.status,
        serviceItemEditParamList: []
      };
      this.detail.serviceItemVoList.map((ele, index) => {
        params.serviceItemEditParamList.push({
          id: ele.id,
          price: ele.price
        });
      });
      const data = await goodzApi.updateGoodz(params);
      this.$message.success(`修改成功`);
      this.editCancel();
    },
    editCancel() {
      this.editDialogVisible = false;
    },
    editSure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateGoodz();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.goodz-edit-wrapper {
}
</style>