<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

const store = useCurrencyStore();
const { currencies, currenciesConvert } = storeToRefs(store);
const { getCurrenciesConvert } = store;

const from = ref(null);
const fromCurrency = ref("RUB");

const to = ref(null);
const toCurrency = ref("USD");

watch(fromCurrency, (newValue, oldValue) => {
  if (newValue === toCurrency.value) {
    toCurrency.value = oldValue;
  }
});

watch(toCurrency, (newValue, oldValue) => {
  if (newValue === fromCurrency.value) {
    fromCurrency.value = oldValue;
  }
});

const changeAmount = (direction: string, data: string): void => {
  if (direction === "from") {
    from.value = data;
  } else if (direction === "to") {
    to.value = data;
  }
  for (const key in currenciesConvert.value) {
    const value: number = currenciesConvert.value[key];

    {
      const [fromData, toData] = key.split("-");

      if (
        fromData.toUpperCase() === fromCurrency.value &&
        toData.toUpperCase() === toCurrency.value
      ) {
        if (direction === "from") {
          to.value = Number.parseFloat(value * from.value).toFixed(2);
        }
      }
    }

    {
      const [toData, fromData] = key.split("-");
      if (
        fromData.toUpperCase() === fromCurrency.value &&
        toData.toUpperCase() === toCurrency.value
      ) {
        if (direction === "to") {
          from.value = Number.parseFloat(value * to.value).toFixed(2);
        }
      }
    }
  }
};

onBeforeMount(async () => {
  await getCurrenciesConvert();
});
</script>

<template>
  <div class="convert">
    <form class="convert__form">
      <div class="convert__form-input">
        <input
          type="number"
          :value="from"
          @input="(input) => changeAmount('from', input.target.value)"
        />

        <select
          v-model="fromCurrency"
          @change="(input) => changeAmount('from', from)"
        >
          <option
            :value="currency"
            v-for="currency in currencies"
            :key="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>
      <div class="convert__form-input">
        <input
          type="number"
          :value="to"
          @input="(input) => changeAmount('to', input.target.value)"
        />
        <select
          v-model="toCurrency"
          @change="(input) => changeAmount('to', to)"
        >
          <option
            :value="currency"
            v-for="currency in currencies"
            :key="currency"
          >
            {{ currency }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.convert {
  font-size: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;

  &__form {
    display: flex;
    gap: 20px;
  }

  &__form-input {
    border-radius: 6px;
    border: 1px solid #5f6368;
    display: flex;
  }

  &__form input {
    height: 50px;
    line-height: 24px;
    background-color: #202124;
    color: #eee;
    border: none;
    padding: 1px 6px 1px 12px;
    font-weight: 700;
    font-size: 20px;
    outline: none;
  }

  &__form select {
    background-color: #202124;
    color: #eee;
    border: none;
    cursor: pointer;
    padding-left: 10px;
    outline: none;
    border-left: 1px solid #eee;
  }
}
</style>
