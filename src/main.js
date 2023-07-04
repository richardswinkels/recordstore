import { createApp } from 'vue';
import App from './App.vue';

import VueAxios from 'vue-axios';
import VueGtag from "vue-gtag";
import router from './router';
import store from './store';
import axios from 'axios';

import '@fontsource-variable/raleway';
import '@fontsource/lobster';
import './styles/app.css';
import './registerServiceWorker'

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(store);
app.use(VueGtag, {
  appName: 'VinylVibes',
  pageTrackerScreenviewEnabled: true,
  config: {
    id: 'G-9NQPVKBHF0',
  },
}, router)
app.mount('#app');
