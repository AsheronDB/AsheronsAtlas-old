import { createApp } from 'vue'
import "./assets/style/style.css"
import App from './App.vue'
// import './samples/node-api'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { createPinia } from 'pinia'

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app
  .mount('#app')
  .$nextTick(() => {
    // postMessage({ payload: 'removeLoading' }, '*')
  })
