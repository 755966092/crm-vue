<template>
    <div class="componentsRoot">
        <el-row :gutter="5">
            <el-col :span="8">
                <div class="title">
                    <span>组织架构</span>
                    <el-button type="text" @click="showModel('subCompany')">新建子公司</el-button>
                    <el-button type="text" @click="showModel('editFranchisee')">调整加盟商</el-button>
                </div>
                <p class="companyName">本公司</p>
                <div class="select">
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
                <p class="margin10">查看加盟商</p>
                <el-select 
                    v-model="franchiseeId" 
                    @change="getChildrenDepartment"
                    placeholder="请选择">
                        <el-option
                            v-for="item in franchiseeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                <div class="companyName">
                    <el-button type="text" @click="openNewPage">返回上级</el-button>
                </div>
                <template>
                    <div>
                        <el-tree
                            :data="treeData"
                            default-expand-all
                            :expand-on-click-node='false'
                            @node-click="nodeClick"
                        ></el-tree>
                    </div>
                </template>
            </el-col>
            <el-col :span="16">
                <div class="title clearfix">
                    <span class="fl departmentText">{{ departmentName }}</span>
                    <div class="fr ">
                        <el-button type="text" @click="showModel('rename')">重命名</el-button>
                        <el-button type="text" @click="showModel('subDepartment')">添加子部门</el-button>
                        <el-button type="text">上移</el-button>
                        <el-button type="text">下移</el-button>
                        <el-button type="text" @click="showModel('delDepartment')">删除</el-button>
                    </div>
                </div>
                <div>
                    <span>上级公司负责人</span>
                    <el-button type="text" @click="showModel('setSupervisor','business')">添加业务负责人</el-button>
                    <el-button type="text" @click="showModel('setSupervisor'),'server'">添加服务负责人</el-button>
                </div>
                 <template>
                    <div>
                        <el-table
                            :data="principalData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            border
                        >
                            <el-table-column
                                type="index"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                sortable
                                label="姓名"
                                width="130"
                                show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <span class="colorBlue"
                                          @click="showModelTable(scope.$index, scope.row,'dialogVisible')">{{ scope.row.username }}
                                    </span>
                                    <span v-if="scope.row.statu == 1" style="color:#f00;font-size:12px">主管</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="role_name"
                                label="角色"
                                sortable
                                width="130"
                                show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                prop="mobile"
                                label="手机号"
                                width="130"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="position"
                                label="职务"
                                width="130"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="250"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="showModelTable(scope.$index, scope.row, 'selectRole')">更改角色
                                    </el-button>
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
                <div class="margin10">
                    <span >部门成员(不包括子部门成员)</span>
                    <!-- <el-button type="text" @click="showModel('addEmployee')">添加成员</el-button> -->
                    <!-- <el-button type="text" @click="showModel('setSupervisor')">设置主管</el-button> -->
                </div>
                <template>
                    <div>
                        <el-table
                            :data="departmentStaff"
                            tooltip-effect="dark"
                            style="width: 100%"
                            border
                        >
                            <el-table-column
                                type="index"
                                align="center"
                            >
                            </el-table-column>
                            <el-table-column
                                sortable
                                label="姓名"
                                width="130"
                                show-overflow-tooltip
                            >
                                <template slot-scope="scope">
                                    <span class="colorBlue"
                                          @click="showModelTable(scope.$index, scope.row,'dialogVisible')">{{ scope.row.user_name }}
                                    </span>
                                    <span v-if="scope.row.statu == 1" style="color:#f00;font-size:12px">主管</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="role_name"
                                label="角色"
                                sortable
                                width="130"
                                show-overflow-tooltip
                            >
                            </el-table-column>
                            <el-table-column
                                prop="user_mobile"
                                label="手机号"
                                width="130"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                prop="user_position"
                                label="职务"
                                width="130"
                                show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="250"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="showModelTable(scope.$index, scope.row, 'selectRole')">更改角色
                                    </el-button>
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

            </el-col>
        </el-row>
        <!-- 新建员工 -->
        <template>
            <div>
                <el-dialog
                    title="员工信息"
                    :visible.sync="dialogVisible"
                    width="50%"
                >

                    <div>
                        <span class="iptName">姓名:</span>
                        <el-input v-model="selRoleData.user_name" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">职务:</span>
                        <el-input v-model="selRoleData.user_position" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">角色:</span>
                        <!-- <el-input v-model="selRoleData.role_name" placeholder="请输入内容"></el-input> -->
                        <el-select v-model="selRoleData.role_id" placeholder="请选择">
                            <el-option
                                v-for="item in roleList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span class="iptName">电话:</span>
                        <el-input v-model="selRoleData.user_mobile" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">手机:</span>
                        <el-input v-model="selRoleData.user_telephone" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">微信:</span>
                        <el-input v-model="selRoleData.user_wechat" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">QQ:</span>
                        <el-input v-model="selRoleData.user_qq" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">邮箱:</span>
                        <el-input v-model="selRoleData.user_email" placeholder="请输入内容"></el-input>
                    </div>
                    <p style="margin:10px 0; font-size:16px;">部门: {{selRoleData.departmens}}</p>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addSubCompany('dialogVisible')">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </template>
        <!-- 重命名 -->
        <div class="rename">
            <el-dialog
                title="重命名"
                :visible.sync="rename"
                width="50%"
            >
                新名称
                <el-input style="width:100%" v-model="departmentNewName" placeholder="请输入内容"></el-input>
                <span slot="footer" class="dialog-footer">
								<el-button @click="rename = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('newName')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 添加子部门 -->
        <div class="subDepartment">
            <el-dialog
                title="添加子部门"
                :visible.sync="subDepartment"
                width="50%"
            >
                部门名称
                <el-input style="width:100%" v-model="subDepartmentName" placeholder="请输入内容"></el-input>
                <span slot="footer" class="dialog-footer">
								<el-button @click="subDepartment = false">取 消</el-button>
								<el-button type="primary"  @click="addSubCompany('department')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 删除部门 -->
        <div class="delDepartment">
            <el-dialog
                title="删除"
                :visible.sync="delDepartment"
                width="50%"
            >
                <span>是否确认删除该部门?</span>
                <span slot="footer" class="dialog-footer">
								<el-button @click="delDepartment = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('del')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 新建子公司 -->
        <div class="subCompany">
            <el-dialog
                title="新建子公司"
                :visible.sync="subCompany"
                width="50%"
            >
                公司名称
                <el-input style="width:100%" v-model="subCompanyName" placeholder="请输入公司名称"></el-input>
                <span slot="footer" class="dialog-footer">
								<el-button @click="subCompany = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('company')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 调整加盟商 -->
        <div class="editFranchisee">
            <el-dialog
                title="调整加盟商"
                :visible.sync="editFranchisee"
                width="50%"
            >   
                选择加盟商
                <div>
                    <el-select v-model="franchiseeId" placeholder="请选择">
                        <el-option
                            v-for="item in franchiseeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                所属的上级公司
                <div>
                        <el-cascader
                            expand-trigger="hover"
                            :options="parentCompanyList"
                            change-on-select
                            filterable
                            :show-all-levels="false"
                            v-model="selFranchiseeCompanyId"
                        >
                        </el-cascader>
                </div>
               
                <span slot="footer" class="dialog-footer">
								<el-button @click="editFranchisee = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('editFranchisee')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 添加成员 -->
        <div class="addEmployee">
            <el-dialog
                title="添加员工"
                :visible.sync="addEmployee"
                width="50%"
            >
                <div class="addEmployeeBtn">
                    <el-button type="primary" class="addEmployeeBtn" @click="addCurrentEmployee">从现有员工中选择</el-button>
                </div>
                <div class="addEmployeeBtn">
                    <el-button type="primary" class="addEmployeeBtn" @click="addNewEmployee">添加新员工</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 现有员工中选择 -->
        <div class="currentEmployee">
            <el-dialog
                title="从现有员工中选择"
                :visible.sync="currentEmployee"
                width="50%"
            >
                <div>
                    <el-select v-model="currentUserId" placeholder="请选择">
                        <el-option
                            v-for="item in companyAllUser"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
								<el-button @click="currentEmployee = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('currentEmployee')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 添加新员工 -->
        <div class="newEmployee">
            <el-dialog
                title="添加新员工"
                :visible.sync="newEmployee"
                width="50%"
            >
                姓名
                <el-input style="width:100%" v-model="addEmployeeData.name" placeholder="请输入姓名"></el-input>
                手机号
                <el-input style="width:100%" v-model="addEmployeeData.phone" placeholder="请输入手机号"></el-input>

                角色
                <div style="width:100%">
                    <el-select v-model="addEmployeeData.role" placeholder="请选择">
                        <el-option
                            v-for="item in roleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                初始密码
                <el-input style="width:100%" v-model="addEmployeeData.psd" placeholder="请输入初始密码"></el-input>

                <span slot="footer" class="dialog-footer">
								<el-button @click="newEmployee = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('newEmployee')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 设置服务负责人 -->
        <div class="setSupervisor">
            <el-dialog
                title="设置主管"
                :visible.sync="setSupervisor"
                width="50%"
            >
                选择员工
                <div style="width:100%">
                    <el-select v-model="selUserId" placeholder="请选择">
                        <el-option
                            v-for="item in departmentStaffOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
								<el-button @click="setSupervisor = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('setSupervisor')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 更改角色 -->
        <div class="selectRole">
            <el-dialog
                title="更改角色"
                :visible.sync="selectRole"
                width="50%"
            >
                选择角色
                <div>
                    <el-select v-model="roleId" placeholder="请选择">
                        <el-option
                            v-for="item in roleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="selectRole = false">取 消</el-button>
                        <el-button type="primary" @click="addSubCompany('selectRole')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 交接 -->
        <div class="handover">
            <el-dialog
                title="交接"
                :visible.sync="handover"
                width="50%"
            >
                交接
                <div class="addEmployeeBtn">
                    <el-button type="primary" class="addEmployeeBtn" @click="handoverBusiness(1)">仅交接当前部门业务</el-button>
                </div>
                <div class="addEmployeeBtn">
                    <el-button type="primary" class="addEmployeeBtn" @click="handoverBusiness(0)">交接全部业务</el-button>
                </div>

            </el-dialog>
        </div>
        <div class="selectPeople">
            <el-dialog
                title="交接业务"
                :visible.sync="selectPeople"
                width="50%"
            >
                选择员工交接{{selectPeopleFlag}}
                <div>
                    <el-select v-model="selUserId" placeholder="请选择">
                        <el-option
                            v-for="item in departmentStaffOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
								<el-button @click="selectPeople = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('selectPeople')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
        <!-- 删除 -->
        <div class="deleteBtn">
            <el-dialog
                title="删除"
                :visible.sync="deleteBtn"
                width="50%"
            >
                删除
                <div class="addEmployeeBtn">
                    <el-button type="primary" class="addEmployeeBtn" @click="deleteEmployeeEvent(1)">从本部门删除</el-button>
                </div>
                <div class="addEmployeeBtn">
                    <el-button type="primary" class="addEmployeeBtn" @click="deleteEmployeeEvent(0)">彻底删除</el-button>
                </div>

            </el-dialog>
        </div>
        <div class="deleteEmployee">
            <el-dialog
                title="删除员工"
                :visible.sync="deleteEmployee"
                width="50%"
            >
                选择员工交接{{deleteEmployeeFlag}}
                <div>
                    <el-select v-model="selUserId" placeholder="请选择">
                        <el-option
                            v-for="item in departmentStaffOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
								<el-button @click="deleteEmployee = false">取 消</el-button>
								<el-button type="primary" @click="addSubCompany('deleteEmployee')">确 定</el-button>
						</span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 负责人列表数据
                principalData: [],
                // 调整加盟商上级公司
                selFranchiseeCompanyId: [],
                // 表格炒作的数据
                selRoleData: '',
                // 更改劫色
                roleId: '',
                // 添加员工 -> 从公司现有员工选择 -> 当前选择员工
                currentUserId: '',
                // 角色列表
                roleList: [],
                // 添加新员工
                addEmployeeData: {
                    name: '',
                    phone: '',
                    psd: '',
                    role: ''
                },
                // 新建子部门名称
                subDepartmentName: '',
                // 新建子公司名称
                subCompanyName: '',
                // g公司列表
                selCompanyList: [parseInt(localStorage.getItem('motherCompanyId'))],
                motnerCompanyId: parseInt(localStorage.getItem('motherCompanyId')),
                dialogVisible: false,
                rename: false,
                subDepartment: false,
                delDepartment: false,
                subCompany: false,
                editFranchisee: false,
                addEmployee: false,
                currentEmployee: false,
                newEmployee: false,
                setSupervisor: false,
                selectRole: false,
                handover: false,
                selectPeople: false,
                deleteBtn: false,
                deleteEmployee: false,
                selectPeopleFlag: '本部门',
                deleteEmployeeFlag: "",
                input: "aaa",
                options: [{
                    value: "选项1",
                    label: "黄金糕"
                    },
                    {
                        value: "选项2",
                        label: "双皮奶"
                    },
                    {
                        value: "选项3",
                        label: "蚵仔煎"
                    },
                    {
                        value: "选项4",
                        label: "龙须面"
                    },
                    {
                        value: "选项5",
                        label: "北京烤鸭"
                    }
                ],
                // 部门员工
                departmentStaff: [],
                departmentStaffOption: [],
                treeData: [],
                parentCompanyList: [],
                value: "",
                // 部门名称
                departmentName: '',
                // 当前部门ID
                departmentId: 1,
                departmentNewName: '',
                // 主管id
                selUserId: '',
                // 子公司id
                subsidiaryId:'',
                // 公司所有与昂
                companyAllUser: [],
                // 所有加盟商
                franchiseeList: [],
                franchiseeId: '',
              
            };
        },
        methods: {
            // 获取加盟商负责人
            getPrincipalData() {
                    let self = this;
                    this.$axios({
                       method: 'POST',
                       withCredentials: false,
                       url: '/api/UserJoinApply/joinUserList',
                       data: {
                           token: localStorage.getItem('crm_token'),
                           apply_id: self.franchiseeId
                       }
                    })
                    .then(function(res){
                       if (res.data.code === 200) {
                            console.log(JSON.stringify(res.data.data, null, 4))
                            self.principalData = res.data.data.list
                       } else {
                           self.$message.error(res.data.msg);
                       }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            },
            // 获取所有加盟商
            getFranchisee() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/joiningTrader/FranchiseeMyListId',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        company_id: self.selCompanyList[self.selCompanyList.length - 1]
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        console.log(JSON.stringify(res.data.data, null, 4))
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            let element = res.data.data.list[i];
                            element.label = element.apply_company_name
                            element.value = element.apply_company_id
                            
                        }
                        self.franchiseeList = res.data.data.list
                        if (self.franchiseeList.length > 0) {
                            self.franchiseeId = self.franchiseeList[0].value
                            self.getChildrenDepartment();
                            self.getPrincipalData();
                        }
                        console.log('111:::'+JSON.stringify(self.franchiseeList ,null,4));
                        
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 打开加盟商详情页
            openNewPage() {
                this.$router.push({path: '/setting'})
            },
            // 获取公司所有加盟商
            getCompanyAdd() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/joiningTrader/FranchiseeMyList',
                    data: {
                        token: localStorage.getItem('crm_token'),
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        console.log(JSON.stringify(res.data.data, null, 4))
                        self.$message({
                            message: '成功',
                            type: 'success'
                        })
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 获取公司所有员工
            getCompanyAllUser() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/company/companyUsers',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        company_id: self.selCompanyList[self.selCompanyList.length-1]
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        let arr = []
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            let element = res.data.data.list[i];
                            arr.push({
                                label:element.name,
                                value:element.id
                            })
                        }
                        self.companyAllUser = arr;
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 获取公司角色列表
            getRoleList() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/Role/roleList',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        company_id: self.selCompanyList[self.selCompanyList.length-1]
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                    //    roleList
                        for (let i = 0; i < res.data.data.list.length; i++) {
                            let element = res.data.data.list[i];
                            element.label = element.name,
                            element.value = element.id;
                        }
                        self.roleList = res.data.data.list;
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 操作数据
            addSubCompany(flag) {
                let self = this,url,paramObj,str;
                // 新建子公司
                if (flag == 'company') {
                    str = '创建子公司成功'
                    self.subCompany = false;
                    url = '/api/company/applyCompany',
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        name: self.subCompanyName,
                        parent_id: self.selCompanyList[self.selCompanyList.length-1],
                        mother_id: self.motnerCompanyId
                    }
                } else if (flag == 'department') { 
                    // 新建子部门
                    self.subDepartment = false;
                    str = '创建子部门成功'
                    url = '/api/department/applyDepartment',
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        name: self.subDepartmentName,
                        company_id: self.selCompanyList[self.selCompanyList.length-1],
                        parent_id: self.departmentId
                    }
                } else if (flag == 'newName') {
                    // 重命名部门
                     self.rename = false;
                     str = '重命名成功'
                    let name = self.departmentNewName || self.departmentName;
                    url = '/api/department/editDepartment'
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        department_id: self.departmentId,
                        name: name
                    }
                } else if (flag == 'del') {
                    // 删除部门
                    self.delDepartment = false;
                    str = '删除成功'
                    url = '/api/department/deleteDepartment',
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        department_id: self.departmentId,
                    }
                } else if (flag == 'newEmployee'){
                    // 添加新员工
                    self.newEmployee = false;
                    str = '添加成功'
                    url = '/api/department/applyUserNewDepartment',
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        department_id: self.departmentId,
                        name: self.addEmployeeData.name,
                        mobile: self.addEmployeeData.phone,
                        role_id: self.addEmployeeData.role,
                        password: self.addEmployeeData.psd,
                    }
                } else if (flag == 'currentEmployee' ) {
                    // 添加员工(从公司员工选择)
                    self.currentEmployee = false;
                    str = '添加成功'
                    url = '/api/department/applyUserDepartment',
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        department_id: self.departmentId,
                        user_id: self.currentUserId
                    }
                } else if (flag == 'setSupervisor') {
                    // 设置部门主管
                    self.setSupervisor = false;
                    str = '设置成功'
                    url = '/api/department/makeAdminDepartment',
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        department_id: self.departmentId,
                        admin_id: self.selUserId
                    }
                } else if (flag == 'selectRole') {
                    // 修改员工角色
                    self.selectRole = false;
                    str = '修改成功'
                    url = '/api/User/userRoleEdit';
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        user_id: self.selRoleData.user_id,
                        role_id: self.roleId
                    }
                } else if (flag == 'selectPeople') {
                    // 交接业务
                    self.selectPeople = false;
                    str = '交接成功'
                    url = '/api/User/userJoinWork';
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        user_id: self.selRoleData.user_id,
                        to_user_id: self.departmentId,
                        type: self.selectPeopleFlag == '本部门业务' ? 2 : 1,
                        department_id: self.departmentId
                    }
                } else if (flag == 'deleteEmployee') {
                    self.deleteEmployee = false;
                    str = '删除成功'
                    url = '/api/User/userDelete';
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        user_id: self.selRoleData.user_id,
                        to_user_id: self.departmentId,
                        type: self.deleteEmployeeFlag == '本部门员工' ? 2 : 1,
                        department_id: self.departmentId
                    }
                } else if (flag == 'dialogVisible') {
                    // 编辑员工
                    self.dialogVisible = false;
                    str = '保存成功'
                    url = '/api/User/userDetailEdit';
                    paramObj = self.selRoleData;
                    paramObj.token = localStorage.getItem('crm_token')
                } else if (flag == 'editFranchisee') {
                    // 调整加盟商
                    self.editFranchisee = false;
                    str = '调整成功'
                    url = '/api/joiningTrader/editSheepFrach';
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        apply_id: self.franchiseeId,
                        company_id: self.selFranchiseeCompanyId[self.selFranchiseeCompanyId.length - 1],
                    }
                }
                else {

                }
                console.log('参数::'+JSON.stringify(paramObj));
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: paramObj
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: str,
                            type: 'success'
                        });
                        
                        if (flag == 'company') {
                            self.applyCompany();
                        } else if (flag == 'department') { 
                            if (self.selCompanyList[self.selCompanyList.length-1] == self.motnerCompanyId) {
                                self.childrenDepartment();
                            } else {
                                self.getChildrenDepartment();
                            }
                        } else if (flag == 'newName') {
                            // self.childrenDepartment();
                            if (self.selCompanyList[self.selCompanyList.length-1] == self.motnerCompanyId) {
                                self.childrenDepartment();
                            } else {
                                self.getChildrenDepartment();
                            }
                        }  else if (flag == 'del') {
                            if (self.selCompanyList[self.selCompanyList.length-1] == self.motnerCompanyId) {
                                self.childrenDepartment();
                            } else {
                                self.getChildrenDepartment();
                            }
                        } else if (flag == 'setSupervisor' || flag == 'currentEmployee' || flag == 'newEmployee' || flag == 'selectRole'|| flag == 'deleteEmployee' || flag=="dialogVisible") {
                            self.departmentMakeAdminDepartmentList();
                        }  
                        else {

                        }
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            showModel(param) {
                this[param] = true;
                if (param == 'editFranchisee') {
                    this.getFranchisee();
                }
            },
            showModelTable(row, data, param) {
                console.log('表格按钮:');
                console.log(data);
                this[param] = true;
                this.selRoleData = data;
            },
            addCurrentEmployee() {
                // 现有员工选择
                this.addEmployee = false;
                this.currentEmployee = true;
                this.getCompanyAllUser();
            },
            addNewEmployee() {
                // 现有员工选择
                this.addEmployee = false;
                this.newEmployee = true;
            },
            handoverBusiness(n) {
                // n=1 交接本部门业务
                // n=0 交接全部业务
                this.handover = false;
                if (n === 1) {
                    this.selectPeopleFlag = '本部门业务'
                } else {
                    this.selectPeopleFlag = '所有业务'
                }
                this.selectPeople = true;
            },
            deleteEmployeeEvent(n) {
                // n=1 交接本部门业务
                // n=0 交接全部业务
                this.deleteBtn = false;
                if (n === 1) {
                    this.deleteEmployeeFlag = '本部门员工'
                } else {
                    this.deleteEmployeeFlag = '所有业务'
                }
                this.deleteEmployee = true;
            },
            // 点击级联选择器
            handleChange(data) {
                this.departmentStaff = [];
                this.subsidiaryId = data[data.length-1];
                // 所有加盟商
              
                this.treeData = [];
                this.franchiseeList = [];
                this.franchiseeId = '';
                this.departmentName = '';
                this.departmentNewName = '';
                this.departmentId = 0;
                this.principalData = [];
                  this.getFranchisee();
                this.getRoleList();
            },
            // 子公司所有部门
            getChildrenDepartment() {
                // /department/getChildrenDepartmentTo
                    let self = this;
                    this.$axios({
                       method: 'POST',
                       withCredentials: false,
                       url: '/api/department/getChildrenDepartmentTo',
                       data: {
                           token: localStorage.getItem('crm_token'),
                           mother_id: self.franchiseeId
                       }
                    })
                    .then(function(res){
                       if (res.data.code === 200) {
                        //    console.log(JSON.stringify(res.data.data, null, 4))
                         if (res.data.data.list.length > 0) {
                            self.getMenuName(res.data.data.list);
                            self.treeData = res.data.data.list;
                            // self.departmentName = res.data.data.list[0].label;
                            // self.departmentNewName = res.data.data.list[0].label;
                            // self.departmentId = res.data.data.list[0].id;
                            self.departmentId = 0;
                            self.departmentMakeAdminDepartmentList();
                         } else {
                             self.treeData = res.data.data.list;
                             self.departmentName = '';
                             self.departmentId = 0;
                         }
                       } else {
                           self.$message.error(res.data.msg);
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
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/company/CompanyMyList',
                    data: {
                        token: localStorage.getItem('crm_token'),
                    }
                })
                    .then(function (res) {
                        self.getMenuName(res.data.data.list);
                        self.parentCompanyList = res.data.data.list
                        // console.log(JSON.stringify(self.parentCompanyList))
                        // 获取所有加盟商
                        self.getFranchisee();
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
            nodeClick(data, note, self) {
                // data 节点原始数据
                // note 节点数据
                // self 节点组件本身
                console.log('节点原始数据::');
                console.log(data);
                
                console.log('节点数据::');
                console.log(note);
                
                console.log('节点组件本身::');
                console.log(self);
                
                
                this.departmentNewName = data.name
                this.departmentName = data.name;
                this.departmentId = data.id;
                this.departmentMakeAdminDepartmentList();
            },
            // 当前部门下的员工
            departmentMakeAdminDepartmentList() {
                var self = this;
                if(self.departmentId == 0) {

                } else {
                    self.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/department/makeAdminCDepartmentList',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            department_id: self.departmentId
                        }
                    })
                        .then(function (res) {
                            self.departmentStaff = res.data.data.list;
                            console.log(res.data.data.list);
                            
                            if (res.data.data.list.length > 0) {
                                let arr = [];
                                for (let i = 0; i < res.data.data.list.length; i++) {
                                    let obj = res.data.data.list[i];
                                    arr.push({
                                        label: obj.user_name,
                                        value: obj.user_id
                                    })
                                }
                                self.departmentStaffOption = arr;
                            }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                }
            },
        },
        //
        created() {
            // this.childrenDepartment();
            this.applyCompany();
            this.getRoleList();

        }
    };
</script>

<style scoped>
    .companyName {
        margin: 10px 0;
    }

    .el-input,
    .el-select {
        width: 100%;
        margin: 5px 0;
    }

    .iptName {
        display: inline-block;
        width: 50px;
    }

    .addEmployeeBtn {
        width: 100%;
        margin: 5px 0;
    }

    #wrap {
        min-width: 800px;
    }

    .departmentText {
        display: inline-block;
        width: 250px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 34px;
    }
    /* 级联选择框 */
    .el-cascader {
        width: 100%;
    }
    .el-tree {
        max-height: 402px;
        overflow: scroll;
    }
    .colorBlue {
        cursor: pointer;
    }
    .margin10 {
        margin: 10px 0;
    }
</style>
