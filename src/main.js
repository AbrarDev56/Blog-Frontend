import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import InstantSearch from 'vue-instantsearch/vue3/es'
// import InstantSearch from 'vue-instantsearch'

axios.defaults.baseURL = 'http://localhost:1337/api/'

import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(InstantSearch)
app.use(pinia)
app.use(router, axios)

app.mount('#app')

import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';