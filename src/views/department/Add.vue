<template>
  <div class="userEdit">
    <div>
      <span>新增部门</span>
      <el-divider></el-divider>
    </div>

    <!-- 编辑表单 -->
    <div class="box">
      <div class="form">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini">
          <el-form-item label="部门名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="经理员工号" prop="managerId">
            <el-input v-model="form.managerId"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="简介" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button @click="reset('form')">重置</el-button>
          </el-form-item>
        </el-form>
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
    // 声命周期钩子函数, 用于获取部门，工作，学历列表
    axios.get(this.$global_msg.host + "employee/otherInfo").then(resp => {
      console.log(resp);
      this.jobs = resp.data.data.jobs;
      this.departments = resp.data.data.departments;
      this.eduLevels = resp.data.data.eduLevels;
    });
  },
  data() {
    return {
      form: {
        name: "",
        managerId: null,
        description: ""
      },
      jobs: [],
      departments: [],
      eduLevels: [],
      rules: {
        name: [
          { required: true, message: "请输入部门名", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        managerId: [
          { required: true, message: "请输入经理员工号", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入部门描述", trigger: "blur" }
        ]
      },
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    reset(form) {
      this.$refs[form].resetFields();
    },
    onSubmit(form) {
      console.log("submit!");
      this.$refs[form].validate(valid => {
        if (valid) {
          axios
            .request({
              method: "post",
              url: this.$global_msg.host + "department/add",
              data: this.form,
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
            .then(
              resp => {
                console.log(resp);
                if (resp.data.code == 200) {
                  this.$notify({
                    title: "成功",
                    message: "插入成功了",
                    type: "success"
                  });
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: resp.data.message
                  });
                }
              },
              error => {
                this.$notify.error({
                  title: "失败",
                  message: "连接服务器失败"
                });
              }
            );
        } else {
          this.$notify.error({
            title: "失败",
            message: "表单不合法"
          });
          return false;
        }
      });
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