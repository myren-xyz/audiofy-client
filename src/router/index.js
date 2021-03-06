import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Audiofy Homepage'
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      title: 'Audiofy | Search'
    }
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import('../views/Wallet.vue'),
    meta: {
      title: 'Audiofy | Wallet'
    }
  },
  {
    path: '/library',
    name: 'Library',
    component: ()=> import('../views/Library.vue'),
    meta: {
      title: 'Audiofy | Your Library'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ()=> import('../views/Profile.vue'),
    meta: {
      title: 'Audiofy | Your Profile'
    }
  },
  {
    path: '/artist/:username',
    name: 'Artist',
    component: ()=> import('../views/Artist.vue'),
  },
  {
    path: '/album/:album_identifier',
    name: 'Album',
    component: ()=> import('../views/Album.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: ()=> import('../views/admin/dashboard.vue')
  },
  {
    path: '/admin/songs',
    name: 'Songs',
    component: ()=> import('../views/admin/songs.vue')
  },
  {
    path: '/admin/songs/upload',
    name: 'Upload Song',
    component: ()=> import('../views/admin/songs/upload.vue')
  },
  {
    path: '/admin/songs/edit/:id',
    name: 'Edit Song',
    component: ()=> import('../views/admin/songs/upload.vue')
  },
  {
    path: '/admin/artists',
    name: 'Artists',
    component: ()=> import('../views/admin/artists.vue')
  },
  {
    path: '/admin/artists/create',
    name: 'Create Artist',
    component: ()=> import('../views/admin/artists/create.vue')
  },
  {
    path: '/admin/artists/edit/:id',
    name: 'Edit Artist',
    component: ()=> import('../views/admin/artists/create.vue')
  },
  {
    path: '/me/liked',
    name: 'Liked Songs',
    component: ()=> import('../views/me/likes.vue')
  },
  {
    path: '/me/playlist/:playlist_identifier',
    name: 'Liked Songs',
    component: ()=> import('../views/me/playlists.vue')
  },
  {
    path: '/me/follows',
    name: 'Followed Artists',
    component: ()=> import('../views/me/follows.vue')
  },
  {
    path: '/play/:song_identifier',
    name: 'Play Song',
    component: () => import('../views/Home.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
  });
});

export default router
