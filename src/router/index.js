import { createRouter, createWebHashHistory } from 'vue-router'
export const LAYOUT_ASSETS = () => import('@/layouts/assets/index.vue');

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/dataAnalysis'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    // {
    //   path: '/overview',
    //   name: 'overview',
    //   meta:{breadcrumbsName:'统计概览'},
    //   component: () => import('../views/overview/index.vue')
    // },
    {
      path: '/dataAnalysis',
      name: 'dataAnalysis',
      meta:{breadcrumbsName:'数据分析'},
      component: () => import('../views/dataAnalysis/index.vue')
    },
    {
      path: '/assets',
      name: 'assets',
      // meta:{breadcrumbsName:'资产管理1'},
      component: LAYOUT_ASSETS,
      redirect: '/assets/government',
      children: [
        {
          "name": "government",
          "path": "/assets/government",
          "component": () => import("@/views/assets/government/index.vue"),
           meta:{breadcrumbsName:'资产管理'},
        },
        {
          "name": "govDetail",
          "path": "/assets/government/detail",
          "component": () => import("@/views/assets/government/detail.vue"),
           meta:{breadcrumbsName:'资产管理'},
        },
        {
          "name": "company",
          "path": "/assets/company",
          "component": () => import("@/views/assets/company/index.vue"),
           meta:{breadcrumbsName:'资产管理'},
        },
        {
          "name": "companyDetail",
          "path": "/assets/company/detail",
          "component": () => import("@/views/assets/company/detail.vue"),
           meta:{breadcrumbsName:'资产管理'},
        },
        {
          "name": "person",
          "path": "/assets/person",
          "component": () => import("@/views/assets/person/index.vue"),
           meta:{breadcrumbsName:'资产管理'},
        },
        {
          "name": "personDetail",
          "path": "/assets/person/detail",
          "component": () => import("@/views/assets/person/detail.vue"),
           meta:{breadcrumbsName:'资产管理'},
        }
      ],
    },
    {
      path: '/sysUser',
      name: 'sysUser',
      meta:{breadcrumbsName:'用户管理'},
      component: () => import(/* webpackChunkName: "vipmanage" */ '../views/sysUser/index.vue')
    },
    {
      path: '/weightManage',
      name: 'weightManage',
      meta:{breadcrumbsName:'权重管理'},
      component: () => import(/* webpackChunkName: "vipmanage" */ '../views/weightManage/index.vue')
    }
  ]
})

export default router