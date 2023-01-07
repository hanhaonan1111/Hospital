import pinia from "@/stores";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 导入组件库vant
import "vant/lib/index.css";
// 导入自定义全局样式(可能会覆盖vant部分样式)
import "./styles/main.scss";
const app = createApp(App);
// store数据持久化存储
app.use(pinia);
app.use(router);

app.mount("#app");
