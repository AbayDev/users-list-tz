import App from './app/ui/App.vue'
import { createApp } from 'vue'
import { initPinia } from './app/providers/pinia'
import { initRouter } from './app/providers/router'
import { initAxios } from './app/providers/axios'
import './app/styles/index.scss'

/**
 * Инициализация приложения
 */
const initApp = () => {
  const app = createApp(App)

  initAxios()
  app.use(initPinia())
  app.use(initRouter())

  return app
}

initApp().mount('#app')
