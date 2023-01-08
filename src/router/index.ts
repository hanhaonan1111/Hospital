import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from '@/stores/index'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/Login/index.vue') },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: '/home', component: import('@/views/Home/index.vue') },
        { path: '/article', component: import('@/views/Article/index.vue') },
        { path: '/notify', component: import('@/views/Notify/index.vue') },
        { path: '/user', component: import('@/views/User/index.vue') },
      ]
    }
  ],
});

const whiteList = ['/login']  //白名单
router.beforeEach((to, from, next) => {
  let { path } = to
  let { user } = useUserStore()
  let token = user?.token
  // 既没有token,还要访问黑名单路由
  if (!token && whiteList.indexOf(path) === -1) {
    next('/login')
  }
  next()


})
export default router;
