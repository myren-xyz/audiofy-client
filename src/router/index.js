import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'

import Home from '../views/Home.vue'
import Search from '../views/Search.vue'
import Wallet from '../views/Wallet.vue'
import Library from '../views/Library.vue'
import Profile from '../views/Profile.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: Wallet
  },
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
