import { defineStore } from "pinia";
import axios from "axios";

import { CURRENCY } from "@/constants/currency";

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currentCurrency: CURRENCY.RUB as CURRENCY,
    currencies: [CURRENCY.RUB, CURRENCY.EUR, CURRENCY.USD] as CURRENCY[],
    currenciesConvert: {},
  }),
  getters: {
    currenciesWithoutCurrent(): CURRENCY[] {
      return this.currencies.filter(
        (currency) => currency !== this.currentCurrency
      );
    },
  },
  actions: {
    changeCurrency(currency: CURRENCY) {
      this.currentCurrency = currency;
    },
    async getCurrenciesConvert() {
      const { data }: { [key: string]: number } = await axios.get(
        "https://status.neuralgeneration.com/api/currency"
      );
      this.currenciesConvert = data;
    },
  },
});
