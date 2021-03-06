import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Uploads from '../views/Uploads.vue'
import Plans from '../views/Plans.vue'
import Checkout from '../views/Checkout.vue'
import Account from '../views/Account.vue'
import Swap from '../views/Swap.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/uploads',
    name: 'uploads',
    component: Uploads
  },
  {
    path: '/plans',
    name: 'plans',
    component: Plans
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    props: route => ({ plan: route.query.plan })
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/swap',
    name: 'swap',
    component: Swap
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
