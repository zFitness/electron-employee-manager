<template>
  <div>
    <el-menu
      :default-openeds="['1']"
      background-color="#F5F5F7"
      text-color="#5C5C5C"
      active-text-color="#000000"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>员工管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="openPage(1)">员工列表</el-menu-item>
          <el-menu-item index="1-2" @click="openPage(2)">用户列表2</el-menu-item>
          <el-menu-item index="1-2" @click="openPage(4)">用户信息</el-menu-item>
          <el-menu-item index="1-2" @click="openPage(5)">增加用户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>人事管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>个人信息
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    openPage(i) {
      switch (i) {
        case 1:
          this.$router.push("/user");
          break;
        case 2:
          this.$router.push("/job");
          break;
        case 3:
          this.$router.push("/about");
          break;
        case 4:
          this.$router.push("/userInfo");
          break;
        case 5:
          this.$router.push("/userAdd");
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>