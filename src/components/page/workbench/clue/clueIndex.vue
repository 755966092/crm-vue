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
            <el-col :span="6">
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
        <!--线索类型-->
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">线索类型</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="clueType">
                        <el-radio-button label="1">学校</el-radio-button>
                        <el-radio-button label="2">机构</el-radio-button>
                        <el-radio-button label="3">教师</el-radio-button>
                        <el-radio-button label="4">学生</el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <!--中间筛选项-->
        <template v-for="(item, index) in typeList" v-if="item.show">
            <template v-if="index == 'followUpStatus' || index == 'source' ">
            </template>
            <template v-else>
                <el-row>
                    <el-col :span="3">
                        <p class="leftWrap">{{ item.title }}</p>
                    </el-col>
                    <el-col :span="21">
                        <div class="select rightWrap">
                            <el-radio-group
                                @change="radioChange(index)"
                                v-model="item.key">
                                <el-radio-button v-for="children in item.content" :value="children.value"
                                                 :label="children.label"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-col>
                </el-row>
            </template>
        </template>
        <!-- 跟进状态 -->
        <el-row v-if="typeList.followUpStatus.show">
            <el-col :span="3">
                <p class="leftWrap">{{ typeList.followUpStatus.title }}</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group
                        @change="radioChange('followUpStatus')"
                        v-model="typeList.followUpStatus.key">
                        <el-radio-button v-for="children in typeList.followUpStatus.content" :value="children.value"
                                         :label="children.label"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <!-- 来源 -->
        <el-row v-if="typeList.source.show">
            <el-col :span="3">
                <p class="leftWrap">{{ typeList.source.title }}</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group
                        @change="radioChange('source')"
                        v-model="typeList.source.key">
                        <el-radio-button
                            v-for="children in typeList.source.content"
                            :value="children.value"
                            :label="children.label"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <!-- 地区 -->
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">地区</p>
            </el-col>
            <el-col :span="21" class="city">
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :value="selectCityData"
                        :options="cityList"
                        @change="selectCity"
                        clearable
                    >
                    </el-cascader>
                </div>
            </el-col>
        </el-row>
        <!-- 最后跟进时间 -->
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">最后跟进时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="filterTime.lastFollowUpTime"
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
        <!-- 更新时间 -->
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">更新时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="filterTime.updateTime"
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
        <!-- 创建时间 -->
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">创建时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="filterTime.createTime"
                            type="daterange"
                            @change="timeUpdata"
                            :editable=false
                            align="right"
                            :unlink-panels=false
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
        <!--<router-view></router-view>-->
        <!-- 数据表格 -->
        <div>
            <div class="tableTitle">
                <el-row>
                    <el-col :span="10">
                        <el-button type="text" @click="addClue">新增线索</el-button>
                        <el-button type="text" >导入线索</el-button>
                        <el-button type="text" style="color: #999">批量转移</el-button>
                        <el-button type="text" style="color: #999" @click="delLogItem">批量删除</el-button>
                         <span class="btn">
                          <el-button @click="exportData" type="success">导出</el-button>
                         </span>
                    </el-col>
                    <el-col :span="8" :offset="6">
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
            <!-- 学校表格 -->
            <template>
                <div :class="{hide:schoolTable}">
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
                            prop="clue_name"
                            align="center"
                            label="学校名称"
                            fixed
                            show-overflow-tooltip
                            min-width="130"
                        >
                            <template slot-scope="scope">
                            <span class="colorBlue"
                                  @click="openClueInfo(scope.$index, scope.row)">{{ scope.row.clue_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="city_name"
                            label="所在地区"
                            sortable
                            align="center"
                            show-overflow-tooltip
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="school_grade"
                            label="学校等级"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="school_los"
                            label="学制"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_name"
                            align="center"
                            label="联系人姓名"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_mobile"
                            label="手机号"
                            align="center"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="professor_grade"
                            label="教授年级"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="professor_subjects"
                            label="教授科目"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_statu"
                            label="跟进状态"
                            sortable
                            align="center"
                            min-width="150"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_time"
                            label="最后跟进时间"
                            sortable
                            align="center"
                            min-width="180"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="140"
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
            <!-- 机构表格 -->
            <template>
                <div :class="{hide:mechanismTable}">
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
                            prop="clue_name"
                            align="center"
                            label="学校名称"
                            fixed
                            show-overflow-tooltip
                            min-width="130"
                        >
                            <template slot-scope="scope">
                            <span class="colorBlue"
                                  @click="openClueInfo(scope.$index, scope.row)">{{ scope.row.clue_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="city_name"
                            label="所在地区"
                            sortable
                            align="center"
                            show-overflow-tooltip
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="type"
                            label="机构类型"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="定位"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_name"
                            align="center"
                            label="联系人姓名"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_mobile"
                            label="手机号"
                            align="center"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="department_name"
                            label="部门"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="post"
                            label="职务"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_statu"
                            label="跟进状态"
                            sortable
                            align="center"
                            min-width="150"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_time"
                            label="最后跟进时间"
                            sortable
                            align="center"
                            min-width="180"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="140"
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
            <!-- 教师表格 -->
            <template>
                <div :class="{hide:teacherTable}">
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
                            prop="contacts_name"
                            align="center"
                            label="教师名称"
                            fixed
                            show-overflow-tooltip
                            min-width="130"
                        >
                            <template slot-scope="scope">
                            <span class="colorBlue"
                                  @click="openClueInfo(scope.$index, scope.row)">{{ scope.row.contacts_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_mobile"
                            label="手机号"
                            align="center"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="city_name"
                            label="学校地区"
                            sortable
                            align="center"
                            show-overflow-tooltip
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="clue_name"
                            label="学校名称"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="school_grade"
                            label="学校等级"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="school_los"
                            label="学制"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column
                            prop="professor_grade"
                            label="教授年级"
                            min-width="150"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="professor_subjects"
                            label="教授科目"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_statu"
                            label="跟进状态"
                            sortable
                            align="center"
                            min-width="150"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_time"
                            label="最后跟进时间"
                            sortable
                            align="center"
                            min-width="180"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="140"
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
            <!-- 学生表格 -->
            <template>
                <div :class="{hide:studentTable}">
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
                            prop="from_type"
                            label="来源类型"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="cue_source"
                            label="线索来源"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="student_name"
                            align="center"
                            label="学生名称"
                            fixed
                            show-overflow-tooltip
                            min-width="130"
                        >
                            <template slot-scope="scope">
                            <span class="colorBlue"
                                  @click="openClueInfo(scope.$index, scope.row)">{{ scope.row.student_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="student_sex"
                            label="学生性别"
                            sortable
                            align="center"
                            show-overflow-tooltip
                            min-width="120"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contacts_name"
                            label="家长姓名"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_relationship"
                            label="关系"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="contacts_mobile"
                            label="家长手机号"
                            align="center"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="city_name"
                            align="center"
                            label="学校地区"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="school_name"
                            label="学校名称"
                            min-width="150"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="school_grade"
                            label="学校等级"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="the_science"
                            label="文理科"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="student_grade"
                            label="年级"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>

                        <el-table-column
                            prop="followup_statu"
                            label="跟进状态"
                            sortable
                            align="center"
                            min-width="150"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followup_time"
                            label="最后跟进时间"
                            sortable
                            align="center"
                            min-width="180"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center"
                            width="140"
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
        <!-- 弹窗 -->
        <!-- 添加线索 -->
        <template>
            <div class="dialogWrap">
                <el-dialog
                    title="新增线索"
                    :visible.sync="dialogVisible"
                >
                    <div style="width:100%">
                        <el-row>
                            <span class="iptName">线索来源:</span>
                            <el-select v-model="addClueData.sourceTypeValue" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.source.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-row>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">线索类型:</span>
                        <el-select v-model="addClueData.clueType" @change="addClueTypeChange" placeholder="请选择">
                            <el-option
                                v-for="item in clueTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <!-- 自定义内容 -->

                    <!-- 学校显示 -->
                    <div :class="{hide:addClueData.schoolTable}">
                        <div>
                            <span class="iptName">学校名称:</span>
                            <el-input v-model="addClueData.schoolName" placeholder="请输入内容"></el-input>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">学制:</span>
                            <el-select v-model="addClueData.academicSystem" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.academicSystem.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">等级:</span>
                            <el-select v-model="addClueData.schoolLevel" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.schoolLevel.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="iptName">联系人姓名:</span>
                            <el-input v-model="addClueData.contactName" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            <span class="iptName">职务:</span>
                            <el-input v-model="addClueData.contactPosition" placeholder="请输入内容"></el-input>
                        </div>
                    </div>

                    <!-- 机构显示 -->
                    <div :class="{hide:addClueData.mechanismTable}">
                        <div>
                            <span class="iptName">机构名称:</span>
                            <el-input v-model="addClueData.schoolName" placeholder="请输入内容"></el-input>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">类型:</span>
                            <el-select v-model="addClueData.organizationType" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.organizationType.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">定位:</span>
                            <el-select v-model="addClueData.positioning" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.positioning.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="iptName">联系人姓名:</span>
                            <el-input v-model="addClueData.contactName" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            <span class="iptName">职务:</span>
                            <el-input v-model="addClueData.contactPosition" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <!-- 教师显示 -->
                    <div :class="{hide:addClueData.teacherTable}">
                        <div>
                            <span class="iptName">教师名称:</span>
                            <el-input v-model="addClueData.teacherName" placeholder="请输入内容"></el-input>
                        </div>
                         <div>
                            <span class="iptName">职务:</span>
                            <el-input v-model="addClueData.contactPosition" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            <span class="iptName">学校名称:</span>
                            <el-input v-model="addClueData.schoolName" placeholder="请输入内容"></el-input>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">教授年级:</span>
                            <el-select v-model="addClueData.grade" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.grade.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">教授科目:</span>
                            <el-select v-model="addClueData.professorSubjects" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.professorSubjects.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">学校等级:</span>
                            <el-select v-model="addClueData.schoolLevel" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.schoolLevel.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">学制:</span>
                            <el-select v-model="addClueData.academicSystem" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.academicSystem.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <!-- 学生显示 -->
                    <div :class="{hide:addClueData.studentTable}">
                        <div>
                            <span class="iptName">学生名称:</span>
                            <el-input v-model="addClueData.studentName" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            <span class="iptName">学校名称:</span>
                            <el-input v-model="addClueData.schoolName" placeholder="请输入内容"></el-input>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">性别:</span>
                            <el-select v-model="addClueData.sex" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.sex.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">文理科:</span>
                            <el-select v-model="addClueData.artsAndSciences" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.artsAndSciences.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">年级:</span>
                            <el-select v-model="addClueData.grade" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.grade.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="width:100%">
                            <span class="iptName">学校等级:</span>
                            <el-select v-model="addClueData.schoolLevel" placeholder="请选择">
                                <el-option
                                    v-for="item in typeList.schoolLevel.content"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <span class="iptName">家长姓名:</span>
                            <el-input v-model="addClueData.contactName" placeholder="请输入内容"></el-input>
                        </div>
                        <div>
                            <span class="iptName">家长职务:</span>
                            <el-input v-model="addClueData.contactPosition" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <!-- 自定义内容 -->


                    <!-- 以下为固定内容, 每个类型的线索都应该填写 -->
                    <div style="width:100%">
                        <span class="iptName">所在地:</span>
                        <el-cascader
                            expand-trigger="hover"
                            :value="addClueData.selectCityData"
                            :options="cityList"
                            @change="selectCity"
                            clearable
                        >
                        </el-cascader>
                    </div>
                    <div>
                        <span class="iptName">地址:</span>
                        <el-input v-model="addClueData.address" placeholder="请输入内容"></el-input>
                    </div>

                    <div>
                        <span class="iptName">手机:</span>
                        <el-input v-model="addClueData.contactPhone" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">电话:</span>
                        <el-input v-model="addClueData.contactTel" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">微信:</span>
                        <el-input v-model="addClueData.contactWeixin" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">QQ:</span>
                        <el-input v-model="addClueData.contactQq" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">邮箱:</span>
                        <el-input v-model="addClueData.contactEmail" placeholder="请输入内容"></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="submitClue">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "clue",
        data() {
            return {
                addClueData: {
                    clueType: '1',
                    sourceTypeValue: '全部',
                    schoolName: '',
                    academicSystem: '全部',
                    schoolLevel: '全部',
                    selectCityData: [],
                    address: '',
                    contactName: '',
                    contactPosition: '',
                    contactPhone: '',
                    contactTel: '',
                    contactWeixin: '',
                    contactQq: '',
                    contactEmail: '',
                    // 机构类型
                    organizationType: '',
                    // 定位
                    positioning: '',
                    teacherName: '',
                    // 教授科目
                    professorSubjects: '',
                    // 教授年级
                    grade: '',
                    // 学制
                    academicSystem: '',
                    // 学校等级
                    schoolLevel: '',
                    // 文理科
                    artsAndSciences: '',
                    sex: '',
                    // 学生姓名
                    studentName: '',
                    schoolTable: false,
                    mechanismTable: true,
                    teacherTable: true,
                    studentTable: true,
                    // 选中行
                    multipleSelection: []
                },

                dialogShow: {
                    schoolShow: false,
                    organizationShow: true,
                    teacherShow: true,
                    studentShow: true,
                },
                value: '第一学',
                input: '圈,',
                // 新增线索对话框
                dialogVisible: false,
                selectedItems: [],
                // 线索类型
                clueType: 1,
                // 范围选中内容
                selectRangeItem: 1,
                // 范围
                parentCompanyList: [],
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
                // 当前公司部门
                currentCompanyDepartment: [],
                // 当前公司下的部门
                parentCompanyDepartment: [],
                // 当前部门员工列表
                currentDepartmentStaff: [],
                filterTime: {
                      // 最后跟进时间
                    lastFollowUpTime: '',
                    // 更新时间
                    updateTime: '',
                    // 新建时间
                    createTime: '',
                },
                // 城市选择器数据
                cityList: [],
                // 选中城市数据
                selectCityData: [],
                // 各项数据
                typeList: {
                    // 学校等级
                    'schoolLevel': {
                        'key': '全部',
                        'title': '学校等级',
                        'value': '',
                        'show': false,
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '市重点'
                        }, {
                            value: '2',
                            label: '区重点'
                        }]
                    },
                    // 学制
                    'academicSystem': {
                        'key': '全部',
                        'title': '学制',
                        'value': '',
                        'show': false,
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '初中'
                        }, {
                            value: '2',
                            label: '高中'
                        }, {
                            value: '3',
                            label: '初中+高中'
                        }]
                    },// 学制
                    'professor_grade': {
                        'key': '全部',
                        'title': '教授年级',
                        'value': '',
                        'show': false,
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '初中'
                        }, {
                            value: '2',
                            label: '高中'
                        }, {
                            value: '3',
                            label: '初中+高中'
                        }]
                    },
                    // 跟进状态
                    'followUpStatus': {
                        'key': '全部',
                        'title': '跟进状态',
                        'value': '',
                        'show': true,
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '未处理'
                        }, {
                            value: '2',
                            label: '联系方式有效'
                        }, {
                            value: '3',
                            label: '联系方式无效'
                        }]
                    },
                    // 来源
                    'source': {
                        'key': '全部',
                        'title': '来源',
                        'show': true,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '高招',
                            label: '高招'
                        }, {
                            value: '我在',
                            label: '我在'
                        }, {
                            value: '搜索引擎',
                            label: '搜索引擎'
                        }, {
                            value: '微信',
                            label: '微信'
                        }, {
                            value: '客户介绍',
                            label: '客户介绍'
                        }]
                    },
                    // 机构类型
                    'organizationType': {
                        'key': '全部',
                        'title': '机构类型',
                        'show': false,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '大型',
                            label: '大型'
                        }, {
                            value: '中型',
                            label: '中型'
                        }, {
                            value: '小型',
                            label: '小型'
                        }]
                    },
                    // 定位
                    'positioning': {
                        'key': '全部',
                        'title': '定位',
                        'value': '',
                        'show': false,
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: 'K12'
                        }, {
                            value: '2',
                            label: '英语'
                        }, {
                            value: '3',
                            label: '出国'
                        }]
                    },
                    // 教授科目
                    'professorSubjects': {
                        'key': '全部',
                        'title': '教授科目',
                        'show': false,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '语文'
                        }, {
                            value: '2',
                            label: '数学'
                        }, {
                            value: '3',
                            label: '外语'
                        }, {
                            value: '4',
                            label: '物理'
                        }, {
                            value: '5',
                            label: '化学'
                        }]
                    },
                    // 文理科
                    'artsAndSciences': {
                        'key': '全部',
                        'title': '文理科',
                        'show': false,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '文科'
                        }, {
                            value: '2',
                            label: '理科'
                        }]
                    },
                    // 年级
                    'grade': {
                        'key': '全部',
                        'title': '年级',
                        'show': false,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '初一'
                        }, {
                            value: '2',
                            label: '初二'
                        }, {
                            value: '3',
                            label: '初三'
                        }, {
                            value: '4',
                            label: '高一'
                        }, {
                            value: '5',
                            label: '高二'
                        }, {
                            value: '6',
                            label: '高三'
                        }]
                    },
                    // 性别
                    'sex': {
                        'key': '全部',
                        'title': '性别',
                        'show': false,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '男'
                        }, {
                            value: '2',
                            label: '女'
                        }]
                    },
                    // 来源类型
                    'sourceType': {
                        'key': '全部',
                        'title': '来源类型',
                        'show': false,
                        'value': '',
                        'content': [{
                            value: '',
                            label: '全部'
                        }, {
                            value: '1',
                            label: '线索'
                        }, {
                             value: '2',
                             label: '客户'
                         }, {
                              value: '3',
                              label: '手录'
                          }]
                    }
                },
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

                // 表格数据
                tableData: [],
                // 表格搜索下拉框
                options: [
                    {
                        label: '第一学',
                        value: 1
                    }, {
                        label: '第二学',
                        value: 2
                    }, {
                        label: '第三学',
                        value: 3
                    }
                ],
                // 表格搜索下拉框选择
                optionsValue: 2,
                // 搜索框内容
                searchIptValue: '',
                // 学校线索
                schoolClue: {},
                // 来源类型
                sourceTypeValue: '全部',
                sourceTypeOptions: [
                    {
                        label: '全部',
                        value: '1'
                    }, {
                        label: '高招',
                        value: '2'
                    }, {
                        label: '我在',
                        value: '3'
                    }, {
                        label: '搜索引擎',
                        value: '4'
                    }, {
                        label: '微信',
                        value: '5'
                    }, {
                        label: '客户介绍',
                        value: '6'
                    }
                ],
                // 线索类型
                clueTypeOptions: [
                    {
                        label: '学校',
                        value: '1'
                    }, {
                        label: '机构',
                        value: '2'
                    }, {
                        label: '教师',
                        value: '3'
                    }, {
                        label: '学生',
                        value: '4'
                    }
                ],
                // 学校等级解析数组
                schoolLevelArr: ['市重点', '区重点'],
                // 学制解析数组, 教授年级解析数组
                academicSystemArr: ['初中', '高中', '初中+高中'],
                // 定位解析数组
                positionArr: ['K12', '英语', '出国'],
                // 教授科目解析数组
                professorSubjectsArr: ['语文', '英语', '数学', '物理', '化学'],
                // 年级解析数组
                studentGradeArr: ['初一', '初二', '初三', '高一', '高二', '高三']

            }
        },
        methods: {
          // 删除线索
                delLogItem() {
                     let arr = [];
                     for (let i = 0; i < this.multipleSelection.length; i++) {
                            this.tableData = this.tableData.filter((value) => {
                                return value.clue_id != this.multipleSelection[i].clue_id
                            })
                            arr.push(this.multipleSelection[i].clue_id)
                        }

                           this.$axios({
                                       method: 'POST',
                                       withCredentials: false,
                                       url: '/api/clue/deleteStudentClues',
                                       data: {
                                           token: localStorage.getItem('crm_token'),
                                           clueIds: JSON.stringify(arr),
                                       }
                                   })
                                       .then(function (res) {
                                           if (res.data.code == 200) {

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
            addClueTypeChange(data) {
                this.addClueData.clueType = data;
                if (data == 1) {
                    // 学校
                    this.addClueData.schoolTable = false
                    this.addClueData.mechanismTable = true
                    this.addClueData.teacherTable = true
                    this.addClueData.studentTable = true
                } else if (data == 2) {
                    // 机构
                    this.addClueData.schoolTable = true
                    this.addClueData.mechanismTable = false
                    this.addClueData.teacherTable = true
                    this.addClueData.studentTable = true
                } else if (data == 3) {
                    // 教师
                    this.addClueData.schoolTable = true
                    this.addClueData.mechanismTable = true
                    this.addClueData.teacherTable = false
                    this.addClueData.studentTable = true
                } else {
                    // 学生
                    this.addClueData.schoolTable = true
                    this.addClueData.mechanismTable = true
                    this.addClueData.teacherTable = true
                    this.addClueData.studentTable = false
                }
            },
            // 线索详情
            openClueInfo(index, data) {
                // 跳转到线索详情的页面
                this.$router.push({path: '/clue/clueInfo',query:{data:data,clueType:this.clueType}})
            },
            // 更新时间
            timeUpdata(data) {
                this.filterClue();
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
                            // console.log('报错数据:'+JSON.stringify(res.data.data.list));
                            // console.log('数据格式:'+ typeof res.data.data.list);
                            self.getMenuName(res.data.data.list)
                            self.parentCompanyList = res.data.data.list;
                            self.mother_id = localStorage.getItem('motherCompanyId');
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
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
                        mother_id: self.mother_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            // 当前母公司下的部门 parentCompanyDepartment
                            // console.log(JSON.stringify(res.data.data,null,4))
                            // console.log(self.mother_id)
                            self.getMenuName(res.data.data.list)
                            self.currentCompanyDepartment = res.data.data.list
                        } else {
                            alert(res.data.msg)
                        }
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
                            self.getMenuName(res.data.data.list)
                            self.currentCompanyDepartment = res.data.data.list
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
            // 子公司/ 母公司/ 加盟商修改
            bigRangeChange(data) {
                this.selectRangeItem = data;
                // if (data === 2) {
                //     // 获取子公司
                //     this.applyCompany();
                // }
                this.filterClue();
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
            // 线索类型--筛查条件
            clueTypeChange(data) {
                console.log(data)
                if (data === '学校' || data == 1) {
                    // 显示 学校等级, 学制
                    this.typeList.schoolLevel.show = true;
                    this.typeList.academicSystem.show = true;

                    this.typeList.artsAndSciences.show = false;
                    this.typeList.grade.show = false;
                    this.typeList.organizationType.show = false;
                    this.typeList.sex.show = false;
                    this.typeList.sourceType.show = false;
                    this.typeList.positioning.show = false;
                    this.typeList.professorSubjects.show = false;

                } else if (data === '机构' || data == 2) {
                    // 显示 机构类型, 定位

                    this.typeList.positioning.show = true;
                    this.typeList.organizationType.show = true;

                    this.typeList.schoolLevel.show = false;
                    this.typeList.academicSystem.show = false;
                    this.typeList.artsAndSciences.show = false;
                    this.typeList.grade.show = false;
                    this.typeList.sex.show = false;
                    this.typeList.sourceType.show = false;
                    this.typeList.professor_grade.show = false;

                    this.typeList.professorSubjects.show = false;
                } else if (data === '教师' || data == 3) {
                    // 学校等级, 教授科目, 教授年级(学制)
                    this.typeList.professorSubjects.show = true;
                    this.typeList.schoolLevel.show = true;
                    this.typeList.professor_grade.show = true;

                    this.typeList.academicSystem.show = false;
                    this.typeList.positioning.show = false;
                    this.typeList.organizationType.show = false;
                    this.typeList.artsAndSciences.show = false;
                    this.typeList.grade.show = false;
                    this.typeList.sex.show = false;
                    this.typeList.sourceType.show = false;


                } else if (data === '学生' || data == 4) {
                    // 学校等级, 文理科, 年级, 学生性别, 来源类型

                    this.typeList.schoolLevel.show = true;
                    this.typeList.artsAndSciences.show = true;
                    this.typeList.grade.show = true;
                    this.typeList.sex.show = true;
                    this.typeList.sourceType.show = true;
                    this.typeList.academicSystem.show = false;

                    this.typeList.positioning.show = false;
                    this.typeList.organizationType.show = false;
                    this.typeList.professorSubjects.show = false;
                    this.typeList.professor_grade.show = false;


                } else {

                }
                this.filterClue();
            },
            filterClue() {
                console.log('筛选表格数据')
                // 筛选表格数据
                // console.log(this.clueType)
                let self = this;
                for (const key in self.filterTime) {
                    if (self.filterTime.hasOwnProperty(key)) {
                        let element = self.filterTime[key];
                        if (element == null) {
                            self.filterTime[key] = "";
                        }
                    }
                }
                let token = localStorage.getItem('crm_token');
                let obj = {
                    // token: localStorage.getItem('crm_token'),
                    // page_num: "",
                    // type: "",
                    // followup_start: self.lastFollowUpTime[0],
                    // followup_end: self.lastFollowUpTime[1],
                    // update_start: self.updateTime[0],
                    // update_end: self.updateTime[1],
                    // create_start: self.createTime[0],
                    // create_end: self.createTime[1],
                    // children_id: "",
                    // department_id: "",
                    // user_id: "",
                    // province_id: self.selectCityData[0],
                    // city_id: self.selectCityData[1],
                    // area_id: self.selectCityData[2],
                    // cue_source: self.typeList.source,
                    // followup_statu: self.typeList.followUpStatus,
                    // cue_type: "1",
                    // name: "",
                    // grade: self.typeList.grade,
                    // los: self.typeList.academicSystem,
                    // type: self.typeList.organizationType,
                    // area_id: "",
                    // location: self.typeList.positioning,
                    // professor_grade: self.typeList.organizationType,
                    // professor_subjects: self.typeList.professorSubjects,
                    // the_science: self.typeList.artsAndSciences,
                    // student_grade: self.typeList.grade,
                    // sex: self.typeList.sex,
                };
                if (self.clueType == 1) {
                    // 学校   学校等级, 学制, 跟进状态, 来源
                    obj = {
                        token: token,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        grade: self.typeList.schoolLevel.value,
                        los: self.typeList.academicSystem.value,
                    }
                } else if (self.clueType == 2) {
                    // 机构   机构类型, 定位, 跟进状态, 来源
                    obj = {
                        token: token,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        type: self.typeList.organizationType.value,
                        location: self.typeList.positioning.value,

                    }
                } else if (self.clueType == 3) {
                    // 教师   学校等级, 教授年级, 教授科目, 跟进状态, 来源
                    obj = {
                        token: token,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        grade: self.typeList.schoolLevel.value,
                        professor_grade: self.typeList.professor_grade.value,
                        professor_subjects: self.typeList.professorSubjects.value,


                    }
                } else if (self.clueType == 4) {
                    // 学生   学校等级, 文理科, 年级, 性别, 来源类型, 跟进状态 来源
                    obj = {
                        token: token,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        grade: self.typeList.schoolLevel.value,
                        the_science: self.typeList.artsAndSciences.value,
                        student_grade: self.typeList.grade.value,
                        sex: self.typeList.sex.value,
                        from_type: self.typeList.sourceType.value
                    }
                } else {

                }
                console.log('请求参数:'+JSON.stringify(obj,null,4))
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/getClueList',
                    data: obj
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            // console.log('返回参数:');
                            console.log('返回参数:'+JSON.stringify(res.data,null,4));
                            for (var i = 0; i < res.data.data.list.length; i++) {
                                var obj = res.data.data.list[i];
                                obj.school_grade = self.schoolLevelArr[obj.school_grade - 1]
                                obj.school_los = self.academicSystemArr[obj.school_los - 1]

                                obj.location = self.positionArr[obj.location - 1]

                                obj.professor_grade = self.academicSystemArr[obj.professor_grade - 1]
                                obj.professor_subjects = self.professorSubjectsArr[obj.professor_subjects - 1]
                                obj.student_grade = self.studentGradeArr[obj.student_grade - 1]
                                obj.student_sex = obj.student_sex === 1 ? "男" : "女";
                                //   1未处理   2联系方式有效   3联系方式无效  4已完结
                                 if (obj.followup_statu === 1)
                                  {
                                         obj.followup_statu =  "未处理"
                                   }else if(obj.followup_statu === 2) {
                                      obj.followup_statu =  "联系方式有效"
                                    }else if(obj.followup_statu === 3) {
                                       obj.followup_statu =  "联系方式无效"
                                    }else if(obj.followup_statu === 4) {
                                         obj.followup_statu =  "已完结"
                                    }
                                 if (obj.of_level === 1)
                                  {
                                         obj.from_type =  "手录"
                                   }else{
                                        if (obj.sourceType === 1) {
                                          obj.from_type =  "线索"
                                        }else if(obj.sourceType === 2) {
                                          obj.from_type =  "客户"
                                        }
                                   }
                                obj.the_science = obj.the_science === 1 ? "文科" : "理科";
                                for (let key in obj) {
                                    if (obj[key] == null) {
                                        obj[key] = '-'
                                    }
                                }
                            }
                            self.tableData = res.data.data.list
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            //导出
             exportData() {
                console.log('筛选表格数据')
                // 筛选表格数据
                // console.log(this.clueType)
                let self = this;
                for (const key in self.filterTime) {
                    if (self.filterTime.hasOwnProperty(key)) {
                        let element = self.filterTime[key];
                        if (element == null) {
                            self.filterTime[key] = "";
                        }
                    }
                }
                let token = localStorage.getItem('crm_token');
                let obj = {

                };
                if (self.clueType == 1) {
                    // 学校   学校等级, 学制, 跟进状态, 来源
                    obj = {
                        token: token,
                        statutype: 1,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        grade: self.typeList.schoolLevel.value,
                        los: self.typeList.academicSystem.value,
                    }
                } else if (self.clueType == 2) {
                    // 机构   机构类型, 定位, 跟进状态, 来源
                    obj = {
                        token: token,
                        page_num: "",
                        statutype: 1,
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        type: self.typeList.organizationType.value,
                        location: self.typeList.positioning.value,

                    }
                } else if (self.clueType == 3) {
                    // 教师   学校等级, 教授年级, 教授科目, 跟进状态, 来源
                    obj = {
                        token: token,
                        statutype: 1,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        grade: self.typeList.schoolLevel.value,
                        professor_grade: self.typeList.professor_grade.value,
                        professor_subjects: self.typeList.professorSubjects.value,


                    }
                } else if (self.clueType == 4) {
                    // 学生   学校等级, 文理科, 年级, 性别, 来源类型, 跟进状态 来源
                    obj = {
                        token: token,
                        statutype: 1,
                        page_num: "",
                        typebig: self.selectRangeItem,
                        followup_start: self.filterTime.lastFollowUpTime[0],
                        followup_end: self.filterTime.lastFollowUpTime[1],
                        update_start: self.filterTime.updateTime[0],
                        update_end: self.filterTime.updateTime[1],
                        create_start: self.filterTime.createTime[0],
                        create_end: self.filterTime.createTime[1],
                        children_id: self.children_id,
                        department_id: self.department_id,
                        user_id: self.employees_id,
                        province_id: self.selectCityData[0],
                        city_id: self.selectCityData[1],
                        area_id: self.selectCityData[2],
                        cue_type: self.clueType,
                        name: "",

                        cue_source: self.typeList.source.value,
                        followup_statu: self.typeList.followUpStatus.value,
                        grade: self.typeList.schoolLevel.value,
                        the_science: self.typeList.artsAndSciences.value,
                        student_grade: self.typeList.grade.value,
                        sex: self.typeList.sex.value,
                        from_type: self.typeList.sourceType.value
                    }
                } else {

                }
                console.log('请求参数:'+JSON.stringify(obj,null,4))
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/getClueList',
                    data: obj
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
            // 类型转变
            radioChange(data) {
                for (var i = 0; i < this.typeList[data].content.length; i++) {
                    var obj = this.typeList[data].content[i];
                    if (obj.label == this.typeList[data].key) {
                        this.typeList[data].value = obj.value
                        break;
                    }
                }
                console.log('更改选项:'+this.typeList[data].key + ":" + this.typeList[data].value);
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
                        // objrr = [];
                        self.cityList = res.data.data.list;
                        localStorage.setItem('cityData', JSON.stringify(res.data.data.list))
                        // console.log(JSON.stringify(res.data.data.list));
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 点击级联选择器选择城市
            selectCity(data) {
                console.log(data)
                if (this.dialogVisible) {
                    // 如果dialogVisible === true 说明, 对话框显示, 是新增线索,
                    // 否者就是筛选线索
                    this.addClueData.selectCityData = data
                } else {
                    this.selectCityData = data;
                    this.filterClue();
                }
            },
            //
             // 单选删除线索
             showModelTable(index,data,flag) {
                if(flag == 'deleteBtn'){
                  let paramObj = {};
                  //  console.log(data);
                    let self = this;
                       paramObj = {
                         token: localStorage.getItem('crm_token'),
                         clue_id: data.clue_id,
                         }
                        console.log('提交线索参数:'+JSON.stringify(paramObj,null,4))
                         self.$axios({
                             method: 'POST',
                             withCredentials: false,
                             url: '/api/clue/deleteClue',
                             data: paramObj
                         })
                             .then(function (res) {
                                 if (res.data.code == 200) {
                                     console.log('删除成功:'+ res.data.data.list.clue_id +'-'+ res.data.data.list.update_time)
                                 } else {
                                     alert(res.data.msg)
                                 }
                             })
                             .catch(function (err) {
                                 console.log(err);
                             });
                }else if(flag == 'handover'){

                }

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
            // 新增线索按钮
            addClue() {
                this.dialogVisible = true;
                console.log(JSON.stringify(this.addClueData,null,4))
            },
            // 提交线索
            submitClue() {
                this.dialogVisible = false
                console.log('新增线索')
                let paramObj = {};
                let self = this;
                // 判断当前线索类型
                if (this.addClueData.clueType == "1") {
                    paramObj = {
                        token: localStorage.getItem('crm_token'),
                        cue_source: self.addClueData.sourceTypeValue,
                        cue_type: self.addClueData.clueType,
                        name: self.addClueData.schoolName,
                        los: self.addClueData.academicSystem,
                        grade: self.addClueData.schoolLevel,
                        province_id: self.addClueData.selectCityData[0],
                        city_id: self.addClueData.selectCityData[1],
                        area_id: self.addClueData.selectCityData[2],
                        address: self.addClueData.address,
                        contacts_name: self.addClueData.contactName,
                        contacts_post: self.addClueData.contactPosition,
                        contacts_mobile: self.addClueData.contactPhone,
                        contacts_telephone: self.addClueData.contactTel,
                        contacts_wechat: self.addClueData.contactWeixin,
                        contacts_qq: self.addClueData.contactQq,
                        contacts_email: self.addClueData.contactEmail,
                    }
                } else if (this.addClueData.clueType == "2"){
                    paramObj = {
                         token: localStorage.getItem('crm_token'),
                        cue_source: self.addClueData.sourceTypeValue,
                        cue_type: self.addClueData.clueType,
                        name: self.addClueData.schoolName,
                        type: self.addClueData.organizationType,
                        location: self.addClueData.positioning,

                        province_id: self.addClueData.selectCityData[0],
                        city_id: self.addClueData.selectCityData[1],
                        area_id: self.addClueData.selectCityData[2],
                        address: self.addClueData.address,
                        contacts_name: self.addClueData.contactName,
                        contacts_post: self.addClueData.contactPosition,
                        contacts_mobile: self.addClueData.contactPhone,
                        contacts_telephone: self.addClueData.contactTel,
                        contacts_wechat: self.addClueData.contactWeixin,
                        contacts_qq: self.addClueData.contactQq,
                        contacts_email: self.addClueData.contactEmail,
                    }
                } else if (this.addClueData.clueType == "3"){
                    paramObj = {
                       token: localStorage.getItem('crm_token'),
                        cue_source: self.addClueData.sourceTypeValue,
                        cue_type: self.addClueData.clueType,
                        name: self.addClueData.schoolName,


                        los: self.addClueData.academicSystem,
                        grade: self.addClueData.schoolLevel,
                        // professor_grade

                        contacts_professor_grade: self.addClueData.grade,
                        contacts_professor_subjects: self.addClueData.professorSubjects,

                        province_id: self.addClueData.selectCityData[0],
                        city_id: self.addClueData.selectCityData[1],
                        area_id: self.addClueData.selectCityData[2],
                        address: self.addClueData.address,
                        contacts_name: self.addClueData.teacherName,
                        contacts_post: self.addClueData.contactPosition,
                        contacts_mobile: self.addClueData.contactPhone,
                        contacts_telephone: self.addClueData.contactTel,
                        contacts_wechat: self.addClueData.contactWeixin,
                        contacts_qq: self.addClueData.contactQq,
                        contacts_email: self.addClueData.contactEmail,
                    }
                } else {
                    paramObj = {
                       token: localStorage.getItem('crm_token'),
                        cue_source: self.addClueData.sourceTypeValue,
                        cue_type: self.addClueData.clueType,
                        name: self.addClueData.studentName,
                        the_science: self.addClueData.artsAndSciences,
                        sex: self.addClueData.sex,
                        school_name: self.addClueData.schoolName,

                        // los: self.addClueData.academicSystem,
                        grade: self.addClueData.schoolLevel,
                        student_grade: self.addClueData.grade,

                        province_id: self.addClueData.selectCityData[0],
                        city_id: self.addClueData.selectCityData[1],
                        area_id: self.addClueData.selectCityData[2],
                        address: self.addClueData.address,
                        contacts_name: self.addClueData.contactName,
                        contacts_post: self.addClueData.contactPosition,
                        contacts_mobile: self.addClueData.contactPhone,
                        contacts_telephone: self.addClueData.contactTel,
                        contacts_wechat: self.addClueData.contactWeixin,
                        contacts_qq: self.addClueData.contactQq,
                        contacts_email: self.addClueData.contactEmail,
                    }
                }
                console.log('提交线索参数:'+JSON.stringify(paramObj,null,4))
                let objFlag = 1;
                for (const key in paramObj) {
                    if (!paramObj[key]) {
                        objFlag = 0;
                    }
                }
                console.log(objFlag)
                if (objFlag) {
                    self.$axios({
                        method: 'POST',
                        withCredentials: false,
                        url: '/api/clue/applyClue',
                        data: paramObj
                    })
                    .then(function (res) {
                        if (res.data.code == 200) {
                            self.$message({
                                message: '添加线索成功',
                                type: 'success'
                            })
                            self.filterClue();
                        } else {
                           
                            self.$message.error(res.data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                } else {
                    self.$message.error('请完善参数');
                }
            }
        },
        
        created() {
            this.applyCompany();
            this.filterClue();

            this.typeList.schoolLevel.show = true;
            this.typeList.academicSystem.show = true;
            if (localStorage.getItem('cityData')) {
                console.log('有缓存')
                this.cityList = JSON.parse(localStorage.getItem('cityData'))
            } else {
                console.log('无缓存')
                this.requestCity();
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
            // 显示哪一个表格
            schoolTable() {
                if (this.clueType == 1) {
                    this.addClueData.clueType = "1"
                    this.addClueData.schoolTable = false
                    // 学校表格显示
                    return false
                } else {
                    this.addClueData.schoolTable = true
                    return true
                }
            },
            mechanismTable() {
                if (this.clueType == 2) {
                    // 学校表格显示
                    this.addClueData.clueType = "2"
                    this.addClueData.mechanismTable = false
                    return false
                } else {
                    this.addClueData.mechanismTable = true
                    return true
                }
            }, teacherTable() {
                if (this.clueType == 3) {
                    // 学校表格显示
                    this.addClueData.clueType = "3"
                    this.addClueData.teacherTable = false
                    return false
                } else {
                    this.addClueData.teacherTable = true
                    return true
                }
            }, studentTable() {
                if (this.clueType == 4) {
                    // 学校表格显示
                    this.addClueData.clueType = "4"
                    this.addClueData.studentTable = false
                    return false
                } else {
                    this.addClueData.studentTable = true
                    return true
                }
            },
        }
    }
</script>

<style scoped>
    @import "../css/clue.css";

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
