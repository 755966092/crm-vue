<template>
    <div class="componentsRoot">
        <h3>日志</h3>
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
                        :show-all-levels=false
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="6">
                <!-- 选择部门 -->
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        :show-all-levels=false
                        @change="selectDepartment"
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
            <!-- 当前部门员工 -->
            <el-col :span="6">
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
          <!-- 客户类型 -->
        <template v-for="(item,index) in selectData">
            <el-row>
                <el-col :span="3">
                    <p class="leftWrap">{{ item.title }}</p>
                </el-col>
                <el-col :span="21">
                    <div class="select rightWrap">
                        <el-radio-group
                            @change="radioChange(index)"
                            v-model="item.value">
                            <el-radio-button
                                v-for="children in item.content"
                                :label="children.value"
                                >
                                {{children.label}}
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>
            </el-row>
        </template>
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
       
        <!-- 表格 -->
        <div class="logTableWrap">
            <el-row>
                <el-col :span="3">批量删除</el-col>
                 <el-col :span="8" :offset="13">
                        <el-input placeholder="请输入内容" v-model="searchIptValue" class="input-with-select">
                            <el-select v-model="optionsValue" slot="prepend" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <el-button slot="append" icon="el-icon-search" class="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
            </el-row>
            <template>
                <el-table
                :data="tableData"
                style="width: 100%">
                  <el-table-column
                            type="selection"
                        >
                        </el-table-column>
                    <el-table-column
                        prop="date"
                        label="跟进时间"
                        min-width="200"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="logs"
                        label="跟进人"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="earlyFollowup"
                        label="模块"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="saleFollowup"
                        label="日志类别"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="saleFollowup"
                        label="客户类型"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="saleFollowup"
                        label="对象"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="saleFollowup"
                        label="联系方式"
                        min-width="100"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="saleFollowup"
                        label="跟进内容"
                        min-width="100"
                        align="center">
                    </el-table-column>
                     <el-table-column
                            label="操作"
                            align="center"
                            width="80"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="showModelTable(scope.$index, scope.row, 'deleteBtn')">删除
                                </el-button>
                            </template>
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
  name: "log-page",
  data() {
    return {
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
      selectData: {
        modules: {
          title: "模块",
          value: "0",
          content: [
            {
              value: "0",
              label: "全部"
            },
            {
              value: "1",
              label: "线索"
            },
            {
              value: "2",
              label: "客户"
            },
            {
              value: "3",
              label: "合同"
            }
          ]
        },
        logs: {
          title: "日志类别",
          value: "0",
          content: [
            {
              value: "0",
              label: "全部"
            },
            {
              value: "1",
              label: "前期跟进"
            },
            {
              value: "2",
              label: "售中跟进"
            },
            {
              value: "3",
              label: "售中服务"
            },
            {
              value: "4",
              label: "售后跟进"
            },
            {
              value: "5",
              label: "售后服务"
            }
          ]
        },
        clientType: {
          title: "客户类型",
          value: "0",
          content: [
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
          ]
        },
        contactType: {
          title: "联系方式",
          value: "0",
          content: [
            {
              value: "0",
              label: "全部"
            },
            {
              value: "1",
              label: "手机"
            },
            {
              value: "2",
              label: "电话"
            },
            {
              value: "3",
              label: "微信"
            },
            {
              value: "4",
              label: "QQ"
            },
            {
              value: "5",
              label: "邮箱"
            }
          ]
        }
      },
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
      children_id: "",
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
      // 表格数据
      tableData: [
        {
          date: "2017年05月07日 15点15分",
          logs: 44,
          earlyFollowup: 23,
          saleFollowup: 22,
          earlyServices: 12,
          aftermarketFollwup: 16,
          aftermarketServices: 14
        },
        {
          date: "2017年06月07日 15点15分",
          logs: 44,
          earlyFollowup: 23,
          saleFollowup: 22,
          earlyServices: 12,
          aftermarketFollwup: 16,
          aftermarketServices: 14
        }
      ],
      // 表格搜索下拉框
      options: [
        {
          label: "第一学",
          value: 1
        },
        {
          label: "第二学",
          value: 2
        },
        {
          label: "第三学",
          value: 3
        }
      ],
      // 表格搜索下拉框选择
      optionsValue: 2,
      // 搜索框内容
      searchIptValue: ""
    };
  },
  methods: {
    // 选着客户类型
    radioChange(data) {
      console.log(data);
      console.log(this.selectData.modules.value);
      console.log(this.selectData.logs.value);
      console.log(this.selectData.clientType.value);
      console.log(this.selectData.contactType.value);
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
          mother_id: self.mother_id
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            // 当前母公司下的部门 parentCompanyDepartment
            // console.log(JSON.stringify(res.data.data,null,4))
            // console.log(self.mother_id)
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
          mother_id: self.children_id
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            // 当前子公司下的部门 parentCompanyDepartment
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
      let children = this.children_id;
      this.children_id = data[data.length - 1];
      // 获取子公司所有部门
      if (children !== this.children_id) {
        this.getChildrenDepartment();
      }
    },
    // 子公司/ 母公司/ 加盟商修改
    bigRangeChange(data) {
      this.selectRangeItem = data;
      if (data === 2) {
        // 获取子公司
        this.applyCompany();
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
            self.parentCompanyList = res.data.data.list[0].children;
            self.mother_id = res.data.data.list[0].id;
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
            console.log("获取部门所有员工数据:" + JSON.stringify(res.data, null, 4));
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
    // 更新时间
    timeUpdata(data) {},
    // 导出
    exportData() {
      alert("导出成功");
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
  }
};
</script>

<style scoped>
@import "css/clue.css";

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
.logTableWrap {
  padding: 20px 0;
  line-height: 36px;
}
.btn {
  padding-left: 50px;
}
</style>
