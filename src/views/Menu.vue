<template>
  <div>
    <el-menu
      :default-openeds="['1']"
      background-color="#F5F5F7"
      text-color="#5C5C5C"
      active-text-color="#000000"
    >
      <el-menu-item index="2" @click="openPage(9)">
        <i class="el-icon-eleme iconfont icon-panel"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1" v-if="this.isSuper">
        <template slot="title">
          <i class="el-icon-user iconfont icon-yuangongguanli"></i>员工管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="openPage(1)">员工列表</el-menu-item>
          <el-menu-item index="1-2" @click="openPage(5)">增加用户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" v-if="this.isSuper">
        <template slot="title">
          <i class="el-icon-tickets iconfont icon-personnel-file"></i>人事管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" @click="openPage(7)">人事纪录</el-menu-item>
          <!-- <el-menu-item index="2-2">选项2</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" v-if="this.isSuper">
        <template slot="title">
          <i class="el-icon-menu el-icon-user iconfont icon-bumen"></i>部门管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="openPage(6)">部门列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting iconfont icon-wode"></i>个人信息
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="openPage(8)">修改基本信息</el-menu-item>
          <!-- <el-menu-item index="3-2">选项2</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  computed: mapState(["userId", "isSuper"]), //得到vuex 里面的用户信息
  methods: {
    openPage(i) {
      switch (i) {
        case 1:
          this.$router.push("/user");
          break;
        case 3:
          this.$router.push("/about");
          break;
        case 5:
          this.$router.push("/userAdd");
          break;
        case 6:
          this.$router.push("/deptlist");
          break;
        case 7:
          this.$router.push("/personnelList");
          break;
        case 8:
          this.$router.push({ name: "editMe", params: { id: this.userId } });
          break;
        case 9:
          this.$router.push("/welcome");
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>