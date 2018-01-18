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
            @select="selectEvent"
            class="el-menu-vertical-demo" 
            theme="dark" 
            unique-opened 
            router>
            <div v-for="item in items" v-if="item.show">
            <!-- <div v-for="item in items"> -->
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
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
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </div>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isCollapse: false,
                quanxian:localStorage.getItem('role_opat_auth').split(','),
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/setting',
                        title: '部门和用户设置'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '/permissionSettings',
                        title: '角色和权限设置',

                    },
                   {
                        icon: 'el-icon-date',
                        index: '/companyInfo',
                        title: '公司信息',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/joinCompany',
                        title: '加盟公司管理'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: '/Franchisee',
                        title: '加盟商管理'
                    }
                ]
            }
        },
        computed: {
            onRoutes() {
                console.log('slidevar:')
                console.log(this.$route);
                // let path = this.$route.path.replace('/', '');
                let path = this.$route.path.split('/');
                // console.log(path);
                
                // return this.$route.path.replace('/', '');
                
                // console.log('slidevar:' + JSON.stringify(this.$route))
                // return this.$route.path.replace('/', '');
                // return this.$route.path
                return '/'+path[1]
            },
            
        },
        methods: {
             selectEvent(data, index) {
                // this.$route.path = data
            },
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
                if (document.body.clientWidth< 850) {
                    that.$emit('increment','1')
                    that.isCollapse = true
                } else {
                    that.$emit('increment','2')
                    that.isCollapse = false
                }
                // that.clientHeight = `${document.documentElement.clientHeight}px`;
            };
            var arr = [
                    {
                        icon: 'el-icon-setting',
                        index: '/setting',
                        title: '部门和用户设置',
                        show: this.quanxian.indexOf('42')>-1?true:false,
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '/permissionSettings',
                        title: '角色和权限设置',
                        show: this.quanxian.indexOf('44')>-1?true:false,

                    },
                   {
                        icon: 'el-icon-date',
                        index: '/companyInfo',
                        title: '公司信息',
                        show: this.quanxian.indexOf('46')>-1?true:false,
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/joinCompany',
                        title: '加盟公司管理',
                        show: this.quanxian.indexOf('48')>-1?true:false,
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: '/Franchisee',
                        title: '加盟商管理',
                        show: this.quanxian.indexOf('49')>-1?true:false,
                    }
                ];
                this.items = arr;
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
