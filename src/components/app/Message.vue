<template>
  <div>
    {{ $message($translate(store.state.message)) }}
  </div>
</template>

<script>
import { computed, inject } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const msg = computed(() => store.getters["message"]);
    const translate = inject("translate");

    return {
      message: translate(msg),
    };
  },
};
</script>

<style></style>
