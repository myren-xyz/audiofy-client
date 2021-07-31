import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'

import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Wallet from '../views/Wallet.vue'
import Library from '../views/Library.vue'
import Profile from '../views/Profile.vue'
import Artist from '../views/Artist.vue'
import Album from '../views/Album.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Audiofy Homepage'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: 'Audiofy | Search'
    }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet,
    meta: {
      title: 'Audiofy | Wallet'
    }
  },
  {
    path: '/library',
    name: 'Library',
    component: Library,
    meta: {
      title: 'Audiofy | Your Library'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Audiofy | Your Profile'
    }
  },
  {
    path: '/artist/:username',
    name: 'Artist',
    component: Artist,
  },
  {
    path: '/album/:album_identifier',
    name: 'Album',
    component: Album
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
