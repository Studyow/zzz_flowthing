import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddCookie from '@/components/AddCookie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-cookie',
      name: 'AddCookie',
      component: AddCookie
    }
  ]
})
