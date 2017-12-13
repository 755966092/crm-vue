<template>
    <div class="componentsRoot">
        <el-row :gutter="15">
            <el-col :span="8">
                <div class="title">
                    <span>角色</span>
                    <el-button type="text">新建角色</el-button>
                </div>
                <div class="block">
                    <el-cascader
                        expand-trigger="hover"
                        :options="parentCompanyList"
                        v-model="selectedOptions2"
                        @change="handleChange">
                    </el-cascader>
                </div>
                <div id="radioBtn">
                    <el-radio-group v-model="radio3">
                        <el-radio-button class="radioBtn" v-for="item in allRoleList" :label="item.name"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col :span="16">
                <div>
                    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
                        <el-tab-pane label="操作权限" name="first">
                            <template v-for="(items, key) in checkBoxData">
                                <p class="checkTitle">{{ key }}</p>
                                <el-row class="checkWrap">
                                    <template v-for="item in items">
                                        <el-col class="checkCol" :span="4">
                                            <el-checkbox @change="checkChange" :name="item.name" v-model="item.checked">
                                                {{item.text}}
                                            </el-checkbox>
                                        </el-col>
                                    </template>
                                </el-row>
                                <!-- <hr> -->
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="数据权限" name="second">
                            <h3>数据权限(设置该角色的用户可以操作数据的范围)</h3>
                            <div class="mt10">
                                <el-radio v-model="dataPermission" label="1">
                                    <span class="dataLabel">个人</span>
                                    <span class="dataLabelInfo">只能操作自己的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="2">
                                    <span class="dataLabel">所属部门</span>
                                    <span class="dataLabelInfo">能操作自己, 自己所属部门的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="3">
                                    <span class="dataLabel">所属部门及下属部门</span>
                                    <span class="dataLabelInfo">能操作自己, 自己所属部门及其子部门的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="4">
                                    <span class="dataLabel">所属公司</span>
                                    <span class="dataLabelInfo">能操作自己所属公司的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="5">
                                    <span class="dataLabel">全部</span>
                                    <span class="dataLabelInfo">能操作所有数据</span>
                                </el-radio>

                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dataPermission: '1',
                checkBoxData: {
                    '线索': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '客户': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '合同': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '款项': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '报表': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '系统': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }]

                },
                activeName2: "first",
                radio3: '',
                parentCompanyList: [],
                allRoleList: [],
                selectedOptions: [],
                selectedOptions2: []
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            checkChange(event) {
                //   console.log(event);
                console.log(this.checkBoxData);
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
            // 所有角色
            getAllRole() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/Role/roleList',
                    data: {
                        token: localStorage.getItem('crm_token'),
                    }
                })
                    .then(function (res) {
                        self.allRoleList = res.data.data.list
                        self.radio3 = res.data.data.list[0].name
                        self.dataPermission = res.data.data.list[0].data_auth
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
        },
        created() {
            this.applyCompany();
            this.getAllRole();
        }
    };
</script>

<style scoped>
    @import "./css/radioBtn.css";

    .radioBtn {
        width: 100%;
        margin: 3px 0;
    }

    .el-cascader {
        width: 100%;
    }

    .el-col {
        padding: 0 5px;
    }


    .checkTitle {
        margin: 10px 0;
    }

    .checkWrap {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 10px;
    }

    .checkCol {
        padding-bottom: 5px;
    }

    .el-radio {
        width: 100%;
        margin: 10px 0;
    }
    .el-radio-group {
        width: 80%;
    }

    .el-radio + .el-radio {
        margin-left: 0;
    }

    .dataLabel {
        display: inline-block;
        width: 250px;
    }

    .dataLabelInfo {
        color: #409EFF;
    }

    .mt10 {
        margin-top: 10px;
    }
</style>
