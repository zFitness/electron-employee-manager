<template>
  <div id="userList">
    <div class="searchBar">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="listEmployees">全部信息</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="listEmployees">删除选中</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      v-loading="loading"
      size="mini"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="员工号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">{{ scope.row.sex ? '男': '女' }}</template>
      </el-table-column>
      <el-table-column prop="authority" label="权限">
        <template slot-scope="scope">{{ scope.row.authority ? '管理员': '普通用户' }}</template>
      </el-table-column>
      <!-- <el-table-column prop="eduLevel" label="学历"></el-table-column> -->
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column prop="tag" label="工作" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.job === '架构师' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.job}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">{{ scope.row.state == 'T' ? '员工': '非员工' }}</template>
      </el-table-column>

      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(1, scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="handleClick(2, scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left:5px"
            @onConfirm="handleClick(3, scope.row)"
          >
            <el-button slot="reference" size="small" type="text">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page="current"
      :hide-on-single-page="true"
      @current-change="currentChange"
      class="pagination"
    ></el-pagination>

    <h1>copyright</h1>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      current: 1, //当前页面
      size: 10, //每页显示条数
      total: 0,
      loading: false,
      formLabelWidth: "120px",
      formInline: {
        id: "",
        name: ""
      }
    };
  },
  created() {
    // 声命周期钩子函数
    this.listEmployees();
  },
  methods: {
    // 分页查询
    listEmployees() {
      axios
        .get("http://localhost:8090/employee/list/", {
          params: {
            current: this.current,
            size: this.size
          }
        })
        .then(resp => {
          console.log(resp.data.data.records);
          this.tableData = resp.data.data.records;
          this.current = resp.data.data.current;
          this.size = resp.data.data.size;
          this.total = resp.data.data.total;
        });
    },
    //操作栏处理函数
    handleClick(i, row) {
      console.log(row);
      if (i == 3) {
        axios
          .get("http://localhost:8090/employee/delete/", {
            params: {
              id: row.id
            }
          })
          .then(resp => {
            if (resp.data.code == 200) {
              this.$message("删除成功");
              this.listEmployees();
            }
          });
      }
    },
    handleSelectionChange() {},
    filterTag() {},
    //点击每个表格栏
    click(row, column, cell, event) {
      // alert("ddd");
      console.log(row);
    },
    currentChange(current) {
      //跳转指定页面
      this.current = current;
      console.log(current);
      this.listEmployees();
    },
    search() {}
  }
};
</script>

<style scoped lang='scss'>
.pagination {
  margin-top: 20px;
}
.btn-color {
  background-color: #c62f2f;
}
</style>
