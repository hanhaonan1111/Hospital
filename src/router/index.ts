import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '@/stores/index'
import NProgress from 'nprogress'
// 导入路由切换中的加载动画
import 'nprogress/nprogress.css'
NProgress.configure({
  showSpinner: false
})
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue'), meta: { title: '登录页面' } },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: '/home', component: () => import('@/views/Home/index.vue'), meta: { title: '首页' } },
        { path: '/article', component: () => import('@/views/Article/index.vue'), meta: { title: '健康百科' } },
        { path: '/notify', component: () => import('@/views/Notify/index.vue'), meta: { title: '消息通知' } },
        {
          path: '/user', component: () => import('@/views/User/index.vue'), meta: { title: '个人中心' },
        },
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/HomeFiles/index.vue'),
      meta: { title: '家庭档案' },
    },
    {
      path: '/patient',
      component: () => import('@/views/HomeFiles/index.vue'),
      meta: { title: '选择患者' },
    },
    {
      path: '/consult/fast',
      component: () => import('@/views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' },
    },
    {
      path: '/consult/dep',
      component: () => import('@/views/Consult/ConsultDepartment.vue'),
      meta: { title: '选择科室' },
    },
    {
      path: '/consult/illness',
      component: () => import('@/views/Consult/ConsultDescription.vue'),
      meta: { title: '图文问诊' },
    },
    {
      path: '/consult/pay',
      component: () => import('@/views/Consult/ConsultPay.vue'),
      meta: { title: '支付' },
    },
    {
      path: '/room',
      component: () => import('@/views/Room/index.vue'),
      meta: { title: '问诊聊天室' },
    },
  ],
});

const whiteList = ['/login', '/register']  //白名单
// 路由的前置守卫
router.beforeEach((to, from, next: (s?: | string) => void) => {
  NProgress.start()
  let { path } = to

  let { user } = useUserStore()
  let token = user?.token
  // 既没有token,还要访问黑名单路由
  if (!token && whiteList.indexOf(path) === -1) {
    next('/login')
  } else if (path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})
// 路由的后置守卫
router.afterEach((to) => {
  // 修改标题
  document.title = `天蓝医院-${to.meta.title || ''}`
  //  进度条加载完毕
  NProgress.done()
})
export default router;
