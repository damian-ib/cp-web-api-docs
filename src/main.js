import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import VueCodeHighlight from 'vue-code-highlight';
import '../node_modules/vue-code-highlight/themes/prism.css';
import '@/styles/theme-common.css';
import '@/styles/theme-light.css';

createApp(App)
    .use(VueCodeHighlight)
    .use(router)
    .use(createPinia())
    .mount('#app')
