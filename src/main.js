import { createApp } from 'vue'
import App from './App.vue'
import Store from '/src/store'
import Router from '/src/router'
import '/src/global/styles.sass'

const app = createApp(App);

app.use(Router);
app.use(Store);

app.mount('#app');
