<template>
     <div class="componentsRoot">
         <div>
             <span>
                <span>合同：{{clueInfoData.details.contract_name}}</span>
             </span>
             <span class="defaultContact" style="margin-left:20px">
                <span v-if="clueInfoData.details.cue_type == 1">学校：</span>
                <span v-else-if="clueInfoData.details.cue_type == 2">机构：</span>
                <span v-else-if="clueInfoData.details.cue_type == 3">学校：</span>
                <span v-else>家长：</span>
                {{clueInfoData.details.from_name}}
                    <template>
                    <!-- <el-select @change="selectDefaultContact"  placeholder="请选择">
                        <el-option
                        v-for="item in allContacts"
                        :key="item.id"
                        :label="item.contacts_name"
                        :value="item.id">
                        </el-option>
                    </el-select> -->
                    </template>
             </span>
         </div>
         <div class="btnGroup">
            <el-row  :gutter="20">
                <el-col :span="5">
                     <template>
                        <el-select v-model="clueInfoData.details.statu"  @change="selClueStatus($event,'statu')" placeholder="请选择">
                        <!-- <el-select   @change="selClueStatus" placeholder="请选择"> -->
                            <el-option
                            v-for="item in contractStatusArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="5">
                     <template>
                        <el-select v-model="clueInfoData.details.payment_statu"  @change="selClueStatus($event,'payment_statu')" placeholder="请选择">
                        <!-- <el-select   @change="selClueStatus" placeholder="请选择"> -->
                            <el-option
                            v-for="item in paymentStatusArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="4">
                     <el-button @click="turnIntoCustomersFn('delClue')">删除合同</el-button>
                     <!-- <el-button @click="turnIntoCustomersFn('delClue')">删除客户</el-button> -->
                </el-col>
            </el-row>
         </div>
         <div class="tapPage">
             <el-tabs type="border-card">
                <el-tab-pane label="客户信息">
                    <!-- 备注 -->
                    <div class="remarks">
                        <el-row class="title">
                            <el-col :span="6"><p class="remarksTitle">备注</p></el-col>
                            <el-col :span="2" :offset="16"><p class="editBtn" @click="textareaStatus">编辑</p></el-col>
                        </el-row>
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            resize='none'
                            :disabled='remarksIptDis'
                            v-model="clueInfoData.details.remake">
                        </el-input>
                    </div>
                    <!-- 学校 -->
                    <div class="remarks" v-if="clueType != 4">
                        <el-row class="title">
                            <el-col :span="6">
                                <p  class="remarksTitle">合同</p>
                                <!-- <p  class="remarksTitle" v-if="clueType == 1">学校</p>
                                <p  class="remarksTitle" v-else-if="clueType == 2">机构</p>
                                <p  class="remarksTitle" v-else-if="clueType == 3">教师</p> -->
                            </el-col>
                            <el-col :span="2" :offset="16"><p class="editBtn" @click="schoolIptStatus">编辑</p></el-col>
                        </el-row>
                        <div class="school" :class="{schoolColor:schoolIptDis}">
                            <el-row>
                                <el-col :span="4">
                                    <p>名称</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-input
                                        v-model="clueInfoData.details.contract_name"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <p>编号</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-input
                                        v-model="clueInfoData.details.contract_number"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <p>业务类型：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-select 
                                        v-model="clueInfoData.details.contract_business_type" 
                                        placeholder="请选择"
                                        :disabled="schoolIptDis">
                                        <el-option
                                        v-for="item in addContractParam.business_type"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <p>客户类型：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-select 
                                    v-model="clueInfoData.details.cue_type"
                                    placeholder="请选择"
                                    :disabled="schoolIptDis">
                                        <el-option
                                        v-for="item in clientType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <p>客户名称：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-input
                                        v-model="clueInfoData.details.clue_name"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="4">
                                    <p>合同金额：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-input
                                        v-model="clueInfoData.details.money"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="4">
                                    <p>合同起始日期：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-date-picker
                                        v-model="clueInfoData.details.start_time"
                                        type="datetime"
                                        :disabled="schoolIptDis"
                                        placeholder="合同起始日期">
                                        </el-date-picker>
                                 
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="4">
                                    <p>合同到期日期：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-date-picker
                                        v-model="clueInfoData.details.end_time"
                                        type="datetime"
                                        :disabled="schoolIptDis"
                                        placeholder="合同到期日期">
                                        </el-date-picker>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="4">
                                    <p>我方签约机构：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-cascader
                                        expand-trigger="hover"
                                        v-model="clueInfoData.details.company_idArr"
                                        :placeholder="clueInfoData.details.company_name"
                                        :options="parentCompanyList"
                                        :show-all-levels='false'
                                        filterable
                                        @change="getChildrenCompanyEmployee"
                                        change-on-select
                                        clearable
                                        :disabled="schoolIptDis"
                                    >
                                    </el-cascader>
                                </el-col>
                            </el-row>
                            <el-row>
                                <!-- childrenCompany_id companyEmployee -->
                                <el-col :span="4">
                                    <p>我方签约人：</p>
                                </el-col>
                                <el-col :span="18">
                                    <!-- <el-input
                                        v-model="clueInfoData.details.user_name"
                                        :disabled="schoolIptDis"
                                    ></el-input> -->
                                     <el-select 
                                    v-model="clueInfoData.details.user_id"
                                    placeholder="请选择"
                                    :disabled="schoolIptDis">
                                        <el-option
                                        v-for="item in companyEmployee"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <p>客户方签约人：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-input
                                        v-model="clueInfoData.details.from_name"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="4">
                                    <p>签约日期：</p>
                                </el-col>
                                <el-col :span="18">
                                    <el-date-picker
                                        v-model="clueInfoData.details.contract_time"
                                        type="datetime"
                                        :disabled="schoolIptDis"
                                        placeholder="选择日期">
                                        </el-date-picker>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <!-- 信息 -->
                     <div class="remarks">
                        <el-row class="title">
                            <el-col :span="6"><p class="remarksTitle">信息</p></el-col>
                        </el-row>
                        <div class="school schoolColor" >
                            <el-row>
                                <el-col :span="3">
                                    <p>来源：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.cue_source}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>所属机构：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.company_name}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>负责人：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.user_name}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>前负责人：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.user_before_name|| '无'}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>创建时间：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.create_time}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>更新时间：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.update_time}}</p>
                                </el-col>
                            </el-row>
                        </div>
                     </div>
                </el-tab-pane>
                <el-tab-pane label="款项">
                    <div class="addLogBtn">
                        <span @click="turnIntoCustomersFn('addPayment')">新增款项</span>
                        <span class="delBtn" @click="delLogItem('Payment')">删除</span>
                    </div>
                    <div style="margin-top:10px">
                        <el-table
                        border
                        @selection-change="changeFun($event,'log')"
                        :data="clueInfoData.fund"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="create_time"
                        label="时间"
                        min-width="110">
                        </el-table-column>
                        <el-table-column
                        prop="user_name"
                        label="跟进人"
                        align="center"
                        min-width="60">
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="款项"
                        align="center"
                        min-width="65">
                        </el-table-column>
                        <el-table-column
                        prop="money"
                        label="金额"
                        align="center"
                        min-width="65">
                        </el-table-column>
                        <el-table-column
                        prop="remake"
                        label="备注"
                        min-width="180">
                        </el-table-column>
                        <el-table-column min-width="60" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleEdit(scope.$index, scope.row,'payment')">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="跟进日志">
                    <div class="addLogBtn">
                        <span @click="turnIntoCustomersFn('addLog')">新增日志</span>
                        <span class="delBtn" @click="delLogItem('log')">删除</span>
                        <el-button @click="exportData" type="success">导出</el-button>
                    </div>
                    <div class="showBtn">
                            <span class="mr10">显示</span>
                             <el-radio-group @change="switchStudentShowContent('log')" v-model="logShowContent">
                                <el-radio  label="1">前期跟进</el-radio>
                                <el-radio  label="2">售中跟进</el-radio>
                                <el-radio  label="3">售中服务</el-radio>
                                <el-radio  label="4">售后跟进</el-radio>
                                <el-radio  label="5">售后服务</el-radio>
                             </el-radio-group>
                        </div>
                    <div class="logTable">
                        <el-table
                            ref="logList"
                            border
                            @selection-change="changeFun($event,'log')"
                            :data="logTableData"
                            style="width: 100%">
                            <el-table-column
                                type="selection"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="create_time"
                            label="时间"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="user_name"
                            label="跟进人"
                            align="center"
                            min-width="60">
                            </el-table-column>
                             <el-table-column
                            prop="contact_ifmt"
                            label="联系方式"
                            align="center"
                            min-width="65">
                            </el-table-column>
                             </el-table-column>
                             <el-table-column
                            prop="content"
                            label="内容"
                            min-width="180">
                            </el-table-column>
                            <el-table-column min-width="60" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleEdit(scope.$index, scope.row,'logEdit')">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        </div>
                </el-tab-pane>
            </el-tabs>
         </div> 
        <!-- 新增合同 -->

      
      
         <!-- 删除客户 -->
         <div class="shiftClue">
             <el-dialog
                title="删除客户"
                :visible.sync="delClueStatu"
                width="30%"
                >
                <p>是否确定删除客户</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delClueStatu = false">取 消</el-button>
                    <el-button type="primary" @click="delClue('all')">确 定</el-button>
                </span>
            </el-dialog>
         </div>
         <!-- 删除合同 -->
          <div class="shiftClue">
             <el-dialog
                title="删除合同"
                :visible.sync="delContractStatu"
                width="30%"
                >
                <p>是否确定删除合同</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delContractStatu = false">取 消</el-button>
                    <el-button type="primary" @click="delContract">确 定</el-button>
                </span>
            </el-dialog>
         </div>
         <!-- 新增日志 -->
         <div class="shiftClue">
             <el-dialog
                title="新增日志"
                :visible.sync="addLogStatu"
                width="30%"
                >
                <div>
                    <div>
                        <span class="iptName">联系方式:</span>
                        <el-select v-model="addLogData.contactType" placeholder="请选择">
                                <el-option
                                v-for="item in contactType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                    <div>
                        <span class="iptName">日志状态:</span>
                        <el-select v-model="addLogData.status" placeholder="请选择">
                                <el-option
                                v-for="item in logStatus"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                    <div>
                        <span class="iptName">时间:</span>
                        <el-date-picker
                        v-model="addLogData.addLogTime"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                     <div>
                        <span class="iptName">内容:</span>
                        <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        resize="none"
                        v-model="addLogData.content">
                        </el-input>
                    </div>
                </div>
                 <span slot="footer" class="dialog-footer">
                    <el-button @click="addLogStatu = false">取 消</el-button>
                    <el-button type="primary" @click="addLog('log')">确 定</el-button>
                </span>
             </el-dialog>
         </div>
         <!-- 新增款项 addPaymentStatu -->
          <div class="shiftClue">
             <el-dialog
                title="新增日志"
                :visible.sync="addPaymentStatu"
                width="30%"
                >
                <div>
                    <div>
                        <span class="iptName">联系方式:</span>
                        <el-select v-model="addPaymentData.type" placeholder="请选择">
                                <el-option
                                v-for="item in addPaymentType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                    <div>
                        <span class="iptName">时间:</span>
                        <el-date-picker
                        v-model="addPaymentData.time"
                        type="datetime"
                        placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                     <div>
                        <span class="iptName">金额:</span>
                        <el-input
                        v-model="addPaymentData.money"
                        placeholder="输入回款金额">
                        </el-input>
                    </div>
                     <div>
                        <span class="iptName">内容:</span>
                        <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        resize="none"
                        v-model="addPaymentData.remake">
                        </el-input>
                    </div>
                </div>
                 <span slot="footer" class="dialog-footer">
                    <el-button @click="addPaymentStatu = false">取 消</el-button>
                    <el-button type="primary" @click="addLog()">确 定</el-button>
                </span>
             </el-dialog>
         </div>
     </div>
</template>

<script>
    export default {
        name: "clue-info",
        components: {
        },
        data() {
            return {
                //公司员工
                companyEmployee: [],
                // 新增回款
                addPaymentData: {
                    type: '',
                    time: '',
                    remake: '',
                    time: ''
                },
                addPaymentType: [
                    {
                        label: '回款',
                        value: 1
                    },
                    {
                        label: '退款',
                        value: 2
                    },
                ],
                // 删除合同状态
                delContractStatu: false,
                delContractStatuFlag: false,
                delContractData: '',
                // 上个页面传过来的参数
                paramData: '',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                // 新增合同
                addContractStatu: false,
                // 新增款项
                addPaymentStatu: false,
                addContractData: {
                    client_id: '',
                    name: '',
                    number: '',
                    business_type: '',
                    money: '',
                    start_time: '',
                    end_time: '',
                    contract_time: '',
                    company_id_arr: [],
                    company_id: '',
                    user_id: ''
                },
                addContractParam: {
                    business_type: [
                        {
                            label:'自主招生',
                            value:1
                        },
                        {
                            label:'竞赛',
                            value:2
                        },
                        {
                            label:'论文',
                            value:3
                        }
                    ],
                },
                // 日志状态
                logStatus: [
                    {
                        value: 1,
                        label: '前期跟进'
                    },
                    {
                        value: 2,
                        label: '售中跟进'
                    },
                   
                    {
                        value: 3,
                        label: '售中服务'
                    },
                     {
                        value: 4,
                        label: '售后跟进'
                    },
                     {
                        value: 5,
                        label: '售后服务'
                    }
                ],
                // 日志显示内容
                logShowContent: '',
                // 新增日志
                addLogData: {
                    addLogTime: '',
                    contactType: '',
                    content: '',
                    status: 1
                },
                // 新增联系人数据
                addContactData: {
                    contactName: '',
                    department: '',
                    post: '',
                    grade: '',
                    subject: '',
                    phone: '',
                    tel: '',
                    weixin: '',
                    qq: '',
                    email: '',
                    selectCityData: [],
                    address: '',
                    company_name: '',
                    relationship: ''
                },
                // 新增学生数据
                addStudentData: {
                    name:'',
                    sex:'',
                    subject:'',
                    grade:'',
                    parentsName:'',
                    phone:'111',
                    tel:'222',
                    weixin:'333',
                    qq:'444',
                    email:'555',
                    schoolName:'',
                    schoolLevel:'',
                    selectCityData:[],
                },
                // 导入学生
                importStatu: false,
                importStatu2: false,
                // 新增日志对话框
                addLogStatu: false,
                // 新增学生对话框
                addStudentStatu: false,
                // 转成客户对话框
                turnIntoCustomersStatu: false,
                // 转移客户对话框
                shiftClueStatu: false,
                // 删除客户对话框
                delClueStatu: false,
                // 新增联系人对话框
                addContactStatu: false,
                clueType: '',
                defaultContact: '',
                clueInfoData: {
                     details: {
                        contract_name: "",
                        contract_number: "",
                        statu:'',
                        payment_statu:'',
                        contract_business_type: '',
                        cue_type: '',
                        clue_name: "",
                        money: '',
                        start_time: "",
                        end_time: "",
                        company_name: "",
                        user_name: "",
                        from_name: "",
                        contract_time: "",
                        cue_source: "",
                        person_user: null,
                        before_person_user: null,
                        person_department: null,
                        before_person_department: null,
                        service_user: null,
                        before_service_user: null,
                        service_department: null,
                        before_service_department: null,
                        customer_user: null,
                        before_customer_user: null,
                        customer_department: null,
                        before_customer_department: null,
                        ClueCreate_time: "",
                        ClueUpdate_time: "",
                        remake: ""
                    },
                    fund: [{
                        create_time: "1970-01-01 08:00:00",
                        user_name: "dang",
                        type: 2,
                        money: 100,
                        remake: null,
                        id: 1
                    }, {
                        create_time: "2017-11-24 16:03:50",
                        user_name: "dang",
                        type: 1,
                        money: 200,
                        remake: "这次打款很实在",
                        id: 2
                    }],
                    followup: []

                },
                // 状态
                contractStatusArr: [
                    {
                        label: '执行中', //1执行中  2成功结束  3意外终止  4未开始  1待付款   2部分结算    3全部结清
                        value: 1
                    },
                    {
                        label: '成功结束',
                        value: 2
                    },
                    {
                        label: '意外终止',
                        value: 3
                    },
                    {
                        label: '未开始',
                        value: 4
                    }
                ],
                paymentStatusArr: [
                    {
                        label: '代付款',
                        value: 1
                    },{
                        label: '部分结算',
                        value: 2
                    },{
                        label: '全部结清',
                        value: 3
                    },
                ],
                statusModel: 1,
                // 备注禁用状态
                remarksIptDis: true,
                remarksIptValue: '',
                // 学生禁用状态
                studentIptDis: true,
                // 学校
                school: {
                    school_name: '',
                    los: '',
                    grade: '',
                    province_name: '',
                    city_name: '',
                    area_name: '',
                    address: '',
                    cue_source: '',
                    company_name: '',
                    user_name: '',
                    user_before_name: '',
                    create_time:'',
                    update_time: '',
                    remake: '',
                    contacts_id: '',
                    selCityList: []
                },
                // 学校地址
                selCityList: [1,2,3],
                cityList: [],
                schoolIptDis: true,
                selectCityData: [],
                 // 学校等级解析数组
                schoolLevelArr: [
                    {
                        value:1,
                        label:'市重点'
                    },{
                        value:2,
                        label:'区重点'
                    },    {
                value: 3,
              label: "其他"
            }
                ],
                // 联系方式
                contactType: [
                    {
                        value: 1,
                        label: '手机' 
                    },
                    {
                        value: 2,
                        label: '电话' 
                    },
                    {
                        value: 3,
                        label: 'qq' 
                    },
                    {
                        value: 4,
                        label: '微信' 
                    },
                    {
                        value: 5,
                        label: '邮箱' 
                    },
                    
                ],
                // 文理科
                subjectArr:[
                    {
                        value: 1,
                        label: '文科'
                    }, {
                        value: 2,
                        label: '理科'
                    }
                ],
                // 性别
                sexArr:[
                    {
                        value: 1,
                        label: '男'
                    }, {
                        value: 2,
                        label: '女'
                    }
                ],
                // 学制解析数组, 教授年级解析数组
                academicSystemArr: [
                    {
                        value:1,
                        label:'初中'
                    },{
                        value:2,
                        label:'高中'
                    },{
                        value:3,
                        label:'初中+高中'   
                    }
                ],
                // 教授科目解析数组
                professorSubjectsArr: [
                    {
                        value: 1,
                        label: '语文'
                    },
                    {
                        value: 2,
                        label: '英语'
                    },
                    {
                        value: 3,
                        label: '数学'
                    },
                    {
                        value: 4,
                        label: '物理'
                    },
                    {
                        value: 5,
                        label: '化学'
                    },{
              value: 6,
              label: "生物"
            },
            {
              value: 7,
              label: "历史"
            },
            {
              value: 8,
              label: "地理"
            },
            {
              value: 9,
              label: "政治"
            },
            {
              value: 10,
              label: "技术"
            },
              {
              value: 11,
              label: "其他"
            }
                ],
                // 年级解析数组
                studentGradeArr: [
                    {
                        value: 1,
                        label: '初一'
                    },
                    {
                        value: 2,
                        label: '初二'
                    },
                    {
                        value: 3,
                        label: '初三'
                    },
                    {
                        value: 4,
                        label: '高一'
                    },
                    {
                        value: 5,
                        label: '高二'
                    },
                    {
                        value: 6,
                        label: '高三'
                    }
                ],
                // 机构定位
                mechanismPositioningArr: [
                    {
                        value: 1,
                        label: 'K12'
                    },
                    {
                        value: 2,
                        label: '英语'
                    },
                    {
                        value: 3,
                        label: '出国'
                    },
                ],
                // 机构类型
                mechanismTypeArr: [
                    {
                        value: 1,
                        label: '大型'
                    },
                    {
                        value: 2,
                        label: '中型'
                    },
                    {
                        value: 3,
                        label: '小型'
                    },
                ],
                clientType: [
                    {
                        value: 1,
                        label: '学校'
                    },
                    {
                        value: 2,
                        label: '机构'
                    },
                    {
                        value: 3,
                        label: '教师'
                    },
                    {
                        value: 4,
                        label: '学生'
                    },
                ],
                // 联系人信息
                contactIptDis: true,
                // 所有联系人
                allContacts: [],
                contacts: {
                    id: 1,
                    name: "测试学校",
                    department: '测试部门',
                    post: "测试职务",
                    professor_grade: 1,
                    professor_subjects: 2,
                    mobile: "18845664566",
                    telephone: "7676767",
                    wechat: "766",
                    qq: "76678889",
                    email: "76676676@qq.com",
                    province_id: null,
                    city_id: null,
                    area_id: null,
                    address: null,
                    relationship: null,
                    company_name: null,
                    clue_id: 108,
                    create_time: "2017-12-25 09:50:03",
                    update_time: "2017-12-25 09:50:03"
                },
                
                // 日志表格
                logTableData: [],
                // 选中行
                multipleSelection: [],
                // 学生页面, 显示数据
                studentShowContent: '1',
                
                // z转成客户
                // 公司所有部门
                companyDepartment: [],
                changeToClientData: {
                   
                    // 业务部门
                    businessDepartment: [],
                    // 业务部门员工
                    businessEmployee: [],
                    businessEmployeeId:'',
                     // 服务部门
                    serviceDepartment: [],
                    // 服务部门员工
                    serviceEmployee: [],
                    serviceEmployeeId:'',
                    // 售后部门
                    aftermarketDepartment: [],
                    // 售后部门员工
                    aftermarketEmployee: [],
                    aftermarketEmployeeId:'',
                    // 标记当前选择的是哪一个, 默认业务部门
                    flagDepartment: 'businessDepartment'
                },
                // 转移客户部门员工
                shiftClueDepatment: [],
                shiftClueEmployeeId: '',
                // 是学生转客户还是客户转客户
                // 学生  false
                // 客户 true
                studentOrClueToCantract: true,
                studentToCantract: '',
                // 多选删除学生
                studentToCantractArr: [],
                studentToCantractFlag: '',
                // 子公司列表
                parentCompanyList: [],
                childrenCompany_id: ''
            }
        },
        
        methods: {
            handChange(file, fileList) {
                console.log(JSON.stringify(file));
                console.log(JSON.stringify(fileList,null,4));
                console.log(JSON.stringify(fileList,null,4));
                
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },


            // 子公司下员工
            getChildrenCompanyEmployee(flag) {
                // /Company/contractCompanyUser
                // data.company_idArr[data.company_idArr.length-1],
              
                    let self = this,
                        data = self.clueInfoData.details;
                    let obj = {
                           token: localStorage.getItem('crm_token'),
                           company_id: data.company_idArr[data.company_idArr.length-1]
                       }
                    if (flag == 'init') {
                        // 初始化请求初始公司员工
                        obj = {
                           token: localStorage.getItem('crm_token'),
                           company_id: data.company_id
                       }
                    } 
                    this.$axios({
                       method: 'POST',
                       withCredentials: false,
                       url: '/api/Company/contractCompanyUser',
                       data: obj
                    })
                    .then(function(res){
                       if (res.data.code === 200) {
                           self.companyEmployee = res.data.data.list;
                       } else {
                          self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                       }
                    })
                    .catch(function(err){
                        console.log(err);
                    });

            },
            // 删除合同对话框
            delContractDig(flag,index,data) {
                if (flag=='all') {
                    // q全选
                    this.delContractStatuFlag = true;
                } else {
                    // 单选
                    this.delContractData = data
                    this.delContractStatuFlag = false;
                }
                this.delContractStatu = true;
            },
            // 删除合同
            delContract(flag, index, data) {
                let url,obj;
                 
                this.delContractStatu = false;
              if (this.delContractStatuFlag) {
                    // 多选删除
                    let ids = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        const element = this.multipleSelection[i];
                        ids.push(element.contract_id)
                    }
                    url = '/api/clueContract/ContractdeleteDuo'
                    obj = {
                        token: localStorage.getItem('crm_token'),
                        contractIds: JSON.stringify(ids)
                    }
                } else {
                    // 单选删除
                    obj = {
                        token: localStorage.getItem('crm_token'),
                        contract_id: this.delContractData.contract_id
                    }
                    url = '/api/clueContract/Contractdelete'
                }
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: obj
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        if (self.delContractStatuFlag) {
                            for (let i = 0; i < self.multipleSelection.length; i++) {
                                self.clueInfoData.contract = self.clueInfoData.contract.filter((value) => {
                                    return value.contract_id != self.multipleSelection[i].contract_id
                                })
                            }
                        } else {
                                self.clueInfoData.contract = self.clueInfoData.contract.filter((value) => {
                                    return value.contract_id != self.delContractData.contract_id
                                })
                        }
                        self.$message({
                            message: '删除成功',
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
            // 切换学生表格显示
            switchStudentShowContent(flag) {
                if(flag == 'student') {
                    // 切换学生显示
                    if (this.studentShowContent == '1') {
                        this.clueInfoData.studentShowList = this.clueInfoData.studentClueList;
                    } else {
                        this.clueInfoData.studentShowList = this.clueInfoData.studentContractList;
                    }
                } else {
                    // 切换日志显示
                    this.logTableData = this.clueInfoData.followup.filter((value) => {
                        return value.status == this.logShowContent
                    })
                    // this.clueInfoData.followup = this.clueInfoData.followup.filter((value) => {
                    //     console.log(value);
                    //     return value.status == this.logShowContent
                    // })
                }
            },
             // 转成客户
            intoContract(flag) {
                
                this.turnIntoCustomersStatu = false;
                let self = this;
                let changeToClientData = self.changeToClientData;
                let url = '/api/clue/clueTurnCustomer';
                let obj = {
                    token: localStorage.getItem('crm_token'),
                    person_user: changeToClientData.businessEmployeeId,
                    person_department: changeToClientData.businessDepartment[changeToClientData.businessDepartment.length - 1],
                    service_user: changeToClientData.serviceEmployeeId,
                    service_department: changeToClientData.serviceDepartment[changeToClientData.serviceDepartment.length - 1],
                    customer_user: changeToClientData.aftermarketEmployeeId,
                    customer_department: changeToClientData.aftermarketDepartment[changeToClientData.aftermarketDepartment.length - 1]
                }
                
                if (self.studentToCantractFlag == 'multiple') {
                    obj.clueIds = [];
                    url = '/api/clue/clueTurnCustomerDuo';
                    // 多选删除学生
                    obj.clueIds = JSON.stringify(this.studentToCantractArr);
                } else {
                    if (self.studentOrClueToCantract) {
                        // 客户转客户
                        obj.clue_id = self.$route.query.data.clue_id;
                    } else {
                        // 学生转客户
                        obj.clue_id = self.studentToCantract
                    }
                }
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: obj
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            self.$message({
                                message: '转成客户成功',
                                type: 'success',
                            });
                            if (self.studentOrClueToCantract) {
                                // 客户
                                self.openClueInfo();    
                            } else {
                                // 学生
                                self.clueDetails();
                            }
                            self.studentOrClueToCantract = true;
                        } else {
                            self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 新增日志
            addLog(flag) {
                let self = this,url,obj;
                if (flag == 'log') {
                    // 添加日志
                    url = '/api/clueFollowup/applyClueFollowup';
                    obj = {
                        token: localStorage.getItem('crm_token'),
                        type: 3,
                        clue_id: self.$route.query.data.contract_id,
                        contact_ifmt: self.addLogData.contactType,
                        content: self.addLogData.content,
                        status: self.addLogData.status,
                        time: self.addLogData.addLogTime
                    }
                } else {
                    // 添加款项
                    url = '/api/ContractFund/addFund';
                    obj = self.addPaymentData;
                    obj.token = localStorage.getItem('crm_token')
                    obj.contract_id = self.$route.query.data.contract_id;
                    // obj.company_id = self.addContractData.company_id_arr[self.addContractData.company_id_arr.length-1]
                }
                console.log(JSON.stringify(obj,null,4));
                
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: obj
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        self.addLogStatu = false;
                        self.addContractStatu = false;
                        self.addPaymentStatu = false;
                        self.clueDetails()
                    } else {
                       self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 删除联系人
            selContact(index) {
                let id = this.allContacts[index].id;
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clueContacts/deleteContact',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        contact_id: id
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        self.clueDetails();
                    } else {
                        self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 添加联系人选着地址
            addContactSelectCity(data) {
                this.addContactData.selectCityData = data;
            },
            // 添加联系人
            addContact(flag) {
                let self = this, obj,param,url;
                if (flag == 'contact') {
                    // 新增联系人
                    url = '/api/clueContacts/applyClueContacts'
                    obj = self.addContactData;
                    param = {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.data.clue_id,
                        name: obj.contactName,
                        department: obj.department,
                        post: obj.post,
                        professor_grade: obj.grade,
                        professor_subjects:	obj.subject,
                        mobile: obj.phone,
                        telephone: obj.tel,
                        wechat: obj.weixin,
                        qq: obj.qq,
                        email: obj.email,
                        province_id: obj.selectCityData[0],
                        city_id: obj.selectCityData[1],
                        area_id: obj.selectCityData[2],
                        address: obj.address,
                        relationship: obj.relationship,
                        company_name: obj.company_name,
                    }
                } else {
                    url = '/api/clue/applyPSJTstudent'
                    obj = self.addStudentData;
                    param = {
                        token:localStorage.getItem('crm_token'),
                        name: obj.name,
                        sex:obj.sex,
                        the_science:obj.subject,
                        student_grade:obj.grade,
                        parent_name: obj.parentsName,
                        mobile:	obj.phone,
                        telephone:	obj.tel,
                        wechat: obj.weixin,
                        qq: obj.qq,
                        school_name:obj.schoolName,
                        grade:obj.schoolLevel,
                        province_id: obj.selectCityData[0],
                        city_id: obj.selectCityData[1],
                        area_id: obj.selectCityData[2],
                        parent_id: self.clueType == 4 ? self.clueInfoData.list.contacts_id : '',
                        clue_id: self.$route.query.data.clue_id
                    }
                }
                
                if (param.name) {
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: url,
                        data: param
                    })
                    .then(function(res){
                        self.addContactStatu = false;
                        if (res.data.code === 200) {
                            self.$message({
                                message: '新增联系人成功',
                                type: 'success'
                            });
                            self.addStudentStatu = false;
                            self.clueDetails();
                        } else {
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                } else {
                    self.$message.error('请完善参数!')
                }
              
            },
            // 设置客户状态
            selClueStatus(data,flag) {
                let self = this,url,param;
                console.log(data)
                if (flag == 'statu') {
                    url = '/api/clueContract/ClueContractEditStatu';
                    param = {
                        token: localStorage.getItem('crm_token'),
                        contract_id: self.$route.query.data.contract_id,
                        statu: data
                    }
                } else {
                    url = '/api/clueContract/ClueContractEditPayment';
                    param = {
                        token: localStorage.getItem('crm_token'),
                        contract_id: self.$route.query.data.contract_id,
                        payment_statu: data
                    }
                }
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: param
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '修改状态成功',
                            type: 'success'
                        })
                    } else {
                       self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');}
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
             // 选择服务部门
            selectServiceDepartment(data,flag) {
                this.changeToClientData.flagDepartment = flag;
                this.changeToClientData[flag] = data;
                // 获取部门员工
                this.getDepartmentEmployee();
            },
            // 获取部门员工
            getDepartmentEmployee() {
                let self = this;
                // 跟进selectIpt 来判断当前应该获取哪一个部门的员工
                let slectIpt = '';
                let flagDepartment = self.changeToClientData.flagDepartment;
                let changeToClientData = self.changeToClientData;
                let department_id = department_id = changeToClientData[flagDepartment][changeToClientData[flagDepartment].length-1];
                if (flagDepartment == 'businessDepartment') {
                    slectIpt = 'businessEmployee'
                } else if (flagDepartment== 'serviceDepartment') {
                    slectIpt = 'serviceEmployee'
                } else {
                    slectIpt = 'aftermarketEmployee'
                }
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/company/companyUsers',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        department_id: department_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            self.changeToClientData[slectIpt] = res.data.data.list;
                            // console.log(JSON.stringify(self.changeToClientData));
                            // console.log(department_id);
                            
                        } else {
                            self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 进入客户列表页
            openClueInfo() {
                // 跳转到客户
                this.$router.push({path: '/contract'})
            },
            // 删除合同
            delClue(flag) {
                this.delClueStatu = false;
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clueContract/Contractdelete',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        contract_id: self.$route.query.data.contract_id,
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        self.openClueInfo();
                    } else {
                        self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 转移客户
            shiftClue() {
                this.shiftClueStatu = false;
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/transferClue',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.data.clue_id,
                        department_id: self.changeToClientData.businessDepartment[self.changeToClientData.businessDepartment.length-1],
                        user_new: self.shiftClueEmployeeId
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '转移成功',
                            type: 'success'
                        });
                        self.openClueInfo();
                    } else {
                        self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                    }
                    })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 获取子公司
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
                            self.getMenuName(res.data.data.list);
                            self.parentCompanyList = res.data.data.list;
                            
                        } else {
                            self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 获取子公司部门
            getCompanyDepartment() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/department/getChildrenDepartmentTo',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        mother_id: self.clueInfoData.list.company_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            self.getMenuName(res.data.data.list);
                            self.companyDepartment = res.data.data.list
                        } else {
                            self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
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
            // 对话框显示隐藏
            turnIntoCustomersFn(flag) {
                // 获取部门员工
                // this.getDepartmentEmployee();
                if (flag == 'contract') {
                    this.turnIntoCustomersStatu = true;
                } else if (flag == 'shiftClue') {
                    this.shiftClueStatu = true;
                } else if (flag == 'addContact') {
                    this.addContactStatu = true;
                } else if (flag == 'addLog') {
                    this.addLogStatu = true;    
                } else if (flag == 'importStudent') {
                    this.importStatu = true;
                } else if (flag == 'addContract') {
                    // 新增合同
                    this.addContractStatu = true;
                }
                 else if (flag == 'addPayment') {
                    // 新增款项
                    this.addPaymentStatu = true;
                }
                else {
                    this.delClueStatu = true;
                }
            },
            // 学生转换为客户
            studentturnIntoCustomersFn(flag, index) {
                if(flag == 'single') {
                    // 删除单个
                    this.turnIntoCustomersStatu = true;
                    this.studentToCantractFlag = 'single';
                     this.studentToCantractFlag = 'single';
                    // clueInfoData.student
                    this.studentOrClueToCantract = false;
                    this.studentToCantract = this.clueInfoData.student[index].student_id;
                } else {
                    // 删除多个
                    this.turnIntoCustomersStatu = true;
                    this.studentOrClueToCantract = false;
                    this.studentToCantractFlag = 'multiple';
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        const element = this.multipleSelection[i];
                        this.studentToCantractArr.push(element.student_id)
                    }
                     
                }
                
            },
            // 删除日志
            delLogItem(flag) {
                if (flag == 'log') {
                    // 删除日志
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        this.logTableData = this.logTableData.filter((value) => {
                            return value.id != this.multipleSelection[i].id
                        })
                    }
                    this.delServerData('log')
                }  else if (flag == 'Payment') {
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        this.clueInfoData.fund = this.clueInfoData.fund.filter((value) => {
                            return value.id != this.multipleSelection[i].id
                        })
                    }
                    // 删除回款
                    this.delServerData('Payment')
                } else {
                    
                }
            },
            // 删除线上信息
            delServerData(flag) {
                let url='',param={};
                let obj=[];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (flag == 'student') {
                        obj.push(this.multipleSelection[i].student_id);
                    } else if (flag == 'Payment') {
                        obj.push(this.multipleSelection[i].id);
                    } 
                    else {
                        obj.push(this.multipleSelection[i].id);
                    }
                }
                if (flag == 'student') {
                    url = '/api/clue/deleteStudentClues'
                    param = {
                        token: localStorage.getItem('crm_token'),
                        clueIds: JSON.stringify(obj)
                    }
                } else if (flag == 'Payment') {
                    url = '/api/ContractFund/deleteFunds'
                    param = {
                        token: localStorage.getItem('crm_token'),
                        fund_ids: JSON.stringify(obj)
                    }
                }
                 else {
                    url = '/api/clueFollowup/deleteClueFollowups';
                    param = {
                        token: localStorage.getItem('crm_token'),
                        followupIds: JSON.stringify(obj)
                    }
                }
                
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: param
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '操作成功',
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
            //复选框状态改变
            changeFun(val,flag) {
                this.multipleSelection = val;
            },
            // 编辑按钮
            handleEdit(index,data, flag) {
                // index 所在行数, 从0开始
                // data 当前行数据
                let self = this;
                if (flag == 'studentToContract') {
                    console.log('111');
                    // 学生表格转客户
                    this.studentToCantractFlag = 'single';
                    this.turnIntoCustomersStatu = true;
                    this.studentOrClueToCantract = false;
                    this.studentToCantract = data.student_id;
                } else if (flag == 'delStudent') {
                    // 删除按钮
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clue/deleteStudentClue',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            clue_id: data.student_id
                        }
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                           
                            self.clueDetails();
                        } else {
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                } else if (flag == 'payment') {
                    // 单选删除回款
                        let self = this;
                        this.$axios({
                           method: 'POST',
                           withCredentials: false,
                           url: '/api/ContractFund/deleteFund',
                           data: {
                               token: localStorage.getItem('crm_token'),
                               fund_id: data.id
                           }
                        })
                        .then(function(res){
                           if (res.data.code === 200) {
                               self.$message({
                                   message: '删除回款成功',
                                   type: 'success'
                               });
                                self.clueInfoData.fund = self.clueInfoData.fund.filter((value) => {
                                    return value.id != data.id
                                })
                           } else {
                              self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                           }
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                }
                else {
                    // 删除日志按钮 logEdit
                    
                    let self = this;
                    // console.log(obj+'');
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/apiclueFollowup/deleteClueFollowup',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            followup_id: data.id
                        }
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            self.clueInfoData.followup = self.clueInfoData.followup.filter((value) => {
                                return value.id != data.id
                            });
                            console.log(self.logShowContent)
                            self.logTableData = self.clueInfoData.followup.filter((value) => {
                                return value.status == self.logShowContent
                            });
                        } else {
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                }
                
                
            },
            // 选择默认联系人
            selectDefaultContact(data) {
                this.clueInfoData.list.contacts_id= data
                
            },
            // 客户详情
            clueDetails() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clueContract/ClueContractDetails',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        contract_id: self.$route.query.data.contract_id,
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            let data = res.data.data;
                            console.log(JSON.stringify(data));
                            // for (let i = 0; i < data.contacts.length; i++) {
                            //     const element = data.contacts[i];
                            //     if (element.id == data.list.contacts_id) {
                            //          self.contacts = element;
                            //     }
                            //     element.contactIptDis = true;
                            //     element.selectCityData = [element.province_id,element.city_id,element.area_id]
                            // }
                            // data.studentClueList = [];
                            // data.studentContractList = [];
                            // // 处理学生数组
                            // for (let i = 0; i < data.student.length; i++) {
                            //     const element = data.student[i];
                            //     element.studentIptDis = true;
                            //     element.selectCityData = [element.province_id,element.city_id,element.area_id];
                            //     if (element.is_turn == 1) {
                            //         // 客户
                            //         data.studentClueList.push(element)
                            //     } else {
                            //         // 客户
                            //         data.studentContractList.push(element)
                            //     }
                            // }
                            // data.studentShowList = data.studentClueList;
                            
                            // self.allContacts = data.contacts;
                            // // for (let i = 0; i < data.contacts.length; i++) {
                            // //     const element = data.contacts[i];
                               
                            // // }
                           
                            // // self.school.cityArr.push(data.list.province_id)
                            // // self.school.cityArr.push(data.list.city_id)
                            // // self.school.cityArr.push(data.list.area_id)
                            // self.selCityList = [data.list.province_id,data.list.city_id,data.list.area_id]
                            // console.log(self.selCityList);
                            // self.school = data.details;
                            // self.school.selCityList = [data.details.province_name, data.details.city_name, data.details.area_name]
                            // // 处理日志联系方式
                            // let contactIfmt = ['手机','电话','QQ','微信','邮箱'];
                            // for (let i = 0; i < data.followup.length; i++) {
                            //     const element = data.followup[i];
                            //     element.contact_ifmt = contactIfmt[element.contact_ifmt-1];
                            // }
                            
                            // self.logTableData = data.followup;
                            self.clueInfoData = data;
                            self.clueInfoData.details.company_idArr=[self.clueInfoData.details.company_id];
                            if (self.logShowContent) {
                                self.logTableData = self.clueInfoData.followup.filter((value) => {
                                    return value.status == self.logShowContent
                                });
                            } else {
                                 self.logTableData = self.clueInfoData.followup
                            }
                            self.getChildrenCompanyEmployee('init');
                           
                            // self.logTableData = self.clueInfoData.followup.filter((value) => {
                            //     return value.status == 1
                            // })
                            // console.log('客户详情:'+JSON.stringify(data));
                            // // console.log('Data返回:'+JSON.stringify(self.clueInfoData));
                            // // 获取到客户详情后, 获取客户所在公司
                            // self.getCompanyDepartment();
                        } else {
                            // self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
          // 日志导出
                exportData() {
                    let self = this;
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clueFollowup/clueFollowupLists',
                        data: {
                          token: localStorage.getItem('crm_token'),
                          clue_id: self.$route.query.data.contract_id,
                          type: 3,
                          statutype:1,
                          status:this.logShowContent
                        }
                    })
                     .then(function (res) {
                         if (res.data.code == 200) {
                             
                             // console.log('返回参数:');
                            console.log(JSON.stringify(res.data,null,4))
                            window.open("https://crm.tonyliangli.cn"+res.data.url);
                         } else {
                             self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                         }
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                },
            // 备注输入框状态
            textareaStatus() {
                this.remarksIptDis = !this.remarksIptDis;
                 if (event.target.innerText == '编辑') {
                    event.target.innerText = '保存'
                } else {
                    event.target.innerText = '编辑';
                    // 保存备注
                    let self = this;
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clueContract/ClueContractEditStatu',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            contract_id: self.$route.query.data.contract_id,
                            remake: self.clueInfoData.details.remake
                        }
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
                            self.$message({
                                message: '修改备注成功',
                                type: 'success'
                            })
                        } else {
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                }
            },
            // 学校输入框状态
            schoolIptStatus() {
                this.schoolIptDis = !this.schoolIptDis;
                let data = this.clueInfoData.details;
                let self = this;
                 if (event.target.innerText == '编辑') {
                     
                    event.target.innerText = '保存'
                } else {
                    event.target.innerText = '编辑';
                    // 保存备注
                    

                    let obj = {
                        token: localStorage.getItem('crm_token'),
                            contract_id: self.$route.query.data.contract_id,
                            name: data.contract_name,
                            number: data.contract_number,
                            business_type: data.contract_business_type,
                            money: data.money,
                            start_time: data.start_time,
                            end_time: data.end_time,
                            company_id: data.company_idArr[data.company_idArr.length-1],
                            user_id: data.user_id,
                            contract_time: data.contract_time,
                    }
                                        console.log(JSON.stringify(obj,null,4));
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clueContract/ClueContractEdit',
                        data: obj
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
                            self.$message({
                                message: '修改合同信息成功',
                                type: 'success'
                            })
                        } else {
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });

                }
            },
            // 联系人输入状态
            contactIptStatus(index) {
                // console.log(event);
                if (event.target.innerText == '编辑') {
                    event.target.innerText = '保存'
                } else {
                    event.target.innerText = '编辑';
                    this.editContact(index);
                }
                
                let obj =  this.allContacts[index];
                obj.contactIptDis = !obj.contactIptDis;
                this.$set(this.allContacts, index, obj);
            },
            // 提交修改联系人资料
            editContact(index) {
                this.allContacts[index].token = localStorage.getItem('crm_token');
                this.allContacts[index].contacts_id = this.allContacts[index].id;
                this.allContacts[index].contacts_address = this.allContacts[index].contacts_address;
                this.allContacts[index].type = this.clueType;
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/editClueContacts',
                    data: self.allContacts[index]
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        console.log(JSON.stringify(res.data.data, null, 4))
                        self.$message({
                            message: '操作成功',
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
            editStudent(index,flag) {
                let url = '',obj = {};
                if (flag == 1) {
                    // 编辑
                    url = '/api/clue/editSTudent';
                    obj = this.clueInfoData.student[index];
                } else {
                    // 删除
                    url = '/api/clue/deleteStudentClue';
                }
                obj.token = localStorage.getItem('crm_token'); 
                obj.clue_id = obj.student_id; 
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: url,
                    data: obj
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '操作成功',
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
            // 学生输入状态
            studentIptStatus(index, flag) {
                let self = this;
                let data = self.clueInfoData.student[index];
                if (flag == 1) {
                     // 编辑
                    data.studentIptDis = !data.studentIptDis;
                    if (event.target.innerText == '编辑') {
                        event.target.innerText = '保存'
                    } else {
                        event.target.innerText = '编辑';
                        self.editStudent(index, flag);
                    }
                } else {
                    // 删除
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clue/deleteStudentClue',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            clue_id: data.student_id
                        }
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
                            console.log(JSON.stringify(res.data.data, null, 4))
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            self.clueDetails();
                        } else {
                           self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                }
            },
            // 选着地址
            selectCity(data,index, flag) {
                if(flag == 'contacts') {
                    // 编辑联系人
                    this.allContacts[index].province_id = data[0];
                    this.allContacts[index].city_id = data[1];
                    this.allContacts[index].area_id = data[2];
                } else if (flag == 'student') {
                    
                    // 编辑学生
                    this.clueInfoData.student[index].province_id = data[0];
                    this.clueInfoData.student[index].city_id = data[1];
                    this.clueInfoData.student[index].area_id = data[2];
                } else if (flag == 'addStudent') {
                    this.addStudentData.selectCityData = data;
                }
               
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
                        if (res.data.code == 200) {
                            
                            objrr = [];
                        self.cityList = res.data.data.list;
                        localStorage.setItem('cityData', JSON.stringify(res.data.data.list))
                        // console.log(JSON.stringify(res.data.data.list));
                        } else{
                            self.$message.error(res.data.msg);if (res.data.code == 10008) {self.$router.push('/login');};
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
           
        },
        created() {
             // 传来的参数

            this.clueType = this.$route.query.clueType;
            this.paramData = this.$route.query;
            console.log(this.paramData);
            
            this.clueDetails();
            this.applyCompany();
            this.cityList = this.$cityData;
            // if (localStorage.getItem('cityData')) {
            //     this.cityList = JSON.parse(localStorage.getItem("cityData"))
            // } else {
            //     this.requestCity();
            // }
            
        }
    }
</script>

<style scoped>
    
    /* 按钮宽度 */
    .btnGroup .el-button {
        width: 100%
    }
    /* 按钮组 */
    .btnGroup,
    .tapPage {
        margin-top: 10px;
    }
    /* 备注标题 */
    .remarks {
        margin-bottom: 15px;
    }
    .remarks .title {
        margin: 0;
        border: 1px solid #bfcbd9;
        border-bottom: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 0 10px;
        line-height: 30px;
    }
    /* 编辑按钮 */
    .editBtn,
    .delBtn {
        cursor: pointer
    }
    /* 学校 */
    .school {
        border: 1px solid #bfcbd9;
        border-radius: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        line-height: 36px;
        padding: 0 10px;
    }
    .school p {
        line-height: 36px;
    }
    .school .el-cascader {
        width: 300px;
    }
    .schoolColor {
        background: #f5f7fa;
    }
    /* 信息 */
    .infoLabel {
        color:#bbb;
        font-size: 14px;
    }
    /* logTable */
    .logTable {
        margin-top: 10px;
    }
    /* 学生(机构/学校/教师) */
    .studentBtnGroup span,
    .addLogBtn span {
        margin-right: 10px;
        cursor: pointer;
    }
    .studentBtnGroup span:nth-child(1),
    .studentBtnGroup span:nth-child(2) {
        color: #2CA2FC
    }
    .studentBtnGroup span:nth-child(3),
    .studentBtnGroup span:nth-child(4) {
        color: #999
    }
    .showBtn {
        margin: 10px 0;
    }
    /* 转成客户 */
    .changeToClient .el-cascader,
    .shiftClue .el-cascader {
        width: 100%;
    }
    /* 新增联系人对话框 */
    .iptName {
        display: inline-block;
        margin: 5px 0;
    }
    
    /* 新增日志时间选择器 */
    .el-date-editor.el-input {
        width: 100%;
    }
   
</style>
