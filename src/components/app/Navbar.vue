<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('show-sidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          {{ date }}
        </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i
                >{{ $translate("profile.title") }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i
                >{{ $translate("buttons.sign-out") }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { dateFilter } from "@/utils/filters";

export default {
  setup() {
    const dropdown = ref(null);
    const date = ref(new Date());
    const interval = ref(null);
    const store = useStore();
    const router = useRouter();

    const userName = ref(computed(() => store.getters["info/info"].name));

    onMounted(() => {
      M.Dropdown.init(dropdown.value, {
        constrainWidth: false,
      });

      date.value = dateFilter(new Date(), "datetime");

      interval.value = setInterval(() => {
        date.value = dateFilter(new Date(), "datetime");
      }, 1000);
    });

    const logout = async () => {
      await store.dispatch("auth/signOut", { root: true });
      router.push("/login?message=logout");
    };

    onBeforeUnmount(() => {
      clearInterval(interval);
      if (dropdown.value && dropdown.value.destroy) {
        dropdown.value.destroy();
      }
    });

    return {
      date,
      dropdown,
      userName,
      logout,
    };
  },
};
</script>
