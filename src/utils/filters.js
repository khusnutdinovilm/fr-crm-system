export const currencyFilter = (value, currency = "RUB") => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
  }).format(value);
};

import store from "@/store";

export const dateFilter = (value, format = "datetime") => {
  const options = {};

  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "2-digit";
    options.year = "2-digit";
  }

  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  const locale = store.getters["info/info"].locale || "ru-RU";

  return new Intl.DateTimeFormat(locale, options).format(new Date(value));
};

import ru from "../locales/ru.json";
import en from "../locales/en.json";

const locales = {
  "ru-RU": ru,
  "en-US": en,
};

export const localize = (key) => {
  const locale = store.getters["info/info"].locale || "ru-RU";
  console.log(locales[locale]["profile"]["title"]);
  return locales[locale][key] || `[Localize error]: key ${key} not found`;
};
