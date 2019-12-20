<template>
  <div id="userList">
    <el-button icon="el-icon-search" circle @click="updateUser"></el-button>
    <el-table
      ref="multipleTable"
      :data="users"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      v-loading="loading"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="number" label="学号"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="classInfo" label="班级"></el-table-column>
    </el-table>
  </div>
</template>


<script>
import axios from "axios";
export default {
  beforeCreate() {
    axios.get("http://zmblog.wang/maker/user/list").then(resp => {
      console.log(resp);
      this.users = resp.data.data;
    });
  },
  data() {
    return {
      users: [],
      loading: false
    };
  },
  methods: {
    updateUser() {
      axios.get("http://zmblog.wang/maker/user/list").then(resp => {
        console.log(resp);
        this.users = resp.data.data;
      });
    },
    handleClick(row) {
      console.log(row);
    },
    quit() {
      console.log("quit");
    },
    handleSelectionChange() {},
    filterTag() {},
    deleteUser() {
      console.log("删除了");
    },
    //点击每个表格栏
    click(row, column, cell, event) {
      // alert("ddd");
      console.log(row);
    }
  }
};
</script>

<style scoped>
</style>
