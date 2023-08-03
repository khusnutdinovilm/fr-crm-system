<template>
  <div class="page-title">
    <h3>{{ $translate("record.title") }}</h3>
  </div>

  <loader v-if="loading" />

  <p class="center" v-else-if="!categories.length">
    {{ $translate("record.empty-categories") }}
    <router-link to="/categories">
      {{ $translate("record.add-category") }}
    </router-link>
  </p>

  <record-create v-else :categories="categories" />
</template>

<script>
import RecordCreate from "@/components/RecordCreate.vue";

import { computed, ref, inject } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    store.dispatch("category/fetchCategories", {
      root: true,
    });
    const categories = computed(() => store.getters["category/categories"]);

    const loading = ref(computed(() => store.getters["category/loading"]));

    return {
      loading,
      categories,
    };
  },
  components: {
    RecordCreate,
  },
};
</script>
