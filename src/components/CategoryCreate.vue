<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $translate("category.create") }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{ invalid: nError }"
          />
          <label for="name">{{ $translate("category.inputs.name") }}</label>
          <span class="helper-text invalid" v-if="nError">
            {{ $translate(nError) }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: lError }"
          />
          <label for="limit">{{ $translate("category.inputs.limit") }}</label>
          <span class="helper-text invalid" v-if="lError">
            {{ $translate(lError) }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          :disabled="isSubmitting"
        >
          {{ $translate("buttons.create") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useCategoryCreateForm } from "@/use/category-form";
import { useStore } from "vuex";
import { inject } from "vue";

export default {
  setup() {
    const store = useStore();

    const message = inject("message");
    const translate = inject("translate");

    const submit = async (values) => {
      try {
        const newCategory = await store.dispatch(
          "category/createCategory",
          values,
          {
            root: true,
          }
        );

        message(translate("message.category.created"));
      } catch (error) {
        store.commit("setError", error.code, { root: true });
      }
    };
    return {
      ...useCategoryCreateForm(submit),
    };
  },
};
</script>

<style></style>
