<template>
  <div class="box">
    <div class="left">
      <div class="form">
        <input type="email" placeholder="邮箱" v-model="form.email" />
        <input type="password" placeholder="用户密码" v-model="form.password" />
        <button @click="submit">确认</button>
      </div>
    </div>
    <div class="right">dd</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    submit() {
      if (this.form.email == "" || this.form.password == "") {
        this.$message("请输入正确的内容");
      } else {
        let _this = this;
        let params = new URLSearchParams();
        params.append("email", this.form.email);
        params.append("password", this.form.password);
        //踩坑了， axios 的post请求默认 提交的是 application/json, 而 springmvc 得接收post请求是 x-www-form-urlencoded
        axios({
          method: "POST",
          url: "http://localhost:8090/login",
          data: params
        }).then(res => {
          console.log(res.data.data.token);
          _this.changeLogin(res.data.data.token);
          _this.$router.push("/");
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  background-color: transparent;
  height: 100%;
  width: 100%;
}
.left {
  height: 100%;
  width: 50%;
  background-color: #3c589a;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.form {
  //   background-color: #3c589a;
  height: 480px;
  width: 270px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
}
.right {
  width: 50%;
  background-color: blue;
}
</style>