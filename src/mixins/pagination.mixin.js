import { ref } from "vue";

// export const page = ref(+route.query.page || 1);
export const pageSize = ref(5);
export const pageCount = ref(0);
export const allItems = ref([]);
export const items = ref([]);

export const setupPagination = (arr, page) => {
  let start = 0;
  pageCount.value = Math.ceil(arr.length / pageSize.value);

  for (let i = 0; i <= pageSize.value; i++) {
    if (start < arr.length) {
      allItems.value.push(arr.slice(start, pageSize.value * (i + 1)));
      start = pageSize.value * (i + 1);
    }
  }

  items.value = allItems.value[page - 1] || allItems.value[0];
};

export const pageChangeHandler = (newPage) => {
  items.value = allItems.value[newPage - 1] || allItems.value[0];
};
