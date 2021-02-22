const routes = [
  {
    path: '/login',
    component: () => import('pages/login')
  },
  {
    path: '/',
    component: () => import('layouts/default'),
    meta: {
      requiresAuth: true
    },
    children: [
      // { path: '/home', component: () => import('pages/index') },
      {path: 'categories', component: () => import('pages/categories')},
      {path: 'goals', component: () => import('pages/goals')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
