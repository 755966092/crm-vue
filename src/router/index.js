import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/workbench',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/workbench/Workbench.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/clue',
                    component: resolve => require(['../components/page/workbench/clue.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/client',
                    component: resolve => require(['../components/page/workbench/Client.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/contract',
                    component: resolve => require(['../components/page/workbench/Contract.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/logpage',
                    component: resolve => require(['../components/page/workbench/LogPage.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/Report_FollowUp',
                    component: resolve => require(['../components/page/workbench/reportCenter/Report_FollowUp.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/Report_AddBusiness',
                    component: resolve => require(['../components/page/workbench/reportCenter/Report_AddBusiness.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/Report_ContractSummary',
                    component: resolve => require(['../components/page/workbench/reportCenter/Report_ContractSummary.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/Report_CustomerType',
                    component: resolve => require(['../components/page/workbench/reportCenter/Report_CustomerType.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/Report_SalesRankings',
                    component: resolve => require(['../components/page/workbench/reportCenter/Report_SalesRankings.vue'], resolve)    // 拖拽列表组件
                },
                

            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/setting',
            component: resolve => require(['../components/page/setting/Setting.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/setting/userSetting.vue'], resolve)
                },{
                    path: '/permissionSettings',
                    component: resolve => require(['../components/page/setting/permissionSettings.vue'], resolve)
                },{
                    path: '/companyInfo',
                    component: resolve => require(['../components/page/setting/companyInfo.vue'], resolve)
                },{
                    path: '/joinCompany',
                    component: resolve => require(['../components/page/setting/joinCompany.vue'], resolve)
                },{
                    path: '/Franchisee',
                    component: resolve => require(['../components/page/setting/Franchisee.vue'], resolve)
                },
            ]
        }
    ]
})
