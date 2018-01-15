<template>
    <div class="componentsRoot">
        <el-tabs type="border-card">
            <el-tab-pane label="加盟邀请" class="invitation">
                <el-button type="text" @click="showModel()"><h3>添加加盟邀请</h3></el-button>
                <template>
                    <el-table
                        :data="invitationData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
                        <el-table-column
                            prop="company_name"
                            label="公司"
                            sortable
                            min-width="180"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts"
                            label="联系人"
                            sortable
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
                                    @click="handleEdit(scope.$index, scope.row)">取消加盟邀请
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="加盟商" class="franchisee">
                <el-cascader 
                    expand-trigger="hover" :options="companyList"
                    filterable
                    change-on-select
                    :show-all-levels="false"
                    >
                </el-cascader>
                <template>
                    <el-table
                        :data="franchiseeData"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
                        <el-table-column
                            prop="apply_company_name"
                            label="加盟商"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_user_name"
                            label="联系人"
                            sortable
                            min-width="100"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts_phone"
                            label="联系电话"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            min-width="160"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="approver_name"
                            label="审批人"
                            min-width="100"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="jiameng_time"
                            label="审批通过时间"
                            min-width="160"
                        ></el-table-column>
                        <el-table-column
                            prop="content"
                            label="备注"
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="cancelFranchiseeFn(scope.$index, scope.row)">取消加盟商
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="加盟审批">
                <h3 class="h3Title">待审批</h3>
                <template>
                    <el-table
                        :data="pendingData"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
                        <el-table-column
                            prop="apply_company_name"
                            label="加盟商"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_user_name"
                            label="联系人"
                            sortable
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
                            prop="trader_company_name"
                            label="拟加盟"
                            min-width="180"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            min-width="160"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="statu"
                            label="申请状态"
                            min-width="130"
                        ></el-table-column>
                        <el-table-column
                            prop="content"
                            label="说明"
                            min-width="180"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column min-width="180" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="refusedJoinFn(scope.$index, scope.row, true)">通过
                                </el-button>
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="refusedJoinFn(scope.$index, scope.row, false)">拒绝
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <h3 class="h3Title">已取消</h3>
                <template>
                    <el-table
                        :data="cancelledData"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
                        <el-table-column
                            prop="apply_company_name"
                            label="加盟商"
                            sortable
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_user_name"
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
                            prop="trader_company_name"
                            label="拟加盟"
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
                            prop="approver_name"
                            label="加盟审批人"
                            min-width="100"
                        ></el-table-column>
                        <el-table-column
                            prop="jiameng_time"
                            label="加盟时间"
                            min-width="160"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="no_approver_name"
                            label="取消审批人"
                            min-width="100"
                        >
                        </el-table-column>
                           <el-table-column
                            prop="no_approver_content"
                            label="取消原因"
                            show-overflow-tooltip
                            min-width="180"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="no_approver_time"
                            label="取消加盟时间"
                            min-width="160"
                        >
                        </el-table-column>
                    </el-table>
                </template>
                <h3 class="h3Title">已拒绝</h3>
                <template>
                    <el-table
                        :data="cancelledJvData"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
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
                            min-width="100"
                            show-overflow-tooltip
                            label="联系人"
                            sortable
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts_phone"
                            label="联系电话"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="trader_company_name"
                            label="拟加盟"
                            min-width="180"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            min-width="160"
                        >
                        </el-table-column>

                        <el-table-column
                            prop="approver_name"
                            label="审批人"
                            min-width="100"
                        ></el-table-column>
                        <el-table-column
                            prop="no_approver_content"
                            label="拒绝原因"
                            min-width="180"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="jvjve_time"
                            label="审批拒绝时间"
                            min-width="160"
                        >
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!-- 取消加盟邀请 -->
        <div class="subCompany">
            <el-dialog
                title="取消加盟邀请"
                :visible.sync="joinInvitation"
                width="20%"
            >
                <p>是否取消该加盟邀请</p>
                <span slot="footer" class="dialog-footer">
								<el-button @click="joinInvitation = false">取 消</el-button>
								<el-button type="primary" @click="cancelFn(1)">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 添加加盟邀请 -->
        <div class="subCompany invitation">
            <el-dialog
                title="添加加盟邀请"
                :visible.sync="addInvitation"
            >
                <el-form label-position="top" label-width="80px" :model="formData">
                    <el-form-item label="加盟公司">
                        <el-cascader 
                            filterable
                            change-on-select
                            :show-all-levels="false"
                            expand-trigger="hover" 
                            v-model="addCompany"
                            :options="companyList">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input placeholder="请输入全称" v-model="formData.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formData.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="行业">
                        <el-input v-model="formData.industry"></el-input>
                    </el-form-item>
                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="formData.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addInvitation = false">取 消</el-button>
                    <el-button type="primary" @click="addInvitationFn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 取消加盟商 -->
        <div class="subCompany">
            <el-dialog
                title="取消加盟商"
                :visible.sync="cancelFranchisee"
            >
                <el-form label-position="top" label-width="80px">
                    <el-form-item label="取消原因">
                        <el-input v-model="cancelFranchiseeReason"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="cancelFranchiseeFn2">下一步</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="subCompany">
            <el-dialog
                title="取消加盟商"
                :visible.sync="cancelFranchisee2"
            >
                <p>是否确定取消该加盟商</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelFranchisee2 = false">取 消</el-button>
                    <el-button type="primary" @click="cancelFranchisee2 = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!--拒绝加盟原因-->
        <div class="subCompany">
            <el-dialog
                :title="diglogTitle"
                :visible.sync="refusedJoin"
            >
                <el-form label-position="top" label-width="80px">
                    <el-form-item :label="diglogTitle+'原因'">
                        <el-input v-model="denialReason"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="refusedJoinFn2">下一步</el-button>
                </span>
            </el-dialog>
            
        </div>
        <div class="subCompany">
            <el-dialog
                :title="diglogTitle"
                :visible.sync="refusedJoin2"
            >
                <p>是否确定{{ diglogSubtitle }}该加盟商的请求</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="refusedJoin2 = false">取 消</el-button>
                    <el-button type="primary" @click="refusedJoin2 = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";

export default {
  components: { ElForm },
  data() {
    return {
      // 加盟公司
      addCompany: [],
      joinInvitation: false,
      addInvitation: false,
      cancelFranchisee: false,
      cancelFranchisee2: false,
      cancelFranchiseeReason: "",
      diglogSubtitle: "",
      diglogTitle: "",
      refusedJoin: false,
      refusedJoin2: false,
      denialReason: "", // 拒绝加入原因
       companyList: [
          {
            value: "no1",
            label: "第一学",
            
          }
        ],
      formData: {
       
        contact: "",
        phone: "",
        industry: "",
        description: ""
      },
      // 加盟邀请
      invitationData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      // 加盟商
      franchiseeData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          franchisee: "清华北大",
          contact: "联系人",
          phone: "18618618686",
          byDate: "2017-09-09",
          applicationDate: "2017-09-09",
          remarks: "备注"
        }
      ],
      // 加盟待审批
      pendingData: [
        {
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄",
          franchisee: "清华北大",
          companyName: "环球壹学",
          contact: "联系人",
          phone: "18618618686",
          applicationState: "审批中",
          applicationDate: "2017-09-09",
          remarks: "说明"
        }
      ],
      // 已取消
      cancelledData: [
        {
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄",
          franchisee: "清华北大",
          companyName: "环球壹学",
          applicationDate: "2017-09-09",
          approvedName: "杨慧",
          cancelName: "杨慧",
          contact: "联系人",
          phone: "18618618686",
          addTime: "2017-09-09",
          cancelTime: "2017-09-09"
        }
      ],
      // 已拒绝
      cancelledJvData: [],
      // 行数据
      selRowData:'',
    };
  },

  methods: {
      // 取消
      cancelFn(flag) {
          this.joinInvitation = false;
          let self = this,
              url,paramObj;
          if (flag == 1) {
              // 取消加盟邀请
              url = '/api/joiningTrader/cancelFranchiseeInvitation',
              paramObj = {
                  token: localStorage.getItem('crm_token'),
                  trader_id: 1
              }
          }
          console.log('取消参数:'+JSON.stringify(self.selRowData ));
          
      },
    handleEdit(row, column) {
      console.log("row:" + row);
      console.log(column);
      this.joinInvitation = true;
      this.selRowData = column;
    },
    showModel() {
      this.addInvitation = true;
    },
    cancelFranchiseeFn() {
      this.cancelFranchisee = true;
    },
    cancelFranchiseeFn2() {
      this.cancelFranchisee = false;
      this.cancelFranchisee2 = true;
    },
    // 拒绝加入
    refusedJoinFn(row, column, flag) {
      if (flag) {
        this.diglogTitle = "同意加盟";
        this.diglogSubtitle = "同意";

        this.refusedJoin2 = true;
      } else {
        this.diglogTitle = "拒绝加盟";
        this.diglogSubtitle = "拒绝";
        this.refusedJoin = true;
      }
    },
    refusedJoinFn2() {
      this.refusedJoin = false;
      this.refusedJoin2 = true;
    },
    // 请求加盟邀请列表
    joiningTraderFranchiseeMyList() {
      var self = this;
      if (localStorage.getItem("adminRole") == 1) {
        //超管
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/applyFranchiseeMyList",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              console.log(JSON.stringify(res.data.data.list));
              self.invitationData = res.data.data.list;
            } else {
              self.$message.error(res.data.msg);
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
            url: "/api/joiningTrader/applyFranchiseeMyListZi",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.invitationData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error(res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    // 请求加盟商列表
    joiningTraderFranchiseeList() {
      var self = this;
      if (localStorage.getItem("adminRole") == 1) {
        //超管
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/FranchiseeList",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.franchiseeData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error(res.data.msg);
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
            url: "/api/joiningTrader/FranchiseeMyList",
            data: {
              token: localStorage.getItem("crm_token")
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.franchiseeData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error("111" + res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    // 加盟审批
    joiningTraderFranchiseeListEve() {
      var self = this;
      if (localStorage.getItem("adminRole") == 1) {
        //超管
        //待审批
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/franchiseeListEve",
            data: {
              token: localStorage.getItem("crm_token"),
              type: 1
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              for (var i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].statu = "待审批";
              }
              self.pendingData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error("222" + res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        //已取消
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/franchiseeListEve",
            data: {
              token: localStorage.getItem("crm_token"),
              type: 2
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              console.log(JSON.stringify(res.data.data.list));
              self.cancelledData = res.data.data.list;
            } else {
              self.$message.error("333" + res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        //已拒绝
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/franchiseeListEve",
            data: {
              token: localStorage.getItem("crm_token"),
              type: 3
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.cancelledJvData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error("444" + res.data.msg);
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
            url: "/api/joiningTrader/franchiseeListEveZi",
            data: {
              token: localStorage.getItem("crm_token"),
              type: 1
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              console.log("751::" + JSON.stringify(res.data.data.list));
              for (var i = 0; i < res.data.data.list.length; i++) {
                res.data.data.list[i].statu = "待审批";
              }
              self.pendingData = res.data.data.list;
            } else {
              self.$message.error("555" + res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        //已取消
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/franchiseeListEveZi",
            data: {
              token: localStorage.getItem("crm_token"),
              type: 2
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.cancelledData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error("666" + res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
        //已拒绝
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/franchiseeListEveZi",
            data: {
              token: localStorage.getItem("crm_token"),
              type: 3
            }
          })
          .then(function(res) {
            if (res.data.code === 200) {
              self.cancelledJvData = res.data.data.list;
              console.log(JSON.stringify(res.data.data.list));
            } else {
              self.$message.error("777" + res.data.msg);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
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
                var arr = [];
                self.getMenuName(res.data.data.list);
                self.companyList = res.data.data.list
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
    // 发布加盟邀请
    addInvitationFn() {
        let self = this;
        self.addInvitation = false;
        let paramObj = {
                token: localStorage.getItem('crm_token'),
                company_id: self.addCompany[self.addCompany.length - 1],
                contacts: self.formData.contact,
                contacts_phone: self.formData.phone,
                industry: self.formData.industry,
                content: self.formData.description,
            }
        console.log('添加加盟邀请参数:'+JSON.stringify(paramObj,null,4));
        // 加盟邀请
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/joiningTrader/releaseFranchisee',
            data: paramObj
        })
        .then(function(res){
            if (res.data.code === 200) {
                self.$message({
                    message: '添加加盟邀请成功',
                    type: 'success'
                });
                self.joiningTraderFranchiseeMyList();
            } else {
                self.$message.error(res.data.msg);
            }
        })
        .catch(function(err){
            console.log(err);
        });
    },
  },
  created() {
      this.applyCompany();
      //请求加盟邀请列表
    this.joiningTraderFranchiseeMyList();
    //请求加盟商列表
    this.joiningTraderFranchiseeList();
    // 加盟审批
    this.joiningTraderFranchiseeListEve();
  }
};
</script>
<style scoped>
.invitation .el-cascader {
  width: 100%;
}

.franchisee .el-cascader {
  margin: 15px 0;
}

.h3Title {
  margin: 10px 0;
}
</style>
