<template>
  <div class="userEdit">
    <div>
      <span>新增员工</span>
      <el-divider></el-divider>
    </div>

    <!-- 编辑表单 -->
    <div class="box">
      <div class="form">
        <el-form ref="form" :model="form" label-width="40px" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="form.authority" placeholder="选择权限">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="普通用户" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="form.department" placeholder="选择部门">
              <el-option label="开发部" value="1"></el-option>
              <el-option label="销售部" value="0"></el-option>
            </el-select>
            <el-select v-model="form.job" placeholder="选择工作">
              <el-option label="架构师" value="1"></el-option>
              <el-option label="程序员" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="avator">
        <el-avatar shape="square" :size="200" :src="url"></el-avatar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
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
      fits: ["fill"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  .avator {
    margin-left: 30px;
  }
}
</style>