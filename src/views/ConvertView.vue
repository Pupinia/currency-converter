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

const isError1 = ref(false);
const isError2 = ref(false);

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

const changeAmount = (direction: string, event: HTMLInputElement): void => {
  const data: string = event.target.value;

  if (isNaN(data) && direction === "from") {
    isError1.value = true;
    return;
  } else if (isNaN(data) && direction === "to") {
    isError2.value = true;
    return;
  } else {
    isError1.value = false;
    isError2.value = false;
  }

  if (direction === "from") {
    from.value = data;
  } else if (direction === "to") {
    to.value = data;
  }
  for (const key in currenciesConvert.value) {
    const value: number = currenciesConvert.value[key];

    {
      const [fromData, toData]: [string, string] = key.split("-");

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
      const [toData, fromData]: [string, string] = key.split("-");
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
        <input :value="from" @input="(input) => changeAmount('from', input)" />

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
        <div class="convert__error" v-if="isError1">
          Принимаются только числа
        </div>
      </div>
      <div class="convert__form-input">
        <input :value="to" @input="(input) => changeAmount('to', input)" />
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
        <div class="convert__error" v-if="isError2">
          Принимаются только числа
        </div>
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
    position: relative;
  }

  &__form-input {
    border-radius: 6px;
    border: 1px solid #5f6368;
    display: flex;
    position: relative;
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

  &__error {
    position: absolute;
    top: 60px;
    left: 0;
    font-size: 16px;
    color: red;
    padding-left: 5px;
  }
}
</style>
