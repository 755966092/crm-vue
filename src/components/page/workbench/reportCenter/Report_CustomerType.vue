<template>
    <div class="componentsRoot">
        <h3>客户类型统计</h3>
         <el-row>
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
            <el-col :span="3">
                <!-- 选择子公司母公司 -->
                <div class="select rightWrap">
                    <el-select
                        v-model="selectRangeItem"
                        slot="prepend"
                        placeholder="请选择"
                        @change="bigRangeChange"
                    >
                        <el-option
                            v-for="item in rangeData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>

            </el-col>
            <el-col :span="6">
                <!-- 选着子公司 -->
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="parentCompanyList"
                        @change="handleChange"
                        :disabled="rangeFlag"
                        :show-all-levels='false'
                        v-model="children_id"
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
             <el-col :span="4" v-if="selectRangeItem==3" >
                <div class="select rightWrap">
                    <el-select
                        v-model="franchisee_id"
                        placeholder="请选择"
                        @change="getFranchiseeEmp"
                    >
                        <el-option
                            v-for="item in franchiseeList"
                            :key="item.apply_company_id"
                            :label="item.apply_company_name"
                            :value="item.apply_company_id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="selectRangeItem==3?4:6">
                <!-- 选择部门 -->
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        :show-all-levels='false'
                        @change="selectDepartment"
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
            <!-- 当前部门员工 -->
            <el-col :span="selectRangeItem==3?4:6">
                <div class="select rightWrap">
                    <el-select
                        v-model="employees_id"
                        slot="prepend"
                        placeholder="请选择"
                        @change="selectEmployees"
                    >
                        <el-option
                            v-for="item in currentDepartmentStaff"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="3">
                <p class="leftWrap">时间段</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="lastFollowUpTime"
                            @change="timeUpdata"
                            type="daterange"
                            :editable=false
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            placeholder="选择起止时间"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 柱状图 -->
        <div id="myChart"></div>
        <p>
            <span>合同数量: {{tableDataAll.CustomerCount}}</span>
            <span>合同总金额: {{tableDataAll.CustomerMoney}}</span>
            <span class="btn">
                <el-button @click="exportData" type="success">导出</el-button>
            </span>
        </p>
        <!-- 表格 -->
        <div class="tableWrap">
            <template>
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                        prop="cue_type"
                        label="客户类型"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="contract_count"
                        label="合同数量"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="contract_money"
                        label="合同总金额"
                        min-width="130"
                        align="center">
                    </el-table-column>
                   
                   
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
  name: "contract-summary",
  data() {
    return {
      // 加盟公司id
      franchisee_id: "",
      franchiseeList: [],
      // 范围数据
      rangeData: [
        {
          label: "母公司",
          value: 1
        },
        {
          label: "子公司",
          value: 2
        },
        {
          label: "加盟商",
          value: 3
        }
      ],
      clientType: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "学校"
        },
        {
          value: "2",
          label: "机构"
        },
        {
          value: "3",
          label: "教师"
        },
        {
          value: "4",
          label: "学生"
        }
      ],
      clientTypeData: "全部",
      // 当前公司部门
      currentCompanyDepartment: [],
      // 当前公司下的部门
      parentCompanyDepartment: [],
      // 当前部门员工列表
      currentDepartmentStaff: [],
      selectRangeItem: 1,
      // 范围
      parentCompanyList: [],
      // 母公司id
      mother_id: "",
      // 当前子公司id
      children_id: [],
      // 当前部门id
      department_id: "",
      // 当前员工id
      employees_id: "",
      // 当前员工姓名
      employees_id: "",
      // 最后跟进时间
      lastFollowUpTime: "",
      // 时间选择器
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 柱状图时间 ['2017-5','2017-6','2017-7','2017-8','2017-9','2017-10']
      histogramDate: ["学校", "机构", "教师", "学生"],
      // 柱状图数据
      histogramData: {
        clueFrequency: [2, 3, 1, 4],
        clientFrequency: [50000, 60000, 30000, 60000]
      },
      // 表格数据
      tableData: [],
      //列表上页(总)
      tableDataAll: []
    };
  },
  methods: {
    // 获取加盟商员工
    getFranchiseeEmp() {
      let self = this;
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/department/getChildrenDepartmentTo",
          data: {
            token: localStorage.getItem("crm_token"),
            mother_id: self.franchisee_id
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            self.getMenuName(res.data.data.list);
            console.log(
              "获取部门所有部门数据:" + JSON.stringify(res.data, null, 4)
            );
            self.currentCompanyDepartment = res.data.data.list;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 选着客户类型
    radioChange(data) {
      console.log(data);
      console.log(this.clientTypeData);
    },
    // 当前母公司下的所有部门
    getDepartment() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/department/getChildrenDepartment",
        data: {
          token: localStorage.getItem("crm_token"),
          mother_id: localStorage.getItem("motherCompanyId")
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            // 当前母公司下的部门 parentCompanyDepartment
            // console.log(JSON.stringify(res.data.data,null,4))
            // console.log(self.mother_id)
            self.getMenuName(res.data.data.list);
            self.currentCompanyDepartment = res.data.data.list;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 当前子公司下的所有部门
    getChildrenDepartment() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/department/getChildrenDepartmentTo",
        data: {
          token: localStorage.getItem("crm_token"),
          mother_id: self.children_id[self.children_id.length - 1]
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            // 当前子公司下的部门 parentCompanyDepartment
            self.getMenuName(res.data.data.list);
            self.currentCompanyDepartment = res.data.data.list;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 子公司变化
    handleChange(data) {
      if (this.selectRangeItem == 3) {
        // 获取加盟商
        this.getFranchiseeList();
      } else {
        // 获取子公司所有部门

        this.getChildrenDepartment();
        this.filterClue();
      }
    },
    // 获取加盟商列表
    getFranchiseeList() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/joiningTrader/FranchiseeMyListId",
        data: {
          token: localStorage.getItem("crm_token"),
          company_id: self.children_id[self.children_id.length - 1]
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            console.log(JSON.stringify(res.data.data, null, 4));
            self.$message({
              message: "成功",
              type: "success"
            });
            self.franchiseeList = res.data.data.list;
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 子公司/ 母公司/ 加盟商修改
    bigRangeChange(data) {
      this.selectRangeItem = data;
      //  if (data === 1) {
      //      // 获取母公司
      //      this.applyCompany();
      //      this.filterClue()
      //  }else if(data === 2){
      //     // 获取子公司
      //      this.applyCompany();
      //      this.filterClue()
      //  }else if(data === 3){
      //      // 获取加盟商公司
      //       this.applyCompany();
      //       this.filterClue()
      //   }
      this.filterClue();
    },
    // 处理树形数据, 删除空的children
    getMenuName(menus) {
      for (var value of menus) {
        if (value.children) {
          this.getMenuName(value.children);
        }
        if (value.children.length == 0) {
          delete value.children;
        }
      }
    },
    // 所有子公司
    applyCompany() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/company/CompanyMyList",
        data: {
          token: localStorage.getItem("crm_token")
        }
      })
        .then(function(res) {
          if (res.data.code == 200) {
            // 当前用户只会有一个母公司
            self.getMenuName(res.data.data.list);
            self.parentCompanyList = res.data.data.list;
            self.mother_id = localStorage.getItem("motherCompanyId");
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 选择部门
    selectDepartment(data) {
      // department_id
      console.log(data);
      let department = this.department_id;
      this.department_id = data[data.length - 1];
      // 获取部门所有员工
      if (department !== this.department_id) {
        this.getDepartmentEmployees();
        this.filterClue();
      }
    },
    // 获取部门所有员工
    getDepartmentEmployees() {
      console.log("获取部门所有员工");
      let self = this;
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/department/makeAdminDepartmentList",
          data: {
            token: localStorage.getItem("crm_token"),
            department_id: self.department_id
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            console.log("获取部门所有员工:" + self.department_id);

            for (var i = 0; i < res.data.data.list.length; i++) {
              var obj = res.data.data.list[i];
              obj.label = obj.user_name;
              obj.value = obj.user_id;
            }
            console.log(
              "获取部门所有员工数据:" + JSON.stringify(res.data, null, 4)
            );
            self.currentDepartmentStaff = res.data.data.list;
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // selectEmployees 选择员工
    selectEmployees(data) {
      console.log(this.employees_id);
      console.log(data);
      // this.employees_id =
      this.filterClue();
    },
    filterClue() {
      console.log("筛选表格数据");
      // 筛选表格数据
      // console.log(this.clueType)
      let self = this;
      if (self.lastFollowUpTime == null) {
        self.lastFollowUpTime = "";
      }
      let obj = {
        type: self.selectRangeItem,
        token: localStorage.getItem("crm_token"),
        statu: "",
        create_start: self.lastFollowUpTime[0],
        create_end: self.lastFollowUpTime[1],
        children_id:
          self.selectRangeItem == 3
            ? self.franchisee_id
            : self.children_id[self.children_id.length - 1],
        department_id: self.department_id,
        user_id: self.employees_id,
        name: ""
      };

      console.log("请求参数:" + JSON.stringify(obj, null, 4));
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/reportCenter/CtmJournaling",
          data: obj
        })
        .then(function(res) {
          if (res.data.code === 200) {
            // console.log('返回参数:');
            console.log(res);
            console.log("返回参数:" + JSON.stringify(res.data, null, 4));
            self.histogramData.clueFrequency = [0, 0, 0, 0];
            self.histogramData.clientFrequency = [0, 0, 0, 0];
            for (var i = 0; i < res.data.data.list.length; i++) {
              let element = res.data.data.list[i];
              self.histogramData.clueFrequency[element.cue_type - 1] =
                element.contract_count;
              self.histogramData.clientFrequency[element.cue_type - 1] =
                element.contract_money;
              if (element.cue_type == 1) {
                element.cue_type = "学校";
              } else if (element.cue_type == 2) {
                element.cue_type = "机构";
              } else if (element.cue_type == 3) {
                element.cue_type = "教师";
              } else if (element.cue_type == 4) {
                element.cue_type = "学生";
              }
              for (let key in obj) {
                if (obj[key] == null) {
                  obj[key] = "-";
                }
              }
            }
            console.log(JSON.stringify(res.data.data.list, null, 4));
            self.tableData = res.data.data.list || [];
            self.tableDataAll = res.data.data;

            self.drawLine();
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 更新时间
    timeUpdata(data) {
      this.filterClue();
    },
    // 导出
    exportData() {
      console.log("导出筛选数据");
      // 导出筛选数据
      // console.log(this.clueType)
      let self = this;

      let obj = {
        type: self.selectRangeItem,
        token: localStorage.getItem("crm_token"),
        statu: 1,
        followup_start: self.lastFollowUpTime[0],
        followup_end: self.lastFollowUpTime[1],
        children_id:
          self.selectRangeItem == 3
            ? self.franchisee_id
            : self.children_id[self.children_id.length - 1],
        department_id: self.department_id,
        user_id: self.employees_id,
        name: ""
      };

      console.log("请求参数:" + JSON.stringify(obj, null, 4));
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/reportCenter/CtmJournaling",
          data: obj
        })
        .then(function(res) {
          // console.log('返回参数:');
          console.log(JSON.stringify(res.data, null, 4));
          window.open("http://crm.tonyliangli.cn" + res.data.url);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    drawLine() {
      let self = this;
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["合同数", "合同总金额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: self.histogramDate
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "合同数"
          },
          {
            type: "value",
            name: "合同总金额"
          }
        ],
        series: [
          {
            name: "合同数",
            type: "bar",
            data: self.histogramData.clueFrequency
          },
          {
            name: "合同总金额",
            type: "bar",
            yAxisIndex: 1,
            data: self.histogramData.clientFrequency
          }
        ]
      });
    }
  },
  computed: {
    // 是否禁用子公司选择框
    rangeFlag() {
      if (this.selectRangeItem == 1) {
        // 如果选择母公司, 禁用选公司列表, 请求母公司部门
        this.getDepartment();
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {},
  created() {
    this.applyCompany();
    this.filterClue();
    if (localStorage.getItem("cityData")) {
      console.log("有缓存");
      this.cityList = JSON.parse(localStorage.getItem("cityData"));
    } else {
      console.log("无缓存");
      this.requestCity();
    }
  }
};
</script>

<style scoped>
@import "../css/clue.css";

.leftWrap,
.rightWrap {
  line-height: 40px;
  height: 40px;
}

.el-row {
  margin: 5px 0;
}

/* 省市区选着器 */
.el-cascader {
  width: 95%;
}

.select .el-select {
  width: 90%;
}
#myChart {
  width: 50%;
  height: 250px;
  padding: 15px;
}
.tableWrap {
  padding: 20px 0;
}
.btn {
  padding-left: 50px;
}
</style>
