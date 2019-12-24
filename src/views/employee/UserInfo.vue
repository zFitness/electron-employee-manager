<template>
  <!-- 用户信息查看页面 -->
  <div class="userInfo">
    <div class="demo-fit">
      <div class="block">
        <el-avatar shape="square" :size="200" :src="url"></el-avatar>
      </div>
    </div>
    <div class="info">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ user.name }} &emsp;</span>
          <span>
            <i
              :class="user.sex?'el-icon-male':'el-icon-female'"
              style="color:#409EFF;font-size:28px"
            ></i>
          </span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="editUser">编辑个人信息</el-button>
        </div>
        <div>
          地区：
          <span>{{ user.address }}</span>
        </div>
        <div>
          权限：
          <span>{{ user.authority?'管理员':'普通用户' }}</span>
        </div>
        <div>
          部门：
          <span>{{ user.department }}</span>
        </div>
        <div>
          学历：
          <span>{{ user.eduLevel }}</span>
        </div>
        <div>
          职务：
          <span>{{ user.job }}</span>
        </div>
        <div>
          电话：
          <span>{{ user.tel }}</span>
        </div>
        <div>
          邮箱：
          <span>{{ user.email }}</span>
        </div>
        <div>
          技能：
          <span>{{ user.spcialty }}</span>
        </div>
        <div>
          个人介绍：
          <span>{{ user.remark }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  computed: mapState(["userId", "isSuper"]), //得到vuex 里面的用户信息
  created() {
    Axios.get(
      this.$global_msg.host + "employee/getUserById?id=" + this.$route.params.id
    ).then(resp => {
      console.log(resp);
      this.user = resp.data;
    });
  },
  data() {
    return {
      fits: ["fill"],
      user: {
        address: "张家界",
        authority: 1,
        birthday: "2019-12-20",
        department: "开发部",
        eduLevel: "大本",
        email: "dd@qq.com",
        id: 28,
        job: "架构师",
        name: "郑",
        password: "123",
        remark: "哈哈哈哈",
        sex: 1,
        spcialty: "java, python",
        state: "T",
        tel: "123"
      },
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    editUser() {
      this.$router.push({
        name: "editMe",
        params: { id: this.$route.params.id }
      });
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
