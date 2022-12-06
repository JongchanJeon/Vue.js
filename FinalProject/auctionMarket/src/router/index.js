import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Main from '@/components/Main'
import Product from '@/components/Product'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      props: true
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      props:true
    },
    {
      path: '/product/:id',
      name: 'Id',
      component: Product,
      props: true,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
