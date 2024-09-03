<script lang="ts" setup>
import Nav from "@/components/Nav.vue";
</script>

<template>
  <Nav />
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  margin: 0;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #191516;
  background-color: #c9daea;
}
.container {
  max-width: 1200px;

  margin: 0 auto;
}

a {
  text-decoration: none;
  color: #191516;
  &:hover {
    cursor: pointer;
    color: #ab2346;
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style scoped lang="scss"></style>
