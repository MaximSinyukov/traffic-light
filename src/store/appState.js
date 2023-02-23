import { defineStore } from 'pinia';

export const useLightsStore = defineStore('lights', () => {
  const counter = ref(0);
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  return { counter }
});
