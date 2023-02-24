<template>
  <div
  class="app">
    <div
    v-if="store"
    class="traffic-light">
      <h1>Traffic light</h1>

      <SignalsBox />

      <StateSaver />
    </div>

    <div
    v-else
    class="app__loader">
      <span class="app__loader-text"> Store waiting... </span>
    </div>
  </div>
</template>

<script setup>
  import SignalsBox from '@/components/SignalsBox.vue';
  import StateSaver from '@/components/StateSaver.vue';

  import { ref, watch } from 'vue';
  import { reactive } from 'vue';
  import { useLightsStore } from '@/store/lights';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const store = useLightsStore();

  const savedMode = JSON.parse(localStorage.getItem('saveMode'));

  if((savedMode === true) && localStorage.getItem('light')) {
    const lastLight = JSON.parse(localStorage.getItem('light'));

    router.push(`/${lastLight.color}`).catch(()=>{});
    store.changeLight({ ...lastLight });
    store.changeMode(savedMode);
  }

  watch(
    () => route.params.color,
    (newColor) => {
      if (store.lightTimer === null) {
        store.changeLight({ ...store.lightSignals[newColor], direction: 0 });
      }
    },
    {
      immediate: true,
    }
  );
</script>

<style>
  .traffic-light {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 16px);
    min-height: 600px;
    justify-content: center;
  }

  .app__loader {
    display: flex;
  }

  .app__loader-text {
    display: block;
    margin: auto;
    font-size: 24px;
    font-weight: 900;
    line-height: 26px;
  }
</style>
