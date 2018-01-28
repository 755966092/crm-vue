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
                    expand-trigger="hover" 
                    :options="companyList"
                    filterable
                    change-on-select
                    :show-all-levels="false"
                    v-model="filterParam"
                    @change="fliterJoin"
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
                            <!-- prop="no_approver_content" -->
                        <el-table-column
                            prop="content"
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
                width="40%"
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
                    <el-button type="primary" @click="cancelFn(2)">确 定</el-button>
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
                    <el-button type="primary" @click="agreeAdd">确 定</el-button>
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
      // 筛选数据
      filterParam: [],
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
      companyList: [],
      formData: {
        contact: "",
        phone: "",
        industry: "",
        description: ""
      },
      // 加盟邀请
      invitationData: [],
      // 加盟商
      franchiseeData: [],
      // 加盟待审批
      pendingData: [],
      // 已取消
      cancelledData: [],
      // 已拒绝
      cancelledJvData: [],
      // 行数据
      selRowData: ""
    };
  },

  methods: {
      // 筛选
      fliterJoin(data) {
          this.joiningTraderFranchiseeList();
      },
    // 同意or拒绝加盟
    agreeAdd() {
      let self = this,
        paramObj,
        url;
      self.refusedJoin2 = false;
      if (this.diglogSubtitle == "同意") {
        // 同意加盟
        // /joiningTrader/FranchiseeInvitation    2
        //   console.log('同意加盟参数:' + JSON.stringify(self.selRowData));
        paramObj = {
          token: localStorage.getItem("crm_token"),
          apply_id: self.selRowData.apply_id,
          statu: 2
        };
      } else {
        // 拒绝加盟
        //   console.log('拒绝加盟参数:' + JSON.stringify(self.selRowData));
        //   console.log('拒绝加盟原因:' + self.denialReason);
        paramObj = {
          token: localStorage.getItem("crm_token"),
          apply_id: self.selRowData.apply_id,
          statu: 3,
          content: self.denialReason
        };
      }
      console.log("拒绝加盟参数:" + JSON.stringify(paramObj, null, 4));
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/joiningTrader/FranchiseeInvitation",
        data: paramObj
      })
        .then(function(res) {
          if (res.data.code === 200) {
            console.log(JSON.stringify(res.data.data, null, 4));
            self.$message({
              message: "审批成功",
              type: "success"
            });
            //请求加盟商列表
            self.joiningTraderFranchiseeList();
            // 加盟审批
            self.joiningTraderFranchiseeListEve();
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 取消
    cancelFn(flag) {
      let self = this,
        url,
        paramObj;
      if (flag == 1) {
        self.joinInvitation = false;
        // 取消加盟邀请
        url = "/api/joiningTrader/cancelFranchiseeInvitation",
          paramObj = {
            token: localStorage.getItem("crm_token"),
            trader_id: self.selRowData.trader_id
          };
      } else if (flag == 2) {
        self.cancelFranchisee2 = false;
        // 取消ji加盟商
        url = "/api/joiningTrader/cancelFranchisee",
          paramObj = {
            token: localStorage.getItem("crm_token"),
            apply_id: self.selRowData.apply_id,
            content: self.cancelFranchiseeReason
          };
      }
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
                 if (flag == 1) {
                     self.joiningTraderFranchiseeMyList();
                 } else {
                     self.joiningTraderFranchiseeList();
                 }
             } else {
                 self.$message.error(res.data.msg);
             }
          })
          .catch(function(err){
              console.log(err);
          });
    },
    handleEdit(row, column) {
      this.joinInvitation = true;
      this.selRowData = column;
    },
    showModel() {
      this.addInvitation = true;
    },
    cancelFranchiseeFn(index,value) {
      this.cancelFranchisee = true;
      this.selRowData = value
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
      this.selRowData = column;
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
      var self = this,paramObj;
      if (self.filterParam.length > 0) {
          paramObj = {
              token: localStorage.getItem("crm_token"),
              children_id: self.filterParam[self.filterParam.length - 1]
            }
      } else {
          paramObj = {
              token: localStorage.getItem("crm_token"),
            }
      }
      console.log('参数:'+JSON.stringify(paramObj));
      
      if (localStorage.getItem("adminRole") == 1) {
        //超管
        self
          .$axios({
            method: "POST",
            withCredentials: false,
            url: "/api/joiningTrader/FranchiseeList",
            data: paramObj
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
            data: paramObj
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
        method: "POST",
        withCredentials: false,
        url: "/api/company/CompanyMyList",
        data: {
          token: localStorage.getItem("crm_token")
        }
      })
        .then(function(res) {
          var arr = [];
          self.getMenuName(res.data.data.list);
          self.companyList = res.data.data.list;
          // console.log(JSON.stringify(res.data.data.list));
        })
        .catch(function(err) {
          console.log(err);
        });
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
    // 发布加盟邀请
    addInvitationFn() {
      let self = this;
      self.addInvitation = false;
      let paramObj = {
        token: localStorage.getItem("crm_token"),
        company_id: self.addCompany[self.addCompany.length - 1],
        contacts: self.formData.contact,
        contacts_phone: self.formData.phone,
        industry: self.formData.industry,
        content: self.formData.description
      };
      console.log("添加加盟邀请参数:" + JSON.stringify(paramObj, null, 4));
      // 加盟邀请
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/joiningTrader/releaseFranchisee",
        data: paramObj
      })
        .then(function(res) {
          if (res.data.code === 200) {
            self.$message({
              message: "添加加盟邀请成功",
              type: "success"
            });
            self.joiningTraderFranchiseeMyList();
          } else {
            self.$message.error(res.data.msg);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
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
