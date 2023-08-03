<template>
  <div class="page-title">
    <h3>{{ $translate("category.title") }}</h3>
  </div>
  <section>
    <loader v-if="loading" />

    <div class="row" v-else>
      <category-create />

      <category-edit
        v-if="categories.length"
        :key="updateComponent"
        :categories="categories"
        @updated-category="updateCategory"
      />
      <p class="center" v-else>
        {{ $translate("category.empty-categories") }}
      </p>
    </div>
  </section>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";

import { useStore } from "vuex";
import { computed, onMounted, ref, inject } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";


export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    

    const updateCount = ref(0);
    const loading = ref(true);

    const categories = ref([]);

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    onMounted(async () => {
      categories.value = await store.dispatch("category/fetchCategories", {
        root: true,
      });
      loading.value = false;
    });

    const updateCategory = (category) => {
      let idx = categories.value.findIndex((el) => el.id === category.id);
      categories.value[idx].name = category.name;
      categories.value[idx].limit = category.limit;
      updateCount.value++;
    };

    const updateComponent = computed(
      () => categories.value.length + updateCount.value
    );

    return {
      categories,
      loading,
      updateCategory,
      updateComponent,
    };
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
};
</script>
