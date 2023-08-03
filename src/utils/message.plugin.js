export default {
  install(app) {
    app.config.globalProperties.$message = (html) => {
      M.toast({ html });
    };
    app.config.globalProperties.$error = (html) => {
      M.toast({ html });
    };
    app.provide("message", app.config.globalProperties.$message);
    app.provide("error", app.config.globalProperties.$error);
  },
};
