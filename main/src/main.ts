import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import WujieVue from 'wujie-vue3'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth'

const { preloadApp } = WujieVue
const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(WujieVue)

// 获取环境变量
const isProd = import.meta.env.PROD
const BASE_URL = isProd ? 'http://62.234.77.244' : '//localhost'

// 获取 store
const authStore = useAuthStore()

// 子应用通用配置生成函数
const createSubAppConfig = (name: string, port: string) => ({
  name,
  url: `${BASE_URL}:${isProd ? '80' : port}/`,
  exec: true,
  sync: true,
  alive: true,
  prefix: {
    [`${BASE_URL}:${isProd ? '80' : port}/`]: `${BASE_URL}:${isProd ? '80' : port}/`
  },
  degrade: false,
  props: {
    token: authStore.token,
    getToken: () => authStore.token // 添加一个方法来获取最新的token
  }
})

// 配置子应用
const subVue2Config = createSubAppConfig('sub-vue2', '8001')
// 预加载子应用
preloadApp(subVue2Config)

WujieVue.setupApp({
  ...subVue2Config,
  props: {
    token: authStore.token,
    getToken: () => authStore.token
  }
})

app.mount('#app')
