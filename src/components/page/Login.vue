<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 输入用户名和密码。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {

            submitForm(formName) {
                console.log('开始登录')
                var self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/api/login',
                    data: {
                        mobile: self.ruleForm.username,
                        password: self.ruleForm.password
                    }
                })
                .then(function (res) {
                    // 登录成功
                    if (res.data.code === 200) {
                        console.log('正确:'+JSON.stringify(res.data.data,null,4));
                        self.$refs[formName].validate((valid) => {
                            if (valid) {
                                // 用户名缓存
                                localStorage.setItem('crm_username', res.data.data.list.user_name);
                                // token缓存
                                localStorage.setItem('crm_token', res.data.data.list.user_token);
                                // 当前用户是否为管理员 为1是母公司超管   为2不是管理员
                                 localStorage.setItem('adminRole', res.data.data.adminRole);
                                 //是否有权限进入设置
                                 localStorage.setItem('isGoWeb', res.data.data.isGoWeb);
                                 localStorage.setItem('userId', res.data.data.list.user_id);
                                 
                                 localStorage.setItem('role_opat_auth', res.data.data.list.role_opat_auth);
                                 localStorage.setItem('role_data_auth', res.data.data.list.role_data_auth);
                                self.selfCompany();
                                
                                self.$router.push('/workbench');
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    } else {
                        console.log('错误:'+JSON.stringify(res,null,4));
                        alert(res.data.msg)
                    }

                })
                .catch(function (err) {
                    console.log(err);
                });

            },
            // 当前用户所属公司
            selfCompany() {
                console.log('执行');
                
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/company/CompanyMyCompany',
                    data: {
                        token: localStorage.getItem('crm_token'),
                    }
                })
                .then(function(res){
                        console.log(res);
                    if (res.data.code === 200) {
                        
                        localStorage.setItem('motherCompanyId', res.data.data.mother.id);
                        localStorage.setItem('chirdrenCompanyId', res.data.data.chirdren.id);
                    } else {
                    //    self.message.error(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 160px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }
</style>
