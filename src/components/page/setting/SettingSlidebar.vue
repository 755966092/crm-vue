<template>
        <div class="sidebar" :class="{minW: !isCollapse}">
        <div class="btnGround">
            <!-- <span class="btn" @click="toggleCls(1)" :class="{hide:!isCollapse}">展开</span> -->
            <!-- <span class="btn" @click="toggleCls(2)" :class="{hide:isCollapse}">收缩</span> -->
            <el-button class="btn" @click="toggleCls(1)" :class="{hide:!isCollapse}" size="mini">展开</el-button>
            <el-button class="btn" @click="toggleCls(2)" :class="{hide:isCollapse}" size="mini">收缩</el-button>
        </div>
        <el-menu 
            :default-active="onRoutes" 
            :collapse="isCollapse" 
            class="el-menu-vertical-demo" 
            theme="dark" 
            unique-opened 
            router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item 
                            v-for="(subItem,i) in item.subs" 
                            :key="i" 
                            :index="subItem.index">
                            <span>{{ subItem.title}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'setting',
                        title: '部门和用户设置'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'permissionSettings',
                        title: '角色和权限设置',

                    },
                    {
                        icon: 'el-icon-date',
                        index: 'companyInfo',
                        title: '公司信息',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'joinCompany',
                        title: '加盟公司管理'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: 'Franchisee',
                        title: '加盟商管理'
                    }
                ]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            },
            
        },
        methods: {
            toggleCls(flag) {
                if (flag == 1) {
                    this.isCollapse = false;
                    this.$emit('increment','2')
                } else {
                    this.isCollapse = true;
                    this.$emit('increment','1')
                }
            }
        },
         mounted() {
            const that = this;
            window.onresize = function temp() {
                console.log('methos::'+document.body.clientWidth)
                if (document.body.clientWidth< 850) {
                    that.$emit('increment','1')
                    that.isCollapse = true
                } else {
                    that.$emit('increment','2')
                    that.isCollapse = false
                }
                // that.clientHeight = `${document.documentElement.clientHeight}px`;
            };
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        /* width: 250px; */
        /* min-width: 180px; */
        padding: 0 5px;
        left: 0;
        top: 70px;
        bottom: 0;
        /* background: #324157; */
    }
    .minW {
        min-width: 180px;
    }
    .sidebar > ul {
        height: 100%;
        
    }
    .btnGround {
        line-height: 30px;
        text-align: center;
        border-right: 1px solid #e6e6e6;
    }
    .hide {
        display: none;
    }
</style>
