<template>
    <div class="componentsRoot">
        <router-view></router-view>
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
    @import "css/workbench.css";

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
