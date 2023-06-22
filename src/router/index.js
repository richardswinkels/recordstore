import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView';
import StoreView from '@/views/StoreView';
import ProductDetailView from '@/views/ProductDetailView';
import ContactView from '@/views/ContactView';
import NewsView from '@/views/NewsView';
import NewsArticleView from '@/views/NewsArticleView';
import CartView from '@/views/CartView';
import OrderView from '@/views/OrderView';

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
        {
            name: 'Store',
            path: '/store',
            component: StoreView,
            meta: {
                title: 'VinylVibes - Store'
            }
        },
        {
            name: 'ProductDetail',
            path: '/products/:id',
            component: ProductDetailView,
            meta: {
                title: 'VinylVibes - Product'
            }
        },
        {
            name: 'Contact',
            path: '/contact',
            component: ContactView,
            meta: {
                title: 'VinylVibes - Contact'
            }
        },
        {
            name: 'News',
            path: '/news',
            component: NewsView,
            meta: {
                title: 'VinylVibes - News'
            }   
        },
        {
            name: 'NewsArticle',
            path: '/news-article/:id',
            component: NewsArticleView,
            meta: {
                title: 'VinylVibes - Article'
            }
        },
        {
            name: 'Cart',
            path: '/cart',
            component: CartView,
            meta: {
                title: 'VinylVibes - Cart'
            }
        },
        {
            name: 'Order',
            path: '/order',
            component: OrderView,
            meta: {
                title: 'VinylVibes - Order'
            }
        },
    ],
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router
