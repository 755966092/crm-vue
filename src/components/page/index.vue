<template>

</template>

<script>
    export default {
        name: "index",
        created() {
            let token = localStorage.getItem('crm_token');
            console.log(token)
            if (token) {
                console.log('工作台')
                // 进去工作台
                this.$router.push('/workbench');
            } else {
                console.log('登录')
                // 进入登录界面
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>
