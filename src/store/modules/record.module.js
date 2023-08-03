import { getDatabase, ref, push, set, get, child } from "firebase/database";

export default {
  namespaced: true,
  state: {
    records: [],
    loading: true,
  },
  getters: {
    records: (s) => s.records,
    record: (s) => s.record,
    loading: (s) => s.loading,
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
    pushRecord(state, record) {
      state.records.push(record);
    },
    clearRecords(state) {
      state.records = [];
    },
  },
  actions: {
    async fetchRecords({ dispatch, commit }) {
      try {
        let v = this;

        const uid = await dispatch("auth/getUid", "", { root: true });
        const dbRef = ref(getDatabase());

        const recordListPath = `users/${uid}/records`;

        const records = await get(child(dbRef, recordListPath))
          .then((snapshot) => {
            if (snapshot.exists()) {
              return Object.keys(snapshot.val()).map((key) => ({
                id: key,
                ...snapshot.val()[key],
              }));
            } else {
              return [];
            }
          })
          .catch((error) => {
            v.commit("setError", error.code, { root: true });
          });

        commit("setRecords", records);

        return records;
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },

    async fetchRecordById({ dispatch, commit }, id) {
      try {
        let v = this;

        const uid = await dispatch("auth/getUid", "", { root: true });
        const dbRef = ref(getDatabase());

        const recordLink = `users/${uid}/records/${id}`;

        const r = await get(child(dbRef, recordLink))
          .then((snapshot) => {
            return snapshot.exists() ? snapshot.val() : null;
          })
          .catch((error) => {
            v.commit("setError", error.code, { root: true });
            throw error;
          });
        return r;
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },

    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("auth/getUid", "", { root: true });
        const db = getDatabase();

        const recordsRef = ref(db, `users/${uid}/records`);
        const newRecordRef = push(recordsRef);

        await set(newRecordRef, record);
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },
  },
};
