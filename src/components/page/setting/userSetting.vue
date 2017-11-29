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
					<el-cascader expand-trigger="hover" :options="parentCompanyList"  @change="handleChange">
					</el-cascader>
				</div>
				<div class="companyName">
					<el-button type="text">调整加盟商</el-button>
				</div>
				<Tree :treeData="treeData"></Tree>
			</el-col>
			<el-col :span="16">
				<div class="title">
					<span>市场部</span>
					<el-button type="text" @click="showModel('rename')">重命名</el-button>
					<el-button type="text" @click="showModel('subDepartment')">添加子部门</el-button>
					<el-button type="text">上移</el-button>
					<el-button type="text">下移</el-button>
					<el-button type="text" @click="showModel('delDepartment')">删除</el-button>
				</div>
				<div>
					<span>部门成员(不包括子部门成员)</span>
					<el-button type="text" @click="showModel('addEmployee')">添加成员</el-button>
					<el-button type="text" @click="showModel('setSupervisor')">设置主管</el-button>
				</div>
				<settingTable @handover="showModel('handover')" @deleteBtn="showModel('deleteBtn')" @showModel="showModelTable()" @selectRole="showModel('selectRole')"></settingTable>
			</el-col>
		</el-row>
		<template>
				<div>
							<el-dialog
							title="员工信息"
							:visible.sync="dialogVisible"
							width="20%"
							>
								
							<div>
									<span class="iptName">姓名:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
							</div>
							<div>
								<span class="iptName">职务:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
								</div>
							<div>
								<span class="iptName">角色:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
								</div>
							<div>
								<span class="iptName">电话:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
								</div>
							<div>
								<span class="iptName">手机:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
								</div>
							<div>
								<span class="iptName">微信:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
								</div>
							<div>
								<span class="iptName">QQ:</span> 
								<el-input  v-model="input" placeholder="请输入内容"></el-input>
								</div>
								<span slot="footer" class="dialog-footer">
										<el-button @click="dialogVisible = false">取 消</el-button>
										<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
								</span>
							</el-dialog>
				</div>
</template>
		<!-- 重命名 -->
			<div class="rename">
						<el-dialog
						title="重命名"
						:visible.sync="rename"
						width="20%"
						>
						新名称
						<el-input style="width:100%"  v-model="rename" placeholder="请输入内容"></el-input>
						<span slot="footer" class="dialog-footer">
								<el-button @click="rename = false">取 消</el-button>
								<el-button type="primary" @click="rename = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
		<!-- 添加子部门 -->
			<div class="subDepartment">
						<el-dialog
						title="添加子部门"
						:visible.sync="subDepartment"
						width="20%"
						>
						部门名称
						<el-input style="width:100%"  v-model="subDepartment" placeholder="请输入内容"></el-input>
						<span slot="footer" class="dialog-footer">
								<el-button @click="subDepartment = false">取 消</el-button>
								<el-button type="primary" @click="subDepartment = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
			<!-- 删除 -->
			<div class="delDepartment">
						<el-dialog
						title="删除"
						:visible.sync="delDepartment"
						width="20%"
						>
					<span>是否确认删除该部门?</span>
						<span slot="footer" class="dialog-footer">
								<el-button @click="delDepartment = false">取 消</el-button>
								<el-button type="primary" @click="delDepartment = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
			<!-- 新建子公司 -->
				<div class="subCompany">
						<el-dialog
						title="新建子公司"
						:visible.sync="subCompany"
						width="20%"
						>
						公司名称
						<el-input style="width:100%"  v-model="subCompany" placeholder="请输入公司名称"></el-input>
						<span slot="footer" class="dialog-footer">
								<el-button @click="subCompany = false">取 消</el-button>
								<el-button type="primary" @click="subCompany = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
			<!-- 调整加盟商 -->
			<div class="editFranchisee">
						<el-dialog
						title="新建子公司"
						:visible.sync="editFranchisee"
						width="20%"
						>
						所属的上级公司
					<div>
							<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
						选择加盟商
						<div>
								<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
						</div>
						<span slot="footer" class="dialog-footer">
								<el-button @click="editFranchisee = false">取 消</el-button>
								<el-button type="primary" @click="editFranchisee = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
			<!-- 添加成员 -->
			<div class="addEmployee">
						<el-dialog
						title="添加员工"
						:visible.sync="addEmployee"
						width="20%"
						>
								<div class="addEmployeeBtn">
									<el-button type="primary" class="addEmployeeBtn" @click="addCurrentEmployee">从现有员工中选择</el-button>
								</div>
								<div class="addEmployeeBtn">
									<el-button type="primary" class="addEmployeeBtn" @click="addNewEmployee">添加新员工</el-button>
								</div>
						</el-row>
					</el-dialog>
			</div>
			<!-- 现有员工中选择 -->
				<div class="currentEmployee">
						<el-dialog
						title="从现有员工中选择"
						:visible.sync="currentEmployee"
						width="20%"
						>
						<div>
								<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
						</div>
						<span slot="footer" class="dialog-footer">
								<el-button @click="currentEmployee = false">取 消</el-button>
								<el-button type="primary" @click="currentEmployee = false">确 定</el-button>
						</span>
						</el-row>
					</el-dialog>
			</div>
			<!-- 添加新员工 -->
				<div class="newEmployee">
						<el-dialog
						title="添加新员工"
						:visible.sync="newEmployee"
						width="20%"
						>
						姓名
						<el-input style="width:100%"  v-model="rename" placeholder="请输入内容"></el-input>
						手机号
						<el-input style="width:100%"  v-model="rename" placeholder="请输入内容"></el-input>
					
						角色
						<div style="width:100%">
							<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
						</div>
							初始密码
						<el-input style="width:100%"  v-model="rename" placeholder="请输入内容"></el-input>
					
						<span slot="footer" class="dialog-footer">
								<el-button @click="newEmployee = false">取 消</el-button>
								<el-button type="primary" @click="newEmployee = false">确 定</el-button>
						</span>
						</el-row>
					</el-dialog>
			</div>
			<!-- 设置主管 -->
				<div class="setSupervisor">
						<el-dialog
						title="设置主管"
						:visible.sync="setSupervisor"
						width="20%"
						>
						选择员工
						<div style="width:100%">
							<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
						</div>
						<span slot="footer" class="dialog-footer">
								<el-button @click="setSupervisor = false">取 消</el-button>
								<el-button type="primary" @click="setSupervisor = false">确 定</el-button>
						</span>
						</el-row>
					</el-dialog>
			</div>
				<!-- 更改角色 -->
			<div class="selectRole" >
						<el-dialog
						title="更改角色"
						:visible.sync="selectRole"
						width="20%"
						>
						选择角色
					<div>
							<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
					
					</el-dialog>
			</div>
				<!-- 交接 -->
			<div class="handover" >
						<el-dialog
						title="交接"
						:visible.sync="handover"
						width="20%"
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
			<div class="selectPeople" >
						<el-dialog
						title="交接业务"
						:visible.sync="selectPeople"
						width="20%"
						>
						选择员工交接{{selectPeopleFlag}}
					<div>
							<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
						<span slot="footer" class="dialog-footer">
								<el-button @click="selectPeople = false">取 消</el-button>
								<el-button type="primary" @click="selectPeople = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
				<!-- 删除 -->
			<div class="deleteBtn" >
						<el-dialog
						title="删除"
						:visible.sync="deleteBtn"
						width="20%"
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
			<div class="deleteEmployee" >
						<el-dialog
						title="删除员工"
						:visible.sync="deleteEmployee"
						width="20%"
						>
						选择员工交接{{deleteEmployeeFlag}}
					<div>
							<el-select v-model="value" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					</div>
						<span slot="footer" class="dialog-footer">
								<el-button @click="deleteEmployee = false">取 消</el-button>
								<el-button type="primary" @click="deleteEmployee = false">确 定</el-button>
						</span>
					</el-dialog>
			</div>
	</div>
</template>

<script>
	import Tree from "./settingComponents/Tree.vue";
	import settingTable from "./settingComponents/settingTable";
	import settingModel from "./settingComponents/settingModel";
	export default {
		components: {
			Tree,
			settingTable,
			settingModel
		},
		data() {
			return {
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
				treeData: [],
				value: ""
			};
		},
		methods: {
			showModel(param) {
				this[param] = true;
			},
			showModelTable(row, data) {
				console.log(data);
				this.dialogVisible = true;
			},
			addCurrentEmployee() {
				// 现有员工选择
				this.addEmployee = false;
				this.currentEmployee = true;
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
			handleChange() {

			},
			// 公司所有部门
			childrenDepartment() {
				var self = this;
				self.$axios({
						method: 'POST',
						withCredentials: false,
						url: '/api/department/getChildrenDepartment',
						data: {
							token: "1511328705UZVQ",
							mother_id: 0
						}
					})
					.then(function(res) {
						// this.treeData
						// var dataW = self.rachData(res.data.data.list,res.data.data.list);
						// self.getMenuName(res.data.data.list)
						// console.log(JSON.stringify(res.data.data.list))
						self.treeData = res.data.data.list
					})
					.catch(function(err) {
						console.log(err);
					});
			},
			getMenuName(menus) {
				var name = "";
				for (var i = 0; i < menus.length; i++) {
					menus[i].label = menus[i].name;
					menus[i].value = menus[i].id;
					(function() {
							console.log('遍历')
							console.log(rest)
							var m = arguments[0];
							for (var j = 0; j < m.length; j++) {
								console.log(m[i].name);
								m[i].label = m[i].name
								if( m[j].children != null && m[j].children.length > 0) {
									arguments.callee(m[j].children); //递归匿名方法
								}
							}
					})(menus[i].children);
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
						token: "1511328705UZVQ",
					}
				})
				.then(function(res) {
					var  arr = [];
					self.parentCompanyList = res.data.data.list
					// console.log(JSON.stringify(res.data.data.list));
				})
				.catch(function(err) {
					console.log(err);
				});
			}
		},
		created() {
			this.childrenDepartment();
			this.applyCompany();
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
	.el-dialog--small {
		width: 30%;
	}
	.addEmployeeBtn {
		width: 100%;
		margin: 5px 0;
	}
	#wrap {
		min-width: 800px;
	}
</style>