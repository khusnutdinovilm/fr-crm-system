import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export function useLoginForm() {
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
      .required("sign-in.errors.email.required")
      .email("sign-in.errors.email.valid")
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
      .required("sign-in.errors.password.required")
      .min(MIN_LENGTH, "sign-in.errors.password.min-length")
  );

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch("auth/signIn", values, { root: true });
      router.push("/");
    } catch (e) {}
  });

  return {
    MIN_LENGTH,
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
  };
}
