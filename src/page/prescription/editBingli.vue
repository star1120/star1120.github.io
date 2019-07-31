<template>
  <div class>
    <el-form :model="patientData" size="small" ref="patientData" label-width="100px">
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="patientData.name" :disabled="disabled" placeholder="请输入姓名"></el-input>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="patientData.age" :disabled="disabled" placeholder="请输入年龄"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="patientData.sex" :disabled="disabled" placeholder="请选择性别">
          <el-option label="未知" :value="0"></el-option>
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="patientData.phone" :disabled="disabled" placeholder="请输入电话"></el-input>
      </el-form-item>

      <el-form-item label="籍贯" prop="birthplace">
        <el-input v-model="patientData.birthplace" :disabled="disabled" placeholder="请输入籍贯"></el-input>
      </el-form-item>

      <el-form-item label="出生年月" prop="birth">
        <el-date-picker
          :disabled="disabled"
          v-model="patientData.birth"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="病史" prop="history">
        <el-input
          type="textarea"
          :rows="2"
          v-model="patientData.history"
          :disabled="disabled"
          placeholder="请输入病史"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
      <div class="ui-flex-1"></div>
      <el-button size="small" type="primary" v-if="!patientData.id" @click="addPatient">新增</el-button>
      <el-button
        size="small"
        type="primary"
        v-if="patientData.id && !disabled"
        @click="editPatient"
      >编辑</el-button>
    </div>
  </div>
</template>

<script>
import path from "../../service/path";
import moment from "moment";

const birthFormat = "YYYY-MM-DD";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    };
  },
  props: ["patientData", "disabled"],
  created() {},
  mounted() {},
  methods: {
    //编辑
    editPatient() {
      this.patientData.birth = moment(this.patientData.birth).format(
        birthFormat
      );
      this.$api.post(path.savePatientInfo, this.patientData, res => {
        this.$message.success("操作成功！");
        this.$emit("getList"); // 刷新列表
        this.$emit("closeBingliDialog");
      });
    },
    //  新增 和 修改病患信息
    addPatient() {
      // 格式化生日
      this.patientData.birth = moment(this.patientData.birth).format(
        birthFormat
      );
      this.$api.post(path.addPatient, this.patientData, res => {
        this.$message.success("操作成功！");
        this.$emit("closeBingliDialog");
        this.$emit("getList"); // 刷新列表
      });
    }
  },

  watch: {
    $route() {
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      }
    }
  }
};
</script>

<style>
</style>


