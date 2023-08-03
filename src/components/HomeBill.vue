<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">
          {{ $translate("home.bill-in-currency") }}
        </span>

        <p class="currency-line" v-for="currency in currencies" :key="currency">
          <span>
            {{ getCurrency(currency) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { currencyFilter } from "@/utils/filters";

export default {
  //TODO: расписать подробнее props
  props: ["rates"],
  setup(props) {
    const store = useStore();

    const currencies = ["RUB", "EUR", "USD"];

    const base = computed(
      () =>
        store.getters["info/info"].bill /
        (props.rates["RUB"] / props.rates["EUR"])
    );

    const getCurrency = (currency) => {
      const cur = Math.floor(base.value * props.rates[currency]);
      return currencyFilter(cur, currency);
    };

    return {
      currencies,
      getCurrency,
    };
  },
};
</script>
