<template>
  <div class="mybtn">
    <button @click="min" class="min">
      <i class="el-icon-minus"></i>
    </button>
    <button @click="max" class="max">
      <i class="el-icon-plus"></i>
    </button>
    <button @click="close" class="close">
      <i class="el-icon-close"></i>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.mybtn {
  line-height: 50px;
  // 设置关闭按钮不可以拖动
  -webkit-app-region: no-drag;
}
// scss 重复代码块
@mixin btn {
  border-radius: 50%;
  padding: 3px;
  border: 0;
  margin-right: 4px;
  width: 20px;
  height: 20px;
  &:focus {
    outline: none;
  }
  i {
    line-height: 10px;
  }
}
.close {
  @include btn;
  background-color: rgb(255, 95, 86);
  &:hover {
    background-color: rgb(224, 68, 62);
  }
}

.max {
  @include btn;
  background-color: rgb(255, 189, 46);
  &:hover {
    background-color: rgb(222, 161, 35);
  }
}

.min {
  background-color: rgb(39, 201, 63);
  @include btn;
  &:hover {
    background-color: rgb(26, 171, 41);
  }
}
</style>