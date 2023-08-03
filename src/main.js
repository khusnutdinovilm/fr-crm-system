import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth, onAuthStateChanged } from "./firebase";
import "./index.css";
import "materialize-css/dist/js/materialize.min.js";

import messagePlugin from "./utils/message.plugin";
import localizePlugin from "./utils/localize.plugin";
import { tooltipDirective } from "@/utils/directives";

import Loader from "@/components/app/Loader.vue";
import Paginate from "vuejs-paginate-next";
// import { createMetaManager } from "vue-meta";
import { createMetaManager } from "vue-meta";
import { createHead } from "@vueuse/head";

let app;

import ru from "@/locales/ru.json";
import en from "@/locales/en.json";

const locales = {
  "ru-RU": ru,
  "en-US": en,
};

onAuthStateChanged(auth, async (user) => {
  if (!app) {
    app = createApp(App)
      .directive("tooltip", tooltipDirective)
      .component("Loader", Loader)
      .component("Paginate", Paginate)
      .use(messagePlugin)
      .use(localizePlugin, locales)
      .use(store)
      .use(router)
      .use(createHead())
      .mount("#app");
  }
});
