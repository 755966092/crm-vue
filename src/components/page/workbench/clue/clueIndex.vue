<template>
    <div class="componentsRoot clueWrap">
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
            <el-col :span="3">
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
                    <el-select v-model="selectRangeItem" slot="prepend" placeholder="请选择">
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
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="parentCompanyList"
                        @change="handleChange"
                        :disabled="rangeFlag"
                        :show-all-levels=false
                        filterable
                        change-on-select
                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="currentCompanyDepartment"
                        @change="handleChange"
                        :show-all-levels=false

                        filterable
                        change-on-select
                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="currentDepartmentStaff"
                        @change="handleChange"
                        :show-all-levels=false
                        filterable
                        change-on-select
                    >
                    </el-cascader>
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
                                                 :label="children.text"></el-radio-button>
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
                                         :label="children.text"></el-radio-button>
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
                                         :label="children.text"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <!-- 地区 -->
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">地区</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-cascader expand-trigger="hover" :value="selectCityData" :options="cityList" @change="selectCity">
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
                            v-model="lastFollowUpTime"
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
                            v-model="updateTime"
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
                            v-model="createTime"
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
        <router-view ></router-view>
        <!-- 数据表格 -->
        <div>
            <div class="tableTitle">
                <el-row>
                    <el-col :span="10">
                        <el-button type="text" @click="addClue">新增线索</el-button>
                        <el-button type="text">导入线索</el-button>
                        <el-button type="text" style="color: #999">批量转移</el-button>
                        <el-button type="text" style="color: #999">批量删除</el-button>
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
            <template>
                <div>
                    <el-table
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        border

                    >
                        <el-table-column
                            type="selection"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="ctitle"

                            align="center"
                            label="机构名称"
                            fixed
                            show-overflow-tooltip
                            min-width="130"
                        >

                            <template slot-scope="scope">
                            <span class="colorBlue"
                                  @click="openClueInfo(scope.$index, scope.row)">{{ scope.row.ctitle }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="cadd"
                            label="所在地区"
                            sortable
                            align="center"
                            show-overflow-tooltip
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="ctype"
                            label="机构类型"
                            sortable
                            min-width="120"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="position"
                            label="定位"
                            sortable
                            align="center"
                            min-width="120"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="canme"
                            align="center"
                            label="联系人姓名"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号"
                            align="center"
                            min-width="130"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="department"
                            label="部门"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="positionPerple"
                            label="职务"
                            min-width="100"
                            align="center"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="followUp"
                            label="跟进状态"
                            sortable
                            align="center"
                            min-width="150"
                            show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                            prop="date"
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
        <!-- 新建员工 -->
        <template>
            <div>
                <el-dialog
                    title="新增线索"
                    :visible.sync="dialogVisible"
                >
                    <div style="width:100%">
                        <span class="iptName">线索类型:</span>
                        <el-select v-model="clueType" @change="clueTypeChange" placeholder="请选择">
                            <el-option
                                v-for="item in clueTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">线索来源:</span>
                        <el-select v-model="sourceTypeValue" placeholder="请选择">
                            <el-option
                                v-for="item in sourceTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                    <div>
                        <span class="iptName">名称:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">学制:</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">等级:</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">省:</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">市:</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="width:100%">
                        <span class="iptName">县:</span>
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        <span class="iptName">地址:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">联系人姓名:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">职务:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">手机:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">微信:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">QQ:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span class="iptName">邮箱:</span>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
                value:'第一学',
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
                // 范围数据
                rangeData: [{
                    label: '母公司',
                    value: 1
                },{
                    label: '子公司',
                    value: 2
                },{
                    label: '加盟商',
                    value: 3
                }],
                // 当前公司部门
                currentCompanyDepartment: [],
                // 当前部门员工列表
                currentDepartmentStaff: [],
                // 最后跟进时间
                lastFollowUpTime: '',
                // 更新时间
                updateTime: '',
                // 新建时间
                createTime: '',
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: '市重点'
                        }, {
                            value: '2',
                            text: '省重点'
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: '初中'
                        }, {
                            value: '2',
                            text: '高中'
                        }, {
                            value: '3',
                            text: '初中+高中'
                        }]
                    },// 学制
                    'professor_grade': {
                        'key': '全部',
                        'title': '教授年级',
                        'value': '',
                        'show': false,
                        'content': [{
                            value: '',
                            text: '全部'
                        }, {
                            value: '1',
                            text: '初中'
                        }, {
                            value: '2',
                            text: '高中'
                        }, {
                            value: '3',
                            text: '初中+高中'
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: '未处理'
                        }, {
                            value: '2',
                            text: '联系方式有效'
                        }, {
                            value: '3',
                            text: '联系方式无效'
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
                            text: '全部'
                        }, {
                            value: '高招',
                            text: '高招'
                        }, {
                            value: '我在',
                            text: '我在'
                        }, {
                            value: '搜索引擎',
                            text: '搜索引擎'
                        }, {
                            value: '微信',
                            text: '微信'
                        }, {
                            value: '客户介绍',
                            text: '客户介绍'
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
                            text: '全部'
                        }, {
                            value: '大型',
                            text: '大型'
                        }, {
                            value: '中型',
                            text: '中型'
                        }, {
                            value: '小型',
                            text: '小型'
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: 'K12'
                        }, {
                            value: '2',
                            text: '英语'
                        }, {
                            value: '3',
                            text: '出国'
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
                            text: '全部'
                        },{
                            value: '1',
                            text: '语文'
                        }, {
                            value: '2',
                            text: '数学'
                        }, {
                            value: '3',
                            text: '外语'
                        }, {
                            value: '4',
                            text: '物理'
                        }, {
                            value: '5',
                            text: '化学'
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
                            text: '全部'
                        },{
                            value: '1',
                            text: '文科'
                        }, {
                            value: '2',
                            text: '理科'
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: '初一'
                        }, {
                            value: '2',
                            text: '初二'
                        }, {
                            value: '3',
                            text: '初三'
                        }, {
                            value: '4',
                            text: '高一'
                        }, {
                            value: '5',
                            text: '高二'
                        }, {
                            value: '6',
                            text: '高三'
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: '男'
                        }, {
                            value: '2',
                            text: '女'
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
                            text: '全部'
                        }, {
                            value: '1',
                            text: '客户'
                        }, {
                            value: '2',
                            text: '手录'
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
                // 母公司id
                mother_id: '',
                // 表格数据
                tableData: [],
                // 表格搜索下拉框
                options: [{
                    label: '第一学',
                    value: 1
                }, {
                    label: '第二学',
                    value: 2
                }, {
                    label: '第三学',
                    value: 3
                }],
                // 表格搜索下拉框选择
                optionsValue: 2,
                // 搜索框内容
                searchIptValue: '',
                // 学校线索
                schoolClue: {

                },
                // 来源类型
                sourceTypeValue: '全部',
                sourceTypeOptions: [
                    {
                        label: '全部',
                        value: '1'
                    },{
                        label: '高招',
                        value: '2'
                    },{
                        label: '我在',
                        value: '3'
                    },{
                        label: '搜索引擎',
                        value: '4'
                    },{
                        label: '微信',
                        value: '5'
                    },{
                        label: '客户介绍',
                        value: '6'
                    }
                ],
                // 线索类型
                clueTypeOptions: [
                    {
                        label: '学校',
                        value: '1'
                    },{
                        label: '机构',
                        value: '2'
                    },{
                        label: '老师',
                        value: '3'
                    },{
                        label: '学生',
                        value: '4'
                    }
                ],
            }
        },
        computed: {},
        methods: {
            // 线索详情
            openClueInfo(index, data) {
                // 跳转到线索详情的页面
                this.$router.push({path:'/clue/clueInfo'})
            },
            // 更新时间
            timeUpdata(data) {
                console.log(data)
                console.log(this.updateTime)
                // console.log(this.lastFollowUpTime)
                // console.log(this.createTime)
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
                       // 当前用户只会有一个母公司
                        self.parentCompanyList = res.data.data.list[0].children;
                        self.mother_id = res.data.data.list[0].id
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 范围选择变化触发的事件
            handleChange(data) {
                console.log(data)
            },
            // 线索类型
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
                // 筛选表格数据
                // console.log(this.clueType)
                let self = this;
                let obj = {
                    token: localStorage.getItem('crm_token'),
                    page_num: "",
                    typebig: self.selectRangeItem,
                    followup_start: self.lastFollowUpTime[0],
                    followup_end: self.lastFollowUpTime[1],
                    update_start: self.updateTime[0],
                    update_end: self.updateTime[1],
                    create_start: self.createTime[0],
                    create_end: self.createTime[1],
                    children_id: "",
                    department_id: "",
                    user_id: "",
                    province_id: self.selectCityData[0],
                    city_id: self.selectCityData[1],
                    area_id: self.selectCityData[2],
                    cue_source: self.typeList.source.value,
                    followup_statu: self.typeList.followUpStatus.value,
                    cue_type: self.clueType,
                    name: "",
                    grade: self.typeList.schoolLevel.value,
                    los: self.typeList.academicSystem.value,
                    type: self.typeList.organizationType.value,
                    location: self.typeList.positioning.value,
                    professor_grade: self.typeList.professor_grade.value,
                    professor_subjects: self.typeList.professorSubjects.value,
                    the_science: self.typeList.artsAndSciences.value,
                    student_grade: self.typeList.grade.value,
                    sex: self.typeList.sex.value,
                    from_type: self.typeList.sourceType.value
                }
                console.log(JSON.stringify(obj,null,4))
                    // self.$axios({
                    //    method: 'POST',
                    //    withCredentials: false,
                    //    url: '/api/clue/getClueList',
                    //    data: {
                    //         token: localStorage.getItem('crm_token'),
                    //         page_num: "",
                    //         type: "",
                    //         followup_start: self.lastFollowUpTime[0],
                    //         followup_end: self.lastFollowUpTime[1],
                    //         update_start: self.updateTime[0],
                    //         update_end: self.updateTime[1],
                    //         create_start: self.createTime[0],
                    //         create_end: self.createTime[1],
                    //         children_id: "",
                    //         department_id: "",
                    //         user_id: "",
                    //         province_id: self.selectCityData[0],
                    //         city_id: self.selectCityData[1],
                    //         area_id: self.selectCityData[2],
                    //         cue_source: self.typeList.source,
                    //        followup_statu: self.typeList.followUpStatus,
                    //        cue_type: "1",
                    //        name: "",
                    //         grade: self.typeList.grade,
                    //         los: self.typeList.academicSystem,
                    //         type: self.typeList.organizationType,
                    //         area_id: "",
                    //         location: self.typeList.positioning,
                    //         professor_grade: self.typeList.organizationType,
                    //         professor_subjects: self.typeList.professorSubjects,
                    //         the_science: self.typeList.artsAndSciences,
                    //         student_grade: self.typeList.grade,
                    //         sex: self.typeList.sex,
                    //    }
                    // })
                    // .then(function(res){
                    //     console.log(res);
                    //     })
                    // .catch(function(err){
                    //     console.log(err);
                    // });
            },
            // 类型转变
            radioChange(data) {
                for (var i = 0; i < this.typeList[data].content.length; i++) {
                    var obj = this.typeList[data].content[i];
                    if (obj.text === this.typeList[data].key) {
                        this.typeList[data].value = obj.value
                        break;
                    }
                }
                console.log(this.typeList[data].key+":"+this.typeList[data].value);
                // console.log(this.typeList[data]);
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
                        var arr = [];
                        self.cityList = res.data.data.list;
                        localStorage.setItem('cityData', JSON.stringify(res.data.data.list))
                        // console.log(JSON.stringify(res.data.data.list));
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 表格数据
            getTableData() {
                var self = this;
                self.$axios({
                    method: 'GET',
                    withCredentials: false,
                    url: 'http://localhost:8081/mock/clueTableData',
                })
                    .then(function (res) {
                        // console.log(JSON.stringify(res,null,4));
                        self.tableData = res.data
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 点击级联选择器选择城市
            selectCity(data) {
                this.selectCityData = data;
                this.filterClue();
            },
            // 表格按钮
            showModelTable() {

            },
            addClue() {
                this.dialogVisible = true;
            }
        },
        created() {
            this.getTableData();
            this.applyCompany();
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
                if(this.selectRangeItem == 1) {
                    return true
                } else {
                    return false
                }
            }
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
</style>
