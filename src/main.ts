import 'animate.css';
import * as bootstrap from 'bootstrap';
import { createPinia } from 'pinia';
import 'sweetalert2/src/sweetalert2.scss';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './sass/app.scss';
import './scripts/alerts';

const app = createApp(App)
const pinia = createPinia();

app.provide('boostrap', bootstrap)
app.use(pinia);
app.use(router)

app.mount('#app')
