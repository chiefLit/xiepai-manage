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
    redirect: '/order'
  },

  {
    path: '/order',
    redirect: '/order/wash'
  },

  {
    path: '/order/wash',
    component: Layout,
    name: 'order.wash',
    redirect: '/order/wash/all',
    meta: { title: '洗鞋订单', icon: 'form', routeable: true },
    children: [
      {
        path: 'all',
        name: 'order.wash.all',
        component: () => import('@/views/orderWash/orderList.all'),
        meta: { title: '全部', routeable: true }
      },
      {
        path: 'waitCustomerPay',
        name: 'order.wash.waitCustomerPay',
        component: () => import('@/views/orderWash/orderList.waitCustomerPay'),
        meta: { title: '待支付', routeable: true }
      },
      {
        path: 'waitCustomerSend',
        name: 'order.wash.waitCustomerSend',
        component: () => import('@/views/orderWash/orderList.waitCustomerSend'),
        meta: { title: '待客户寄鞋', routeable: true }
      },
      {
        path: 'waitReceipt',
        name: 'order.wash.waitReceipt',
        component: () => import('@/views/orderWash/orderList.waitReceipt'),
        meta: { title: '待接收', routeable: true }
      },
      {
        path: 'doWash',
        name: 'order.wash.doWash',
        component: () => import('@/views/orderWash/orderList.doWash'),
        meta: { title: '处理中', routeable: true }
      },
      {
        path: 'waitCustomerReceipt',
        name: 'order.wash.waitCustomerReceipt',
        component: () => import('@/views/orderWash/orderList.waitCustomerReceipt'),
        meta: { title: '待客户收鞋', routeable: true }
      },
      {
        path: 'detail',
        name: 'order.wash.detail',
        component: () => import('@/views/orderWash/orderDetail'),
        meta: { title: '详情', routeable: true },
        hidden: true
      }
    ]
  },

  {
    path: '/goodz',
    component: Layout,
    name: 'goodz',
    redirect: '/goodz/list',
    meta: { title: '商品管理', icon: 'dashboard', routeable: true },
    children: [
      {
        path: 'list',
        name: 'goodz.list',
        component: () => import('@/views/goodzManage/goodz-list'),
        meta: { title: '商品管理', routeable: true }
      }
    ]
  },

  {
    path: '/financial-manage',
    component: Layout,
    name: 'financialManage',
    redirect: '/financial-manage/user',
    meta: { title: '财务管理', icon: 'nested', routeable: true },
    children: [
      {
        path: 'platform',
        name: 'financialManage.platform',
        component: () => import('@/views/financialManage/financial-platform'),
        meta: { title: '平台流水', routeable: true }
      },
      {
        path: 'store',
        name: 'financialManage.store',
        component: () => import('@/views/financialManage/financial-store'),
        meta: { title: '店铺流水', routeable: true }
      }
    ]
  },

  {
    path: '/system-manage',
    component: Layout,
    name: 'systemManage',
    redirect: '/system-manage/user',
    meta: { title: '系统管理', icon: 'tree', routeable: true },
    children: [
      {
        path: 'user',
        name: 'systemManage.user',
        component: () => import('@/views/systemManage/user-manage'),
        meta: { title: '用户管理', routeable: true }
      },
      {
        path: 'role',
        name: 'systemManage.role',
        component: () => import('@/views/systemManage/role-manage'),
        meta: { title: '角色管理', routeable: true }
      },
      {
        path: 'store',
        name: 'systemManage.store',
        component: () => import('@/views/systemManage/store-manage'),
        meta: { title: '店铺管理', routeable: true }
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
