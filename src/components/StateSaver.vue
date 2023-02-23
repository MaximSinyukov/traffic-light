<template>
  <label class="traffic-light__checkbox" for="saveData">
    Сохранять состояние
    <input type="checkbox" id="saveData"
      v-model="checked"
      @change="setMode"
    >
  </label>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from 'vue';

  let checked = ref(false);
  let saveMode = ref(false);

  if (localStorage.getItem('saveMode')) {
    saveMode.value = JSON.parse(localStorage.getItem('saveMode'));
  }

  const setMode = () => {
    localStorage.setItem('saveMode', !saveMode.value);
    saveMode.value = !saveMode.value;
  };

  onMounted(() => {
    checked.value = saveMode.value;
  });

  watch(() => saveMode, (newMode) => {
    checked.value = newMode;
  });
</script>

<style>
.traffic-light__checkbox {
  margin: 20px 0 0;
  font-weight: 700;
}
</style>
