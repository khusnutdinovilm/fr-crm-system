<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import Message from "@/components/app/Message.vue";
import { computed, watch, inject } from "vue";
import { useStore } from "vuex";

import ERROR_MAP from "@/utils/error.map";

export default {
  setup() {
    const store = useStore();
    const errorState = computed(() => store.getters["error"]);
    const error = inject("error");
    const translate = inject("translate");

    watch(errorState, (code) => {
      const message = ERROR_MAP[code] ? ERROR_MAP[code] : "errors.unknown";
      error(`[${translate("errors.error")}]: ${translate(message)}`);
    });
  },
  components: {
    Message,
  },
};
</script>
