<template>
  <div class="mybtn">
    <!-- 信息 -->
    <el-popover
      placement="bottom"
      title="信息"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <div>
        <ul>
          <li>
            <span>
              <i class="el-icon-message"></i>
              你妈叫你回家吃饭
            </span>
          </li>
          <li>
            <span>
              <i class="el-icon-message"></i>
              嘿，大吉大利，今晚吃鸡
            </span>
          </li>
        </ul>
      </div>
      <el-button class="min" slot="reference">
        <el-badge :value="2" class="item" type="primary">
          <i class="el-icon-message"></i>
        </el-badge>
      </el-button>
    </el-popover>

    <!-- 软件设置 -->
    <button class="min">
      <i class="el-icon-setting el-icon-user iconfont icon-shezhi"></i>
    </button>
    <el-divider direction="vertical" class="el-divider"></el-divider>
    <!-- 最小化按钮 -->
    <button @click="min" class="min">
      <i class="el-icon-minus"></i>
    </button>
    <!--最大化按钮  -->
    <button @click="max" class="max">
      <i class="el-icon-plus iconfont icon-zuidahua"></i>
    </button>
    <!-- 关闭按钮 -->
    <button @click="close" class="close">
      <i class="el-icon-close"></i>
    </button>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  data() {
    return {};
  },
  methods: {
    max() {
      console.log("max");
      ipcRenderer.send("max");
    },
    min() {
      console.log("min");
      ipcRenderer.send("min");
    },
    close() {
      console.log("close");
      ipcRenderer.send("close");
    }
  }
};
</script>

<style scoped lang='scss'>
.mybtn {
  line-height: 50px;
  color: #df8a8a;
}
.el-divider {
  background-color: #df8a8a;
}
// scss 重复代码块
@mixin btn {
  //   border-radius: 50%;
  padding: 3px;
  border: 0;
  margin-right: 4px;
  color: #df8a8a;
  font-size: 17px;
  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffff;
  }
  i {
    line-height: 20px;
  }
  background-color: transparent;
}
.close {
  @include btn;
}

.max {
  @include btn;
}

.min {
  @include btn;
}
</style>