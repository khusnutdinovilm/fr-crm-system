<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">
            {{ $translate("home.exchange-rate") }}
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ $translate("home.currency-table.currency") }}</th>
              <th>{{ $translate("home.currency-table.rate") }}</th>
              <th>{{ $translate("home.currency-table.date") }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>
                {{ cur }}
              </td>
              <td>
                {{ rates[cur] }}
              </td>
              <td>
                {{ dateFilter(date, "date") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFilter } from "@/utils/filters";

export default {
  //TODO: расписать подробнее props
  props: ["rates", "date"],
  setup() {
    const currencies = ["RUB", "EUR", "USD"];

    return {
      currencies,
      dateFilter,
    };
  },
};
</script>
