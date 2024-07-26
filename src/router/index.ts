import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

import Dept from "../views/Dept.vue";
import Emp from "../views/Emp.vue";
import Pinia from "../views/Pinia.vue";
import NotFound from "./NotFound.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        redirect:'/home/dept',   
    },
    {
        path: '/home',
        component: Home,
        children: [
            { path:'dept', component:Dept,props: true },
            { path: 'emp', component: Emp },
            { path: 'pinia', component: Pinia}
            
        ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

  ]
})

export default router
