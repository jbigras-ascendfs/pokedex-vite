import { createApp } from 'vue'
import App from './App.vue'
import Store from '/src/store'
import Router from '/src/router'

const app = createApp(App);

app.use(Router);
app.use(Store);

app.mount('#app');
