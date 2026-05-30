import { createApp } from "vue"
import "./app/styles/index.css"
import "element-plus/dist/index.css"
import App from "./App.vue"
import ElementPlus from "element-plus"
import { router } from "./app/providers/router.ts"
import { createPinia } from "pinia"

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(ElementPlus).mount("#app")
