<template>
  <div>
    welcome!
    <b>{{ form.name }}</b>
    <div class="content">
      <!-- 数据栏 -->
      <div class="panel-group">
        <div class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper el-icon-user-solid"></div>
            <div class="card-panel-description">
              <div class="card-panel-text">员工</div>
              <span class="card-panel-num">{{ this.numbers.employee }}</span>
            </div>
          </div>
        </div>
        <div class="card-panel-col">
          <div class="card-panel">
            <div
              class="el-icon-menu el-icon-user-solid iconfont icon-bumen card-panel-icon-wrapper"
            ></div>
            <div class="card-panel-description">
              <div class="card-panel-text">部门</div>
              <span class="card-panel-num">{{ this.numbers.department }}</span>
            </div>
          </div>
        </div>
        <div class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper el-icon-eleme"></div>
            <div class="card-panel-description">
              <div class="card-panel-text">工作</div>
              <span class="card-panel-num">{{ this.numbers.job }}</span>
            </div>
          </div>
        </div>
        <div class="card-panel-col">
          <div class="card-panel">
            <div class="el-icon-tickets iconfont icon-personnel-file card-panel-icon-wrapper"></div>
            <div class="card-panel-description">
              <div class="card-panel-text">人事变更</div>
              <span class="card-panel-num">{{ this.numbers.personnel }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 图表栏 -->
      <el-divider></el-divider>
      <div class="charts-table">
        <!-- 饼图 -->
        <div class="t1">
          <h2>工作人数表</h2>
          <ve-pie :data="chartData"></ve-pie>
        </div>
        <!-- 地图 -->
        <div class="t2">
          <h2>员工分布表</h2>
          <ve-map :data="chartData1"></ve-map>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  //计算属性，监测vuex 数据
  computed: mapState(["userId", "isSuper"]), //得到vuex 里面的用户信息
  created() {
    // 声命周期钩子函数, 用于获取部门，工作，学历列表
    if (this.userId != null) {
      axios
        .get(
          this.$global_msg.host + "employee/getEmployeeById?id=" + this.userId
        )
        .then(resp => {
          console.log(resp);
          this.form = resp.data;
          console.log(this.form);
        });
    }
    //饼图数据
    axios.get(this.$global_msg.host + "job/numbers").then(resp => {
      console.log(resp);
      this.chartData.rows = resp.data.data;
    });
    //地图数据
    axios.get(this.$global_msg.host + "employee/map").then(resp => {
      console.log(resp);
      this.chartData1.rows = resp.data.data;
    });
    //欢迎页面的数据
    axios.get(this.$global_msg.host + "job/welcome").then(resp => {
      console.log(resp);
      this.numbers.employee = resp.data.data.employeeNumber;
      this.numbers.job = resp.data.data.jobNumber;
      this.numbers.department = resp.data.data.departmentNumber;
      this.numbers.personnel = resp.data.data.personnelNumber;
    });
  },
  data() {
    return {
      chartData1: {
        columns: ["address", "number"],
        rows: [
          { address: "吉林", number: 123 },
          { address: "北京", number: 2123 },
          { address: "上海", number: 1243 },
          { address: "浙江", number: 5123 }
        ]
      },
      numbers: {
        employee: 0,
        department: 0,
        job: 0,
        personnel: 0
      },
      chartData: {
        columns: ["job", "number"],
        rows: []
      },
      form: {
        address: "",
        authority: 0,
        birthday: "",
        department: null,
        eduLevel: null,
        email: "",
        job: "",
        name: "",
        remark: "",
        sex: null,
        spcialty: "",
        tel: ""
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
}
.panel-group {
  margin-top: 18px;
  display: flex;
  flex-wrap: wrap;
}
.card-panel-col {
  margin-bottom: 6px;
  margin-right: 10px;
  width: 23%;
  .card-panel {
    &:hover {
      background-color: #f8f8f8;
    }
    height: 108px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    color: #666;
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .card-panel-icon-wrapper {
      font-size: 50px;
      margin: 14px 0 0 14px;
      padding: 16px;
      -webkit-transition: all 0.38s ease-out;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .el-icon-user-solid {
      color: #40c9c6;
    }
    .card-panel-description {
      font-weight: 700;
      margin: 26px;
      margin-left: 0;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

.charts-table {
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .t1 {
    width: 50%;
  }
  .t2 {
    width: 50%;
  }
}
</style>