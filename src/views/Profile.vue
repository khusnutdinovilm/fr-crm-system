<template>
  <div class="page-title">
    <h3>
      {{ $translate("profile.title") }}
    </h3>
  </div>

  <form class="form" @submit.prevent="onSubmit">
    <div class="input-field">
      <input
        id="name"
        type="text"
        v-model="name"
        :class="{ invalid: nError }"
        @blur="nBlur"
      />
      <label for="name">
        {{ $translate("profile.inputs.name") }}
      </label>
      <span class="helper-text invalid" v-if="nError">
        {{ $translate(nError) }}
      </span>
    </div>

    <div class="switch">
      <label>
        English
        <input type="checkbox" v-model="isRuLocale" />
        <span class="lever"></span>
        Русский
      </label>
    </div>

    <button
      class="btn waves-effect waves-light"
      type="submit"
      :disabled="isSubmitting"
    >
      {{ $translate("buttons.update") }}
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

import { useHead } from "@vueuse/head";

import { useStore } from "vuex";

import { inject, onMounted, ref } from "vue";

import { localize } from "@/utils/filters";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    const initialName = ref(store.getters["info/info"].name);
    const isRuLocale = ref(store.getters["info/info"].locale === "ru-RU");

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    const { handleSubmit, isSubmitting } = useForm({
      initialValues: {
        name: initialName.value,
      },
    });

    const {
      value: name,
      errorMessage: nError,
      handleBlur: nBlur,
    } = useField(
      "name",
      yup.string().trim().required("profile.errors.name.required")
    );

    onMounted(() => {
      M.updateTextFields();
    });

    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch(
          "info/updateInfo",
          { name: values.name, locale: isRuLocale.value ? "ru-RU" : "en-US" },
          { root: true }
        );
      } catch (e) {}
    });

    return {
      localize,
      name,
      nError,
      nBlur,
      onSubmit,
      isSubmitting,
      isRuLocale,
    };
  },
};
</script>

<style lang="sass" scoped>
.switch
  margin-bottom: 2rem
</style>
