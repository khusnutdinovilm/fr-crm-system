import * as yup from "yup";
import { useField, useForm } from "vee-validate";

import { ref, watch } from "vue";

export function useCategoryCreateForm(fn) {
  const { handleSubmit, isSubmitting } = useForm();

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur,
  } = useField(
    "name",
    yup.string().trim().required("category.errors.name.required")
  );

  const MIN_LENGTH = 1;

  const {
    value: limit,
    errorMessage: lError,
    handleBlur: lBlur,
  } = useField(
    "limit",
    yup
      .number()
      .required("category.errors.limit.")
      .typeError("category.errors.limit.type")
      .positive("category.errors.limit.positive")
      .min(MIN_LENGTH, "category.errors.limit.min-length")
  );

  const onSubmit = handleSubmit((values, { resetForm }) => {
    fn(values);
    resetForm();
  });

  return {
    name,
    limit,
    nError,
    lError,
    nBlur,
    lBlur,
    onSubmit,
    isSubmitting,
  };
}

export function useCategoryEditForm(categories, fn) {
  const { handleSubmit, isSubmitting, isValidating } = useForm({
    initialValues: {
      name: categories[0].name,
      limit: categories[0].limit,
    },
  });

  const selectedId = ref(categories[0].id);

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur,
    handleChange: changeName,
  } = useField(
    "name",
    yup.string().trim().required("category.errors.name.required")
  );

  const MIN_LENGTH = 1;

  const {
    value: limit,
    errorMessage: lError,
    handleBlur: lBlur,
    handleChange: changeLimit,
  } = useField(
    "limit",
    yup
      .number()
      .required("category.errors.limit.")
      .typeError("category.errors.limit.type")
      .positive("category.errors.limit.positive")
      .min(MIN_LENGTH, "category.errors.limit.min-length")
  );

  watch(selectedId, (newValue) => {
    const newSelectedCategory = categories.find(
      (category) => category.id === newValue
    );
    changeName(newSelectedCategory.name);
    changeLimit(newSelectedCategory.limit);
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const selectedCategoryData = {
        id: selectedId.value,
        ...values,
      };
      fn(selectedCategoryData);
    } catch (error) {
      console.log(error);
    }
  });

  return {
    selectedId,
    name,
    limit,
    nError,
    lError,
    nBlur,
    lBlur,
    onSubmit,
    isSubmitting,
    isValidating,
  };
}
