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
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="日期" sortable>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
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
      :total="11"
      :page-size="10"
      :current-page="1"
      :hide-on-single-page="true"
      @current-change="currentChange"
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
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
      tag: "家"
    };
    return {
      tableData: Array(10).fill(item),
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
  methods: {
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
      console.log("cc");
      console.log(current);
    }
    // prevClick(current) {
    //   console.log(current); //跳转上一页
    // },
    // nextClick(current) {
    //   console.log(current); //跳转下一页
    // }
  }
};
</script>

<style scoped>
</style>
