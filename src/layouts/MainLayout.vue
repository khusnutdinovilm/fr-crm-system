<template>
  <div>
    <loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <the-navbar @show-sidebar="isOpen = !isOpen" />

      <the-sidebar :open="isOpen" @show-sidebar="isOpen = !isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="$translate('add-new-record')"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/app/Navbar.vue";
import TheSidebar from "@/components/app/Sidebar.vue";
import Message from "@/components/app/Message.vue";

import { computed, inject, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

import ERROR_MAP from "@/utils/error.map";

export default {
  setup() {
    const isOpen = ref(false);
    const store = useStore();
    const loading = ref(true);

    onMounted(async () => {
      await store.dispatch("info/fetchUserInfo", { root: true });
      loading.value = false;
    });

    const translate = inject("translate");

    const error = inject("error");
    const errorState = computed(() => store.getters["error"]);
    watch(errorState, (code) => {
      const message = ERROR_MAP[code] ? ERROR_MAP[code] : "errors.unknown";
      error(translate(message));
    });

    return {
      isOpen,
      loading,
    };
  },
  components: {
    TheNavbar,
    TheSidebar,
    Message,
  },
};
</script>
