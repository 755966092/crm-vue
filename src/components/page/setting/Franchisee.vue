<template>
    <div class="componentsRoot">
        <el-tabs type="border-card">
            <el-tab-pane label="申请加盟">
                <h3>可选加盟</h3>
                <template >
                        <el-row>
                            <el-col :span="8" :offset="16">
                                <el-input v-if="searchType=='1'" placeholder="请输入内容" v-model="searchIptValue" class="input-with-select">
                                    <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                                        <el-option
                                            v-for="item in searchSel"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                                </el-input>
                                 <el-autocomplete
                                    v-else
                                    class="inline-input"
                                    v-model="searchIptValue"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入内容"
                                    @select="handleSelect"
                                    >
                                    <el-select v-model="searchType" slot="prepend" placeholder="请选择">
                                            <el-option
                                                v-for="item in searchSel"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                                </el-autocomplete>
                            </el-col>
                            </el-row>
                    <el-table
                        :data="invitationData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
                        <el-table-column
                            type="index"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="company_name"
                            label="公司"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts"
                            label="联系人"
                            sortable
                            show-overflow-tooltip
                            min-width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts_phone"
                            label="联系电话"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="industry"
                            label="行业"
                            min-width="130"
                        >
                            <!-- :filters="industryArr"
                            :filter-method="filterTag"
                            <template slot-scope="scope">
                                <el-tag
                                    type="primary"
                                    close-transition>{{scope.row.industry}}
                                </el-tag>
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            prop="apply_count"
                            label="已加盟"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="说明"
                            min-width="180"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="joinCompany(scope.$index, scope.row)">申请加盟
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="申请状态">
                <template>
                    <el-table
                        :data="applicationStatusData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >

                        <el-table-column
                            prop="trader_company_name"
                            label="拟加盟"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_company_name"
                            label="申请公司"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_user_name"
                            label="申请人"
                            sortable
                            show-overflow-tooltip
                            min-width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            sortable
                            min-width="160"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="statu"
                            label="申请状态"
                            min-width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="说明"
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    :disabled="scope.row.statu != '待审批'"
                                    size="mini"
                                    type="success"
                                    @click="cancelApplicationFn(scope.$index, scope.row, 'application')">取消申请
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="现已加盟">
                <template>
                    <el-table
                        :data="alreadyJoinedData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >

                        <el-table-column
                            prop="trader_company_name"
                            label="上级公司"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts"
                            label="申请人"
                            sortable
                            min-width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts_phone"
                            label="联系电话"
                            sortable
                            min-width="130"
                        >
                             </el-table-column>
                         <el-table-column
                                prop="apply_company_name"
                                label="加盟公司"
                                sortable
                                show-overflow-tooltip
                                min-width="180"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            min-width="160"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="jiameng_time"
                            label="加盟时间"
                            min-width="160"
                        >
                        </el-table-column>
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="cancelApplicationFn(scope.$index, scope.row)">取消加盟
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!-- 加盟申请 -->
        <div class="subCompany invitation">
            <el-dialog
                title="加盟申请"
                :visible.sync="addInvitation"
            >
                <el-form label-position="top" label-width="80px" :model="formData">
                    <el-form-item label="加盟公司">
                            <el-cascader 
                                expand-trigger="hover" 
                                :options="companyList"
                                filterable
                                change-on-select
                                :show-all-levels="false"
                                v-model="formData.selCompany"
                                >
                            </el-cascader>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input placeholder="请输入全称" v-model="formData.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formData.phone"></el-input>
                    </el-form-item>

                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="formData.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addInvitation = false">取 消</el-button>
                    <el-button type="primary" @click="applicationToJoin">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 取消申请 -->
        <div class="subCompany invitation">
            <el-dialog
                :title="'取消'+cancelTitle"
                :visible.sync="cancelApplication"
            >
                <p>是否确认取消{{ cancelTitle }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelApplication = false">取 消</el-button>
                    <el-button type="primary" @click="cancelAdd">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        // 取消理由
        cancleText: '',
       // 选择列
       selRowData: '',
      // 输入框内容
      searchIptValue: "",
      // 搜索范围
      searchType: "1",
      addInvitation: false,
      cancelApplication: false,
      cancelTitle: "",
      companyList: [],
      formData: {
        contact: "",
        phone: "",
        industry: "",
        description: "",
         // 选着加盟公司
        selCompany: [],
      },
      // 加盟邀请
      invitationData: [], // 加盟邀请
      //可选加盟
      applyFranchiseeList: [],
      // 申请状态
      applicationStatusData: [], // 申请状态
      // 现已加盟
      alreadyJoinedData: [],
      // 行业
      industryArr: [
        { value: "教育" },
        { value: "科技" },
        { value: "IT" },
        { value: "对外贸易" },
        { value: "金融" }
      ],
      searchSel: [
        
        {
          label: "公司名称",
          value: "1"
        },{
          label: "行业",
          value: "2"
        }

      ],
      restaurants: []
    };
  },
  mounted() {},
  methods: {
      // 自动补全---------
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return this.industryArr;
    },
   // 自动补全--------
   // 申请加盟
   applicationToJoin() {
       this.addInvitation = false;
        let self = this;
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/joiningTrader/applyFranchisee',
            data: {
                token: localStorage.getItem('crm_token'),
                trader_id: self.selRowData.trader_id,
                company_id: self.formData.selCompany[self.formData.selCompany.length - 1],
                contacts: self.formData.contact,
                contacts_phone: self.formData.phone,
                content: self.formData.description
            }
        })
        .then(function(res){
            if (res.data.code === 200) {
                console.log(JSON.stringify(res.data.data, null, 4))
                self.$message({
                    message: '申请成功',
                    type: 'success'
                });
                self.joiningTraderApplyFranchiseeStatu();
            } else {
                self.$message.error(res.data.msg)
                        if (res.data.code == 10008) {
                            self.$router.push('/login');
                        }
            }
        })
        .catch(function(err){
            console.log(err);
        });
   },
   // 取消加盟
   cancelAdd() {
       this.cancelApplication = false;
       let paramObj,url;
       let self = this;
       if (this.cancelTitle == "申请") {
           // 取消申请 trader_id
           url = '/api/joiningTrader/cancelFranchiseeUser'
           paramObj = {
               token: localStorage.getItem("crm_token"),
               apply_id: self.selRowData.apply_id
           }
       } else {
           // 取消加盟 cancleText apply_id content
           console.log(self.selRowData);
           url = '/api/joiningTrader/cancelFranchiseeXian'
           paramObj = {
               token: localStorage.getItem("crm_token"),
               apply_id: self.selRowData.apply_id,
           }
       }
           console.log('取消参数:'+JSON.stringify(paramObj));
           
           this.$axios({
              method: 'POST',
              withCredentials: false,
              url: url,
              data: paramObj
           })
           .then(function(res){
              if (res.data.code === 200) {
                  self.$message({
                      message: '取消成功',
                      type: 'success'
                  });
                   if (self.cancelTitle == "申请") {
                        // 取消申请 trader_id
                         self.joiningTraderApplyFranchiseeStatu();
                    } else {
                        // 取消加盟 cancleText apply_id content
                         self.joiningTraderapplyFranchiseeXianYi();
                    }
              } else {
                  self.$message.error(res.data.msg)
                        if (res.data.code == 10008) {
                            self.$router.push('/login');
                        }
              }
           })
           .catch(function(err){
               console.log(err);
           });

   },
    // 选择行业
    handleSelect(data) {
        console.log('---------------选择行业---------');
        console.log(data);
        console.log('---------------选择行业---------');
    },
    // 搜索按钮
    searchBtn() {
        console.log(this.searchIptValue);
        console.log(this.searchType);
            let self = this;
            let paramObj = {
                   token: localStorage.getItem('crm_token'),
               };
               if (self.searchType == 1) {
                   // 名称
                   paramObj = {
                    token: localStorage.getItem('crm_token'),
                    name: self.searchIptValue
                };
               } else {
                   // 行业
                   paramObj = {
                    token: localStorage.getItem('crm_token'),
                    industry: self.searchIptValue
                };
               }
               console.log(JSON.stringify(paramObj));
               
            this.$axios({
               method: 'POST',
               withCredentials: false,
               url: '/api/joiningTrader/applyFranchiseeList',
               data: paramObj
            })
            .then(function(res){
               if (res.data.code === 200) {
                   self.invitationData = res.data.data.list;
                   console.log(JSON.stringify(res.data.data, null, 4))
               } else {
                   self.$message.error(res.data.msg)
                            if (res.data.code == 10008) {
                                self.$router.push('/login');
                            }
               }
            })
            .catch(function(err){
                console.log(err);
            });
    },
    // 赛选行业
    filterTag(value, row) {
      return row.industry === value;
    },
    // 申请加盟
    joinCompany(row, value) {
        this.selRowData = value;
        this.addInvitation = true;
        console.log(value);
    },
    
    cancelApplicationFn(row, value, flag) {
      if (flag === "application") {
        // 申请
        this.cancelTitle = "申请";
      } else {
        // 加盟
        this.cancelTitle = "加盟";
      }
      
      this.cancelApplication = true;
      this.selRowData = value;
    },
    // 加盟商加盟状态
    joiningTraderApplyFranchiseeStatu() {
      var self = this;
      if (localStorage.getItem("adminRole") == 1) {
        //超管
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/applyFranchiseeStatu",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              for (var i = 0; i < res.data.data.list.length; i++) {
                //审批状态 1待审批   2通过  3失败  4取消
                if (res.data.data.list[i].statu == 1) {
                  res.data.data.list[i].statu = "待审批";
                } else if (res.data.data.list[i].statu == 2) {
                  res.data.data.list[i].statu = "通过";
                } else if (res.data.data.list[i].statu == 3) {
                  res.data.data.list[i].statu = "失败";
                } else if (res.data.data.list[i].statu == 4) {
                  res.data.data.list[i].statu = "取消";
                }
              }
              self.applicationStatusData = res.data.data.list;
              
              
            } else {
              self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');}
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        //普通用户
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/applyFranchiseeStatuZi",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            //审批状态 1待审批   2通过  3失败  4取消
            if (res.data.code === 200) {
              for (let i = 0; i < res.data.data.list.length; i++) {
                let element = res.data.data.list[i];
                if (element.statu == 1) {
                  element.statu = "待审批";
                } else if (element.statu == 2) {
                  element.statu = "通过";
                } else if (element.statu == 3) {
                  element.statu = "失败";
                } else if (element.statu == 4) {
                  element.statu = "取消";
                }
              }
              self.applicationStatusData = res.data.data.list;
              console.log('表格数据::'+JSON.stringify(self.applicationStatusData));
            } else {
             self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    // 现已加盟
    joiningTraderapplyFranchiseeXianYi() {
      var self = this;
      if (localStorage.getItem("adminRole") == 1) {
        //超管
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/applyFranchiseeXianYi",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.alreadyJoinedData = res.data.data.list;
            } else {
             self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        //普通用户
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/applyFranchiseeXianYiZi",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.alreadyJoinedData = res.data.data.list;
            } else {
             self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    // 申请加盟--可选加盟
    joiningTraderapplyFranchiseeList() {
      var self = this;
      self.$axios({
          method: "POST",
          withCredentials: false,
          url: "/api/joiningTrader/applyFranchiseeList",
          data: {
            token: localStorage.getItem("crm_token")
          }
        })
        .then(function(res) {
          if (res.data.code === 200) {
            self.invitationData = res.data.data.list;
            console.log(self.invitationData);
          } else {
           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 获取行业列表
    getIndustryList() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/joiningTrader/applyFranchiseeListIndustry",
        data: {
          token: localStorage.getItem("crm_token")
        }
      })
        .then(function(res) {
          if (res.data.code === 200) {
            let industryArr = [];
            for (let i = 0; i < res.data.data.list.length; i++) {
              let element = res.data.data.list[i];
              industryArr.push({
                value: element
              });
            }

            self.industryArr = industryArr;
            console.log(self.industryArr);
            self.restaurants = self.loadAll();
          } else {
           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
          }
        })
        .catch(function(err) {
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
                if (res.deta.code == 200) {
                    
                    var arr = [];
                    self.getMenuName(res.data.data.list);
                    self.companyList = res.data.data.list
                } else {
                    self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                }
                // console.log(JSON.stringify(res.data.data.list));
            })
            .catch(function (err) {
                console.log(err);
            });
    },
        // 处理树形数据, 删除空的children
    getMenuName(menus){
        for (var value of menus) {
            if (value.children) {
                this.getMenuName(value.children)
            }
            if (value.children.length == 0) {
                delete value.children
            }
        }
    },
  },
  created() {
      this.applyCompany();
    // 行业列表
    this.getIndustryList();

    this.joiningTraderApplyFranchiseeStatu();
    this.joiningTraderapplyFranchiseeList();
    this.joiningTraderapplyFranchiseeXianYi();
  }
};
</script>
<style scoped>
.invitation .el-cascader {
  width: 100%;
}
.el-select {
  width: 120px;
}
.el-row {
    margin-bottom: 10px;
}
</style>
