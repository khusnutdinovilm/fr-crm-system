<template>
  <div class="page-title">
    <h3>{{ $translate("history.title") }}</h3>
  </div>

  <loader v-if="loading" />

  <p class="center" v-else-if="!records.length">
    {{ $translate("history.empty-records") }}
    <router-link to="/record">{{
      $translate("history.add-record")
    }}</router-link>
  </p>

  <div v-else>
    <div class="history-chart">
      <Pie
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        :title="title"
      />
    </div>

    <history-table :records="items" />

    <div class="center">
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="changePage"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></Paginate>
    </div>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";

import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

import { useRoute, useRouter } from "vue-router";
import {
  pageCount,
  pageChangeHandler,
  items,
  setupPagination,
} from "@/mixins/pagination.mixin";

import { inject, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useHead } from "@vueuse/head";


export default {
  setup() {
    const store = useStore();

    const route = useRoute();
    const router = useRouter();

    const translate = inject("translate");

    const chartData = ref({});
    const chartOptions = reactive({
      responsive: false,
      maintainAspectRatio: false,
    });

    const page = ref(+route.query.page || 1);

    const loading = ref(true);

    const records = ref([]);

    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    onMounted(async () => {
      const categories = await store.dispatch("category/fetchCategories");

      records.value = await store.dispatch("record/fetchRecords", {
        root: true,
      });

      chartData.value = {
        labels: categories.map((c) => c.name),
        datasets: [
          {
            label: translate("history.chart.label"),
            backgroundColor: categories.map((c) => getRandColor()),
            data: categories.map((c) => {
              return records.value.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === "outcome")
                  total += +r.amount;
                return total;
              }, 0);
            }),
          },
        ],
      };

      setupPagination(
        records.value.map((r, idx) => {
          return {
            ...r,
            idx: +idx,
            categoryName: categories.find((c) => c.id === r.categoryId).name,
            typeClass: r.type === "income" ? "green" : "red",
            typeText: r.type === "income" ? "Доход" : "Расход",
          };
        }),
        page.value
      );

      loading.value = false;
    });

    const getRandColor = () => {
      let letters = "0123456789ABCDEF";
      let color = "#";

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    };

    const changePage = (newPage) => {
      page.value = +newPage;
      router.push(`${route.path}?page=${page.value}`);
      pageChangeHandler(page.value);
    };

    return {
      loading,
      records,
      items,
      changePage,
      page,
      pageCount,
      chartData,
      chartOptions,
      title: ref("title"),
    };
  },
  components: {
    HistoryTable,
    Pie,
  },
};
</script>
