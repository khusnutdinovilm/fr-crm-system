<template>
  <message v-if="$store.state.msg" />
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import { useRoute } from "vue-router";
import { computed } from "vue";

import MainLayout from "@/layouts/MainLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import Message from "@/components/app/Message.vue";

export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout),
    };
  },
  components: {
    MainLayout,
    EmptyLayout,
    Message,
  },
};
</script>

<style lang="sass">
@import "~materialize-css/dist/css/materialize.min.css"
</style>
