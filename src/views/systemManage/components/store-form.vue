<template>
  <div class="store-form-wrapper">
    <el-form ref="storeForm" label-position="right" label-width="100px" :model="storeData">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="400px">
        <el-form-item prop="name" label="门店名称" size="mini">
          <el-input v-model="storeData.name"></el-input>
        </el-form-item>
        <el-form-item prop="dutyMan" label="门店负责人" size="mini">
          <!-- <el-select v-model="storeData.dutyMan" placeholder="请选择">
            <el-option
              v-for="item in userOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <el-input v-model="storeData.dutyMan"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="所在地" size="mini">
          <el-cascader :options="areaOptions" v-model="selectedArea" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item prop="address" label="详细地址" size="mini">
          <el-input v-model="storeData.address"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系电话" size="mini">
          <el-input v-model="storeData.phone"></el-input>
        </el-form-item>
        <el-form-item prop="linkMan" label="收件人" size="mini">
          <el-input v-model="storeData.linkMan"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="门店状态" size="mini">
          <el-select v-model="storeData.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
import * as storeApi from "@/api/store";
import { regionData, CodeToText } from "element-china-area-data";

const IStore = {
  name: "",
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
  address: "",
  linkMan: "",
  dutyMan: "",
  phone: "",
  status: 0
};
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
        { label: "正常", value: 0 },
        { label: "禁用", value: -1 }
      ],
      userOptions: [],
      areaOptions: regionData,
      selectedArea: [],

      storeData: {},
      dialogVisible: false
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
      if (val) {
        if (this.data.id) {
          this.getStoreDetail();
          this.title = "编辑店铺";
        } else {
          this.storeData = { ...IStore };
          this.title = "新增店铺";
        }
      }
    }
  },
  mounted() {
    // this.getUserList()
  },
  methods: {
    handleChange(value) {
      this.storeData.provinceCode = value[0];
      this.storeData.provinceName = CodeToText[value[0]];
      this.storeData.cityCode = value[1];
      this.storeData.cityName = CodeToText[value[1]];
      this.storeData.countyCode = value[2];
      this.storeData.countyName = CodeToText[value[2]];
    },
    async getStoreDetail() {
      const data = await storeApi.getStoreDetail({ storeId: this.data.id });
      this.storeData = data.object;
      this.selectedArea = [
        data.object.provinceCode,
        data.object.cityCode,
        data.object.countyCode
      ];
    },
    async getUserList() {
      const data = await userApi.getUserList({ currentPage: 1, pageSize: 200 });
      this.userOptions = data.object.map(item => {
        return {
          label: item.userName,
          value: item.id
        };
      });
    },
    async submit() {
      // console.log(this.$parent)
      // return
      const promise = storeApi.updateStore;
      const data = await promise({
        ...this.storeData,
        storeId: this.storeData.id
      });
      this.$message.success("修改店铺信息成功");
      this.cancel();
      this.$parent.pulldata();
    },
    cancel() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.store-form-wrapper {
  .el-cascader {
    width: 100%;
  }
}
</style>