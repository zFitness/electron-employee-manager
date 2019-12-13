<template>
  <div class="head">
    <el-dropdown>
      <i class="el-icon-user-solid" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>查看</el-dropdown-item>
        <el-dropdown-item>新增</el-dropdown-item>
        <el-dropdown-item>删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>王小虎</span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.head {
  /* display: flex;
  flex-direction: column; */
}
</style>