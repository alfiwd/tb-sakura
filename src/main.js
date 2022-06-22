import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

import "ant-design-vue/dist/antd.css";
import "./assets/main.css";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App);
const options = {
  // You can set your default options here
};

app.use(Toast, options);

app.use(router);
app.use(Antd);

app.mount("#app");
