import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

store.dispatch('auth/me').then(() => {
  createApp(App).use(store).use(router).use(VueSweetalert2).mount('#app');
});
