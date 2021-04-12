<template>
  <label class="traffic-light__checkbox" for="saveData">
    Сохранять состояние
    <input type="checkbox" id="saveData"
      v-model="checked"
      @change="setMode"
    >
  </label>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      saveMode: localStorage.getItem('saveMode')
        ? JSON.parse(localStorage.getItem('saveMode'))
        : false
    }
  },
  mounted() {
    this.checked = this.saveMode
  },
  watch: {
    // отлавливаем события чекбокса
    saveMode(newMode) {
      this.checked = newMode
    }
  },
  methods: {
    setMode() {
      localStorage.setItem('saveMode', !this.saveMode)
      this.saveMode = !this.saveMode
    }
  }
}
</script>

<style>
.traffic-light__checkbox {
  margin: 20px 0 0;
  font-weight: 700;
}
</style>
