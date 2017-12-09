<template>
    <div class="componentsRoot">
        <el-row>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>销售简报</span>
                    </div>
                    <p v-for="item in salesBriefing" class="text item">
                        <a href="#/workbench/v" >{{item.ctitle}}</a>
                        <!--<a :href="item.url">{{item.ctitle}}</a>-->
                    </p>
                </el-card>
                <el-card class="box-card workbench mt20">
                    <div slot="header" class=" clearfix">
                        <span class="cardTitle">销售助手</span>
                        <div class="fr">
                            <template class="fr">
                                <el-select v-model="assistantValue" @change="assistantValueChange" placeholder="请选择">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                    </div>
                    <div class="text item">
                        <el-row>
                            <el-col :span="6">
                                <span class="listTitle">成交</span>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.contractCount }}</p>
                                <p class="listText listTextColor">合同数</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">$ {{ alesAssistantData.contractAmount }}</p>
                                <p class="listText listTextColor">合同金额</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">$ {{ alesAssistantData.RepaymentsAmount }}</p>
                                <p class="listText listTextColor">已回款金额</p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="listTitle">新增</span>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.clueCount }}</p>
                                <p class="listText listTextColor">线索</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.clientCount }}</p>
                                <p class="listText listTextColor">客户数</p>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="listTitle">跟进</span>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.fullUpCount }}</p>
                                <p class="listText listTextColor">跟进次数</p>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="16">
                <div class="clearfix performanceRanking">
                    <span class="cardTitle">销售排行</span>
                    <div class="fr">
                        <template class="fr">
                            <el-select v-model="value" @change="retrieveData" placeholder="请选择">
                                <el-option
                                    v-for="item in dataList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </div>
                <template>
                    <el-table
                        :data="performanceRanking"
                        :default-sort = "{prop: 'clueAmount', order: 'descending'}"
                        style="width: 100%"
                        height="450"
                    >
                        <el-table-column
                            fixed
                            prop="canme"
                            label="姓名"
                            sortable
                            min-width="130">
                        </el-table-column>
                        <el-table-column
                            prop="contractCount"
                            label="合同数"
                            sortable
                            min-width="130">
                        </el-table-column>
                        <el-table-column
                            prop="conAmount"
                            min-width="130"
                            sortable
                            label="合同金额">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">$ {{ scope.row.conAmount }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="clueAmount"
                            min-width="130"
                            sortable
                            label="已回款金额">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">$ {{ scope.row.clueAmount }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="clueCount"
                            min-width="130"
                            sortable
                            label="新增线索数">
                        </el-table-column>
                        <el-table-column
                            prop="clientCount"
                            min-width="130"
                            sortable
                            label="新增客户数">
                        </el-table-column>
                        <el-table-column
                            prop="fullupCount"
                            min-width="130"
                            sortable
                            label="跟进次数">
                        </el-table-column>
                    </el-table>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "workbench",
        data() {
            return {
                performanceRanking: [],
                dataList: [{
                    value: '1',
                    label: '本周'
                },{
                    value: '2',
                    label: '本月'
                },{
                    value: '3',
                    label: '本季度'
                },{
                    value: '4',
                    label: '本年'
                }],
                value: '1',
                options: [{
                    value: '1',
                    label: '本周'
                },{
                    value: '2',
                    label: '本月'
                },{
                    value: '3',
                    label: '本季度'
                },{
                    value: '4',
                    label: '本年'
                }],
                // 销售租售数据
                alesAssistantData: {},
                // 销售助手选择value
                assistantValue: '1',
                salesBriefing: [],
            }
        },
        methods: {
            getData() {
                var self = this;
                self.$axios({
                    method: 'GET',
                    withCredentials: false,
                    url: 'http://localhost:8081/mock/salesBriefing',
                })
                    .then(function (res) {
                        self.salesBriefing = res.data
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 获取业绩排行
            getPerformanceRanking(type) {
                let url = 'http://localhost:8081/mock/performanceRanking';
                if (type == 1) {
                    url = 'http://localhost:8081/mock/performanceRanking2';
                } else if (type == 2) {
                    url = 'http://localhost:8081/mock/performanceRanking3';
                } else if (type == 3) {
                    url = 'http://localhost:8081/mock/performanceRanking4';
                } else {
                    url = 'http://localhost:8081/mock/performanceRanking5';
                }
                var self = this;
                self.$axios({
                    method: 'GET',
                    withCredentials: false,
                    url: url,
                })
                    .then(function (res) {
                        self.performanceRanking = res.data
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 重新获取列表数据
            retrieveData(data) {
                this.getPerformanceRanking(data)
            },
            // 销售助手数据
            getAlesAssistantData(index) {
                var self = this;
                self.$axios({
                    method: 'GET',
                    withCredentials: false,
                    url: 'http://localhost:8081/mock/salesAssistantData',
                })
                    .then(function (res) {
                        self.alesAssistantData = res.data[index]
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            assistantValueChange(data) {
                this.getAlesAssistantData(data-1)
            },
            // 销售助手跳转
            newPage() {

            }
        },
        created() {
            this.getData();
            this.getPerformanceRanking();
            this.getAlesAssistantData(0);
        }
    }
</script>

<style scoped>
    @import "../css/workbench.css";

    .el-col-16 {
        padding: 0 20px;
    }

    .text {
        padding: 10px;
        border-bottom: 1px solid #d9d9d9;
    }

    .text:last-child {
        border: 0;
    }

    .mt20 {
        margin-top: 20px;
    }

    .cardTitle {
        display: inline-block;
        height: 34px;
        line-height: 34px;
    }

    .listText {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
    }

    .text .el-col {
        height: 60px;
        padding: 10px 0;
    }

    .listTitle {
        line-height: 40px;
    }

    .listTextColor {
        color: #999;
    }
</style>
