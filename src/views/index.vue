<template>
  <el-container style="height: 1000px;">
    <el-header class="header" height="50">
      <Title></Title>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
        <Menu></Menu>
      </el-aside>

      <el-container class="container">
        <!-- 用户姓名 -->
        <!-- <el-header style="text-align: right; font-size: 12px;" class="titlebar">
          <Header></Header>
        </el-header>-->

        <el-main class="content" ref="content">
          <!-- 路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./Menu.vue";
import Header from "./Header.vue";
import Title from "./Title.vue";
// import niceBar from "nice-bar";
// import "nice-bar/dist/css/nice-bar.min.css";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    Menu,
    Header,
    Title
  },
  beforeCreate() {
    // niceBar.init(this.$refs.content);
  }
};
</script>

<style>
/* @import url("nice-bar/dist/js/nice-bar.js"); */
.header {
  padding: 0;
  height: 50px;
}

.el-aside {
  color: #333;
  width: 200px;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.content {
  background-color: light-gray;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  /* overflow: scroll; */
}
.content::-webkit-scrollbar {
  width: 8px;
  height: 1px;
}
/*滚动条里面小方块样式*/
.content::-webkit-scrollbar-thumb {
  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e1e1e2;
}
/*滚动条里面轨道样式*/
.content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: #fafafa;
}

.titlebar {
  flex-shrink: 0;
}
</style>
