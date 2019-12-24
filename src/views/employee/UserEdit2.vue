<template>
  <div class="userEdit">
    <div>
      <span>编辑个人信息</span>
      <el-divider></el-divider>
    </div>

    <!-- 编辑表单 -->
    <div class="box">
      <div class="form">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="60px"
          size="mini"
          :inline="true"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="邮件" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="tel">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="技能">
            <el-input v-model="form.spcialty"></el-input>
          </el-form-item>
          <br />
          <br />
          <el-form-item label="生日">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"></el-date-picker>
            </el-col>
          </el-form-item>
          <br />
          <el-form-item label="学历" prop="eduLevel">
            <el-select v-model="form.eduLevel" placeholder="选择学历">
              <el-option
                v-for="(eduLevel, index) in eduLevels"
                :label="eduLevel.description"
                :value="eduLevel.code"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <br />
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <br />
          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <br />
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button @click="reset('form')">重置</el-button>
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
import { mapMutations, mapState } from "vuex";

export default {
  computed: mapState(["userId", "isSuper"]), //得到vuex 里面的用户信息
  created() {
    // 声命周期钩子函数, 用于获取部门，工作，学历列表
    axios.get(this.$global_msg.host + "employee/otherInfo").then(resp => {
      console.log(resp);
      this.jobs = resp.data.data.jobs;
      this.departments = resp.data.data.departments;
      this.eduLevels = resp.data.data.eduLevels;

      // 获取用户信息
      console.log(this.$route.params.id);
      if (this.$route.params.id != null) {
        axios
          .get(
            this.$global_msg.host +
              "employee/getEmployeeById?id=" +
              this.$route.params.id
          )
          .then(resp => {
            console.log(resp);
            this.form = resp.data;
            this.form.password = "";
            console.log(this.form);
          });
      }
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
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 40, message: "长度在 1 到 40 个字符", trigger: "blur" }
        ],
        job: [{ required: true, message: "请选择工作", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        eduLevel: [
          {
            required: true,
            message: "请选择学历",
            trigger: "blur"
          }
        ]
      },
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    onSubmit(form) {
      console.log("submit!");
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
          axios
            .request({
              method: "post",
              url: this.$global_msg.host + "employee/update",
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
                    message: "编辑成功了",
                    type: "success"
                  });
                } else {
                  this.$notify.error({
                    title: "失败",
                    message: "编辑失败了"
                  });
                }
              },
              error => {
                this.$notify.error({
                  title: "失败",
                  message: "编辑失败了"
                });
              }
            );
        } else {
          console.log("error submit!!");
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