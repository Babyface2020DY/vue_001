import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

 const router = new VueRouter({
  routes: [
     { path: '/', redirect: '/login' },
    // { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
 })

//router.beforeEach((to, from, next) => {
  //  to将要访问的路径
  // from 代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next() 放行  next('/路径“) 强制跳转
  //if (to.path == '/login') return next()
  // 获取token
  //const tokenStr = window.sessionStorage.getItem('token')
  //if (!tokenStr) return next('/login')
  //next()
 //})
export default router