import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Quickstart from '../views/Quickstart.vue'
import Authentication from '../views/Authentication.vue'
import Endpoints from '../views/Endpoints.vue'
import Websockets from '../views/Websockets.vue'
import Workflows from '../views/Workflows.vue'
import Changelog from '../views/Changelog.vue'
import Support from '../views/Support.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/quickstart',
    name: 'quickstart',
    component: Quickstart
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: Authentication
  },
  {
    path: '/endpoints',
    name: 'endpoints',
    component: Endpoints
  },
  {
    path: '/websockets',
    name: 'websockets',
    component: Websockets
  },
  {
    path: '/workflows',
    name: 'workflows',
    component: Workflows
  },
  {
    path: '/changelog',
    name: 'changelog',
    component: Changelog
  },
  {
    path: '/support',
    name: 'support',
    component: Support
  },
]

const router = createRouter({
  history: createWebHistory('/cpwebapi'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
