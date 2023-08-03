<template>
  <ul class="sidenav app-sidenav" :class="{ open: open }">
    <li>
      <router-link
        v-for="link in links"
        :key="link.url"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
        class="waves-effect waves-orange pointer"
        >{{ $translate(link.title) }}</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: ["open"],
  setup() {
    const links = [
      { title: "home.title", url: "/", exact: true },
      { title: "history.title", url: "/history" },
      { title: "planning.title", url: "/planning" },
      { title: "record.title", url: "/record" },
      { title: "category.title", url: "/categories" },
    ];

    // const

    return { links };
  },
};
</script>
