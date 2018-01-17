<template>
    <div class="componentsRoot">
        <el-row :gutter="10">
            <el-col :span="7">
                <h3>公司信息</h3>
                <div class="select">
                    <el-cascader
                        expand-trigger="hover"
                        :options="parentCompanyList"
                        @change="handleChange"
                        change-on-select
                        filterable
                        :show-all-levels="false"
                        v-model="selCompanyList"
                    >
                    </el-cascader>
                </div>
            </el-col>
            <el-col :span="17">
                <div class="el-col-wrap">
                    <h3></h3>
                    <div>
                        <!-- <img :src="detailsCompanyList.company_logo"  alt="公司LOGO" > -->
                         <el-upload
                            class="avatar-uploader"
                            action="https://crm.tonyliangli.cn/api/UserFile/uploadImg"
                            :show-file-list="false"
                            :data="paramObj"
                            :on-success="success"
                            :before-upload="beforeAvatarUpload"
                            >
                            <img  v-if="detailsCompanyList.company_logo" :src="detailsCompanyList.company_logo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>


                    </div>
                    <div class="iptWrap">
                        <el-form label-position="top" label-width="80px" :model="detailsCompanyList">
                            <el-form-item label="名称">
                                <el-input placeholder="请输入全称" v-model="detailsCompanyList.company_name"></el-input>
                            </el-form-item>
                            <el-form-item label="简称">
                                <el-input v-model="detailsCompanyList.company_nickname"></el-input>
                            </el-form-item>
                            <el-form-item label="地区">
                                <el-cascader 
                                    v-model="detailsCompanyList.cityArr" 
                                    expand-trigger="hover" 
                                    :options="cityList" 
                                   >
                                </el-cascader>
                            </el-form-item>

                            <el-form-item label="网址">
                                <el-input v-model="detailsCompanyList.company_website"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人">
                                <el-input v-model="detailsCompanyList.company_contacts"></el-input>
                            </el-form-item>
                            <el-form-item label="手机">
                                <el-input v-model="detailsCompanyList.company_mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="座机">
                                <el-input v-model="detailsCompanyList.company_telephone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="detailsCompanyList.company_email"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="detailsCompanyList.company_remarks"></el-input>

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
                // 选中的子公司
                selCompanyList: [parseInt(localStorage.getItem('motherCompanyId'))],
                // 当前子公司id
                children_id: '',
                parentCompanyList: [],
                //公司详情
                detailsCompanyList: {},
                cityList: [],
                companyId: parseInt(localStorage.getItem('motherCompanyId')),
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
                },
                paramObj: {
                    token: localStorage.getItem('crm_token')
                }
            }
        },
        methods: {
            // 上传成功
            success(response, file, fileList) {
                 this.detailsCompanyList.company_logo = response.data.list
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (isPNG) {
                    if (isLt2M) {
                        return true
                    } else {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                        return false
                    }
                } else if (isJPG) {
                    if (isLt2M) {
                        return true
                    } else {
                        this.$message.error('上传头像图片大小不能超过 2MB!');
                        return false
                    }
                } else {
                    this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                    return false
                }
            },
            // 处理树形数据, 删除空的children
            getMenuName(menus){
                for (var value of menus) {
                    if (value.children) {
                        this.getMenuName(value.children)
                    }
                    if (value.children.length == 0) {
                        delete value.children
                    }
                }
            },
        //公司详情
            getCompanyDetails(){
             let self = this;
                this.$axios({
                method: 'POST',
                withCredentials: false,
                url: '/api/company/companyDetails',
                data: {
                    token: localStorage.getItem('crm_token'),
                    company_id: self.companyId
                }
            })
                .then(function (res) {
                    var data = res.data.data.list;
                    data.cityArr = [data.province_id,data.city_id,data.area_id]
                    self.detailsCompanyList = data
                    console.log(JSON.stringify(self.detailsCompanyList));
                })
                .catch(function (err) {
                    console.log(err);
                });
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
                        var arr = [];
                        self.getMenuName(res.data.data.list);
                        self.parentCompanyList = res.data.data.list
                        // console.log(JSON.stringify(res.data.data.list));
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            // 上传图片
            
            // 修改信息
            onSubmit(){
                let self = this
                 let obj = {
                    token: localStorage.getItem('crm_token'),
                    company_id: self.companyId,
                    name: self.detailsCompanyList.company_name,
                    nickname: self.detailsCompanyList.company_nickname,
                    province_id: self.detailsCompanyList.cityArr[0],
                    city_id: self.detailsCompanyList.cityArr[1],
                    area_id: self.detailsCompanyList.cityArr[2],
                    address:self.detailsCompanyList.company_address,
                    website:self.detailsCompanyList.company_website,
                    contacts: self.detailsCompanyList.company_contacts,
                    mobile: self.detailsCompanyList.company_mobile,
                    telephone: self.detailsCompanyList.company_telephone,
                    email: self.detailsCompanyList.company_email,
                    remarks: self.detailsCompanyList.company_remarks,
                    logo: self.detailsCompanyList.company_logo
                    // logo: self.detailsCompanyList.company_logo
                }
                console.log('修改公司传递参数'+JSON.stringify(obj,null,4));
                
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/company/editCompany',
                    data: obj
                })
                .then(function(res){
                    if (res.data.code === 200) {
                        self.$message({
                            message: '修改公司信息成功',
                            type: 'success'
                        })
                        self.getCompanyDetails();
                    } else {
                        self.$message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
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
              // 子公司变化
            handleChange(data) {
                let companyId = this.children_id;
                this.companyId = data[data.length - 1];
                // 获取子公司所有部门
                    //this.getChildrenDepartment();
                     this.getCompanyDetails();

            },

        },

        created() {
            this.applyCompany();
            this.getCompanyDetails();
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
        width: 100%;
    }

   
    avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: auto;
         height: 178px;
        border-radius: 5px;
        display: block;
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
