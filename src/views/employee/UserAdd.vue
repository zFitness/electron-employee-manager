<template>
  <div class="userEdit">
    <div>
      <span>新增员工</span>
      <el-divider></el-divider>
    </div>

    <!-- 编辑表单 -->
    <div class="box">
      <div class="form">
        <el-form ref="form" :model="form" label-width="40px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="邮件">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="技能">
            <el-input v-model="form.spcialty"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="form.authority" placeholder="选择权限">
              <el-option label="管理员" :value="1"></el-option>
              <el-option label="普通用户" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="form.department" placeholder="选择部门">
              <el-option
                v-for="(department, index) in departments"
                :label="department.name"
                :value="department.id"
                :key="index"
              ></el-option>
            </el-select>
            <el-select v-model="form.job" placeholder="选择工作">
              <el-option
                v-for="(job, index) in jobs"
                :label="job.description"
                :value="job.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="form.eduLevel" placeholder="选择学历">
              <el-option
                v-for="(eduLevel, index) in eduLevels"
                :label="eduLevel.description"
                :value="eduLevel.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="avator">
        <el-avatar shape="square" :size="200" :src="url"></el-avatar>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    // 声命周期钩子函数
    axios.get("http://localhost:8090/employee/otherInfo").then(resp => {
      console.log(resp);
      this.jobs = resp.data.data.jobs;
      this.departments = resp.data.data.departments;
      this.eduLevels = resp.data.data.eduLevels;
    });
  },
  data() {
    return {
      form: {
        address: "",
        authority: 0,
        birthday: "",
        department: null,
        eduLevel: null,
        email: "",
        job: "",
        name: "",
        remark: "",
        sex: null,
        spcialty: "",
        tel: ""
      },
      jobs: [],
      departments: [],
      eduLevels: [],
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  .avator {
    margin-left: 30px;
  }
}
</style>