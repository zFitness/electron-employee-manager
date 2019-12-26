<template>
  <div class="bar">
    <!-- 右上角窗口标题 -->
    <div class="title">
      <span>
        <i class="el-icon-male"></i> 人事管理
      </span>
      <button style="margin-left:80px" @click="goback">
        <i class="el-icon-arrow-left"></i>
      </button>
      <button @click="goforward">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>

    <!-- 自定义关闭栏， 但是不能设置拖动，否则会不能点击 -->
    <div class="right">
      <!-- 头像部分 -->
      <div class="avatar" @click="handleCommand('a')">
        <el-avatar
          :size="25"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          v-if="avator_url == null"
        ></el-avatar>
        <el-avatar :size="25" :src="avator_url" v-else></el-avatar>
      </div>
      <!-- 头像旁边的下拉栏 -->
      <el-dropdown
        trigger="click"
        class="el-dropdown-link"
        @command="handleCommand"
        placement="bottom-end"
      >
        <span class="el-dropdown-link">
          <span v-if="isSuper">管理员</span>
          <span v-else>用户</span>
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="top:40px" size="mini">
          <el-dropdown-item disabled>用户菜单</el-dropdown-item>
          <el-dropdown-item command="a">个人信息</el-dropdown-item>
          <el-dropdown-item>绑定社交账号</el-dropdown-item>
          <el-dropdown-item command="b">关于</el-dropdown-item>

          <el-dropdown-item divided command="d">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 放大，缩小，关闭按钮 -->
      <mmcButton></mmcButton>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");
import mmcButton from "../components/max-min-close";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    mmcButton
  },
  computed: mapState(["userId", "isSuper", "avator_url"]), //得到vuex 里面的用户信息
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goforward() {
      this.$router.go(1);
    },
    handleCommand(command) {
      console.log("111");
      switch (command) {
        case "a":
          this.$router.push({ name: "userInfo", params: { id: this.userId } });
          break;
        case "b":
          this.$router.push({ name: "about" });
          break;
        case "d":
          sessionStorage.setItem("token", "");
          this.$router.push("/login");
          break;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.avatar {
  margin-top: 10px;
  line-height: 50px;
}
.bar {
  // 开启flex布局
  display: flex;
  // 垂直居中对齐
  align-items: center;
  justify-content: space-between;
  height: 50px;
  // 可以拖动
  -webkit-app-region: drag;
  // 字体颜色
  color: #ffffff;
  /* 最上面那一栏的背景颜色 */
  background-color: #c62f2f;
}
.title {
  cursor: pointer;
  padding-left: 35px;
  font-size: 18px;
  line-height: 50px;
  font-family: "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  // 设置标题按钮不可以拖动
  -webkit-app-region: no-drag;
  button > i {
    color: #ffffff;
  }
  button {
    // 设置鼠标放上去的样式
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #a82828;
    &:focus {
      outline: none;
    }
    &:active {
      background-color: #a82828;
    }
  }
}
.right {
  cursor: pointer;
  font-size: 18px;
  display: flex;
  // 居中对齐
  align-items: center;
  color: #eec1c1;
  // 设置关闭按钮不可以拖动
  -webkit-app-region: no-drag;
  &:focus {
    outline: none;
  }
}
.el-dropdown-link {
  margin-right: 8px;
  margin-left: 8px;
  color: #eec1c1;
}
</style>