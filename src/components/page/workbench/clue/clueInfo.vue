<template>
     <div class="componentsRoot">
         <div>
             <span>
                <span v-if="clueType==1">学校：</span>
                <span v-else-if="clueType==2">机构：</span>
                <span v-else-if="clueType==3">教师：</span>
                <span v-else>家长：</span>
                <span v-if="clueType != 4">{{school.school_name}}</span>
                <span v-else>{{contacts.contacts_name}}</span>
             </span>
             <span v-if="clueType!=3" class="defaultContact" style="margin-left:20px">
                <span>默认联系人：</span>
                    <template>
                    <el-select @change="selectDefaultContact" v-model="clueInfoData.list.contacts_id" placeholder="请选择">
                        <el-option
                        v-for="item in allContacts"
                        :key="item.id"
                        :label="item.contacts_name"
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
                        <!-- <el-select v-model="statusModel"  @change="selClueStatus" placeholder="请选择"> -->
                        <el-select v-model="clueInfoData.list.followup_statu"  @change="selClueStatus" placeholder="请选择">
                            <el-option
                            v-for="item in statusArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-col>
                <el-col :span="4">
                     <el-button @click="turnIntoCustomersFn('contract')">转成客户</el-button>
                </el-col>
                <el-col :span="4">
                     <el-button @click="turnIntoCustomersFn('shiftClue')">转移给他人</el-button>
                </el-col>
                <el-col :span="4">
                     <el-button @click="turnIntoCustomersFn('delClue')">删除线索</el-button>
                     <!-- <el-button @click="turnIntoCustomersFn('delClue')">删除线索</el-button> -->
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
                            v-model="clueInfoData.details.remake">
                        </el-input>
                    </div>
                    <!-- 学校 -->
                    <div class="remarks" v-if="clueType != 4">
                        <el-row class="title">
                            <el-col :span="6">
                                <p  class="remarksTitle" v-if="clueType == 1">学校</p>
                                <p  class="remarksTitle" v-else-if="clueType == 2">机构</p>
                                <p  class="remarksTitle" v-else-if="clueType == 3">教师</p>
                            </el-col>
                            <el-col :span="2" :offset="16"><p class="editBtn" @click="schoolIptStatus">编辑</p></el-col>
                        </el-row>
                        <div class="school" :class="{schoolColor:schoolIptDis}">
                            <el-row>
                                <el-col :span="2">
                                    <p>名称</p>
                                </el-col>
                                <el-col :span="22">
                                    <el-input
                                        v-model="school.school_name"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <p v-if="clueType == 2">类型：</p>
                                    <p v-else>学制：</p>
                                </el-col>
                                <el-col :span="22">
                                    <template v-if="clueType == 2">
                                       
                                        <el-select 
                                            v-model="school.type" 
                                            placeholder="请选择"
                                            :disabled="schoolIptDis">
                                            <el-option
                                            v-for="item in mechanismTypeArr"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-else>
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
                                    <p v-if="clueType == 2">定位：</p>
                                    <p v-else>等级：</p>
                                </el-col>
                                <el-col :span="22">
                                    <template v-if="clueType == 2">
                                        <el-select 
                                        v-model="school.location" 
                                        placeholder="请选择"
                                        :disabled="schoolIptDis">
                                            <el-option
                                            v-for="item in mechanismPositioningArr"
                                            :key="item.value"
                                            :label="item.label"
                                            
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-else>
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
                                            v-model="school.selCityList"
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
                             <el-row v-if="clueType==2">
                                <el-col :span="2">
                                    <p>网址：</p>
                                </el-col>
                                <el-col :span="22">
                                    <el-input
                                        v-model="school.website"
                                        :disabled="schoolIptDis"
                                    ></el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <el-button v-if="clueType==4"  @click="turnIntoCustomersFn('addContact')" style="width:100px;margin-bottom:10px">添加家长</el-button>
                    <el-button v-if="clueType==1 || clueType == 2" @click="turnIntoCustomersFn('addContact')" style="width:100px;margin-bottom:10px">添加联系人</el-button>
                    <!-- 联系人 -->
                    <template v-for="(item, index) in allContacts">
                        <div class="remarks">
                            <el-row class="title">
                                <el-col :span="6">
                                    <p v-if="clueType==1 || clueType == 2" class="remarksTitle">联系人{{index+1}} {{clueInfoData.list.contacts_id == item.id ? '(默认)' :''}}</p>
                                    <p v-else-if="clueType == 3" class="remarksTitle">老师</p>
                                    <p v-else class="remarksTitle">家长{{index+1}} {{clueInfoData.list.contacts_id == item.id ? '(默认)' :''}}</p>
                                </el-col>
                                <el-col :span="2" :offset="14"><p class="editBtn" @click="contactIptStatus(index)">编辑</p></el-col>
                                <el-col :span="2" ><p class="editBtn" @click="selContact(index)">删除</p></el-col>
                            </el-row>
                            <div class="school" :class="{schoolColor:item.contactIptDis}">
                                <el-row>
                                    <el-col :span="3">
                                        <p>姓名：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_name"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row v-if="clueType == 4">
                                    <el-col :span="3">
                                        <p>关系：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_relationship"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row v-if="clueType == 4">
                                    <el-col :span="3">
                                        <p>工作单位：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_company_name"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <p>部门：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_department"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <p>职务：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_post"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row v-if="clueType==1 || clueType==3">
                                    <el-col :span="3">
                                        <p>教授科目：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <template>
                                            <el-select 
                                                v-model="item.contacts_professor_subjects" 
                                                placeholder="请选择"
                                                :disabled="item.contactIptDis">
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
                                <el-row v-if="clueType==1 || clueType==3">
                                    <el-col :span="3">
                                        <p>教授年级：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <template>
                                            <el-select 
                                                v-model="item.contacts_professor_grade" 
                                                placeholder="请选择"
                                                :disabled="item.contactIptDis">
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
                                            v-model="item.contacts_mobile"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <p>电话：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_telephone"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <p>微信：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_wechat"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <p>QQ：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_qq"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3">
                                        <p>邮箱：</p>
                                    </el-col>
                                    <el-col :span="21">
                                        <el-input
                                            v-model="item.contacts_email"
                                            :disabled="item.contactIptDis"
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
                                                :value="item.selectCityData"
                                                :options="cityList"
                                                @change="selectCity($event,index, 'contacts')"
                                                clearable
                                                separator="-"
                                                :disabled="item.contactIptDis"
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
                                            v-model="item.contacts_address"
                                            :disabled="item.contactIptDis"
                                        ></el-input>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </template>
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
                                    <p>前所属机构：</p>
                                </el-col>
                                <el-col :span="21">
                                   <p class="infoLabel">{{clueInfoData.details.before_company_name}}</p>
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
                <el-tab-pane label="学生">
                    <template v-if="clueType == 4">
                        <el-button @click="addStudentStatu = true" style="width:100px;margin-bottom:10px">添加学生</el-button>
                       <template v-for="(item, index) in clueInfoData.student">
                            <div class="remarks">
                                <el-row class="title">
                                    <el-col :span="6">
                                        <p class="remarksTitle">学生</p>
                                    </el-col>
                                    <el-col :span="2" :offset="14"><p class="editBtn" @click="studentIptStatus(index,'1')">编辑</p></el-col>
                                    <el-col :span="2" ><p class="editBtn" @click="studentIptStatus(index,'2')">删除</p></el-col>
                                </el-row>
                                
                                <div class="school" :class="{schoolColor:item.studentIptDis}">
                                    <el-button v-if="item.is_turn == 1" @click="studentturnIntoCustomersFn('single', index)" :disabled="item.studentIptDis" style="width:100px;margin-top:10px">转成客户</el-button>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>姓名：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.name"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-col :span="3">
                                            <p>性别：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <template>
                                                <el-select 
                                                    v-model="item.sex" 
                                                    placeholder="请选择"
                                                    :disabled="item.studentIptDis">
                                                    <el-option
                                                    v-for="item in sexArr"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                        </el-col>
                                    </el-row>
                                    <el-row >
                                        <el-col :span="3">
                                            <p>文理科：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <template>
                                                <el-select 
                                                    v-model="item.the_science" 
                                                    placeholder="请选择"
                                                    :disabled="item.studentIptDis">
                                                    <el-option
                                                    v-for="item in subjectArr"
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
                                            <p>年级：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <template>
                                                <el-select 
                                                    v-model="item.student_grade" 
                                                    placeholder="请选择"
                                                    :disabled="item.studentIptDis">
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
                                            <p>学校地区：</p>
                                        </el-col>
                                        <el-col :span="21">
                                        <div class="select rightWrap">
                                                <el-cascader
                                                    expand-trigger="hover"
                                                    :value="item.selectCityData"
                                                    :options="cityList"
                                                    @change="selectCity($event, index, 'student')"
                                                    clearable
                                                    separator="-"
                                                    :disabled="item.studentIptDis"
                                                >
                                                </el-cascader>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>学校名称：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.school_name"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>学校等级：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <template>
                                                <el-select 
                                                    v-model="item.school_grade" 
                                                    placeholder="请选择"
                                                    :disabled="item.studentIptDis">
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
                                        <el-col :span="3">
                                            <p>手机：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.mobile"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>电话：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.telephone"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>微信：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.wechat"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>QQ：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.qq"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="3">
                                            <p>邮箱：</p>
                                        </el-col>
                                        <el-col :span="21">
                                            <el-input
                                                v-model="item.email"
                                                :disabled="item.studentIptDis"
                                            ></el-input>
                                        </el-col>
                                    </el-row>
                                    
                                </div>
                            </div>
                       </template>
                    </template>
                    <template v-else>
                        <div class="studentBtnGroup">
                            <span @click="addStudentStatu = true">新增学生</span>
                            <span @click="turnIntoCustomersFn('importStudent')">导入学生</span>
                            <span @click="studentturnIntoCustomersFn('multiple')">转客户</span>
                            <span @click="delLogItem('student')">删除</span>
                        </div>
                        <div class="showBtn">
                            <span class="mr10">显示</span>
                             <el-radio-group @change="switchStudentShowContent" v-model="studentShowContent">
                                <el-radio  label="1">线索</el-radio>
                                <el-radio  label="2">客户</el-radio>
                             </el-radio-group>
                        </div>
                        <el-table
                            border
                            @selection-change="changeFun($event,'student')"
                            :data="clueInfoData.studentShowList"
                            style="width: 100%">
                            <el-table-column v-if="studentShowContent=='1'"
                                type="selection"
                            >
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            sortable
                            show-overflow-tooltip
                            label="学生名称"
                            min-width="120">
                            </el-table-column>
                            <el-table-column
                            prop="parent_name"
                            label="家长姓名"
                            show-overflow-tooltip
                            align="center"
                            min-width="100">
                            </el-table-column>
                             <el-table-column
                            prop="parent_mobile"
                            label="联系方式"
                            align="center"
                            min-width="100">
                            </el-table-column>
                           
                             <el-table-column
                            prop="city_name"
                            sortable
                            label="学校地区"
                            show-overflow-tooltip
                            min-width="120">
                            </el-table-column>
                             <el-table-column
                            prop="school_name"
                            sortable
                            label="学校名称"
                            show-overflow-tooltip
                            min-width="120">
                            </el-table-column>
                             <el-table-column
                            label="年级"
                            sortable
                            align="center"
                            min-width="100">
                                <template slot-scope="scope">
                                    {{scope.row.student_grade==1?"初一":(
                                        scope.row.student_grade==2?"初二":(
                                            scope.row.student_grade==3?"初三":(
                                                scope.row.student_grade==4?"高一":(
                                                    scope.row.student_grade==5?"高二":"高三"
                                            ))))}}
                                </template>
                            </el-table-column>
                             <el-table-column
                            prop="followup_time"
                            label="跟进状态"
                            show-overflow-tooltip
                            sortable
                            min-width="180">
                            </el-table-column>
                            <el-table-column min-width="180" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                    size="mini"
                                    :disabled="scope.row.is_turn == 2"
                                    type="success"
                                    @click="handleEdit(scope.$index, scope.row, 'studentToContract')">转客户</el-button>
                                    <el-button
                                    :disabled="scope.row.is_turn == 2"
                                    size="mini"
                                    type="danger"
                                    @click="handleEdit(scope.$index, scope.row,'delStudent')">删除</el-button>
                                </template>
                               
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="跟进日志">
                    <div class="addLogBtn">
                        <span @click="turnIntoCustomersFn('addLog')">新增日志</span>
                        <span class="delBtn" @click="delLogItem('log')">删除</span>
                         <span class="btn">
                              <el-button @click="exportData" type="success">导出</el-button>
                         </span>
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
         <!-- 转成客户 -->
         <div class="changeToClient">
             <el-dialog
                title="转成客户"
                :visible.sync="turnIntoCustomersStatu"
                width="30%"
                >
                <div class="mt10">
                    <p class="mb10 ">业务部门</p>
                    <el-cascader
                        expand-trigger="hover"
                        :value="changeToClientData.businessDepartment"
                        :options="companyDepartment"
                        @change="selectServiceDepartment($event,'businessDepartment')"
                        clearable
                        change-on-select
                    >
                    </el-cascader>
                </div>
                <div class="mt10">
                    <p class="mb10 ">业务负责人</p>
                    <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                    <el-select v-model="changeToClientData.businessEmployeeId" placeholder="请选择">
                        <el-option
                        v-for="item in changeToClientData.businessEmployee"
                        :key="item.user_id"
                        :label="item.user_name"
                        :value="item.user_id">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="mt10">
                    <p class="mb10 ">服务部门</p>
                     <el-cascader
                        expand-trigger="hover"
                        :value="changeToClientData.serviceDepartment"
                        :options="companyDepartment"
                        @change="selectServiceDepartment($event,'serviceDepartment')"
                        clearable
                        change-on-select
                    >
                    </el-cascader>
                </div>
                <div class="mt10">
                    <p class="mb10 ">服务负责人</p>
                    <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.serviceEmployeeId" placeholder="请选择"> -->
                    <el-select v-model="changeToClientData.serviceEmployeeId" placeholder="请选择">
                        <el-option
                        v-for="item in changeToClientData.serviceEmployee"
                        :key="item.user_id"
                        :label="item.user_name"
                        :value="item.user_id">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="mt10">
                    <p class="mb10 ">售后部门</p>
                     <el-cascader
                        expand-trigger="hover"
                        :value="changeToClientData.aftermarketDepartment"
                        :options="companyDepartment"
                        @change="selectServiceDepartment($event,'aftermarketDepartment')"
                        clearable
                        change-on-select
                    >
                    </el-cascader>
                </div>
                <div class="mt10">
                    <p class="mb10 ">售后负责人</p>
                    <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.aftermarketEmployeeId" placeholder="请选择"> -->
                    <el-select v-model="changeToClientData.aftermarketEmployeeId" placeholder="请选择">
                        <el-option
                        v-for="item in changeToClientData.aftermarketEmployee"
                        :key="item.user_id"
                        :label="item.user_name"
                        :value="item.user_id">
                        </el-option>
                    </el-select>
                </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="turnIntoCustomersStatu = false">取 消</el-button>
                    <el-button type="primary" @click="intoContract">确 定</el-button>
                </span>
            </el-dialog>
         </div>
         <!-- 转移线索 -->
         <div class="shiftClue">
             <el-dialog
                title="转移线索"
                :visible.sync="shiftClueStatu"
                width="30%"
                >
                <div class="mt10">
                    <p class="mb10 ">选择部门</p>
                    <el-cascader
                        expand-trigger="hover"
                        :value="changeToClientData.businessDepartment"
                        :options="companyDepartment"
                        @change="selectServiceDepartment($event,'businessDepartment')"
                        clearable
                        change-on-select
                    >
                    </el-cascader>
                </div>
                <div class="mt10">
                    <p class="mb10 ">选择负责人</p>
                    <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                    <el-select v-model="shiftClueEmployeeId" placeholder="请选择">
                        <el-option
                        v-for="item in changeToClientData.businessEmployee"
                        :key="item.user_id"
                        :label="item.name"
                        :value="item.user_id">
                        </el-option>
                    </el-select>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="shiftClueStatu = false">取 消</el-button>
                    <el-button type="primary" @click="shiftClue">确 定</el-button>
                </span>
            </el-dialog>
         </div>
         <!-- 删除线索 -->
         <div class="shiftClue">
             <el-dialog
                title="删除线索"
                :visible.sync="delClueStatu"
                width="30%"
                >
                <p>是否确定删除线索</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delClueStatu = false">取 消</el-button>
                    <el-button type="primary" @click="delClue">确 定</el-button>
                </span>
            </el-dialog>
         </div>
         <!-- 添加联系人 -->
         <div class="shiftClue">
             <el-dialog
                title="添加联系人"
                :visible.sync="addContactStatu"
                width="30%"
                >
                <div>
                    <div>
                        <span class="iptName">姓名:</span>
                        <el-input v-model="addContactData.contactName" placeholder="请输入姓名"></el-input>
                    </div>
                   <template v-if="clueType == 4">
                        <div>
                            <span class="iptName">关系:</span>
                            <el-input v-model="addContactData.relationship" placeholder="请输入关系"></el-input>
                        </div>
                        <div>
                            <span class="iptName">工作单位:</span>
                            <el-input v-model="addContactData.company_name" placeholder="请输入工作单位"></el-input>
                        </div>
                   </template>
                    <div>
                        <span class="iptName">部门:</span>
                        <el-input v-model="addContactData.department" placeholder="请输入部门"></el-input>
                    </div>
                    <div>
                        <span class="iptName">职务:</span>
                        <el-input v-model="addContactData.post" placeholder="请输入职务"></el-input>
                    </div>
                    <template v-if="clueType==1">
                        <div class="mt10" >
                            <p class="mb10 ">教授年级</p>
                            <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                            <el-select v-model="addContactData.grade" placeholder="请选择">
                                <el-option
                                v-for="item in studentGradeArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="mt10">
                            <p class="mb10 ">教授科目</p>
                            <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                            <el-select v-model="addContactData.subject" placeholder="请选择">
                                <el-option
                                v-for="item in professorSubjectsArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                    <div>
                        <span class="iptName">手机:</span>
                        <el-input v-model="addContactData.phone" placeholder="请输入手机"></el-input>
                    </div>
                    <div>
                        <span class="iptName">电话:</span>
                        <el-input v-model="addContactData.tel" placeholder="请输入电话"></el-input>
                    </div>
                    <div>
                        <span class="iptName">微信:</span>
                        <el-input v-model="addContactData.weixin" placeholder="请输入微信"></el-input>
                    </div>
                    <div>
                        <span class="iptName">QQ:</span>
                        <el-input v-model="addContactData.qq" placeholder="请输入QQ"></el-input>
                    </div>
                    <div>
                        <span class="iptName">邮箱:</span>
                        <el-input v-model="addContactData.email" placeholder="请输入邮箱"></el-input>
                    </div>
                    <div class="mt10">
                        <p class="mb10 ">地区</p>
                         <el-cascader
                            expand-trigger="hover"
                            :value="addContactData.selectCityData"
                            :options="cityList"
                            @change="addContactSelectCity"
                            clearable
                            separator="-"
                        >
                        </el-cascader>
                    </div>
                    <div>
                        <span class="iptName">地址:</span>
                        <el-input v-model="addContactData.address" placeholder="请输入地址"></el-input>
                    </div>
                </div>  
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addContactStatu = false">取 消</el-button>
                    <el-button type="primary" @click="addContact('contact')">确 定</el-button>
                </span>
            </el-dialog>
         </div>
         <!-- 新增学生 -->
         <div class="shiftClue">
             <el-dialog
                title="新增学生"
                :visible.sync="addStudentStatu"
                width="30%"
                >
                <div>
                    <div>
                        <span class="iptName">姓名:</span>
                        <el-input v-model="addStudentData.name" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="mt10">
                        <p class="mb10 ">性别</p>
                        <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                        <el-select v-model="addStudentData.sex" placeholder="请选择">
                            <el-option
                            v-for="item in sexArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="mt10" >
                        <p class="mb10 ">文理科</p>
                        <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                        <el-select v-model="addStudentData.subject" placeholder="请选择">
                            <el-option
                            v-for="item in subjectArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="mt10" >
                        <p class="mb10 ">年级</p>
                        <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                        <el-select v-model="addStudentData.grade" placeholder="请选择">
                            <el-option
                            v-for="item in studentGradeArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <!-- 机构教师x学生显示 -->
                    <template v-if="clueType != 1">
                        <div>
                            <span class="iptName">学校名称:</span>
                            <el-input v-model="addStudentData.schoolName" placeholder="请输入家长姓名"></el-input>
                        </div>
                        <div class="mt10" >
                            <p class="mb10 ">等级</p>
                            <!-- <el-select @change="selectDefaultContact" v-model="changeToClientData.businessEmployeeId" placeholder="请选择"> -->
                            <el-select v-model="addStudentData.schoolLevel" placeholder="请选择">
                                <el-option
                                v-for="item in schoolLevelArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="mt10">
                            <p class="mb10 ">学校所在地</p>
                            <el-cascader
                                expand-trigger="hover"
                                :value="addStudentData.selectCityData"
                                :options="cityList"
                                @change="selectCity($event, 2, 'addStudent')"
                                clearable
                                separator="-"
                            >
                            </el-cascader>
                        </div>
                    </template>

                    <template v-if="clueType != 4">
                        <div>
                            <span class="iptName">家长姓名:</span>
                            <el-input v-model="addStudentData.parentsName" placeholder="请输入家长姓名"></el-input>
                        </div>
                        <div>
                            <span class="iptName">手机:</span>
                            <el-input v-model="addStudentData.phone" placeholder="请输入手机"></el-input>
                        </div>
                        <div>
                            <span class="iptName">电话:</span>
                            <el-input v-model="addStudentData.tel" placeholder="请输入电话"></el-input>
                        </div>
                        <div>
                            <span class="iptName">微信:</span>
                            <el-input v-model="addStudentData.weixin" placeholder="请输入微信"></el-input>
                        </div>
                        <div>
                            <span class="iptName">QQ:</span>
                            <el-input v-model="addStudentData.qq" placeholder="请输入QQ"></el-input>
                        </div>
                        <div>
                            <span class="iptName">邮箱:</span>
                            <el-input v-model="addStudentData.email" placeholder="请输入邮箱"></el-input>
                        </div>
                    </template>
                </div>  
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addStudentStatu = false">取 消</el-button>
                    <el-button type="primary" @click="addContact('student')">确 定</el-button>
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
                    <el-button type="primary" @click="addLog">确 定</el-button>
                </span>
             </el-dialog>
         </div>
         <!-- 导入学生 -->
        <el-dialog
            title="批量导入--下载模板"
            :visible.sync="importStatu"
            width="30%"
            >
            <el-button type="text">点击下载导入数据模板</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button @click="importStatu = false">取 消</el-button>
                <el-button type="primary" @click="importStatu = false;importStatu2 = true">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 导入学生第二部 -->
         <el-dialog
            title="批量导入--上传数据文件"
            :visible.sync="importStatu2"
            width="30%"
            >
            
            <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :on-change="handChange"
            >
            <!-- :file-list="fileList"> -->
            <el-button type="text">点击下载导入数据模板</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

            <span slot="footer" class="dialog-footer">
                <el-button @click="importStatu2 = false">取 消</el-button>
                <el-button type="primary" @click="importStatu2 = false">确 定</el-button>
            </span>
        </el-dialog>
     </div>
</template>

<script>
    export default {
        name: "clue-info",
        components: {
        },
        data() {
            return {
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                // 新增日志
                addLogData: {
                    addLogTime: '',
                    contactType: '',
                    content: ''
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
                // 转移线索对话框
                shiftClueStatu: false,
                // 删除线索对话框
                delClueStatu: false,
                // 新增联系人对话框
                addContactStatu: false,
                clueType: '',
                defaultContact: '',
                clueInfoData: {
                    list: {
                        id: '',
                        cue_source: "",
                        cue_type: "",
                        name: "",
                        los: "",
                        grade: "",
                        province_id: "",
                        city_id: "",
                        area_id: "",
                        address: "",
                        type: "",
                        location: "",
                        website: "",
                        school_name: "",
                        sex: "",
                        the_science: "",
                        student_grade: "",
                        contacts_id: "",
                        user_before: "",
                        company_id: "",
                        department_id: "",
                        is_turn: "",
                        of_level: "",
                        of_where: "",
                        user_id: "",
                        followup_time: "",
                        followup_statu: "",
                        business_statu: "",
                        payment_statu: "",
                        remake: "",
                        person_user: "",
                        before_person_user: "",
                        person_department: "",
                        before_person_department: "",
                        service_user: "",
                        before_service_user: "",
                        service_department: "",
                        before_service_department: "",
                        customer_user: "",
                        before_customer_user: "",
                        customer_department: "",
                        before_customer_department: "",
                        create_time: "",
                        update_time: "",
                    },
                    // 信息, 可以删除
                    details: {
                        company_name: "",
                        cue_source: "",
                        user_name: "",
                        user_before_name: null,
                        create_time: "",
                        update_time: "",
                        remake: null
                    },
                    // 学生列表
                    student: [],

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
                        value: '大型',
                        label: '大型'
                    },
                    {
                        value: '中型',
                        label: '中型'
                    },
                    {
                        value: '小型',
                        label: '小型'
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
                // 转移线索部门员工
                shiftClueDepatment: [],
                shiftClueEmployeeId: '',
                // 是学生转客户还是线索转客户
                // 学生  false
                // 线索 true
                studentOrClueToCantract: true,
                studentToCantract: '',
                // 多选删除学生
                studentToCantractArr: [],
                studentToCantractFlag: '',

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

            // 切换学生表格显示
            switchStudentShowContent() {
                if (this.studentShowContent == '1') {
                    this.clueInfoData.studentShowList = this.clueInfoData.studentClueList;
                } else {
                    this.clueInfoData.studentShowList = this.clueInfoData.studentContractList;
                }
            },
            // 新增日志
            addLog() {
                let self = this;
                    this.$axios({
                       method: 'POST',
                       withCredentials: false,
                       url: '/api/clueFollowup/applyClueFollowup',
                       data: {
                           token: localStorage.getItem('crm_token'),
                           type: 1,
                           clue_id: self.$route.query.data.clue_id,
                           contact_ifmt: self.addLogData.contactType,
                           content: self.addLogData.content,
                           time: self.addLogData.addLogTime
                       }
                    })
                    .then(function(res){
                       if (res.data.code === 200) {
                           self.$message({
                               message: '操作成功',
                               type: 'success'
                           });
                           self.addLogStatu = false;
                           self.clueDetails()
                       } else {
                           self.$message.error(res.data.msg);
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
                        self.message.error(res.data.msg);
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
                            self.$message.error(res.data.msg);
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                } else {
                    self.$message.error('请完善参数!')
                }
              
            },
            // 设置线索状态
            selClueStatus(data) {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/editClueStatu',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.data.clue_id,
                        followup_statu: self.clueInfoData.list.followup_statu
                    }
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 进入线索列表页
            openClueInfo() {
                // 跳转到线索
                this.$router.push({path: '/clue'})
            },
            // 删除线索
            delClue() {
                this.delClueStatu = false;
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/deleteClue',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.data.clue_id,
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
                        alert(res.data.msg)
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            // 转移线索
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
                        alert(res.data.msg)
                    }
                    })
                .catch(function(err){
                    console.log(err);
                });
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
                        // 线索转客户
                        obj.clue_id = self.$route.query.data.clue_id;
                    } else {
                        // 学生转客户
                        obj.clue_id = self.studentToCantract
                    }
                }
                // console.log(JSON.stringify(self.changeToClientData,null,4));
               
                    
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
                                // 线索
                                self.openClueInfo();    
                            } else {
                                // 学生
                                self.clueDetails();
                            }
                            self.studentOrClueToCantract = true;
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
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
                let department_id = changeToClientData[flagDepartment][changeToClientData[flagDepartment].length-1];
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
                    url: '/api/department/makeAdminCDepartmentList',
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
                            alert(res.data.msg)
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
                            alert(res.data.msg)
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
                } else {
                    // 删除学生
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        this.clueInfoData.studentShowList = this.clueInfoData.studentShowList.filter((value) => {
                            return value.student_id != this.multipleSelection[i].student_id
                        })
                        this.clueInfoData.student = this.clueInfoData.student.filter((value) => {
                            return value.student_id != this.multipleSelection[i].student_id
                        })
                        this.clueInfoData.studentClueList = this.clueInfoData.studentClueList.filter((value) => {
                            return value.student_id != this.multipleSelection[i].student_id
                        })
                        this.clueInfoData.studentContractList = this.clueInfoData.studentContractList.filter((value) => {
                            return value.student_id != this.multipleSelection[i].student_id
                        })
                        

                    }
                    this.delServerData('student')
                }
            },
            // 删除线上信息
            delServerData(flag) {
                
                let url='',param={};
                let obj=[];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (flag == 'student') {
                        obj.push(this.multipleSelection[i].student_id);
                    } else {
                        obj.push(this.multipleSelection[i].id);
                    }
                }
                if (flag == 'student') {
                    url = '/api/clue/deleteStudentClues'
                    param = {
                        token: localStorage.getItem('crm_token'),
                        clueIds: JSON.stringify(obj)
                    }
                } else {
                    url = '/api/clueFollowup/deleteClueFollowups';
                    param = {
                        token: localStorage.getItem('crm_token'),
                        followupIds: JSON.stringify(obj)
                    }
                }
                
                let self = this;
                // console.log(obj+'');
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
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            },
            //复选框状态改变
            changeFun(val,flag) {
                if (flag == 'student') {
                    // 学生表格多选

                } else {
                    // 日志表格多选
                }
                this.multipleSelection = val;
            },
            // 编辑按钮
            handleEdit(index,data, flag) {
                // index 所在行数, 从0开始
                // data 当前行数据
                let self = this;
                if (flag == 'studentToContract') {
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
                            self.$message.error(res.data.msg);
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
                } else {
                    // 删除日志按钮 logEdit
                this.logTableData = this.logTableData.filter((value) => {
                    return value.id != data.id
                })
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
                        })
                    } else {
                        self.$message.error(res.data.msg);
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
            // 线索详情
            clueDetails() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/detailsClue',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.data.clue_id,
                        type: 1
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            let data = res.data.data;


                            for (let i = 0; i < data.contacts.length; i++) {
                                const element = data.contacts[i];
                                if (element.id == data.list.contacts_id) {
                                     self.contacts = element;
                                }
                                element.contactIptDis = true;
                                element.selectCityData = [element.province_id,element.city_id,element.area_id]
                            }
                            data.studentClueList = [];
                            data.studentContractList = [];
                            // 处理学生数组
                            for (let i = 0; i < data.student.length; i++) {
                                const element = data.student[i];
                                element.studentIptDis = true;
                                element.selectCityData = [element.province_id,element.city_id,element.area_id];
                                if (element.is_turn == 1) {
                                    // 线索
                                    data.studentClueList.push(element)
                                } else {
                                    // 客户
                                    data.studentContractList.push(element)
                                }
                            }
                            data.studentShowList = data.studentClueList;

                            self.allContacts = data.contacts;
                            // for (let i = 0; i < data.contacts.length; i++) {
                            //     const element = data.contacts[i];

                            // }

                            // self.school.cityArr.push(data.list.province_id)
                            // self.school.cityArr.push(data.list.city_id)
                            // self.school.cityArr.push(data.list.area_id)
                            self.selCityList = [data.list.province_id,data.list.city_id,data.list.area_id]
                            console.log(self.selCityList);
                            self.school = data.details;

                            if(!self.school.website) {
                                self.school.website = ''
                            }

                            self.school.selCityList = [data.details.province_id, data.details.city_id, data.details.area_id]
                            // 处理日志联系方式
                            let contactIfmt = ['手机','电话','QQ','微信','邮箱'];
                            for (let i = 0; i < data.followup.length; i++) {
                                const element = data.followup[i];
                                element.contact_ifmt = contactIfmt[element.contact_ifmt-1]
                            }
                            self.logTableData = data.followup;
                            self.clueInfoData = data;
                            console.log('线索详情:'+JSON.stringify(data));
                            // console.log('Data返回:'+JSON.stringify(self.clueInfoData));
                            // 获取到线索详情后, 获取线索所在公司
                            self.getCompanyDepartment();
                        } else {
                            // alert(res.data.msg)
                            self.$message.error(res.data.msg);
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
                        clue_id: self.$route.query.data.clue_id,
                        type: 1,
                        statutype:1
                    }
                })
                 .then(function (res) {
                       // console.log('返回参数:');
                        console.log(JSON.stringify(res.data,null,4))
                        window.open("https://crm.tonyliangli.cn"+res.data.url);
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
                        url: '/api/clue/clueEditRemake',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            clue_id: self.$route.query.data.clue_id,
                            remake: this.clueInfoData.details.remake
                        }
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
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
                }
            },
            // 学校输入框状态
            schoolIptStatus() {
                this.schoolIptDis = !this.schoolIptDis;
                let self = this;
                 if (event.target.innerText == '编辑') {
                    event.target.innerText = '保存'
                } else {
                    event.target.innerText = '编辑';
                    // 保存备注
                    console.log(JSON.stringify(self.school,null,4));
                    let obj = {
                         token: localStorage.getItem('crm_token'),
                            type: self.$route.query.clueType,
                            name: self.school.school_name,
                            los:  self.school.los,
                            grade:  self.school.grade,
                            address: self.school.address,
                            location: self.school.location,
                            jitype:	self.school.type,
                            province_id: parseInt(self.school.selCityList[0]),
                            city_id: parseInt(self.school.selCityList[1]),
                            area_id: parseInt(self.school.selCityList[2]),
                            website: self.school.website
                    }
                    console.log(JSON.stringify(obj,null,4));
                    this.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clue/editClueShool',
                        data: {
                            token: localStorage.getItem('crm_token'),
                            clue_id: self.$route.query.data.clue_id,
                            type: self.$route.query.clueType,
                            name: self.school.school_name,
                            los:  self.school.los,
                            grade:  self.school.grade,
                            address: self.school.address,
                            location: self.school.location,
                            jitype:	self.school.type,
                            province_id: self.school.selCityList[0],
                            city_id: self.school.selCityList[1],
                            area_id: self.school.selCityList[2],
                            website: self.school.website
                            
                        }
                    })
                    .then(function(res){
                        if (res.data.code === 200) {
                            console.log(JSON.stringify(res.data.data, null, 4))
                            self.$message({
                                message: '操作成功',
                                type: 'success'
                            })
                        } else {
                            self.$message.error(res.data.msg);
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
                        self.$message.error(res.data.msg);
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
                        self.$message.error(res.data.msg);
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
                            self.$message.error(res.data.msg);
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
            console.log(this.$route)
            this.clueType = this.$route.query.clueType;
            this.clueDetails();
            if (localStorage.getItem('cityData')) {
                this.cityList = JSON.parse(localStorage.getItem('cityData'))
            } else {
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
