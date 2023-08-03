<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ $translate("category.edit") }}</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="selectRef" v-model="selectedId">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </select>
          <label>{{ $translate("category.inputs.select") }}</label>
        </div>

        <div class="input-field">
          <input
            type="text"
            id="name"
            v-model="name"
            :class="{ invalid: nError }"
          />
          <label for="name">{{ $translate("category.inputs.name") }}</label>
          <span class="helper-text invalid" v-if="nError">
            {{ $translate(nError) }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{ invalid: nError }"
          />
          <label for="limit">{{ $translate("category.inputs.limit") }}</label>
          <span class="helper-text invalid" v-if="lError">
            {{ $translate(lError) }}
          </span>
        </div>

        <button
          class="btn waves-effect waves-light"
          type="submit"
          :disabled="isValidating"
        >
          {{ $translate("buttons.update") }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, inject } from "vue";
import { useCategoryEditForm } from "@/use/category-form";
import { useStore } from "vuex";

export default {
  emits: ["updated-category"],
  props: {
    categories: {
      type: Array,
      required: true,
      default: [],
    },
  },

  setup(props, { emit }) {
    const selectRef = ref(null);
    const selectMaterialize = ref(null);
    const store = useStore();

    const message = inject("message");
    const translate = inject("translate");

    onMounted(() => {
      selectMaterialize.value = M.FormSelect.init(selectRef.value);
      M.updateTextFields();
    });

    onUnmounted(() => {
      if (selectMaterialize.value && selectMaterialize.value.destroy) {
        selectMaterialize.value.destroy();
      }
    });

    const submit = async (category) => {
      try {
        emit("updated-category", category);
        await store.dispatch("category/updateCategory", category, {
          root: true,
        });

        message(translate("message.category.updated"));
      } catch (error) {
        store.commit("setError", error.code, { root: true });
      }
    };

    return {
      selectRef,
      ...useCategoryEditForm(props.categories, submit),
    };
  },
};
</script>

<style></style>
