<template>
    <div class="componentsRoot clueWrap">
        <router-view></router-view>
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
                clueType: '学校',
                // 范围
                parentCompanyList: [],
                // 最后跟进时间
                lastFollowUpTime: '',
                // 更新时间
                updateTime: '',
                // 新建时间
                createTime: '',
                // 城市选择器数据
                cityList: [],
                // 各项数据
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
                sourceTypeOptions: [{
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
                }],
                // 线索类型
                clueTypeOptions: [{
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
                }],
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
                        token: localStorage.getItem('crm_token'),
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

                    this.typeList.professorSubjects.show = false;
                } else if (data === '教师' || data == 3) {
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


                } else {

                }
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
                console.log(this.typeList[data]);

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
            // 点击级联选择器
            handleChange() {

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

    .iptName {
        display: inline-block;
        margin: 5px 0;
    }
    .colorBlue {
        cursor: pointer
    }
</style>
