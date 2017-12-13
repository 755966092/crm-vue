<template>
    <div class="componentsRoot clueWrap">
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">范围</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-cascader
                        expand-trigger="hover"
                        :options="selectedItems.parentCompanyList"
                        @change="handleChange"
                        change-on-select
                    >
                    </el-cascader>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="3">
                <p class="leftWrap">客户类型</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.clientType">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="学校"></el-radio-button>
                        <el-radio-button label="机构"></el-radio-button>
                        <el-radio-button label="教师"></el-radio-button>
                        <el-radio-button label="学生"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">业务类型</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.businessType">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="自主招生"></el-radio-button>
                        <el-radio-button label="竞赛"></el-radio-button>
                        <el-radio-button label="论文"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">合同状态</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.contractStatue">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="执行中"></el-radio-button>
                        <el-radio-button label="成功结束"></el-radio-button>
                        <el-radio-button label="意外终止"></el-radio-button>
                        <el-radio-button label="未开始"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">回款状态</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.repaymentsStatus">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="代付款"></el-radio-button>
                        <el-radio-button label="部分结算"></el-radio-button>
                        <el-radio-button label="全部结清"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">来源</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <el-radio-group @change="clueTypeChange" v-model="selectedItems.sourceType">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-radio-button label="高招"></el-radio-button>
                        <el-radio-button label="我在"></el-radio-button>
                        <el-radio-button label="搜索引擎"></el-radio-button>
                        <el-radio-button label="微信"></el-radio-button>
                        <el-radio-button label="客户介绍"></el-radio-button>
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
                    <el-cascader
                        expand-trigger="hover"
                        placeholder="请选择地区"
                        :options="cityList"
                        @change="selCity"
                        change-on-select
                        :value="selectedItems.area"
                    >
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
                            v-model="selectedItems.lastFollowupTime"
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
                <p class="leftWrap">起始时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="selectedItems.startAndEndTime"
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
                <p class="leftWrap">到期时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="selectedItems.maturityTime"
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
        <el-row>
            <el-col :span="3">
                <p class="leftWrap">签约时间</p>
            </el-col>
            <el-col :span="21">
                <div class="select rightWrap">
                    <div class="block">
                        <el-date-picker
                            v-model="selectedItems.signingTime"
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
        <!-- 数据表格 -->
        <div>
            <div class="tableTitle">
                <el-row>
                    <el-col :span="8">
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
                // 选项
                selectedItems: {
                    // 客户类型
                    clientType: '全部',
                    // 业务类型
                    businessType: '全部',
                    // 合同状态
                    contractStatue: '全部',
                    // 回款状态
                    repaymentsStatus: '全部',
                    // 来源
                    sourceType: '全部',
                    // 地区
                    area:[],
                    // area:[1,2,115],
                    // 最后跟进时间
                    lastFollowupTime:[],
                    // 起始时间
                    startAndEndTime: [],
                    // 到期时间
                    maturityTime: [],
                    // 签约时间
                    signingTime: [],
                    // 范围
                    parentCompanyList: [],
                },
                // 城市选择器数据
                cityList: [],
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
                // 搜索框筛选列表
                optionsValue: 2,
                // 搜索框内容
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
            // 点击c城市级联选择器
            selCity(data) {
                console.log(data)
            },
            // 表格按钮
            showModelTable() {

            }
        },
        created() {
            this.getTableData();
            this.applyCompany();
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
</style>
