<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar @increment="addCls"></v-sidebar>
        <div class="content" :class="{left70:is850}">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from '../../common/Header.vue';
    import vSidebar from './SettingSlidebar.vue';

    export default {
        components: {
            vHead, vSidebar
        },
        data() {
            return {
                is850: false
            }
        },
        methods: {
            addCls(data) {
                if (data == 1) {
                    this.is850 = true;
                } else {
                    this.is850 = false; 
                }
            }
        }
    }
</script>
<style scoped>
.content {
    min-width: 800px;
}
.left70 {
    left: 70px;
}
</style>

