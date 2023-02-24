<template>
  <label class="traffic-light__checkbox" for="saveData">
    Сохранять состояние

    <input type="checkbox" id="saveData"
    :value="store.saveMode"
    @change="store.changeMode">
  </label>
</template>

<script setup>
  import { useLightsStore } from '@/store/lights';
  const store = useLightsStore();
</script>

<style>
.traffic-light__checkbox {
  margin: 20px 0 0;
  font-weight: 700;
}
</style>
