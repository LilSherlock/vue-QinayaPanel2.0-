import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import SvgIcon from "vue3-icon";

import { useAuthStore } from './stores/auth'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
const app = createApp(App)
app.config.globalProperties.$REST_ENDPOINT = 'https://panel.qinaya.co/api/'
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.use(useAuthStore())
app.component("svg-icon", SvgIcon)
app.mount('#app')
