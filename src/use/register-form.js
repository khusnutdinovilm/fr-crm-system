import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

export function useRegisterForm() {
  const { handleSubmit } = useForm();
  const store = useStore();
  const router = useRouter();

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("sign-up.errors.email.required")
      .email("sign-up.errors.email.valid")
  );

  const MIN_LENGTH = 6;
  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("sign-up.errors.password.required")
      .min(MIN_LENGTH, "sign-up.errors.password.min-length")
  );

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur,
  } = useField(
    "name",
    yup.string().trim().required("sign-up.errors.name.required")
  );

  const agree = ref(false);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch("auth/signUp", values, { root: true });
      router.push("/");
    } catch (e) {}
  });

  return {
    MIN_LENGTH,

    email,
    password,
    name,
    agree,

    eError,
    pError,
    nError,

    eBlur,
    pBlur,
    nBlur,

    onSubmit,
  };
}
