import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
//数据持久化，刷新页面数据不丢失
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router/index";
import { createPinia } from "pinia";
const store = createPinia();
store.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");
