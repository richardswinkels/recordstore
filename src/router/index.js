import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: HomeView,
            meta: {
                title: 'VinylVibes - Home'
            }
        },
    ],
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router
