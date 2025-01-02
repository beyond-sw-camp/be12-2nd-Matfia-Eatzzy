import { createApp } from "vue";
import "./reset.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
//import piniaPersistedstate from "pinia-plugin-persistedstate";

import VCalendar from "v-calendar";
import "v-calendar/style.css";

import "vue3-carousel/dist/carousel.css";
import { VueSpinnersPlugin } from "vue3-spinners";

const pinia = createPinia();
//pinia.use(piniaPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);

// v-calendar
app.use(VCalendar, {});

app.use(VueSpinnersPlugin);

app.mount("#app");
