<template>
    <div class="sidebar" :class="{minW: !isCollapse}">
        <div class="btnGround">
            <!-- <span class="btn" @click="toggleCls(1)" :class="{hide:!isCollapse}">展开</span> -->
            <!-- <span class="btn" @click="toggleCls(2)" :class="{hide:isCollapse}">收缩</span> -->
            <el-button class="btn" @click="toggleCls(1)" :class="{hide:!isCollapse}" size="mini">展开</el-button>
            <el-button class="btn" @click="toggleCls(2)" :class="{hide:isCollapse}" size="mini">收缩</el-button>
        </div>
        <!--<el-menu  :default-active="$route.path"  class="el-menu-vertical-demo" theme="dark" unique-opened router>-->
        <el-menu
            :default-active="onRoutes"
            @select="selectEvent"
            class="el-menu-vertical-demo"
            theme="dark"
            :collapse="isCollapse"
            unique-opened
            router>
            <div v-for="item in items" :key="item.title" v-if="item.show">
            <!-- <div v-for="item in items" :key="item.title" > -->
                <template v-if="item.subs ">
                    <el-submenu :index="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item 
                            v-for="(subItem,i) in item.subs" 
                            :key="i" 
                            :index="subItem.index">
                            {{ subItem.title }}
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
                quanxian: localStorage.getItem('role_opat_auth').split(','),
                isCollapse: false,
                currentIndex: '/workbench',
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '/workbench',
                        title: '工作台'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '/clue',
                        title: '线索',
                    },
                    {
                        icon: 'el-icon-date',
                        index: '/client',
                        title: '客户',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/contract',
                        title: '合同'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: '4',
                        title: '表报中心',
                        subs: [
                            {
                                index: '/Report_FollowUp',
                                title: '跟进记录报表'
                            },
                            {
                                index: '/Report_AddBusiness',
                                title: '业务新增汇总报表'
                            },
                            {
                                index: '/Report_ContractSummary',
                                title: '合同汇总报表'
                            }, {
                                index: '/Report_SalesRankings',
                                title: '销售额排名报表'
                            }, {
                                index: '/Report_CustomerType',
                                title: '客户类型统计报表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '/logpage',
                        title: '日志'
                    }
                ]
            }
        },
        computed: {
            onRoutes() {
                // console.log('slidevar:' + this.$route.path)
                let path = this.$route.path.split('/');
                // console.log('slidevar,,:' + path[1])
                // return this.$route.path.replace('/', '');
                // return this.$route.path
                return '/'+path[1]
            },

        },
        methods: {
            selectEvent(data, index) {
                // this.$route.path = data
            },
            win() {
                window.onresize = function(){
                    console.log(document.body.clientWidth)
                    if (document.body.clientWidth == 800) {
                        self.isCollapse = true;
                        
                    } else {
                        self.isCollapse = false
                    }
                }
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
            let arr = [
                    {
                        icon: 'el-icon-setting',
                        index: '/workbench',
                        title: '工作台',
                        show: true
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '/clue',
                        title: '线索',
                        show: this.quanxian.indexOf('1')>-1?true:false
                    },
                    {
                        icon: 'el-icon-date',
                        index: '/client',
                        title: '客户',
                        show: this.quanxian.indexOf('13')>-1?true:false
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '/contract',
                        title: '合同',
                        show: this.quanxian.indexOf('24')>-1?true:false
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: '4',
                        title: '表报中心',
                        show: this.quanxian.indexOf('40')>-1?true:false,
                        subs: [
                            {
                                index: '/Report_FollowUp',
                                title: '跟进记录报表'
                            },
                            {
                                index: '/Report_AddBusiness',
                                title: '业务新增汇总报表'
                            },
                            {
                                index: '/Report_ContractSummary',
                                title: '合同汇总报表'
                            }, {
                                index: '/Report_SalesRankings',
                                title: '销售额排名报表'
                            }, {
                                index: '/Report_CustomerType',
                                title: '客户类型统计报表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: '/logpage',
                        title: '日志',
                        show: true,
                    }
                ]
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

    #wrap {
        min-width: 800px;
    }


    .el-submenu .el-menu-item {
        padding: 0;
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
