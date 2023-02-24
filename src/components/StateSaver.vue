<template>
  <label class="traffic-light__checkbox" for="saveData">
    Сохранять состояние

    <input type="checkbox" id="saveData"
    v-model="customerChecked">
  </label>
</template>

<script setup>
  import { useLightsStore } from '@/store/lights';
  import { ref, computed } from 'vue';

  const store = useLightsStore();

  const customerChecked = computed({
    get: () => {
      return store.saveMode;
    },
    set: (value) => {
      store.changeMode(value);
    },
  });
</script>

<style>
.traffic-light__checkbox {
  margin: 20px 0 0;
  font-weight: 700;
}
</style>
