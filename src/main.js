import { createApp }  from 'vue';
import { createPinia } from 'pinia';
import AppComponent from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(AppComponent).use(pinia).use(router).mount('#app');
