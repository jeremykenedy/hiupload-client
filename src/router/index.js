import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Uploads from '../views/Uploads.vue'
import Plans from '../views/Plans.vue'
import Checkout from '../views/Checkout.vue'
import Account from '../views/Account.vue'
import Swap from '../views/Swap.vue'
import Download from '../views/Download.vue'

import middlewarePipeline from './middlewarePipeline'
import auth from '@/middleware/auth'
import subscribed from '@/middleware/subscribed'
import guest from '@/middleware/guest'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/uploads',
    name: 'uploads',
    component: Uploads,
    meta: {
      middleware: [auth]
    }
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
    props: route => ({ plan: route.query.plan }),
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/swap',
    name: 'swap',
    component: Swap,
    meta: {
      middleware: [auth, subscribed]
    }
  },
  {
    path: '/download/:uuid',
    name: 'download',
    component: Download,
    props: route => ({ uuid: route.params.uuid, token: route.query.token })
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {

  if (!to.meta.middleware) {
    return next();
  }

  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    store,
    next
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

export default router
