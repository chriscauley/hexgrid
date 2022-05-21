import { createApp } from 'vue'
import form from '@unrest/vue-form'

import store from './store'
import App from './App.vue'

import '@unrest/tailwind/dist.css'

createApp(App)
  .use(form)
  .use(store)
  .mount('#app')
