import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import elementui from "./utils/elementui";
import { microAppStart } from "./utils/microApps";
Vue.config.productionTip = false;
import "./styles/index.scss";

elementui(Vue);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

microAppStart();
