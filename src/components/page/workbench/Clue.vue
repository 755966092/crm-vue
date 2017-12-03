<template>
    <div class="componentsRoot">
        <div class="wrap">
            <el-row>
                <el-col :span="3">
                    <p class="leftWrap">范围</p>
                </el-col>
                <el-col :span="21">
                    <div class="select rightWrap">
                        <el-cascader
                            expand-trigger="hover"
                            :options="parentCompanyList"
                            @change="handleChange"
                            change-on-select
                        >
                        </el-cascader>
                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="3">
                    <p class="leftWrap">线索类型</p>
                </el-col>
                <el-col :span="21">
                    <div class="select rightWrap">
                        <el-radio-group @change="clueTypeChange" v-model="clueType">
                            <el-radio-button label="学校"></el-radio-button>
                            <el-radio-button label="机构"></el-radio-button>
                            <el-radio-button label="教师"></el-radio-button>
                            <el-radio-button label="学生"></el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>
            </el-row>
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
            <el-row v-if="typeList.source.show">
                <el-col :span="3">
                    <p class="leftWrap">{{ typeList.source.title }}</p>
                </el-col>
                <el-col :span="21">
                    <div class="select rightWrap">
                        <el-radio-group
                            @change="radioChange('source')"
                            v-model="typeList.source.key">
                            <el-radio-button v-for="children in typeList.source.content" :value="children.value"
                                             :label="children.text"></el-radio-button>
                        </el-radio-group>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <p class="leftWrap">地区</p>
                </el-col>
                <el-col :span="21">
                    <div class="select rightWrap">
                        <el-cascader expand-trigger="hover" :options="cityList" @change="handleChange">
                        </el-cascader>
                    </div>
                </el-col>
            </el-row>
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
        </div>
        <!-- 数据表格 -->
        <!-- 数据表格 -->
        <div>
            <div class="tableTitle">
                <el-row>
                    <el-col :span="8">
                        <el-button type="text">新增线索</el-button>
                        <el-button type="text">导入线索</el-button>
                        <el-button type="text" style="color: #999">批量转移</el-button>
                        <el-button type="text" style="color: #999">批量删除</el-button>
                    </el-col>
                    <el-col :span="10" :offset="6">
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
                            <!--<template slot-scope="scope">-->
                            <!--<span class="colorBlue"-->
                            <!--@click="showModelTable(scope.$index, scope.row,'dialogVisible')">{{ scope.row.user_name }}</span>-->
                            <!--</template>-->
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
    </div>
</template>

<script>
    export default {
        name: "clue",
        data() {
            return {
                clueType: '学校',
                parentCompanyList: [],
                filterConditions: {},
                cityList: [],
                typeList: {
                    // 学校等级
                    'schoolLevel': {
                        'key': '全部',
                        'title': '学校等级',
                        'value': 'all',
                        'show': false,
                        'content': [{
                            value: 'all',
                            text: '全部'
                        }, {
                            value: '1',
                            text: '市重点'
                        }, {
                            value: '3',
                            text: '省重点'
                        }]
                    },
                    // 学制
                    'academicSystem': {
                        'key': '全部',
                        'title': '学制',
                        'value': 'all',
                        'show': false,
                        'content': [{
                            value: 'all',
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
                        'value': 'all',
                        'show': true,
                        'content': [{
                            value: 'all',
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
                        'value': 'all',
                        'content': [{
                            value: 'all',
                            text: '全部'
                        }, {
                            value: '1',
                            text: '高招'
                        }, {
                            value: '2',
                            text: '我在'
                        }, {
                            value: '3',
                            text: '搜索引擎'
                        }, {
                            value: '4',
                            text: '微信'
                        }, {
                            value: '5',
                            text: '客户介绍'
                        }]
                    },
                    // 机构类型
                    'organizationType': {
                        'key': '全部',
                        'title': '机构类型',
                        'show': false,
                        'value': 'all',
                        'content': [{
                            value: 'all',
                            text: '全部'
                        }, {
                            value: '1',
                            text: '大型'
                        }, {
                            value: '2',
                            text: '中型'
                        }, {
                            value: '3',
                            text: '小型'
                        }]
                    },
                    // 定位
                    'positioning': {
                        'key': '全部',
                        'title': '定位',
                        'show': false,
                        'content': [{
                            value: 'all',
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
                        'key': '语文',
                        'title': '教授科目',
                        'show': false,
                        'value': 'all',
                        'content': [{
                            value: 'all',
                            text: '语文'
                        }, {
                            value: '1',
                            text: '数学'
                        }, {
                            value: '2',
                            text: '外语'
                        }, {
                            value: '3',
                            text: '物理'
                        }, {
                            value: '3',
                            text: '化学'
                        }]
                    },
                    // 文理科
                    'artsAndSciences': {
                        'key': '文科',
                        'title': '文理科',
                        'show': false,
                        'value': 'wen',
                        'content': [{
                            value: 'wen',
                            text: '文科'
                        }, {
                            value: 'li',
                            text: '理科'
                        }]
                    },
                    // 年级
                    'grade': {
                        'key': '全部',
                        'title': '年级',
                        'show': false,
                        'value': 'all',
                        'content': [{
                            value: 'all',
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
                        'key': '男',
                        'title': '性别',
                        'show': false,
                        'value': 'nan',
                        'content': [{
                            value: 'nan',
                            text: '男'
                        }, {
                            value: 'nv',
                            text: '女'
                        }]
                    },
                    // 来源类型
                    'sourceType': {
                        'key': '全部',
                        'title': '来源类型',
                        'show': false,
                        'value': 'all',
                        'content': [{
                            value: 'all',
                            text: '全部'
                        }, {
                            value: '1',
                            text: '客户'
                        }, {
                            value: '2',
                            text: '其他线索'
                        }, {
                            value: '3',
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
                lastFollowUpTime: '',
                updateTime: '',
                createTime: '',
                tableData: [],
                options: [{
                    label:'第一学',
                    value: 1
                },{
                    label:'第二学',
                    value: 2
                },{
                    label:'第三学',
                    value: 3
                }],
                optionsValue: 2,
                searchIptValue: '',
            }
        },
        computed: {},
        methods: {
            // 更新时间
            timeUpdata(data) {
                console.log(data)
                console.log(this.updateTime)
                console.log(this.lastFollowUpTime)
                console.log(this.createTime)
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
                    .then(function (res) {
                        self.parentCompanyList = res.data.data.list
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 子公司变化触发的事件
            handleChange() {

            },
            // 线索类型
            clueTypeChange(data) {
                if (data === '学校') {
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

                } else if (data === '机构') {
                    // 显示 机构类型, 定位

                    this.typeList.positioning.show = true;
                    this.typeList.organizationType.show = true;

                    this.typeList.schoolLevel.show = false;
                    this.typeList.academicSystem.show = false;
                    this.typeList.artsAndSciences.show = false;
                    this.typeList.grade.show = false;
                    this.typeList.sex.show = false;
                    this.typeList.sourceType.show = false;

                    this.typeList.professorSubjects.show = false;
                } else if (data === '教师') {
                    // 学校等级, 教授科目, 教授年级(学制)
                    this.typeList.professorSubjects.show = true;
                    this.typeList.schoolLevel.show = true;
                    this.typeList.academicSystem.show = true;

                    this.typeList.positioning.show = false;
                    this.typeList.organizationType.show = false;
                    this.typeList.artsAndSciences.show = false;
                    this.typeList.grade.show = false;
                    this.typeList.sex.show = false;
                    this.typeList.sourceType.show = false;


                } else if (data === '学生') {
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


                } else {

                }
            },
            // 类型转变
            radioChange(data) {
                // console.log(this.typeList[data].key);
                for (var i = 0; i < this.typeList[data].content.length; i++) {
                    var obj = this.typeList[data].content[i];
                    if (obj.text === this.typeList[data].key) {
                        this.typeList[data].value = obj.value
                        break;
                    }
                }
                console.log(this.typeList)
                // for (let key in this.typeList) {
                //     console.log("key:" + key)
                //     for (let key2 in this.typeList[key]) {
                //         console.log("key2:" + key2)
                //         if (key2 === 'content') {
                //             for (let i = 0; i < this.typeList[key].content.length; i++) {
                //                 let obj = this.typeList[key].content[i];
                //                 // console.log(obj)
                //                 this.filterConditions[key].value = obj.value
                //                 this.filterConditions[key].text = obj.text
                //             }
                //         }
                //     }
                //
                // }
                // console.log(this)
                // console.log(this.typeList.schoolLevel.key)
                // console.log(this.typeList.academicSystem.key)
                //
                // console.log(this.typeList.artsAndSciences.key)
                // console.log(this.typeList.grade.key)
                // console.log(this.typeList.organizationType.key)
                // console.log(this.typeList.sex.key)
                // console.log(this.typeList.sourceType.key)
                // console.log(this.typeList.positioning.key)
                // console.log(this.typeList.professorSubjects.key)
                // console.log(this.typeList.source.key)
                // console.log(this.typeList.followUpStatus.key)
            },
            // 省市县数据
            requestCity() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/area/evepce',
                    data: {
                        token: "1511328705UZVQ",
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
            // 点击级联选择器
            handleChange() {

            },
            // 表格按钮
            showModelTable() {

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
        }
    }
</script>

<style scoped>
    @import "css/clue.css";
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
        width: 40%;
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
</style>
