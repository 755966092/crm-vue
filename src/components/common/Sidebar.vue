<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
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
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'workbench',
                        title: '工作台'
                    },
                    {
                        // icon: 'el-icon-menu',
                        // index: '2',
                        // title: '线索',
                        // subs: [
                        //     {
                        //         index: 'basetable',
                        //         title: '基础表格'
                        //     },
                        //     {
                        //         index: 'vuetable',
                        //         title: 'Vue表格组件'
                        //     }
                        // ]
                        icon: 'el-icon-menu',
                        index: 'clue',
                        title: '线索',
                    },
                    {
                        icon: 'el-icon-date',
                        index: 'client',
                        // index: '3',
                        title: '客户',
                        // subs: [
                        //     {
                        //         index: 'baseform',
                        //         title: '基本表单'
                        //     },
                        //     {
                        //         index: 'vueeditor',
                        //         title: '编辑器'
                        //     },
                        //     {
                        //         index: 'markdown',
                        //         title: 'markdown'
                        //     },
                        //     {
                        //         index: 'upload',
                        //         title: '文件上传'
                        //     }
                        // ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'contract',
                        title: '合同'
                    },
                    {
                        icon: 'el-icon-upload2',
                        index: '4',
                        title: '表报中心',
                        subs: [
                            {
                                index: 'Report_FollowUp',
                                title: '跟进记录报表'
                            },
                            {
                                index: 'Report_AddBusiness',
                                title: '业务新增汇总报表'
                            },
                            {
                                index: 'Report_ContractSummary',
                                title: '合同汇总报表'
                            },{
                                index: 'Report_SalesRankings',
                                title: '销售额排名报表'
                            },{
                                index: 'Report_CustomerType',
                                title: '客户类型统计报表'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'logpage',
                        title: '日志'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        /* width: 250px; */
        min-width: 180px;
        padding: 0 20px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #324157;
    }
    .sidebar > ul {
        height:100%;
    }
    #wrap {
		min-width: 800px;
	}
</style>
