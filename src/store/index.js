import { createStore } from "vuex";
import auth from "./modules/auth.module";
import info from "./modules/info.module";
import category from "./modules/category.module";
import record from "./modules/record.module";

export default createStore({
  state() {
    return {
      message: null,
      error: null,
    };
  },
  getters: {
    message: (s) => s.message,
    error: (s) => s.error,
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    setError(state, error) {
      state.error = error;
    },
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      try {
        // const key = process.env.VUE_APP_FEXIER;
        // const url = `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
        const key = process.env.VUE_APP_CURRENCY_FREAKS;
        const url = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${key}`;

        const res = await fetch(url);
        return await res.json();
      } catch (error) {
        store.commit("setError", error.code);
      }
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
