<template>
  <div id="userList">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="姓名" fixed></el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">{{ scope.row.sex ? '男': '女' }}</template>
      </el-table-column>
      <el-table-column prop="tel" label="电话"></el-table-column>
      <el-table-column prop="email" label="邮件"></el-table-column>
      <el-table-column prop="address" label="住址"></el-table-column>
      <el-table-column prop="eduLevel" label="学历"></el-table-column>
      <el-table-column prop="department" label="部门"></el-table-column>
      <el-table-column label="生日" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="工作"
        :filters="[{ text: '架构师', value: '架构师' }, { text: '开发', value: '开发' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.job === '架构师' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.job}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
          <el-popconfirm
            title="确定删除吗？"
            style="margin-left:5px"
            @onConfirm="deleteUser"
            @onCancel="quit"
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
    <!-- 编辑框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" :modal="false">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <h1>copyright</h1>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      current: 1,
      size: 7,
      total: 0,
      search: "",
      loading: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    // 声命周期钩子函数
    this.listEmployees();
  },
  methods: {
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
    },
    currentChange(current) {
      //跳转指定页面
      this.current = current;
      console.log(current);
      this.listEmployees();
    }
  }
};
</script>

<style scoped lang='scss'>
.pagination {
  margin-top: 20px;
}
</style>
