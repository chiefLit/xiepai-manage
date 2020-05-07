import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    redirect: '/order-manage'
  },

  {
    path: '/order-manage',
    redirect: '/order-manage/wash'
  },

  {
    path: '/order-manage/wash',
    component: Layout,
    name: 'orderManage.wash',
    redirect: '/order-manage/wash/all',
    meta: { title: '洗鞋订单', icon: 'form', routeable: true, code: 'ORDER_MANAGE' },
    children: [
      {
        path: 'all',
        name: 'orderManage.wash.all',
        component: () => import('@/views/orderWash/orderList.all'),
        meta: { title: '全部', routeable: true, code: 'ORDER_MANAGE_ALL' }
      },
      {
        path: 'waitCustomerPay',
        name: 'orderManage.wash.waitCustomerPay',
        component: () => import('@/views/orderWash/orderList.waitCustomerPay'),
        meta: { title: '待支付', routeable: true, code: 'ORDER_MANAGE_WAIT_PAY' }
      },
      {
        path: 'waitCustomerSend',
        name: 'orderManage.wash.waitCustomerSend',
        component: () => import('@/views/orderWash/orderList.waitCustomerSend'),
        meta: { title: '待客户寄鞋', routeable: true, code: 'ORDER_MANAGE_WAIT_EX' }
      },
      {
        path: 'waitReceipt',
        name: 'orderManage.wash.waitReceipt',
        component: () => import('@/views/orderWash/orderList.waitReceipt'),
        meta: { title: '待接收', routeable: true, code: 'ORDER_MANAGE_WAIT_RECV' }
      },
      {
        path: 'doWash',
        name: 'orderManage.wash.doWash',
        component: () => import('@/views/orderWash/orderList.doWash'),
        meta: { title: '处理中', routeable: true, code: 'ORDER_MANAGE_PROING' }
      },
      {
        path: 'waitCustomerReceipt',
        name: 'orderManage.wash.waitCustomerReceipt',
        component: () => import('@/views/orderWash/orderList.waitCustomerReceipt'),
        meta: { title: '待客户收鞋', routeable: true, code: 'ORDER_MANAGE_WAIT_OVER' }
      },
      {
        path: 'detail',
        name: 'orderManage.wash.detail',
        component: () => import('@/views/orderWash/orderDetail'),
        meta: { title: '详情', routeable: false },
        hidden: true
      }
    ]
  },

  {
    path: '/goodz-manage',
    component: Layout,
    name: 'goodzManage',
    redirect: '/goodz-manage/list',
    meta: { title: '商品管理', icon: 'dashboard', routeable: true, code: 'GOODZ_MANAGE' },
    children: [
      {
        path: 'list',
        name: 'goodzManage.list',
        component: () => import('@/views/goodzManage/goodz-list'),
        meta: { title: '商品管理', routeable: true, code: 'GOODZ_MANAGE' }
      }
    ]
  },

  {
    path: '/financial-manage',
    component: Layout,
    name: 'financialManage',
    redirect: '/financial-manage/platform',
    meta: { title: '财务管理', icon: 'nested', routeable: true, code: 'FUND_MANAGE' },
    children: [
      {
        path: 'platform',
        name: 'financialManage.platform',
        component: () => import('@/views/financialManage/financial-platform'),
        meta: { title: '平台流水', routeable: true, code: 'FUND_LOG_PLATFORM' }
      },
      {
        path: 'store',
        name: 'financialManage.store',
        component: () => import('@/views/financialManage/financial-store'),
        meta: { title: '店铺流水', routeable: true, code: 'FUND_LOG_STORE' }
      }
    ]
  },

  {
    path: '/system-manage',
    component: Layout,
    name: 'systemManage',
    redirect: '/system-manage/user',
    meta: { title: '系统管理', icon: 'tree', routeable: true, code: 'SYSTEM_MANAGE' },
    children: [
      {
        path: 'user',
        name: 'systemManage.user',
        component: () => import('@/views/systemManage/user-manage'),
        meta: { title: '用户管理', routeable: true, code: 'USER_MANAGE' }
      },
      {
        path: 'role',
        name: 'systemManage.role',
        component: () => import('@/views/systemManage/role-manage'),
        meta: { title: '角色管理', routeable: true, code: 'ROLE_MANAGE' }
      },
      {
        path: 'store',
        name: 'systemManage.store',
        component: () => import('@/views/systemManage/store-manage'),
        meta: { title: '店铺管理', routeable: true, code: 'STORE_MANAGE' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
