import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLightsStore = defineStore('lights', () => {
  const lightTimer = ref(null);
  const colorDirection = ref(0);
  const colorsArray = ref(['red', 'yellow', 'green']);
  const lightSignals = ref({
    red: {id: 0, color: 'red', expirationTime: 10},
    yellow: {id: 1, color: 'yellow', expirationTime: 3},
    green: {id: 2, color: 'green', expirationTime: 15},
  });

  const saveMode = ref(false);

  const changeLight = ({ expirationTime, direction }) => {
    lightTimer.value = expirationTime;
  };

  const changeMode = (value) => {
    saveMode.value = value;
    localStorage.setItem('saveMode', JSON.stringify(value));
  };

  return { saveMode, lightSignals, colorsArray, lightTimer, colorDirection, changeLight, changeMode };
});
