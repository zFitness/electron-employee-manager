<template>
  <div class="box">
    <div class="card" v-for="(department, index) in departments" :key="index">
      <el-card body-style="width:300px;padding:0px">
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px;">
          <el-divider style="margin:4px 0"></el-divider>
          <div class="between">
            <el-tag>
              <span>
                <i class="el-icon-school"></i>
                部门
              </span>
            </el-tag>
            <span style="font:14px Base">{{department.name}}</span>
          </div>
          <el-divider class="el-divider--horizontal"></el-divider>
          <div class="between">
            <el-tag type="success">
              <span>
                <i class="el-icon-school"></i>
                经理
              </span>
            </el-tag>
            <span style="font:14px Base">{{ department.manager!=null?department.manager.name:'无'}}</span>
          </div>
          <el-divider style="margin:4px 0">介绍</el-divider>
          <div>
            <span style="font:13px Extra Small;color: #999;">{{ department.intro }}</span>
          </div>
          <div class="bottom clearfix">
            <el-button type="text" class="button">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <br />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      departments: []
    };
  },
  created() {
    axios.get("http://localhost:8090/department/list").then(resp => {
      console.log(resp);
      this.departments = resp.data.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
}

.card {
  display: flex;
  width: 50%;
}
.image {
  width: 100%;
}
.between {
  display: flex;
  justify-content: space-between;
}
.el-divider--horizontal {
  margin: 4px 0;
}
</style>