import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddCookie from '@/components/AddCookie'
import EditCookie from '@/components/EditCookie'

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
    },
    {
      path: '/edit-cookie/:cookie_slug',
      name: 'EditCookie',
      component: EditCookie
    }
  ]
})
