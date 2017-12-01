<template>
    <div class="componentsRoot">
        <el-tabs type="border-card">
            <el-tab-pane label="申请加盟">
                <h3>可选加盟</h3>
                <template>
                    <el-table
                        :data="invitationData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >
                        <el-table-column
                            type="index"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="公司"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="contact"
                            label="联系人"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系电话"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="industry"
                            label="行业"
                            min-width="130"
                            :filters="industryArr"
                            :filter-method="filterTag"
                        >
                            <template slot-scope="scope">
                                <el-tag
                                    type="primary"
                                    close-transition>{{scope.row.industry}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="toJoin"
                            label="已加盟"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="remarks"
                            label="说明"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="joinCompany(scope.$index, scope.row)">申请加盟
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="申请状态">
                <template>
                    <el-table
                        :data="applicationStatusData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >

                        <el-table-column
                            prop="trader_company_name"
                            label="拟加盟"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_company_name"
                            label="申请公司"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="apply_user_name"
                            label="申请人"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="statu"
                            label="申请状态"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="content"
                            label="说明"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="cancelApplicationFn(scope.$index, scope.row, 'application')">取消申请
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <el-tab-pane label="现已加盟">
                <template>
                    <el-table
                        :data="alreadyJoinedData"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}"
                        border
                    >

                        <el-table-column
                            prop="higherCompany"
                            label="上级公司"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="applicant"
                            label="申请人"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="联系电话"
                            sortable
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="applicationTime"
                            label="申请时间"
                            min-width="130"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="joinTime"
                            label="加盟时间"
                            min-width="130"
                        >
                        </el-table-column>
                        </el-table-column>
                        <el-table-column min-width="130" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="cancelApplicationFn(scope.$index, scope.row)">取消加盟
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
        <!-- 加盟申请 -->
        <div class="subCompany invitation">
            <el-dialog
                title="加盟申请"
                :visible.sync="addInvitation"
            >
                <el-form label-position="top" label-width="80px" :model="formData">
                    <el-form-item label="加盟公司">
                        <el-cascader expand-trigger="hover" :options="formData.companyList">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="联系人">
                        <el-input placeholder="请输入全称" v-model="formData.contact"></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input v-model="formData.phone"></el-input>
                    </el-form-item>

                    <el-form-item label="说明">
                        <el-input type="textarea" v-model="formData.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addInvitation = false">取 消</el-button>
                    <el-button type="primary" @click="addInvitation = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 取消申请 -->
        <div class="subCompany invitation">
            <el-dialog
                :title="cancelTitle"
                :visible.sync="cancelApplication"
            >
                <p>是否确认取消{{ cancelTitle }}</p>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelApplication = false">取 消</el-button>
                    <el-button type="primary" @click="cancelApplication = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                addInvitation: false,
                cancelApplication: false,
                cancelTitle: '',
                formData: {
                    contact: '',
                    phone: '',
                    industry: '',
                    description: '',
                    companyList: [{
                        value: 'no1',
                        label: '第一学',
                        children: [{
                            value: 'no2',
                            label: '第二学',
                            children: [{
                                value: 'no3',
                                label: '第三学'
                            }]
                        }]
                    }],
                },
                // 加盟邀请
                invitationData: [
                    {
                        companyName: '环球壹学教育科技有限公司',
                        contact: '王小虎',
                        phone: '18888888888',
                        industry: '教育',
                        toJoin: 3,
                        remarks: '说明内容'
                    }, {
                        companyName: '环球壹学教育科技有限公司',
                        contact: '王小虎',
                        phone: '18888888888',
                        industry: '科技',
                        toJoin: 3,
                        remarks: '说明内容'
                    }, {
                        companyName: '环球壹学教育科技有限公司',
                        contact: '王小虎',
                        phone: '18888888888',
                        industry: 'IT',
                        toJoin: 3,
                        remarks: '说明内容'
                    }, {
                        companyName: '环球壹学教育科技有限公司',
                        contact: '王小虎',
                        phone: '18888888888',
                        industry: '对外贸易',
                        toJoin: 3,
                        remarks: '说明内容'
                    }, {
                        companyName: '环球壹学教育科技有限公司',
                        contact: '王小虎',
                        phone: '18888888888',
                        industry: '金融',
                        toJoin: 3,
                        remarks: '说明内容'
                    },
                ], // 加盟邀请
                // 申请状态
                applicationStatusData: [
                    {
                        trader_company_name: '环球壹学教育科技有限公司',
                        apply_company_name: '环球壹学教育科技有限公司',
                        apply_user_name: '王小虎',
                        create_time: '2019-11-09',
                        statu: '待审批',
                        content: '说明内容'
                    }
                ],// 申请状态
                // 现已加盟
                alreadyJoinedData: [
                    {
                        higherCompany: '环球壹学教育科技有限公司',
                        applicant: '王小虎',
                        phone: '188888888',
                        joinCompany: '第一学',
                        applicationTime: '2019-11-09',
                        joinTime: '2019-11-09',
                    }
                ],
                // 行业
                industryArr: [
                    {text: '教育', value: '教育'},
                    {text: '科技', value: '科技'},
                    {text: 'IT', value: 'IT'},
                    {text: '对外贸易', value: '对外贸易'},
                    {text: '金融', value: '金融'}
                ]

            }
        },
        methods: {
            // 赛选行业
            filterTag(value, row) {
                return row.industry === value;
            },
            // 申请加盟
            joinCompany(row, value) {
                this.addInvitation = true
            },
            cancelApplicationFn(row, value, flag) {
                if (flag==='application') {
                    // 申请
                    this.cancelTitle = '申请'
                } else {
                    // 加盟
                    this.cancelTitle = '加盟'
                }
                this.cancelApplication = true
            },
            // 加盟商加盟状态
            joiningTraderApplyFranchiseeStatu() {
                var self = this;
                self.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/joiningTrader/applyFranchiseeStatu',
                    data: {
                        token: "1511328705UZVQ",
                    }
                })
                    .then(function (res) {
                        self.applicationStatusData = res.data.data.list;

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        },
        created() {
            this.joiningTraderApplyFranchiseeStatu();
        }
    }
</script>
<style scoped>
    .invitation .el-cascader {
        width: 100%;
    }


</style>
