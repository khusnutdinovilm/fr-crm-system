import {
  ref,
  onValue,
  getDatabase,
  update,
  get,
  child,
} from "firebase/database";

export default {
  namespaced: true,
  state: {
    info: {},
  },
  getters: {
    info: (s) => s.info,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("auth/getUid", "", { root: true });
        const db = getDatabase();

        const updateDate = { ...getters.info, ...toUpdate };

        const infoRef = ref(db, `users/${uid}/info`);
        await update(infoRef, updateDate);

        commit("setInfo", updateDate);
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },

    async fetchUserInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("auth/getUid", "", { root: true });

        const dbRef = ref(getDatabase());
        const userInfoLink = `users/${uid}/info`;

        const info = await get(child(dbRef, userInfoLink)).then((snapshot) => {
          if (snapshot.exists()) {
            commit("setInfo", snapshot.val());
            return true;
          } else {
            return false;
          }
        });

        return info;
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },
  },
};
