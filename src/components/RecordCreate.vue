<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="input-field">
      <select ref="selectRef" v-model="selectedId">
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
      <label>{{ $translate("record.inputs.select") }}</label>
    </div>

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="income"
          v-model="type"
        />
        <span>{{ $translate("record.inputs.type.income") }}</span>
      </label>
    </p>

    <p>
      <label>
        <input
          class="with-gap"
          name="type"
          type="radio"
          value="outcome"
          v-model="type"
        />
        <span>{{ $translate("record.inputs.type.outcome") }}</span>
      </label>
    </p>

    <div class="input-field">
      <input id="amount" type="number" v-model="amount" @blur="aBlur" />
      <label for="amount">{{ $translate("record.inputs.amount") }}</label>
      <span class="helper-text invalid" v-if="aError">
        {{ $translate(aError) }}
      </span>
    </div>

    <div class="input-field">
      <input id="description" type="text" v-model="description" @blur="dBlur" />
      <label for="description">
        {{ $translate("record.inputs.description") }}
      </label>
      <span class="helper-text invalid" v-if="dError">
        {{ $translate(dError) }}
      </span>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      :disabled="isValidating"
    >
      {{ $translate("buttons.create") }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import { inject, onMounted, onUnmounted, ref } from "vue";
import { useRecordCreateForm } from "@/use/record-form";
import { useStore } from "vuex";
import { currencyFilter } from "@/utils/filters";

export default {
  // TODO: расписать props.categories
  props: ["categories"],
  setup(props) {
    const selectRef = ref(null);
    const selectMaterialize = ref(null);
    const store = useStore();

    const message = inject("message");
    const translate = inject("translate");

    onMounted(async () => {
      selectMaterialize.value = M.FormSelect.init(selectRef.value);
      M.updateTextFields();
    });

    onUnmounted(() => {
      if (selectMaterialize && selectMaterialize.destroy) {
        selectMaterialize.destroy();
      }
    });

    const createRecord = async (record) => {
      try {
        const userInfo = store.getters["info/info"];
        let bill = userInfo.bill;

        if (record.type === "income") {
          bill += +record.amount;

          await store.dispatch("record/createRecord", record, { root: true });
          await store.dispatch("info/updateInfo", { bill }, { root: true });

          message(translate("message.record.created"));
        } else if (record.type === "outcome") {
          if (bill - +record.amount < 0) {
            message(
              `${translate("message.record.insufficient")} ${currencyFilter(
                Math.abs(bill - +record.amount)
              )}`
            );
          } else {
            bill -= +record.amount;

            await store.dispatch("record/createRecord", record, { root: true });
            await store.dispatch(
              "info/updateInfo",
              { bill },
              {
                root: true,
              }
            );

            message(translate("message.record.created"));
          }
        }
      } catch (e) {}
    };

    return {
      selectRef,
      ...useRecordCreateForm(props.categories, createRecord),
    };
  },
};
</script>
