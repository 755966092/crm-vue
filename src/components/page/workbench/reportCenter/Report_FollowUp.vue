<template>
    <div class="componentsRoot">
        <h3>跟进记录报表</h3>
         <el-row v-if="role_data_auth=='5'">
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
                        placeholder="请选择子公司"
                        :options="parentCompanyList"
                        @change="handleChange"
                        :disabled="rangeFlag"
                        :show-all-levels='false'
                        filterable
                        change-on-select
                        clearable
                        v-model="children_id"
                    >
                    </el-cascader>
                </div>
            </el-col>
             <el-col :span="4" v-if="selectRangeItem==3" >
                <div class="select rightWrap">
                    <el-select
                        v-model="franchisee_id"
                        placeholder="请选择加盟商"
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
                        placeholder="请选择部门"
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        :show-all-levels='false'
                        @change="selectDepartment"
                        v-model="department_id"
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
                        placeholder="请选择员工"
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
        <el-row v-else-if ="role_data_auth=='4'">
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
                <!-- 选择子公司母公司 -->
         <el-col :span="3">
                <div class="select rightWrap">
                    <el-select
                        v-model="selectRangeItem"
                        slot="prepend"
                        placeholder="请选择"
                        @change="bigRangeChange"
                        clearable
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
                        :disabled="selectRangeItem!=3 && selectRangeItem!=2 "
                        expand-trigger="hover"
                        :options="franchiseeList"
                        :show-all-levels='false'
                        placeholder="请选择"
                        :props = 'props'
                        @change="getFranchiseeEmp"
                        v-model="franchisee_id"
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
             <!-- <el-col :span="4">
                <div class="select rightWrap">
                    <el-select
                        v-model="franchisee_id"
                        placeholder="请选择公司"
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
            </el-col> -->
            <el-col :span="6">
                <!-- 选择部门 -->
                <div class="select rightWrap">
                     <el-cascader
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        :show-all-levels='false'
                        placeholder="请选择部门"
                        :props = 'props'
                        @change="selectDepartment"
                        v-model="department_id"
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
        <el-row v-else-if ="role_data_auth=='3'">
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
                <!-- 选择子公司母公司 -->
             <el-col :span="3">
                <div class="select rightWrap">
                    <el-select
                        v-model="selectRangeItem"
                        slot="prepend"
                        placeholder="请选择"
                        @change="bigRangeChange"
                        clearable
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
                <div class="select rightWrap">
                    <el-cascader
                        :disabled="selectRangeItem!=3"
                        expand-trigger="hover"
                        :options="franchiseeList"
                        :show-all-levels='false'
                        placeholder="请选择加盟商"
                        :props = 'props'
                        @change="getFranchiseeEmp"
                        v-model="franchisee_id"
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
                        :show-all-levels='false'
                        placeholder="请选择部门"
                        :props = 'props'
                        @change="selectDepartment"
                        v-model="department_id"
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
        <el-row v-else-if ="role_data_auth=='2'">
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
                        clearable
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
             <el-col :span="6" >
                <div class="select rightWrap">
                    <el-cascader
                        :disabled="selectRangeItem!=3"
                        expand-trigger="hover"
                        :options="franchiseeList"
                        :show-all-levels='false'
                        placeholder="请选择加盟商"
                        :props = 'props'
                        @change="getFranchiseeEmp"
                        v-model="franchisee_id"
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="6">
                <!-- 选择当前所属部门, 不包括子部门, 单选框 -->
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        :show-all-levels='false'
                        placeholder="请选择部门"
                        :props = 'props'
                        @change="selectDepartment"
                        v-model="department_id"
                        filterable
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                    <!-- <el-select
                        v-else
                        v-model="department_id"
                        slot="prepend"
                        placeholder="请选择部门"
                        @change="selectDepartment"
                    >
                        <el-option
                            v-for="item in currentCompanyDepartment"
                            :key="item.department_id"
                            :label="item.department_name"
                            :value="item.department_id">
                        </el-option>
                    </el-select> -->
                    
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
        <el-row v-if="role_data_auth=='1'">
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
            <el-col :span="3">
                <div class="select rightWrap">
                    <el-select
                        v-model="selectRangeItem"
                        slot="prepend"
                        placeholder="请选择"
                        @change="bigRangeChange"
                        clearable
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
             <el-col :span="6" >
                <div class="select rightWrap">
                    <el-cascader
                        :disabled="selectRangeItem!=3"
                        expand-trigger="hover"
                        :options="franchiseeList"
                        :show-all-levels='false'
                        placeholder="请选择加盟商"
                        :props = 'props'
                        @change="getFranchiseeEmp"
                        v-model="franchisee_id"
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
                        :disabled="selectRangeItem!=3"
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        
                        :show-all-levels='false'
                        placeholder="请选择部门"
                        @change="selectDepartment"
                        v-model="department_id"
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
                        placeholder="请选择员工"
                        @change="selectEmployees"
                        :disabled="selectRangeItem!=3"
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
        <template v-else></template>
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
            <span>总跟进次数: {{tableDataAll.Allcount}}</span>
            <span>跟进线索次数: {{tableDataAll.Cluecount}}</span>
            <span>跟进客户次数: {{tableDataAll.Customercount}}</span>
            <span>跟进合同次数: {{tableDataAll.Contractcount}}</span>
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
                        prop="time"
                        label="时间"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="all_count"
                        label="日志总数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="first_count"
                        label="前期跟进次数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="center_follow_count"
                        label="售中跟进次数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                     <el-table-column
                        prop="center_serve_count"
                        label="售中服务次数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                   <el-table-column
                        prop="before_follow_count"
                        label="售后跟进次数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="before_serve_count"
                        label="售后服务次数"
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
  name: "report-center",
  data() {
    return {
     props: {
            label: "name",
            value: 'id'
        },
        // 数据权限
        role_data_auth: localStorage.getItem('role_data_auth'),
      // 加盟公司id
      franchisee_id: [],
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
      // 当前公司部门
      currentCompanyDepartment: [],
      // 当前公司下的部门
      parentCompanyDepartment: [],
      // 当前部门员工列表
      currentDepartmentStaff: [],
      selectRangeItem: '',
      // 范围
      parentCompanyList: [],
      // 母公司id
      mother_id: "",
      // 当前子公司id
      children_id: [],
      // 当前部门id
      department_id: [],
       // 当前公司id:
      currentCompanyId:'',
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
      histogramDate: [
        "2017-5",
        "2017-6",
        "2017-7",
        "2017-8",
        "2017-9",
        "2017-10"
      ],
      // 柱状图数据
      histogramData: {
        clueFrequency: [2, 3, 1, 4, 5, 6],
        clientFrequency: [5, 6, 3, 6, 3, 4],
        contractFrequency: [1, 4, 5, 2, 7, 4]
      },
      // 表格数据
      tableData: [],
      //列表上页(总)
      tableDataAll: [],
      // 图形数据
      tableDataTu: []
    };
  },
  methods: {
     // 获取公司部门
    getFranchiseeEmp() {
      let self = this;
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/department/getChildrenDepartmentTo",
          data: {
            token: localStorage.getItem("crm_token"),
            mother_id: self.franchisee_id[self.franchisee_id.length-1]
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            self.getMenuName(res.data.data.list);
            console.log(
              "获取部门所有部门数据:" + JSON.stringify(res.data, null, 4)
            );
            self.currentCompanyDepartment = res.data.data.list;
            self.filterClue();
          } else {
            alert(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
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
            alert('2223333:'+res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 当前子公司下的所有部门
    getChildrenDepartment() {
          console.log(JSON.stringify({
          token: localStorage.getItem("crm_token"),
            mother_id: localStorage.getItem("motherCompanyId")
        }));
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/department/getChildrenDepartmentTo",
        data: {
          token: localStorage.getItem("crm_token"),
          mother_id: self.children_id[self.children_id.length-1]
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            // 当前子公司下的部门 parentCompanyDepartment
            self.getMenuName(res.data.data.list);
            self.currentCompanyDepartment = res.data.data.list;
          } else {
            alert('222'+res.data.msg);
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
      console.log('选择权限:'+data);
      this.employees_id = '',
      this.currentDepartmentStaff = [];
      this.children_id = [];
      this.franchiseeList = [];
      this.franchisee_id = [];
      this.currentCompanyDepartment = [];
      
      if (this.selectRangeItem == 3) {
          // 选择了加盟商
            this.franchisee_id = [];
            this.department_id = [];
            
            this.usersWhereTheFranchisee();
      } else if(this.selectRangeItem == 2) {
          // 选择子公司, 请求子公司列表
            this.getCurrentCompanyChildren();
      } else if(this.selectRangeItem == '') {
          if (self.role_data_auth == 4) {
              this.getUserCompany()
          } else if (self.role_data_auth == 2) {
              self.userDepartmentList();
          }
      }
      this.filterClue();
    },
     // 获取当前公司的所有子公司
    getCurrentCompanyChildren() {
        let self = this;
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/company/CompanyChMyList',
            data: {
                token: localStorage.getItem('crm_token'),
                company_id: self.currentCompanyId
            }
        })
        .then(function(res){
            if (res.data.code === 200) {
                console.log(JSON.stringify(res.data.data, null, 4))
                self.$message({
                    message: '成功',
                    type: 'success'
                })
                self.getMenuName(res.data.data.list);
                self.franchiseeList = res.data.data.list
            } else {
                self.$message.error(res.data.msg);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    },
    // 选
    // 处理树形数据, 删除空的children
    getMenuName(menus) {
      for (var value of menus) {
        if (value.children) {
          this.getMenuName(value.children);
        }
        if (value.children) {
        if (value.children.length == 0) {
          delete value.children;
        }
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
    
      // 获取部门所有员工
        this.getDepartmentEmployees();
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
       let children_id;
         if (self.role_data_auth == 5) {
             if (self.selectRangeItem == 3) {
                 console.log('加盟商'+JSON.stringify(self.franchisee_id));
                 // 加盟商
                children_id = self.franchisee_id;
             } else  if (self.selectRangeItem == 1) {
                 children_id = ''
             }  
             else {
                 children_id = self.children_id[self.children_id.length - 1];
             }
         } else {
             children_id = self.franchisee_id[self.franchisee_id.length-1];
         }
      let obj = {
        type: self.selectRangeItem,
        token: localStorage.getItem("crm_token"),
        statu: "",
        create_start: self.lastFollowUpTime[0],
        create_end: self.lastFollowUpTime[1],
       children_id:children_id,
          department_id: self.department_id[self.department_id.length-1],
        user_id: self.employees_id,
        name: ""
      };

      console.log("请求参数:" + JSON.stringify(obj, null, 4));
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/reportCenter/journaling",
          data: obj
        })
        .then(function(res) {
          if (res.data.code === 200) {
            // console.log('返回参数:');
            console.log(res);
            console.log("返回参数:" + JSON.stringify(res.data, null, 4));
            for (var i = 0; i < res.data.data.list.length; i++) {
              for (let key in obj) {
                if (obj[key] == null) {
                  obj[key] = "-";
                }
              }
            }
            console.log(JSON.stringify(res.data.data.list, null, 4));
            self.tableData = res.data.data.list;
            self.tableDataTu = res.data.data.listTu;
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
    // 获取部门所有员工
    getDepartmentEmployees() {
      console.log("获取部门所有员工");
      let self = this;
       let department_id = self.department_id[self.department_id.length-1];
        // 数据权限2 并且 选择的加盟商
        if (self.role_data_auth==2 && self.selectRangeItem != 3) {
            department_id = self.department_id;
        }
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/Department/shaiChaUser",
          data: {
            token: localStorage.getItem("crm_token"),
            department_id: department_id
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
         let children_id;
         if (self.role_data_auth == 5) {
             if (self.selectRangeItem == 3) {
                 console.log('加盟商'+JSON.stringify(self.franchisee_id));
                 // 加盟商
                children_id = self.franchisee_id;
             } else  if (self.selectRangeItem == 1) {
                 children_id = ''
             }  
             else {
                 children_id = self.children_id[self.children_id.length - 1];
             }
         } else {
             children_id = self.franchisee_id[self.franchisee_id.length-1];
         }
      let obj = {
        type: self.selectRangeItem,
        token: localStorage.getItem("crm_token"),
        statu: 1,
        followup_start: self.lastFollowUpTime[0],
        followup_end: self.lastFollowUpTime[1],
       children_id:children_id,
          department_id: self.department_id[self.department_id.length-1],
        user_id: self.employees_id,
        name: ""
      };

      console.log("请求参数:" + JSON.stringify(obj, null, 4));
      self
        .$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/reportCenter/journaling",
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
          data: [
            "日志总数",
            "前期跟进次数",
            "售中跟进次数",
            "售中服务次数",
            "售后跟进次数",
            "售后服务次数"
          ]
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
            data: self.tableDataTu.timeday
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "日志总数",
            type: "bar",
            data: self.tableDataTu.clueCount
          },
          {
            name: "前期跟进次数",
            type: "bar",
            data: self.tableDataTu.first_count
          },
          {
            name: "售中跟进次数",
            type: "bar",
            data: self.tableDataTu.center_follow_count
          },
          {
            name: "售中服务次数",
            type: "bar",
            data: self.tableDataTu.center_serve_count
          },
          {
            name: "售后跟进次数",
            type: "bar",
            data: self.tableDataTu.before_follow_count
          },
          {
            name: "售后服务次数",
            type: "bar",
            data: self.tableDataTu.before_serve_count
          }
        ]
      });
    },
     // 请求当前用户所属公司所有部门
    // 请求当前用户所在部门及其子部门
    // 请求当前用户所在部门
    
    // 权限4: 获取当前用户公司, or 当前公司部门
    getUserCompany() {
        let self = this;
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/company/CompanyMyCompany',
            // url: '/api/company/CompanyChMyList',
            data: {
                token: localStorage.getItem('crm_token'),
            }
        })
        .then(function(res){
            if (res.data.code === 200) {
                // res.data.data.children.id
                self.currentCompanyId = res.data.data.children.id;
                self.children_id = [res.data.data.children.id];
                self.franchisee_id = [res.data.data.children.id];
                self.filterClue();
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/department/getChildrenDepartmentTo',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        mother_id: res.data.data.children.id
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.getMenuName(res.data.data.list)
                        self.currentCompanyDepartment = res.data.data.list;
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            } else {
                self.$message.error(res.data.msg);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    },
    // 权限1: 当前用户所在的加盟商
    usersWhereTheFranchisee() {
        // 所属加盟商
        let self = this;
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/User/userJiameng',
            data: {
                token: localStorage.getItem('crm_token'),
            }
        })
        .then(function(res){
            if (res.data.code === 200) {
                console.log('加盟商:'+JSON.stringify(res.data.data));
                self.getMenuName(res.data.data.list)
                self.franchiseeList = res.data.data.list;
            } else {
                self.$message.error(res.data.msg);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    },
    // 权限2: 当前用户所在部门
   userDepartmentList() {
        let self = this,url;
        if (self.role_data_auth==2) {
            // 用户所在部门, 不包含子部门
            url = '/api/department/UserDepartmentList';
        } else if (self.role_data_auth==3) {
            // 用户所在部门 包含子部门
            url = '/api/Department/shaiChaUserDepartmentCh'
        }
        else {
            
        }
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: url,
            data: {
                token: localStorage.getItem('crm_token'),
            }
        })
        .then(function(res){
            if (res.data.code === 200) {
                // currentDepartmentStaff
                console.log('所在部门:'+JSON.stringify(res.data.data))
                self.$message({
                    message: '成功',
                    type: 'success'
                })
                self.getMenuName(res.data.data.list)
                self.currentCompanyDepartment = res.data.data.list;
                // self.currentDepartmentId = 
            } else {
                self.$message.error(res.data.msg);
            }
        })
        .catch(function(err){
            console.log(err);
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
    if (this.role_data_auth==5) {
        // 所有权限
        this.applyCompany();
    } else if (this.role_data_auth==4) {
        // 公司权限
        // 请求当前用户所属公司所有部门
        this.getUserCompany();
        this.rangeData = [
             {
            label: "子公司",
            value: 2
            }
            ,{
            label: "加盟商",
            value: 3
            }
        ]
    } else if (this.role_data_auth==3) {
        // 部门及其子部门
        // 请求当前用户所在部门及其子部门
        this.rangeData = [
            {
            label: "加盟商",
            value: 3
            }
        ]
        this.userDepartmentList();
    } else if (this.role_data_auth==2) {
        // 部门(不包含子部门)
        // 请求当前用户所在部门
        this.userDepartmentList();
        this.rangeData = [
            {
            label: "加盟商",
            value: 3
            }
        ]
     } else if (this.role_data_auth==1) {
         // 个人
        // 请求个人所有线索
        // 范围数据
        this.rangeData = [
            {
            label: "加盟商",
            value: 3
            }
        ]
        this.usersWhereTheFranchisee();
    } else {
        
    }
    this.filterClue();
    this.cityList = this.$cityData;
    // if (localStorage.getItem("cityData")) {
    //   console.log("有缓存");
    //   this.cityList = JSON.parse(localStorage.getItem("cityData"));
    // } else {
    //   console.log("无缓存");
    //   this.requestCity();
    // }
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
