<template>
    <div class="componentsRoot">
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
                <el-row >
                        <el-col :span="3">
                            <p class="leftWrap">{{ item.title }}</p>
                        </el-col>
                        <el-col :span="21">
                            <div class="select rightWrap">
                                <el-radio-group
                                    @change="radioChange(index)"
                                    v-model="item.key">
                                    <el-radio-button v-for="children in item.content" :value="children.value" :label="children.text"></el-radio-button>
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
                        <el-radio-button v-for="children in typeList.followUpStatus.content" :value="children.value" :label="children.text"></el-radio-button>
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
                        <el-radio-button v-for="children in typeList.source.content" :value="children.value" :label="children.text"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "clue",
        data() {
            return {
                clueType: '学校',
                parentCompanyList: [],
                // 筛条件
                filterConditions: {},
                typeList: {
                    // 学校等级
                    'schoolLevel': {
                        'key': '全部',
                        'title': '学校等级',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: '市重点'
                        },{
                            value: '3',
                            text: '省重点'
                        }]
                    },
                    // 学制
                    'academicSystem': {
                        'key':'全部',
                        'title': '学制',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: '初中'
                        },{
                            value: '2',
                            text: '高中'
                        },{
                            value: '3',
                            text: '初中+高中'
                        }]
                    },
                    // 跟进状态
                    'followUpStatus': {
                        'key':'全部',
                        'title': '跟进状态',
                        'show': true,
                        'content' : [{
                                value: 'all',
                                text: '全部'
                            },{
                                value: '1',
                                text: '未处理'
                            },{
                                value: '2',
                                text: '联系方式有效'
                            },{
                                value: '3',
                                text: '联系方式无效'
                            }]
                    },
                    // 来源
                    'source': {
                        'key':'全部',
                        'title': '来源',
                        'show': true,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: '高招'
                        },{
                            value: '2',
                            text: '我在'
                        },{
                            value: '3',
                            text: '搜索引擎'
                        },{
                            value: '4',
                            text: '微信'
                        },{
                            value: '5',
                            text: '客户介绍'
                        }]
                    },
                    // 机构类型
                    'organizationType': {
                        'key':'全部',
                        'title': '机构类型',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: '大型'
                        },{
                            value: '2',
                            text: '中型'
                        },{
                            value: '3',
                            text: '小型'
                        }]
                    },
                    // 定位
                    'positioning': {
                        'key':'全部',
                        'title': '定位',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: 'K12'
                        },{
                            value: '2',
                            text: '英语'
                        },{
                            value: '3',
                            text: '出国'
                        }]
                    },
                    // 教授科目
                    'professorSubjects': {
                        'key':'语文',
                        'title': '教授科目',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '语文'
                        },{
                            value: '1',
                            text: '数学'
                        },{
                            value: '2',
                            text: '外语'
                        },{
                            value: '3',
                            text: '物理'
                        },{
                            value: '3',
                            text: '化学'
                        }]
                    },
                    // 文理科
                    'artsAndSciences': {
                        'key':'文科',
                        'title': '文理科',
                        'show': false,
                        'content' : [{
                            value: 'wen',
                            text: '文科'
                        },{
                            value: 'li',
                            text: '理科'
                        }]
                    },
                    // 年级
                    'grade': {
                        'key':'全部',
                        'title': '年级',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: '初一'
                        },{
                            value: '2',
                            text: '初二'
                        },{
                            value: '3',
                            text: '初三'
                        },{
                            value: '4',
                            text: '高一'
                        },{
                            value: '5',
                            text: '高二'
                        },{
                            value: '6',
                            text: '高三'
                        }]
                    },
                    // 性别
                    'sex': {
                        'key':'男',
                        'title': '性别',
                        'show': false,
                        'content' : [{
                            value: 'nan',
                            text: '男'
                        },{
                            value: 'nv',
                            text: '女'
                        }]
                    },
                    // 来源类型
                    'sourceType': {
                        'key':'全部',
                        'title': '来源类型',
                        'show': false,
                        'content' : [{
                            value: 'all',
                            text: '全部'
                        },{
                            value: '1',
                            text: '客户'
                        },{
                            value: '2',
                            text: '其他线索'
                        },{
                            value: '3',
                            text: '手录'
                        }]
                    }
                },
            }
        },
        computed: {

        },
        methods: {
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
                if(data === '学校') {
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
                        // console.log(obj.value);
                        // break;
                    }
                }
                for (let key in this.typeList) {
                    this.filterConditions[key].value = this.typeList[key].value
                    this.filterConditions[key].text = this.typeList[key].text
                }
                console.log(this)
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
            }
        },
        created() {
            this.applyCompany();
            this.typeList.schoolLevel.show = true;
            this.typeList.academicSystem.show = true;

        }
    }
</script>

<style scoped>
    .leftWrap,
    .rightWrap {
        line-height: 40px;
        height: 40px;
    }
    .el-row {
        margin: 10px 0;
    }
</style>
