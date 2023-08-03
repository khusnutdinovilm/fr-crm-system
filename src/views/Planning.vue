<template>
  <div class="page-title">
    <h3>{{ $translate("planning.title") }}</h3>
    <h4>{{ currencyFilter(bill) }}</h4>
  </div>

  <loader v-if="loading" />

  <p class="center" v-else-if="!categories.length">
    {{ $translate("planning.empty-category") }}
    <router-link to="/categories">
      {{ $translate("planning.add-category") }}
    </router-link>
  </p>

  <section v-else>
    <div v-for="c in planningCategories" :key="c.id" v-tooltip="c.tooltip">
      <p>
        <strong>{{ c.name }}</strong>
        {{ currencyFilter(c.spend) }} из {{ currencyFilter(c.limit) }}
      </p>
      <div class="progress">
        <div
          class="determinate"
          :class="c.progressColor"
          :style="{ width: c.progressPercent + '%' }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { useStore } from "vuex";
import { computed, inject, ref } from "vue";
import { currencyFilter } from "@/utils/filters";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    const totalSpend = ref(0);
    const bill = store.getters["info/info"].bill;

    store.dispatch("category/fetchCategories", {
      root: true,
    });
    const categories = ref(
      computed(() => store.getters["category/categories"])
    );

    store.dispatch("record/fetchRecords", {
      root: true,
    });
    const records = ref(computed(() => store.getters["record/records"]));

    const loading = ref(computed(() => store.getters["category/loading"]));

    const planningCategories = computed(() => {
      return categories.value.map((cat) => {
        const spend = records.value
          .filter((r) => r.categoryId === cat.id)
          .filter((r) => r.type === "outcome")
          .reduce((total, record) => {
            return (total += +record.amount);
          }, 0);

        totalSpend.value += +spend;

        const percent = (100 * spend) / cat.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow" : "red";

        const tooltipValue = cat.limit - spend;
        const tooltip = `${
          tooltipValue < 0
            ? translate("planning.tooltip.more-than")
            : translate("planning.tooltip.stayed")
        } ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...cat,
          progressPercent,
          progressColor,
          tooltip,
          spend,
        };
      });
    });

    return {
      bill,
      totalSpend,
      loading,
      categories,
      records,
      planningCategories,
      currencyFilter,
    };
  },
};
</script>
