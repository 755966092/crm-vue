<template>
    <div class="componentsRoot">
        <el-row :gutter="15">
            <el-col :span="8">
                <div class="title">
                    <span>角色</span>
                    <el-button type="text" @click="addRole">新建角色</el-button>
                </div>
                <div class="block">
                <el-cascader
                   expand-trigger="hover"
                   :options="parentCompanyList"
                   @change="handleChange"
                   change-on-select
                    filterable
                    :show-all-levels="false"
                    v-model="selCompanyList"
               >
               </el-cascader>
                </div>
                <div id="radioBtn">
                    <el-radio-group v-model="currentRole"  @change="handRole">
                        <el-radio-button class="radioBtn" v-for="(item,index) in allRoleList" :label="item.id">{{item.name}}</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col :span="16">
                <div>
                    <el-tabs v-model="activeName2" type="border-card">
                        <el-tab-pane label="操作权限" name="first">
                            <template v-for="(items, key) in allClueList" >
                                <p v-if="key == 1" class="checkTitle">线索</p>
                                <p v-else-if="key == 2" class="checkTitle">客户</p>
                                <p v-else-if="key == 3" class="checkTitle">合同</p>
                                <p v-else-if="key == 4" class="checkTitle">款项</p>
                                <p v-else-if="key == 5" class="checkTitle">报表</p>
                                <p v-else-if="key == 6" class="checkTitle">系统</p>
                                <el-row class="checkWrap">
                                    <el-checkbox-group 
                                        v-model="currentRolePermissions" 
                                        @change="roleEditRole" >
                                        <template v-for="item in items">
                                            <el-col class="checkCol" :span="6">
                                                <el-checkbox :label="item.id">
                                                    {{item.role_name}}
                                                </el-checkbox>
                                            </el-col>
                                        </template>
                                    </el-checkbox-group>
                                </el-row>
                                <!-- <hr> -->
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="数据权限" name="second">
                            <h3>数据权限(设置该角色的用户可以操作数据的范围)</h3>
                            <div class="mt10">
                                <el-radio-group v-model="dataPermission" @change="roleEditRole">
                                    <el-radio :label="1">
                                        <span class="dataLabel">个人</span>
                                        <span class="dataLabelInfo">只能操作自己的数据</span>
                                    </el-radio>
                                    <el-radio :label="2">
                                        <span class="dataLabel">所属部门</span>
                                        <span class="dataLabelInfo">能操作自己, 自己所属部门的数据</span>
                                    </el-radio>
                                    <el-radio :label="3">
                                        <span class="dataLabel">所属部门及下属部门</span>
                                        <span class="dataLabelInfo">能操作自己, 自己所属部门及其子部门的数据</span>
                                    </el-radio>
                                    <el-radio :label="4">
                                        <span class="dataLabel">所属公司</span>
                                        <span class="dataLabelInfo">能操作自己所属公司的数据</span>
                                    </el-radio>
                                    <el-radio :label="5">
                                        <span class="dataLabel">全部</span>
                                        <span class="dataLabelInfo">能操作所有数据</span>
                                    </el-radio>
                                </el-radio-group>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
        <!-- 新建角色 -->
          <el-dialog
                title="添加角色"
                :visible.sync="addRoleStatu"
                width="30%"
                >
                <div>
                    <span class="iptName">角色名称</span>
                    <el-input v-model="roleName" placeholder="请输入角色名称"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addRoleStatu = false">取 消</el-button>
                    <el-button type="primary" @click="addRole2">创 建</el-button>
                </span>
          </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
        // 添加角色模态框
        addRoleStatu: false,
        roleName: '',
      // 选中的子公司
      selCompanyList: [parseInt(localStorage.getItem("motherCompanyId"))],
      dataPermission: '',
      allClueList: {},
      activeName2: "first",
      currentRole: "",
      currentRolePermissions: [],
      parentCompanyList: [],
      
      allRoleList: [],
      companyId: localStorage.getItem("motherCompanyId"),
      
    };
  },
  methods: {
      // 添加角色
      addRole() {
          this.addRoleStatu = true;
      },
      addRole2() {
          this.addRoleStatu = false;
              let self = this;
              let obj = {
                     token: localStorage.getItem('crm_token'),
                     name: self.roleName,
                     company_id: self.companyId,
                     data_auth: '',
                     data_auths: ''
                 }
              this.$axios({
                 method: 'POST',
                 withCredentials: false,
                 url: '/api/Role/addRole',
                 data: obj
              })
              .then(function(res){
                 if (res.data.code === 200) {
                     self.$message({
                         message: '添加角色成功',
                         type: 'success'
                     })
                     self.getAllRole();
                 } else {
                    self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                 }
              })
              .catch(function(err){
                  console.log(err);
              });
      },
    //当前选中角色操作权限id
    handRole(data) {
        let self = this;
        self.currentRole  = data;
        for (let i = 0; i < self.allRoleList.length; i++) {
            const element = self.allRoleList[i];
            if (element.id == data) {
                if (element.opat_auth) {
                    self.currentRolePermissions = element.opat_auth;
                } else {
                    self.currentRolePermissions = [];
                }
                if (element.data_auth) {
                     self.dataPermission = element.data_auth;
                } else {
                    self.dataPermission = '';
                }
            }
        }
        console.log('权限列表:'+ self.currentRolePermissions);
        
       
    },
    // 选择子公司
    handleChange(data) {
      this.companyId = data[data.length - 1];
      this.getAllRole();
    },
    // 修改角色权限
    roleEditRole() {
            let self = this;
            console.log(self.currentRolePermissions);
            
            let obj = {
                    token: localStorage.getItem('crm_token'),
                    role_id: self.currentRole,
                    data_auths: self.currentRolePermissions.toString(),
                    data_auth: self.dataPermission
               }
               console.log(JSON.stringify(obj,null,4));
            this.$axios({
               method: 'POST',
               withCredentials: false,
               url: '/api/Role/editRole',
               data: obj
            })
            .then(function(res){
               if (res.data.code === 200) {
                   self.$message({
                       message: '修改角色权限成功',
                       type: 'success'
                   })
               } else {
                  self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
               }
            })
            .catch(function(err){
                console.log(err);
            });
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
                
                self.getMenuName(res.data.data.list);
            self.parentCompanyList = res.data.data.list;
            } else {
                self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 当前母公司所有角色
    getMotherCompanyRole() {
        let self = this;
        this.$axios({
            method: 'POST',
            withCredentials: false,
            url: '/api/Role/roleListMu',
            data: {
                token: localStorage.getItem('crm_token'),
            }
        })
        .then(function(res){
            if (res.data.code === 200) {
                // 母公司所有角色
                console.log('母公司所有角色'+JSON.stringify(res.data.data.list));
                if (res.data.data.list.length > 0) {
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        if (res.data.data.list[i].opat_auth) {
                            res.data.data.list[i].opat_auth = res.data.data.list[i].opat_auth.split(',').map((value)=>value?parseInt(value):'')
                        }
                    }
                    self.allRoleList = res.data.data.list;
                    self.currentRole = res.data.data.list[0].id;
                    self.dataPermission = res.data.data.list[0].data_auth;
                    self.currentRolePermissions = res.data.data.list[0].opat_auth;
                    console.log('当前母公司所有角色:'+self.currentRolePermissions);
                    
                } 
                
            } else {
               self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
        })
        .catch(function(err){
            console.log(err);
        });
    },
    // 所有权限
    opatRole() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/OpatAuth/roleList",
        data: {
          token: localStorage.getItem("crm_token")
        }
      })
        .then(function(res) {
            if (res.data.code == 200) {
                
                self.allClueList = res.data.data.list;
            // console.log('所有权限'+JSON.stringify(res.data.data.list));
          self.getMotherCompanyRole();
            } else {
                self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 子公司所有角色
    getAllRole() {
      let self = this;
      this.$axios({
        method: "POST",
        withCredentials: false,
        url: "/api/Role/roleList",
        data: {
          token: localStorage.getItem("crm_token"),
          company_id: self.companyId
        }
      })
        .then(function(res) {
            if (res.data.code === 200) {
                self.allRoleList = res.data.data.list;
                if (res.data.data.list.length>0) {
                    for (let i = 0; i < res.data.data.list.length; i++) {
                        const element = res.data.data.list[i];
                        if (res.data.data.list[i].opat_auth) {
                            res.data.data.list[i].opat_auth = res.data.data.list[i].opat_auth.split(',').map((value)=>value?parseInt(value):'')
                        }
                    }
                    // console.log('当前:::'+ JSON.stringify(res.data.data.list));
                    
                    self.currentRole = res.data.data.list[0].id;
                    self.dataPermission = res.data.data.list[0].data_auth;
                    self.currentRolePermissions = res.data.data.list[0].opat_auth || [];
                    // console.log('当前子公司所有角色111:'+self.currentRolePermissions);
                    
                    
                } else {
                    self.currentRole = '';
                    self.dataPermission = '';
                    self.currentRolePermissions = [];
                    // console.log('当前子公司所有角色22:'+self.currentRolePermissions);
                }
            } else {
               self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
            }
         
          // console.log(this.allClueList);
        })
        .catch(function(err) {
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
    this.opatRole();
  }
};
</script>

<style scoped>
@import "./css/radioBtn.css";

.radioBtn {
  width: 100%;
  margin: 3px 0;
}

.el-cascader {
  width: 100%;
}

.el-col {
  padding: 0 5px;
}

.checkTitle {
  margin: 10px 0;
}

.checkWrap {
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 10px;
}

.checkCol {
  padding-bottom: 5px;
}

.el-radio {
  width: 100%;
  margin: 10px 0;
}
.el-radio-group {
  width: 80%;
}

.el-radio + .el-radio {
  margin-left: 0;
}

.dataLabel {
  display: inline-block;
  width: 250px;
}

.dataLabelInfo {
  color: #409eff;
}

.mt10 {
  margin-top: 10px;
}
#radioBtn {
    max-height: 600px;
    overflow: scroll;
}
</style>
