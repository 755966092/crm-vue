<template>
    <div class="componentsRoot clueWrap">
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
                  <el-col :span="3">
                      <!-- 选择子公司母公司 -->
                      <div class="select rightWrap">
                          <!--<el-cascader-->
                          <!--expand-trigger="hover"-->
                          <!--:options="rangeData"-->
                          <!--@change="handleChange"-->
                          <!--:show-all-levels=false-->
                          <!--filterable-->
                          <!--change-on-select-->
                          <!--&gt;-->
                          <!--</el-cascader>-->
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
                  <el-col :span="6" >
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
                  <!-- 当前部门与昂 -->
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
        </el-row>

        <el-row>
            <el-col :span="3">
                <p class="leftWrap">模块</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.clientType">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button label="1">学校</el-radio-button>
                        <el-radio-button label="2">机构</el-radio-button>
                        <el-radio-button label="3">教师</el-radio-button>
                        <el-radio-button label="4">学生</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">日志类别</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.status">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button label="1">前期跟进</el-radio-button>
                        <el-radio-button label="2">售中跟进</el-radio-button>
                        <el-radio-button label="3">售后跟进</el-radio-button>
                        <el-radio-button label="4">售后服务</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">客户类型</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.fromto">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button label="1">线索</el-radio-button>
                        <el-radio-button label="2">客户</el-radio-button>
                        <el-radio-button label="3">合同</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">联系方式</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.contactifmt">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button label="1">手机</el-radio-button>
                        <el-radio-button label="2">电话</el-radio-button>
                        <el-radio-button label="3">微信</el-radio-button>
                        <el-radio-button label="4">qq</el-radio-button>
                        <el-radio-button label="5">邮箱</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="3">
                <p class="leftWrap">最后跟进时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="selectedItems.lastFollowupTime"
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

        <!-- 数据表格 -->
        <!-- 数据表格 -->
        <div>
            <div class="tableTitle">
                <el-row>
                    <el-col :span="8">
                        <el-button type="text" style="color: #999"  @click="delLogItem">批量删除</el-button>
                    </el-col>
                    <el-col :span="10" :offset="6">
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
            </div>
            <template>
                <div>
                      <el-table
                          @selection-change="changeFun"
                         :data="tableData"
                         tooltip-effect="dark"
                         style="width: 100%"
                         border
                         max-height="450"

                     >
                         <el-table-column
                             type="selection"
                         >
                        </el-table-column>
                        <el-table-column
                            prop="followup_time"
                             align="center"
                            label="跟进时间"
                            fixed
                            show-overflow-tooltip
                            min-width="200"
                        >
                            <!--<template slot-scope="scope">-->
                            <!--<span class="colorBlue"-->
                            <!--@click="showModelTable(scope.$index, scope.row,'dialogVisible')">{{ scope.row.user_name }}</span>-->
                            <!--</template>-->
                        </el-table-column>
                        <el-table-column
                            prop="user_name"
                            label="跟进人"
                            sortable
                            align="center"
                            show-overflow-tooltip
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="fromto"
                            label="模块"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="日志类别"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="cue_type"
                            align="center"
                            label="客户类型"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="clue_name"
                            label="对象"
                            align="center"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                             prop="contact_ifmt"
                             label="联系方式"
                             sortable
                             align="center"
                             min-width="180"
                             show-overflow-tooltip>
                         </el-table-column>
                            <el-table-column
                              prop="content"
                              label="跟进内容"
                              sortable
                              align="center"
                              min-width="180"
                              show-overflow-tooltip>
                          </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="180"
                        >
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    @click="showModelTable(scope.$index, scope.row, 'handover')">交接
                                </el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="showModelTable(scope.$index, scope.row, 'deleteBtn')">删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </div>
    </div>
</template>

<script>

    export default {
        name: "clue",
        data() {
            return {
         // 当前公司部门
         currentCompanyDepartment: [],
         // 当前公司下的部门
         parentCompanyDepartment: [],
         // 当前部门员工列表
         currentDepartmentStaff: [],
                // 选项
                selectedItems: {
                    // 客户类型
                    clientType: '',
                    //contact_ifmt
                    status: '',
                     // 客户类型
                    fromto: '',
                     // 联系方式
                    contactifmt: '',


                    // 来源
                    sourceType :'',
                    // 地区
                    area:[],
                    // area:[1,2,115],
                    // 最后跟进时间
                    lastFollowupTime: '',
                    // 范围
                    parentCompanyList: [],
                },
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
                // 城市选择器数据
                cityList: [],
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
                    // 范围
                   parentCompanyList: [],
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

                // 表格数据
                tableData: [],
                options: [{
                    label: '第一学',
                    value: 1
                }, {
                    label: '第二学',
                    value: 2
                }, {
                    label: '第三学',
                    value: 3
                }],
                // 搜索框筛选列表
                optionsValue: 2,
                // 搜索框内容
                searchIptValue: '',
                 // 范围选中内容
                 selectRangeItem: 1,
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
           },
        },
        methods: {

       // 批量删除日志
        delLogItem() {
            let arr = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.tableData = this.tableData.filter((value) => {
                        return value.followup_id != this.multipleSelection[i].followup_id
                    })
                    arr.push(this.multipleSelection[i].followup_id)
                }

                this.$axios({
                            method: 'POST',
                            withCredentials: false,
                            url: '/api/clueFollowup/deleteClueFollowups',
                            data: {
                                token: localStorage.getItem('crm_token'),
                                followupIds: JSON.stringify(arr),
                            }
                        })
                            .then(function (res) {
                                if (res.data.code == 200) {
                                         self.$message({
                                               message: '批量删除日志成功',
                                               type: 'success'
                                           })
                                           self.filterClue();
                                } else {
                                    alert(res.data.msg)
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            });

        },
            //复选框状态改变
        changeFun(val) {
            this.multipleSelection = val;
        },
        // 更新时间
        timeUpdata(data) {
            console.log(data)
            console.log(this.updateTime)
            console.log(this.lastFollowUpTime)
            console.log(this.createTime)
            this.filterClue();
        },
         // 子公司/ 母公司/ 加盟商修改
         bigRangeChange(data) {
             this.selectRangeItem = data;
             // if (data === 2) {
             //     // 获取子公司
             //     this.applyCompany();
             // }
             this.filterClue();
         },
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
                    for (const key in self.selectedItems) {
                        if (self.selectedItems.hasOwnProperty(key)) {
                            let element = self.selectedItems[key];
                            if (element == null) {
                                self.selectedItems[key] = "";
                            }
                        }
                    }
                    let obj = {
                      type: self.selectRangeItem,
                      token: localStorage.getItem('crm_token'),
                      page_num: "",
                      cue_type: self.selectedItems.clientType,
                      status: self.selectedItems.status,
                      fromto: self.selectedItems.fromto,
                      contact_ifmt:self.selectedItems.contactifmt,
                     followup_start: self.selectedItems.lastFollowupTime[0],
                      followup_end: self.selectedItems.lastFollowupTime[1],
                     children_id: self.children_id,
                     department_id: self.department_id,
                     user_id: self.employees_id,
                      name: "",
                    };

                    console.log('请求参数:'+JSON.stringify(obj,null,4))
                    self.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clueFollowup/getFollowupList',
                        data: obj
                    })
                        .then(function (res) {
                            if (res.data.code === 200) {
                                // console.log('返回参数:');
                                console.log(res);
                                console.log('返回参数:'+JSON.stringify(res.data,null,4));
                                for (var i = 0; i < res.data.data.list.length; i++) {
                                   if (res.data.data.list[i].fromto == 1)
                                   {
                                          res.data.data.list[i].fromto =  "线索"
                                    }else if(res.data.data.list[i].fromto == 2){
                                         res.data.data.list[i].fromto =  "客户"
                                    }else if(res.data.data.list[i].fromto == 3){
                                         res.data.data.list[i].fromto =  "合同"
                                    }
                                     if (res.data.data.list[i].status == 1)
                                   {
                                          res.data.data.list[i].status = "前期跟进"
                                    }else if(res.data.data.list[i].status == 2){
                                        res.data.data.list[i].status = "售中跟进"
                                    }else if(res.data.data.list[i].status == 3){
                                           res.data.data.list[i].status = "售后跟进"
                                     }else if(res.data.data.list[i].status == 4){
                                         res.data.data.list[i].status = "售后服务"
                                   }
                                     if (res.data.data.list[i].cue_type == 1)
                                      {
                                             res.data.data.list[i].cue_type = "学校"
                                       }else if(res.data.data.list[i].cue_type == 2){
                                           res.data.data.list[i].cue_type = "机构"
                                       }else if(res.data.data.list[i].cue_type == 3){
                                              res.data.data.list[i].cue_type = "教师"
                                        }else if(res.data.data.list[i].cue_type == 4){
                                            res.data.data.list[i].cue_type = "学生"
                                      }
                                     if (res.data.data.list[i].cue_type !== 3)
                                   {
                                      res.data.data.list[i].clue_name = res.data.data.list[i].clue_name
                                    }else{
                                       res.data.data.list[i].clue_name = res.data.data.list[i].contacts_name
                                    }
                                    if (res.data.data.list[i].contact_ifmt == 1)
                                   {
                                      res.data.data.list[i].contact_ifmt = "手机"
                                    }else if(res.data.data.list[i].contact_ifmt == 2){
                                      res.data.data.list[i].contact_ifmt = "电话"
                                    }else if(res.data.data.list[i].contact_ifmt == 3){
                                       res.data.data.list[i].contact_ifmt = "qq"
                                    }else if(res.data.data.list[i].contact_ifmt == 4){
                                        res.data.data.list[i].contact_ifmt = "微信"
                                    }else if(res.data.data.list[i].contact_ifmt == 5){
                                        res.data.data.list[i].contact_ifmt = "邮箱"
                                    }

                                    for (let key in obj) {
                                        if (obj[key] == null) {
                                            obj[key] = '-'
                                        }
                                    }
                                }
                                console.log(JSON.stringify(res.data.data.list,null,4))
                                self.tableData = res.data.data.list
                            } else {
                                alert(res.data.msg)
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
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
                 // 子公司变化
                 handleChange(data) {
                     let children = this.children_id;
                     this.children_id = data[data.length - 1];
                     // 获取子公司所有部门
                     if (children !== this.children_id) {
                         this.getChildrenDepartment();
                         this.filterClue();
                     }
                 },
            clueTypeChange(data) {
                console.log(data)
                this.filterClue();
            },

            // 省市县数据
            requestCity() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/area/evepce',
                    data: {
                        token: localStorage.getItem('crm_token'),
                    }
                })
                    .then(function (res) {
                        var arr = [];
                        self.cityList = res.data.data.list;
                        localStorage.setItem('cityData', JSON.stringify(res.data.data.list))
                        // console.log(JSON.stringify(res.data.data.list));
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
            // 表格数据
            getTableData() {
                var self = this;
                self.$axios({
                    method: 'GET',
                    withCredentials: false,
                    url: 'http://localhost:8081/mock/clueTableData',
                })
                    .then(function (res) {
                        // console.log(JSON.stringify(res,null,4));
                        self.tableData = res.data
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 点击c城市级联选择器
            selCity(data) {
                 this.selectedItems.area = data;
                 console.log('选择'+this.selectedItems.area);
                 this.filterClue();
            },
            // 表格按钮
             // 单选删除日志
             showModelTable(index,data,flag) {
                if(flag == 'deleteBtn'){
                        let paramObj = {};
                        console.log();
                        let self = this;
                           paramObj = {
                             token: localStorage.getItem('crm_token'),
                             followup_id: data.followup_id,
                             }
                      console.log('提交线索参数:'+JSON.stringify(paramObj,null,4))
                             self.$axios({
                                 method: 'POST',
                                 withCredentials: false,
                                 url: '/api/clueFollowup/deleteClueFollowup',
                                 data: paramObj
                             })
                                 .then(function (res) {
                                     if (res.data.code == 200) {
                                           self.$message({
                                               message: '删除日志成功',
                                               type: 'success'
                                           })
                                           self.filterClue();
                                     } else {
                                         alert(res.data.msg)
                                     }
                                 })
                                 .catch(function (err) {
                                     console.log(err);
                                 });
                     }else if(flag == 'handover'){


                     }
                     }
        },
        created() {
            this.getTableData();
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

     /* 新增线索选着 */
     .dialogWrap .el-cascader {
         width: 100%;
     }

     .wrap {
         border: 1px solid #d9d9d9;
         padding: 10px;
         border-radius: 10px;
         margin-bottom: 10px;
     }

     .tableTitle {
         margin-bottom: 10px;
         padding: 10px 0;
     }

     .el-button i {
         width: 100%;
         height: 100%;
     }

     .iptName {
         display: inline-block;
         margin: 5px 0;
     }

     .colorBlue {
         cursor: pointer
     }

     .select .el-select {
         width: 90%;
     }

     .hide {
         display: none;
     }
</style>
