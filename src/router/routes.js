
 const routes = [
   {
path: '/',
    component: () => import('layouts/MainLayout.vue'),
     children: [
       { path: '', component: () => import('pages/Index.vue') },
       { path: '/dishes', component: () => import('pages/DishesPage.vue')},
       { path: '/dish/:id', component: () => import('pages/DishPage.vue')},
       { path: '/employees', component: () => import('pages/EmployeesPage.vue')},
       { path: '/menu', component: () => import('pages/MenuPage.vue')},
       { path: '/recipe/:id', component: () => import('pages/RecipePage.vue')},
       { path: '/profile', component: () => import('pages/ProfilePage.vue'), meta: { requiresAuth: true, roles: ['user'] } },
       {path: '/addDish', component:()=>import ('pages/AddDishPage.vue'), meta: { requiresAuth: true, roles: ['admin'] } } ,
       {path: '/addRecipe/:id', component: ()=> import('pages/AddRecipePage.vue'), meta: { requiresAuth: true, roles: ['admin'] }}

     ]
   },

  // Always leave this as last one,
  {
    path: '*',
   component: () => import('pages/Error404.vue')
   }
 ]



export default routes

