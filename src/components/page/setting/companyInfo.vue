<template>
    <div class="componentsRoot">
        <el-row :gutter="10">
            <el-col :span="7">
                <h3>公司信息</h3>
                <div class="select">
                    <el-cascader expand-trigger="hover" :options="parentCompanyList" @change="handleChange">
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="el-col-wrap">
                    <h3>LOGO</h3>
                    <div>
                        <img src="../../../images/defaultHead.png" alt="">
                    </div>
                    <div class="iptWrap">
                        <el-form label-position="top" label-width="80px" :model="formData">
                            <el-form-item label="名称">
                                <el-input placeholder="请输入全称" v-model="formData.fullName"></el-input>
                            </el-form-item>
                            <el-form-item label="简称">
                                <el-input v-model="formData.shortName"></el-input>
                            </el-form-item>
                            <el-form-item label="地区">
                                <el-cascader expand-trigger="hover" :options="cityList" @change="handleChange">
                                </el-cascader>
                            </el-form-item>


                            <el-form-item label="网址">
                                <el-input v-model="formData.website"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人">
                                <el-input v-model="formData.contact"></el-input>
                            </el-form-item>
                            <el-form-item label="手机">
                                <el-input v-model="formData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="座机">
                                <el-input v-model="formData.landline"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="formData.email"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="formData.remarks"></el-input>

                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // var cityData = ""
    export default {
        data: function () {
            return {
                parentCompanyList: [],
                cityList: [],
                formData: {
                    fullName: '', // 全称
                    shortName: '',	//简称
                    area: '', // 地区
                    address: '',	// 地址
                    website: '',	// 网址
                    contact: '',	// 联系人
                    phone: '', // 电话
                    landline: '', 	// 座机
                    email: '',	// 邮箱
                    remarks: '', // 备注
                }
            }
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
                        var arr = [];
                        self.parentCompanyList = res.data.data.list
                        // console.log(JSON.stringify(res.data.data.list));
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },// 省市县数据
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
            // 点击级联选择器
            handleChange() {

            },
        },

        created() {
            this.applyCompany();
            if (localStorage.getItem('cityData')) {
                console.log('有缓存')
                // console.log(typeof localStorage.getItem('cityData'))
                // console.log(localStorage.getItem('cityData'))
                // console.log(JSON.parse(localStorage.getItem('cityData')))
                this.cityList = JSON.parse(localStorage.getItem('cityData'))
            } else {
                console.log('无缓存')
                this.requestCity();
            }

        }
    }
</script>
<style scoped>
    h3 {
        margin: 10px 0;
    }

    .el-cascader {
        width: 100%;
    }

    .el-col-wrap {
        padding: 0 20px;
    }

    img {
        width: 180px;
        height: 180px;
        border-radius: 5px;
    }

    .iptWrap {
        padding: 10px 0 0 0;
    }

    .iptWrap .el-input,
    .iptWrap .el-textarea,
    .iptWrap .el-cascader {
        width: 70%;
    }
</style>
