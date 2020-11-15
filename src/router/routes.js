
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
       {path: '/addDish', component:()=>import ('pages/AddDishPage.vue')},
       {path: '/addRecipe/:id', component: ()=> import('pages/AddRecipePage.vue')}

     ]
   },

  // Always leave this as last one,
  {
    path: '*',
   component: () => import('pages/Error404.vue')
   }
 ]



export default routes

