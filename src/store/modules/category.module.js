import {
  ref,
  set,
  push,
  child,
  get,
  getDatabase,
  update,
} from "firebase/database";

export default {
  namespaced: true,
  state: {
    categories: [],
    loading: true,
  },
  getters: {
    categories: (s) => s.categories,
    loading: (s) => s.loading,
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
      state.loading = false;
    },
    pushCategory(state, category) {
      state.categories.push(category);
    },
    clearCategories(state) {
      state.categories = [];
    },
  },
  actions: {
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch("auth/getUid", "", { root: true });
        const dbRef = ref(getDatabase());

        let v = this;

        const categoryListLink = `users/${uid}/categories`;

        const categories = await get(child(dbRef, categoryListLink))
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
          .catch((e) => {
            v.commit("setError", e.code);
            throw e;
          });

        commit("setCategories", categories);

        return categories;
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },
    async createCategory({ dispatch, commit }, categoryInfo) {
      try {
        const uid = await dispatch("auth/getUid", "", { root: true });
        const db = getDatabase();

        const categoryListRef = ref(db, `users/${uid}/categories/`);
        const newCategoryRef = push(categoryListRef);
        const id = newCategoryRef.key;

        const newCategory = { ...categoryInfo, id };

        await set(newCategoryRef, categoryInfo);

        commit("pushCategory", newCategory);

        return newCategory;
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },
    async updateCategory({ dispatch }, { id, name, limit }) {
      try {
        const uid = await dispatch("auth/getUid", "", { root: true });
        const db = getDatabase();
        const updatedCategoryRef = ref(db, `users/${uid}/categories/${id}`);

        update(updatedCategoryRef, { name, limit });
      } catch (error) {
        commit("setError", error.code, { root: true });
        throw error;
      }
    },
  },
};
