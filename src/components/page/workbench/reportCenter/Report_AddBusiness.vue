<template>
    <div class="componentsRoot">
        <h3>业务新增汇总表</h3>
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
            <span>新增线索数: {{tableDataAll.Cluecount}}</span>
            <span>新增客户数: {{tableDataAll.Customercount}}</span>
            <span>新增合同数: {{tableDataAll.Contractcount}}</span>
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
                        prop="clue_count"
                        label="新增线索数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="customer_count"
                        label="新增客户数"
                        min-width="130"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="contract_count"
                        label="新增合同数"
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
    let echarts = require('echarts/lib/echarts')
    // 引入柱状图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/legend')
    export default {
        name: "add-business",
        data() {
            return {
                 // 范围数据
                rangeData: [
                    {
                        label: '母公司',
                        value: 1
                    }, {
                        label: '子公司',
                        value: 2
                    }, {
                        label: '加盟商',
                        value: 3
                    }
                ],
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
                mother_id: '',
                // 当前子公司id
                children_id: '',
                // 当前部门id
                department_id: '',
                // 当前员工id
                employees_id: '',
                // 当前员工姓名
                employees_id: '',
                // 最后跟进时间
                lastFollowUpTime: '',
                // 时间选择器
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                // 柱状图时间 ['2017-5','2017-6','2017-7','2017-8','2017-9','2017-10']
                histogramDate: [],
                // 柱状图数据
                histogramData: {
                    clueFrequency: [],
                    clientFrequency: [],
                    contractFrequency: [],
                },
                // 表格数据
                tableData: [],
               //列表上页(总)
                tableDataAll:[]
            }
        },
        methods: {
             // 当前母公司下的所有部门
            getDepartment() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/department/getChildrenDepartment',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        mother_id: localStorage.getItem("motherCompanyId")
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            // 当前母公司下的部门 parentCompanyDepartment
                            // console.log(JSON.stringify(res.data.data,null,4))
                            // console.log(self.mother_id)
                            self.currentCompanyDepartment = res.data.data.list
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 当前子公司下的所有部门
            getChildrenDepartment() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/department/getChildrenDepartmentTo',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        mother_id: self.children_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            // 当前子公司下的部门 parentCompanyDepartment
                            self.currentCompanyDepartment = res.data.data.list
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
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
                    this.filterClue()
                }
            },
            // 子公司/ 母公司/ 加盟商修改
               bigRangeChange(data) {
                 this.selectRangeItem = data;
                 if (data === 1) {
                     // 获取母公司
                     this.applyCompany();
                     this.filterClue()
                 }else if(data === 2){
                    // 获取子公司
                     this.applyCompany();
                     this.filterClue()
                 }else if(data === 3){
                     // 获取加盟商公司
                      this.applyCompany();
                      this.filterClue()
                  }
             },
             // 所有子公司
            applyCompany() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/company/CompanyMyList',
                    data: {
                        token: localStorage.getItem('crm_token'),
                    }
                })
                    .then(function (res) {
                        if (res.data.code == 200) {
                            // 当前用户只会有一个母公司
                            self.parentCompanyList = res.data.data.list[0].children;
                            self.mother_id = res.data.data.list[0].id
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
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
                    this.filterClue()
                }

            },
            // 获取部门所有员工
            getDepartmentEmployees() {
                console.log('获取部门所有员工')
                let self = this;
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/department/makeAdminDepartmentList',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        department_id: self.department_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code == 200) {
                            console.log('获取部门所有员工:' + self.department_id)

                            for (var i = 0; i < res.data.data.list.length; i++) {
                                var obj = res.data.data.list[i];
                                obj.label = obj.user_name
                                obj.value = obj.user_id
                            }
                            console.log('获取部门所有员工数据:' + JSON.stringify(res.data, null, 4))
                            self.currentDepartmentStaff = res.data.data.list
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // selectEmployees 选择员工
            selectEmployees(data) {
                console.log(this.employees_id)
                console.log(data);
                // this.employees_id =
                this.filterClue();
            },
             filterClue() {
                        console.log('筛选表格数据')
                        // 筛选表格数据
                        // console.log(this.clueType)
                        let self = this;
                        if (self.lastFollowUpTime == null) {
                            self.lastFollowUpTime = ""
                        }
                        let obj = {
                        type: self.selectRangeItem,
                        token: localStorage.getItem('crm_token'),
                        statu:'',
                         create_start: self.lastFollowUpTime[0],
                         create_end: self.lastFollowUpTime[1],
                         children_id: self.children_id,
                         department_id: self.department_id,
                         user_id: self.employees_id,
                          name: "",
                        };

                        console.log('请求参数:'+JSON.stringify(obj,null,4))
                        self.$axios({
                            method: 'POST',
                            withCredentials: false,
                            url: '/api/reportCenter/addjournaling',
                            data: obj
                        })
                            .then(function (res) {
                                if (res.data.code === 200) {
                                    // console.log('返回参数:');
                                    console.log(res);
                                    console.log('返回参数:'+JSON.stringify(res.data,null,4));
                                    for (var i = 0; i < res.data.data.list.length; i++) {

                                        for (let key in obj) {
                                            if (obj[key] == null) {
                                                obj[key] = '-'
                                            }
                                        }
                                    }
                                    console.log(JSON.stringify(res.data.data.list,null,4))
                                    self.tableData = res.data.data.list || [];
                                    self.tableDataAll = res.data.data
                                    // histogramDate
                                    // histogramData
                                    // clueFrequency: [2, 3, 1, 4, 5, 6],
                                    // clientFrequency: [5, 6, 3, 6, 3, 4],
                                    // contractFrequency: [1, 4, 5, 2, 7, 4],
                                    self.histogramDate = [];
                                    self.histogramData.clueFrequency = [];
                                    self.histogramData.clientFrequency = [];
                                    self.histogramData.contractFrequency = [];
                                    for (let i = 0; i < self.tableData.length; i++) {
                                        const element = self.tableData[i];
                                        self.histogramDate.push(element.time);
                                        self.histogramData.clueFrequency.push(element.clue_count)
                                        self.histogramData.clientFrequency.push(element.customer_count)
                                        self.histogramData.contractFrequency.push(element.contract_count)
                                    }
                                    self.drawLine()
                                } else {
                                    alert(res.data.msg)
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    },
              // 更新时间
            timeUpdata(data) {
              this.filterClue();
            },
            // 导出
            exportData() {
              console.log('导出筛选数据')
                      // 导出筛选数据
                      // console.log(this.clueType)
                      let self = this;
                      
                      let obj = {
                      type: self.selectRangeItem,
                      token: localStorage.getItem('crm_token'),
                       statu:1,
                       followup_start: self.lastFollowUpTime[0],
                       followup_end: self.lastFollowUpTime[1],
                       children_id: self.children_id,
                       department_id: self.department_id,
                       user_id: self.employees_id,
                        name: "",
                      };

                      console.log('请求参数:'+JSON.stringify(obj,null,4))
                      self.$axios({
                          method: 'POST',
                          withCredentials: false,
                          url: '/api/reportCenter/addjournaling',
                          data: obj
                      })
                          .then(function (res) {

                                // console.log('返回参数:');
                              console.log(JSON.stringify(res.data,null,4))
                              window.open("https://crm.tonyliangli.cn"+res.data.url);
                          })
                          .catch(function (err) {
                              console.log(err);
                          })
            },
            drawLine() {
                let self = this;
                console.log(JSON.stringify(self.histogramData,null,4));
                
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    // title: { text: 'ECharts 入门示例' },
                     tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['新增线索数','新增客户数','新增合同数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : self.histogramDate
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'新增线索数',
                            type:'bar',
                            data: self.histogramData.clueFrequency
                        },
                        {
                            name:'新增客户数',
                            type:'bar',
                            data: self.histogramData.clientFrequency
                        },
                        {
                            name:'新增合同数',
                            type:'bar',
                            data: self.histogramData.contractFrequency
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
                    return true
                } else {
                    return false
                }
            }
         },
        mounted() {
            
        },
         created() {
             this.applyCompany();
             this.filterClue();
             if (localStorage.getItem('cityData')) {
                 console.log('有缓存')
                 this.cityList = JSON.parse(localStorage.getItem('cityData'))
             } else {
                 console.log('无缓存')
                 this.requestCity();
             }
         }
    }
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
