
 const routes = [
   {
path: '/',
    component: () => import('layouts/MainLayout.vue'),
     children: [
       { path: '', component: () => import('pages/Index.vue') }
     ]
   },

  // Always leave this as last one,
  {
    path: '*',
   component: () => import('pages/Error404.vue')
   }
 ]

// export default routes


// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/application/Index.vue') },
//       { path: '/menu', component: () => import('pages/MenuPage'), meta: { requiresAuth: true, requiresOwner: true } },
//       { path: '/my-vehicles', component: () => import('pages/application/VehiclesPage.vue'), meta: { requiresAuth: true, requiresOwner: true } },
//       { path: '/reservations', component: () => import('pages/application/ReservationsPage.vue'), meta: { requiresAuth: true } },
//       { path: '/requests', component: () => import('pages/application/RequestsPage'), meta: { requiresAuth: true, requiresOwner: true } },
//       { path: '/help', component: () => import('pages/application/HelpPage.vue') },
//       { path: '/about', component: () => import('pages/application/AboutPage.vue') },
//       { path: '/search', component: () => import('pages/application/SearchPage.vue') },
//       { path: '/user/details/:userId', component: () => import('pages/application/UserInfoPage.vue') },
//       { path: '/vehicle/:id/details', component: () => import('pages/application/VehicleDetailsPage.vue') },
//       { path: '/profile', component: () => import('pages/application/ProfilePage.vue'), meta: { requiresAuth: true } },
//       { path: '/resetPassword', component: () => import('pages/application/ResetPasswordPage.vue') }
//     ]
//   },
//   {
//     path: '/administration',
//     component: () => import('layouts/AdminLayout')
//   }


// Always leave this as last one


export default routes

