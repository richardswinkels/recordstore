import { createApp } from 'vue';
import App from './App.vue';

import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import axios from 'axios';

import '@vueform/multiselect/themes/default.css';
import '@vueform/slider/themes/default.css';
import '@fontsource-variable/raleway';
import '@fontsource/lobster';
import './styles/app.css';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(store);
app.mount('#app');
