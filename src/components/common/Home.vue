<template>
    <div class="wrapper">
        <v-head @id-selected="toggle" props="bbb"></v-head>
        <v-sidebar v-if="setting" @increment="addCls"></v-sidebar>
        <v-sidebar2 v-else @increment="addCls"></v-sidebar2>
        <div class="content" :class="{left70:is850}">
            <transition name="move" mode="out-in">
                <router-view ></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vSidebar2 from '../page/setting/SettingSlidebar.vue';
    export default {
        components:{
            vHead, vSidebar, vSidebar2
        },
        data() {
            return {
                is850: false,
                setting: true
            }
        },
        methods: {
            addCls(data) {
                if (data == 1) {
                    this.is850 = true;
                } else {
                    this.is850 = false; 
                }
            },
            toggle(a) {
                if (a == 1) {
                    // 工作台
                    this.setting = false
                } else {
                    // 设置
                    this.setting = true
                }
            }
        },
         watch: {
           $router: (to, from) => {
                // 对路由变化作出响应...
                console.log('对路由变化作出响应');
                console.log(this);
                console.log('对路由变化作出响应');
                
            }
        }
    }
</script>
<style >
.content {
    min-width: 800px;
}
.left70 {
    left: 70px;
}
</style>

