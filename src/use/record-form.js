import * as yup from "yup";
import { useField, useForm } from "vee-validate";

import { ref } from "vue";

export function useRecordCreateForm(categories, fn) {
  const { handleSubmit, isSubmitting, isValidating } = useForm({
    initialValues: {
      type: "outcome",
    },
  });

  const selectedId = ref(categories[0].id);

  const {
    value: description,
    errorMessage: dError,
    handleBlur: dBlur,
  } = useField(
    "description",
    yup.string().trim().required("record.errors.description.required")
  );

  const MIN_LENGTH = 1;

  const { value: type } = useField("type");

  const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur,
  } = useField(
    "amount",
    yup
      .number()
      .required("record.errors.amount.required")
      .typeError("record.errors.amount.type")
      .positive("record.errors.amount.positive")
      .min(MIN_LENGTH, "record.errors.amount.min-length")
  );

  const onSubmit = handleSubmit((values, { resetForm }) => {
    try {
      if (isValidating) {
        fn({
          ...values,
          categoryId: selectedId.value,
          date: new Date().toJSON(),
        });
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    MIN_LENGTH,
    type,
    selectedId,
    description,
    amount,
    dError,
    aError,
    dBlur,
    aBlur,
    onSubmit,
    isSubmitting,
    isValidating,
  };
}
