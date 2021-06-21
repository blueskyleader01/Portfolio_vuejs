import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: '/',
         name: 'Home',
         redirect: {
            name: 'SpesificPage',
            params: {
               page: 0
            }
         }
      },
      {
         path: '/:pathMatch(.*)*',
         name: 'NotFound',
         redirect: {
            name: 'SpesificPage',
            params: {
               page: 0
            }
         }
      },
      {
         path: '/:page(\\d+)',
         name: 'SpesificPage',
         component: () => import('/src/pages/Home.vue')
      }
   ]
});

export default router;