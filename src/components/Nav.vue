<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCurrencyStore } from "@/stores/useCurrencyStore";

const store = useCurrencyStore();

const { changeCurrency } = store;
const { currentCurrency, currencies } = storeToRefs(store);
</script>

<template>
  <nav class="nav">
    <div class="container">
      <div class="nav__wrapper">
        <div class="nav__left">
          <router-link :to="{ name: 'home' }">Главная</router-link>
          <router-link :to="{ name: 'convert' }">Конвертация</router-link>
        </div>
        <div class="nav__right">
          <select
            class="nav__select"
            v-model="currentCurrency"
            @change="changeCurrency(currentCurrency)"
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
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  font-size: 24px;
  padding: 20px;
  background-color: #212227;
  a {
    color: #eee;
  }
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__left {
    display: flex;
    gap: 20px;
  }
  &__select {
    color: #eee;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 20px;
    font-weight: 700;
    background-color: #212227;
    border-raduis: 6px;
  }
}
</style>
