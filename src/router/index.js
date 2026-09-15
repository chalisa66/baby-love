import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Love from '../views/Love.vue'
import Video from '../views/Video.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/love',
      name: 'Love',
      component: Love
    },

    {
      path: '/video',
      name: 'Video',
      component: Video
    }
  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router