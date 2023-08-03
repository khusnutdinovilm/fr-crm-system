<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $translate("history.table.amount") }}</th>
          <th>{{ $translate("history.table.date") }}</th>
          <th>{{ $translate("history.table.category") }}</th>
          <th>{{ $translate("history.table.type") }}</th>
          <th>{{ $translate("history.table.open") }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in records" :key="r.id">
          <td>
            {{ r.idx + 1 }}
          </td>
          <td>
            {{ currencyFilter(r.amount) }}
          </td>
          <td>{{ dateFilter(r.date) }}</td>
          <td>{{ r.categoryName }}</td>
          <td>
            <span class="white-text badge" :class="[r.typeClass]">{{
              r.typeText
            }}</span>
          </td>
          <td>
            <button
              class="btn-small btn"
              @click="$router.push('/detail-record/' + r.id)"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { currencyFilter, dateFilter } from "@/utils/filters";

export default {
  props: ["records"],
  setup() {
    return {
      currencyFilter,
      dateFilter,
    };
  },
};
</script>
