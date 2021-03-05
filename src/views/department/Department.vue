<template>
  <div class="box">
    <div class="box-header">
      <div>
        <span>部门列表</span>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini">添加</el-button>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="content">
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
            <el-divider class="el-divider--horizontal" style="margin-bottom: 10px;"></el-divider>
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
    axios.get(this.$global_msg.host + "department/list").then(resp => {
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
  flex-direction: column;
}
.content {
  display: flex;
  flex-wrap: wrap;
}
.box-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card {
  display: flex;
  width: 30%;
}
.image {
  width: 100%;
  height: 180px;
}
.between {
  display: flex;
  justify-content: space-between;
}
.el-divider--horizontal {
  margin: 4px 0;
}
</style>