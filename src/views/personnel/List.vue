<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="personnelList"
      tooltip-effect="dark"
      style="width: 100%"
      border
      size="mini"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.time }}</template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>

      <el-table-column prop="description" label="变更" show-overflow-tooltip></el-table-column>
      <el-table-column prop="detail" label="详细" width="120"></el-table-column>
    </el-table>

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
  </div>
</template>

<script>
import Axios from "axios";
export default {
  created() {
    this.listEmployees();
  },
  data() {
    return {
      personnelList: [{}],
      current: 1, //当前页面
      size: 10, //每页显示条数
      total: 0
    };
  },
  methods: {
    currentChange(current) {
      console.log(current);
      //跳转指定页面
      this.current = current;
      console.log(current);
      this.listEmployees();
    },
    listEmployees() {
      Axios.get(this.$global_msg.host + "personnel/list", {
        params: {
          current: this.current,
          size: this.size
        }
      }).then(resp => {
        console.log(resp);
        this.personnelList = resp.data.data.records;
        this.current = resp.data.data.current;
        this.size = resp.data.data.size;
        this.total = resp.data.data.total;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 10px;
}
</style>