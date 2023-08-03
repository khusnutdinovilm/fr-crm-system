<template>
  <div>
    <loader v-if="loading" />

    <div v-else-if="record !== null">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{ $translate("detail.breadcrumb.history") }}
        </router-link>
        <a @click.prevent class="breadcrumb">
          {{ $translate(record.typeText) }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>
                {{ $translate("detail.record-card.description") }}:

                {{ record.description }}
              </p>
              <p>
                {{ $translate("detail.record-card.amount") }}:
                {{ currencyFilter(record.amount) }}
              </p>
              <p>
                {{ $translate("detail.record-card.category") }}:
                {{ record.categoryName }}
              </p>

              <small>{{ dateFilter(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>
      {{ $translate("detail.not-found.record") }}{{ $route.params.id }}
      {{ $translate("detail.not-found.not-found") }}
    </p>
  </div>
</template>

<script>
import { dateFilter, currencyFilter } from "@/utils/filters";

import { onMounted, ref, inject } from "vue";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

import { useStore } from "vuex";

export default {
  setup() {
    const loading = ref(true);
    const route = useRoute();
    const store = useStore();

    const categories = ref([]);
    const record = ref(null);

    const id = route.params.id;

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    onMounted(async () => {
      categories.value = await store.dispatch("category/fetchCategories");
      record.value = await store.dispatch("record/fetchRecordById", id);

      record.value = {
        ...record.value,
        categoryName: categories.value.find(
          (c) => c.id === record.value.categoryId
        ).name,
        typeClass: record.value.type === "income" ? "green" : "red",
        typeText:
          record.value.type === "income"
            ? "detail.breadcrumb.income"
            : "detail.breadcrumb.outcome",
      };

      loading.value = false;
    });

    return {
      loading,
      record,
      currencyFilter,
      dateFilter,
    };
  },
};
</script>
