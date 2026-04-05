import { createRouter, createWebHistory } from 'vue-router'

// Import pages
import Home from '../views/Home.vue'
import SignUp from '../components/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('users')

  //  Not logged in → block Home
  if (to.path === '/' && !user) {
    return next('/signup')
  }

  //  Already logged in → block Signup
  if (to.path === '/signup' && user) {
    return next('/')
  }

  next()
})

export default router