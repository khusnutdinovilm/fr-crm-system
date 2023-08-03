<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">
        {{ $translate("crm-title") }}
      </span>
      <div class="input-field">
        <input
          id="email"
          class="validate"
          :class="{ invalig: eError }"
          type="text"
          v-model="email"
          @blur="eBlur"
        />
        <label for="email">Email</label>
        <small class="helper-text invalid" v-if="eError">
          {{ $translate(eError) }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          :class="{ invalig: pError }"
          v-model="password"
          @blur="pBlur"
        />
        <label for="password">
          {{ $translate("sign-up.inputs.password") }}
        </label>
        <small class="helper-text invalid" v-if="pError">
          {{ $translate(pError) + MIN_LENGTH }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          :class="{ invalig: nError }"
          v-model="name"
          @blur="nBlur"
        />
        <label for="name">
          {{ $translate("sign-up.inputs.name") }}
        </label>
        <small class="helper-text invalid" v-if="nError">
          {{ $translate(nError) }}
        </small>
      </div>

      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>
            {{ $translate("sign-up.accept-rules") }}
          </span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $translate("buttons.sign-up") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $translate("sign-up.has-account") }}
        <router-link to="/login"
          >{{ $translate("buttons.sign-in") }}!</router-link
        >
      </p>
    </div>
  </form>
</template>

<script>
import { useRegisterForm } from "@/use/register-form";
import { useHead } from "@vueuse/head";
import { useRoute } from "vue-router";

import { inject } from "vue";

export default {
  setup() {
    const route = useRoute();

    const translate = inject("translate");
    const routeTitle = route.meta.title;

    useHead(() => ({
      title: `${translate(routeTitle)} | ${translate("crm-title")}`,
    }));

    return {
      ...useRegisterForm(),
    };
  },
};
</script>
