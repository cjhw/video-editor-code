import { createApp } from "vue";
import "ant-design-vue/dist/antd.css";
import App from "./App.vue";
import "./global/global.scss";

const app = createApp(App);

app.mount("#app");
