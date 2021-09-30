import { createApp } from 'vue'
import '@fortawesome/fontawesome-free';
import 'bulma'

import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
