<template>
    <div class="componentsRoot">
        <el-row>
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>销售简报</span>
                    </div>
                    <p v-for="item in salesBriefing" class="text item">
                        <!--<a href="#/workbench/v" >{{item.ctitle}}</a>-->
                        <a :href="item.url">{{item.ctitle}}</a>
                    </p>
                </el-card>
                <el-card class="box-card workbench mt20">
                    <div slot="header" class=" clearfix">
                        <span class="cardTitle">销售助手</span>
                        <div class="fr">
                            <template class="fr">
                                <el-select v-model="assistantValue" @change="assistantValueChange" placeholder="请选择">
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
                    <div class="text item">
                        <el-row>
                            <el-col :span="6">
                                <span class="listTitle">成交</span>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.deal.count || 0 }}</p>
                                <p class="listText listTextColor">合同数</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">$ {{ alesAssistantData.deal.sum_money || 0 }}</p>
                                <p class="listText listTextColor">合同金额</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">$ {{ alesAssistantData.deal.hui || 0 }}</p>
                                <p class="listText listTextColor">已回款金额</p>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="listTitle">新增</span>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.addList.clue }}</p>
                                <p class="listText listTextColor">线索</p>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.addList.customer }}</p>
                                <p class="listText listTextColor">客户数</p>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <span class="listTitle">跟进</span>
                            </el-col>
                            <el-col :span="6">
                                <p class="listText">{{ alesAssistantData.followup }}</p>
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
                            <el-select v-model="performanceRankingValue" @change="retrieveData" placeholder="请选择">
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
                // 1 今天 2昨天 3本周 4上周 5本月 6上月 7本季度 8上季度 9今年 10去年
                // 业绩排行筛选, 销售助手筛选列表
                dataList: [
                    {
                        value: '1',
                        label: '今天'
                    },{
                        value: '2',
                        label: '昨天'
                    },{
                        value: '3',
                        label: '本周'
                    },{
                        value: '4',
                        label: '上周'
                    },{
                        value: '5',
                        label: '本月'
                    },{
                        value: '6',
                        label: '上月'
                    },{
                        value: '7',
                        label: '本季度'
                    },{
                        value: '8',
                        label: '上季度'
                    },{
                        value: '9',
                        label: '今年'
                    },{
                        value: '10',
                        label: '去年'
                    }
                ],
                // 业绩排行筛选选中数据
                performanceRankingValue: '1',
                // 业绩排行表格数据
                performanceRanking: [],
                // 销售简报数据
                alesAssistantData: {
                    "deal": {
                        "count": 0,
                        "sum_money": 0,
                        "hui": 0
                    },
                    "addList": {
                        "clue": 0,
                        "customer": 0
                    },
                    "followup": 0
                },
                // 销售简报选择value
                assistantValue: '1',
                // 销售助手数据
                salesBriefing: [{
                    ctitle:'未结清合同',
                    url:'#/contract'
                },{
                    ctitle:'本月未跟进的未结清合同',
                    url:'#/contract'
                },{
                    ctitle:'本周未跟进客户的未完结客户',
                    url:'#/contract'
                }],
            }
        },
        methods: {
            getData() {
                // var self = this;
                // self.$axios({
                //     method: 'GET',
                //     withCredentials: false,
                //     url: 'http://localhost:8081/mock/salesBriefing',
                // })
                // .then(function (res) {
                //     self.salesBriefing = res.data
                // })
                // .catch(function (err) {
                //     console.log(err);
                // });
            },
            // 获取业绩排行
            getPerformanceRanking() {
                var self = this;
                // 假数据
                // let url = 'http://localhost:8081/mock/performanceRanking';
                // if (self.performanceRankingValue == 1) {
                //     url = 'http://localhost:8081/mock/performanceRanking2';
                // } else if (self.performanceRankingValue == 2) {
                //     url = 'http://localhost:8081/mock/performanceRanking3';
                // } else if (self.performanceRankingValue == 3) {
                //     url = 'http://localhost:8081/mock/performanceRanking4';
                // } else {
                //     url = 'http://localhost:8081/mock/performanceRanking5';
                // }

                // self.$axios({
                //     method: 'GET',
                //     withCredentials: false,
                //     url: url,
                // })
                //     .then(function (res) {
                //         self.performanceRanking = res.data
                //     })
                //     .catch(function (err) {
                //         console.log(err);
                //     });

                // 真数据
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/Workbench/performance',
                    data: {
                        token: '1513059193KHO7',
                        statu: self.performanceRankingValue
                    }
                })
                    .then(function (res) {
                        console.log('请求成功'+ self.performanceRankingValue)
                        self.performanceRanking = res.data.data.list
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 重新获取列表数据
            retrieveData(data) {
                this.getPerformanceRanking(data)
            },
            // 销售简报数据
            getAlesAssistantData() {
                var self = this;
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/Workbench/saleskit',
                    data: {
                        token: '1513059193KHO7',
                        statu: self.assistantValue
                    }
                })
                .then(function (res) {
                    if(res.status === 200 && res.data.code === 200) {
                        // 请求成功

                        self.alesAssistantData = res.data.data;
                    } else {
                        alert(res.data.msg)
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            // 销售简报条件筛选数据
            assistantValueChange() {
                this.getAlesAssistantData()
            },
            // 销售助手跳转
            newPage() {

            }
        },
        created() {
            this.getAlesAssistantData();
            this.getPerformanceRanking();

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
    .el-table--fit {
        margin-top: 10px;
    }
</style>
