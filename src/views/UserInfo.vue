<template>
  <!-- 用户信息查看页面 -->
  <div class="userInfo">
    <div class="demo-fit">
      <div class="block">
        <el-avatar shape="square" :size="200" :src="url"></el-avatar>
      </div>
    </div>
    <div class="info">
      <div class="name">
        <div class="left">
          <span>zfitness</span>
          <span>
            <i class="el-icon-male"></i>
          </span>
        </div>
        <div class="right">
          <button @click="edit">编辑个人资料</button>
        </div>
      </div>
      <hr />
      <div>
        地区：
        <span>湖南张家界</span>
      </div>
      <div>
        爱好：
        <span>coding， 游戏， 运动</span>
      </div>
      <div>
        个人介绍：
        <span>我是一个唯物主义者。</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    edit() {
      this.$router.push("/userEdit");
    }
  }
};
</script>
<style lang="scss" scoped>
.userInfo {
  display: flex;
  width: 100%;
}
.info {
  width: 90%;
  margin-left: 32px;
  .name {
    font-size: 23px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
