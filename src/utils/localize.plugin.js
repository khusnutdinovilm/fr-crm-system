import store from "@/store";
export default {
  install(app, options) {
    app.config.globalProperties.$translate = (key) => {
      const currentLocale = store.getters["info/info"].locale || "ru-RU";

      if (key.split(".").length > 1) {
        return key.split(".").reduce((words, k) => {
          return words[k] || `[Localize error]: key ${k} not found`;
        }, options[currentLocale]);
      } else {
        return options[currentLocale][key];
      }
    };
    app.provide("translate", app.config.globalProperties.$translate);
  },
};
