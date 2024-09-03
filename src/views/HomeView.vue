<script setup lang="ts">
import { ref, onBeforeMount, computed } from "vue";
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

const store = useCurrencyStore();

const { currentCurrency, currenciesConvert, currenciesWithoutCurrent } =
  storeToRefs(store);
const { getCurrenciesConvert } = store;

interface IResult {
  from: string;
  to: string;
  value: number;
}

const data = computed(() => {
  const results = ref([]);

  for (const key in currenciesConvert.value) {
    const [from, to]: [string, string] = key.split("-");

    if (
      currenciesWithoutCurrent.value.includes(from.toUpperCase()) &&
      currentCurrency.value === to.toUpperCase()
    ) {
      const result: IResult = {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        value: +currenciesConvert.value[key].toFixed(2),
      };
      results.value.push(result);
    }
  }

  return results.value;
});

onBeforeMount(async () => {
  await getCurrenciesConvert();
});
</script>

<template>
  <div class="home" v-if="currenciesConvert">
    <div v-for="(value, key) in data" :key="key">
      1 {{ value.from }} - {{ value.value }} {{ value.to }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  font-size: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
}
</style>
