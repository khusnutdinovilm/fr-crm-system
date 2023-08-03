<template>
  <form class="card auth-card" @submit.prevent="onSubmit">
    <div class="card-content">
      <span class="card-title">
        {{ $translate("crm-title") }}
      </span>

      <div class="input-field">
        <input
          id="email"
          type="text"
          class="validate"
          :class="{ invalid: eError }"
          v-model="email"
          @blur="eBlur"
        />
        <label for="email">Email</label>
        <small class="helper-text" :class="{ invalid: eError }" v-if="eError">
          {{ $translate(eError) }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          :class="{ invalid: pError }"
          v-model="password"
          @blur="pBlur"
        />
        <label for="password">
          {{ $translate("sign-in.inputs.password") }}
        </label>
        <small class="helper-text invalid" v-if="pError">
          {{ $translate("sign-in.errors.password.min-length") + MIN_LENGTH }}
        </small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ $translate("buttons.sign-in") }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ $translate("sign-in.no-account") }}
        <router-link to="/register">{{
          $translate("buttons.sign-up")
        }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useLoginForm } from "@/use/login-form";
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
      ...useLoginForm(),
    };
  },
};
</script>
