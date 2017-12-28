<template>
     <div class="componentsRoot">
         <div>
             <span>
                <span>学校：</span>
                <span>{{school.name}}</span>
             </span>
             <span class="defaultContact" style="margin-left:20px">
                <span>默认联系人：</span>
                    <template>
                    <el-select v-model="contacts.id" placeholder="请选择">
                        <el-option
                        v-for="item in allContacts"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                    </template>
             </span>
         </div>
         <div class="btnGroup">
            <el-row  :gutter="20">
                <el-col :span="5">
                     <template>
                        <el-select v-model="statusModel" placeholder="请选择">
                            <el-option
                            v-for="item in statusArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="4">
                     <el-button>转成客户</el-button>
                </el-col>
                <el-col :span="4">
                     <el-button>转移给他人</el-button>
                </el-col>
                <el-col :span="4">
                     <el-button>删除线索</el-button>
                </el-col>
            </el-row>
             
         </div>
         <div class="tapPage">
             <el-tabs type="border-card">
                <el-tab-pane label="线索信息">
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
                            v-model="school.remarke">
                        </el-input>
                    </div>
                    <!-- 学校 -->
                    <div class="remarks">
                        <el-row class="title">
                            <el-col :span="6"><p class="remarksTitle">学校</p></el-col>
                            <el-col :span="2" :offset="16"><p class="editBtn" @click="schoolIptStatus">编辑</p></el-col>
                        </el-row>
                        <div class="school" :class="{schoolColor:schoolIptDis}">
                            <el-row>
                                <el-col :span="2">
                                    <p>学校：</p>
                                </el-col>
                                <el-col :span="22">
                                    <el-input
                                        v-model="school.name"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <p>学制：</p>
                                </el-col>
                                <el-col :span="22">
                                    <template>
                                        <el-select 
                                            v-model="school.los" 
                                            placeholder="请选择"
                                            :disabled="schoolIptDis">
                                            <el-option
                                            v-for="item in academicSystemArr"
                                            :key="item.value"
                                            :label="item.label"
                                            
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <p>等级：</p>
                                </el-col>
                                <el-col :span="22">
                                    <template>
                                        <el-select 
                                        v-model="school.grade" 
                                        placeholder="请选择"
                                        :disabled="schoolIptDis">
                                            <el-option
                                            v-for="item in schoolLevelArr"
                                            :key="item.value"
                                            :label="item.label"
                                            
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <p>地区：</p>
                                </el-col>
                                <el-col :span="22">
                                   <div class="select rightWrap">
                                        <el-cascader
                                            expand-trigger="hover"
                                            :options="cityList"
                                            v-model="selCityList"
                                            @change="selectCity"
                                            clearable
                                            :disabled="schoolIptDis"
                                        >
                                        </el-cascader>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <p>地址：</p>
                                </el-col>
                                <el-col :span="22">
                                    <el-input
                                        v-model="school.address"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <el-button style="width:100px;margin-bottom:10px">添加联系人</el-button>
                    <!-- 联系人 -->
                    <div class="remarks">
                        <el-row class="title">
                            <el-col :span="6"><p class="remarksTitle">联系人1(默认)</p></el-col>
                            <el-col :span="3" :offset="14"><p class="editBtn" @click="contactIptStatus">编辑</p></el-col>
                            <el-col :span="3" ><p class="editBtn" @click="schoolIptStatus">删除</p></el-col>
                        </el-row>
                        <div class="school" :class="{schoolColor:contactIptDis}">
                            <el-row>
                                <el-col :span="3">
                                    <p>姓名：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.name"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>部门：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.department"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>职务：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.post"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>教授科目：</p>
                                </el-col>
                                <el-col :span="21">
                                    <template>
                                        <el-select 
                                            v-model="contacts.professor_subjects" 
                                            placeholder="请选择"
                                            :disabled="contactIptDis">
                                            <el-option
                                            v-for="item in professorSubjectsArr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="3">
                                    <p>教授年级：</p>
                                </el-col>
                                <el-col :span="21">
                                    <template>
                                        <el-select 
                                            v-model="contacts.professor_grade" 
                                            placeholder="请选择"
                                            :disabled="contactIptDis">
                                            <el-option
                                            v-for="item in studentGradeArr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>手机：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.mobile"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>电话：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.telephone"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>微信：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.wechat"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>QQ：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.qq"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>邮箱：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.email"
                                        :disabled="contactIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>地区：</p>
                                </el-col>
                                <el-col :span="21">
                                   <div class="select rightWrap">
                                        <el-cascader
                                            expand-trigger="hover"
                                            :value="contacts.selectCityData"
                                            :options="cityList"
                                            @change="selectCity"
                                            clearable
                                            separator="-"
                                            :disabled="contactIptDis"
                                        >
                                        </el-cascader>
                                    </div>
                                </el-col>
                            </el-row>
                             <el-row>
                                <el-col :span="3">
                                    <p>地址：</p>
                                </el-col>
                                <el-col :span="21">
                                    <el-input
                                        v-model="contacts.address"
                                        :disabled="contactIptDis"
                                    ></el-input>
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
                                   <p class="infoLabel">{{details.cue_source}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>所属机构：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{details.company_name}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>负责人：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{details.user_name}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>前负责人：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{details.user_before_name|| '无'}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>创建时间：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{details.create_time}}</p>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3">
                                    <p>更新时间：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{details.update_time}}</p>
                                </el-col>
                            </el-row>
                        </div>
                     </div>
                </el-tab-pane>
                <el-tab-pane label="学生">学生</el-tab-pane>
                <el-tab-pane label="跟进日志">
                    <div>
                        <span>新增日志</span>
                        <span class="delBtn" @click="delLogItem">删除</span>
                    </div>
                    <div class="logTable">
                        <el-table
                            ref="logList"
                            border
                            @selection-change="changeFun"
                            :data="logTableData"
                            style="width: 100%">
                            <el-table-column
                                type="selection"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="update_time"
                            label="时间"
                            min-width="110">
                            </el-table-column>
                            <el-table-column
                            prop="name"
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
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        </div>
                </el-tab-pane>
            </el-tabs>
         </div> 
     </div>
</template>

<script>
    export default {
        name: "clue-info",
        data() {
            return {
                defaultContact: '王老师',
                clueInfoData: {
                    
                },
                // 状态
                statusArr: [
                    {
                        value: 1,
                        label:'未处理'
                    },{
                        value: 2,
                        label:'联系方式有效'
                    },{
                        value: 3,
                        label:'联系方式无效'
                    }
                ],
                statusModel: 1,
                // 备注禁用状态
                remarksIptDis: true,
                remarksIptValue: '输入框内容',
                // 学校
                school: {
                    id: 96,
                    cue_source: "高招",
                    cue_type: 1,
                    name: "",
                    los: 2,
                    grade: 2,
                    province_id: 1,
                    city_id: 2,
                    area_id: 14,
                    address: "海淀区",
                    type: null,
                    location: null,
                    school_name: null,
                    sex: null,
                    the_science: null,
                    student_grade: null,
                    contacts_id: 83,
                    user_before: null,
                    company_id: 1,
                    department_id: null,
                    is_turn: 1,
                    of_level: 1,
                    of_where: 0,
                    user_id: 1,
                    followup_time: null,
                    followup_statu: null,
                    business_statu: 1,
                    payment_statu: 4,
                    remake: null,
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
                    create_time: "2017-12-16 07:24:34",
                    update_time: "2017-12-16 07:24:34"
                },
                // 学校地址
                selCityList: [1,2,3],
                cityList: [],
                schoolIptDis: true,
                selectCityData: [],
                 // 学校等级解析数组
                schoolLevelArr: [{
                    value:1,
                    label:'市重点'
                },{
                    value:2,
                    label:'区重点'
                }],
                // 学制解析数组, 教授年级解析数组
                academicSystemArr: [{
                    value:1,
                    label:'初中'
                },{
                    value:2,
                    label:'高中'
                },{
                    value:3,
                    label:'初中+高中'   
                }],
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
                    },
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
                // 联系人信息
                contactIptDis: true,
                // 所有联系人
                allContacts: [],
                contacts: {
                    id: 95,
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
                    selectCityData: [1,2,3],
                    address: null,
                    relationship: null,
                    company_name: null,
                    clue_id: 108,
                    create_time: "2017-12-25 09:50:03",
                    update_time: "2017-12-25 09:50:03"
                },
                // 信息
                details: {
                    company_name: "上一秒科技公司",
                    cue_source: "高招",
                    user_name: "dang",
                    user_before_name: null,
                    create_time: "2017-12-16 07:24:34",
                    update_time: "2017-12-16 07:24:34",
                    remake: null
                },
                // 日志表格
                logTableData: [],
                // 选中行
                multipleSelection: [],
            }
        },
        
        methods: {
            // 删除日志
            delLogItem() {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.logTableData = this.logTableData.filter((value) => {
                        return value.id != this.multipleSelection[i].id
                    })
                }
            },
            //复选框状态改变
            changeFun(val) {
                this.multipleSelection = val;
            },
            // 编辑按钮
            handleEdit(index,data) {
                // index 所在行数, 从0开始
                // data 当前行数据
                console.log(index);
                console.log(data);
                
            },
            // 选择默认联系人
            selectDefaultContact(data) {
                console.log(data);
                this.defaultContact = data
            },
            // 线索详情
            clueDetails() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/detailsClue',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.clue_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            let data = res.data.data;
                            console.log('线索详情:'+JSON.stringify(data.contacts));
                            self.clueInfoData = data;
                            self.allContacts = data.contacts;
                            for (let i = 0; i < data.contacts.length; i++) {
                                const element = data.contacts[i];
                                if (element.id == data.list.contacts_id) {
                                     self.contacts = element;
                                }
                            }
                           
                            // self.school.cityArr.push(data.list.province_id)
                            // self.school.cityArr.push(data.list.city_id)
                            // self.school.cityArr.push(data.list.area_id)
                            self.selCityList = [data.list.province_id,data.list.city_id,data.list.area_id]
                            console.log(self.selCityList);
                            self.school = data.list;
                            self.logTableData = data.followup;
                            // console.log('Data返回:'+JSON.stringify(self.clueInfoData));

                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 备注输入框状态
            textareaStatus() {
                this.remarksIptDis = !this.remarksIptDis
            },
            // 学校输入框状态
            schoolIptStatus() {
                this.schoolIptDis = !this.schoolIptDis
            },
            // 联系人输入状态
            contactIptStatus() {
                this.contactIptDis = !this.contactIptDis
            },
            // 选着地址
            selectCity() {

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
                        objrr = [];
                        self.cityList = res.data.data.list;
                        localStorage.setItem('cityData', JSON.stringify(res.data.data.list))
                        // console.log(JSON.stringify(res.data.data.list));
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        created() {
             // 传来的参数
            // console.log(this.$route)
            this.clueDetails();
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
        background: #EEF1F6;
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
</style>
