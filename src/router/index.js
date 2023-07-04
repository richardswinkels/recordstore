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
    },
    {
      name: 'Store',
      path: '/store',
      component: StoreView,
    },
    {
      name: 'ProductDetail',
      path: '/products/:id',
      component: ProductDetailView,
    },
    {
      name: 'Contact',
      path: '/contact',
      component: ContactView,
    },
    {
      name: 'News',
      path: '/news',
      component: NewsView,
    },
    {
      name: 'NewsArticle',
      path: '/news-article/:id',
      component: NewsArticleView,
    },
    {
      name: 'Cart',
      path: '/cart',
      component: CartView,
    },
    {
      name: 'Order',
      path: '/order',
      component: OrderView,
    },
  ],
})

export default router
