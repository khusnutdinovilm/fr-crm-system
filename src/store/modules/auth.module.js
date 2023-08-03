import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async signUp({ commit }, { email, password, name }) {
      const auth = getAuth();
      let v = this;

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const uid = userCredential.user.uid;
          const database = getDatabase();
          await set(ref(database, `users/${uid}/info/`), {
            bill: 10000,
            name,
            locale: "ru-RU",
          });
        })
        .catch((error) => {
          v.commit("setError", error.code, { root: true });
          throw error;
        });
    },

    async signIn({ commit }, { email, password }) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password).catch((error) => {
        commit("setError", error.code, { root: true });
        throw error;
      });
    },

    async signOut({ commit }) {
      const auth = getAuth();
      let v = this;
      await signOut(auth)
        .then(() => {
          v.commit("info/clearInfo", { root: true });
          v.commit("category/clearCategories", { root: true });
          v.commit("record/clearRecords", { root: true });
        })
        .catch((error) => {
          v.commit("setError", error.code, { root: true });
          throw error;
        });
    },

    getUid() {
      const auth = getAuth();
      const user = auth.currentUser;

      return user ? user.uid : null;
    },
  },
};
