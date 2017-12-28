<template>
     <div class="componentsRoot">
         <div>
             <span>
                <span>学校：</span>
                <span>北京四中</span>
             </span>
             <span style="margin-left:20px">
                <span>默认联系人：</span>
                <el-dropdown 
                    trigger="click"
                    @command="selectDefaultContact">
                    <span class="el-dropdown-link" style="color: #409EFF">
                        {{defaultContact}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
                        <el-dropdown-item command="黄金">黄金</el-dropdown-item>
                        <el-dropdown-item command="白银">白银</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
             </span>
         </div>
     </div>
</template>

<script>
    export default {
        name: "clue-info",
        data() {
            return {
                defaultContact: '王老师',
                clueInfoData:'',
            }
        },
        created(){
            this.clueDetails();
            // 传来的参数
            // console.log(this.$route)
        },
        methods: {
            // 选择默认联系人
            selectDefaultContact(data) {
                this.defaultContact = data
            },
            clueDetails() {
                let self = this;
                this.$axios({
                    method: 'POST',
                    withCredentials: false,
                    url: '/api/clue/detailsClue',
                    data: {
                        token: localStorage.getItem('crm_token'),
                        clue_id: self.$route.query.data.clue_id
                    }
                })
                    .then(function (res) {
                        if (res.data.code === 200) {
                            console.log(JSON.stringify(res.data.data,null,4));
                            self.clueInfoData = res.data.data;
                        } else {
                            alert(res.data.msg)
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
