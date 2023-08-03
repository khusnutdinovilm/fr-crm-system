<template>
  <div class="page-title">
    <h3>{{ $translate("home.title") }}</h3>

    <button
      class="btn waves-effect waves-light btn-small"
      @click="refresh"
      v-tooltip="$translate('buttons.update')"
    >
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <loader v-if="loading" />

  <div class="row" v-else>
    <home-bill :rates="currency.rates" />

    <home-currency :rates="currency.rates" :date="currency.date" />
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill.vue";
import HomeCurrency from "@/components/HomeCurrency.vue";

import { onMounted, ref, inject } from "vue";
import { useStore } from "vuex";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

export default {
  setup() {
    const loading = ref(true);
    const currency = ref(null);
    const store = useStore();

    const route = useRoute();

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    onMounted(async () => {
      currency.value = await store.dispatch("fetchCurrency");
      // debugger;
      loading.value = false;
    });

    const refresh = async () => {
      loading.value = true;
      currency.value = await store.dispatch("fetchCurrency");
      loading.value = false;
    };

    return {
      loading,
      currency,
      refresh,
    };
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>
