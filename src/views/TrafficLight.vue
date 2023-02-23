<template>
  <div class="traffic-light">
    <h1>Traffic light</h1>
    <SignalsBox
      v-bind:signals="signals"
      @change-signal="changeSignal"
    />
    <StateSaver />
  </div>
</template>

<script setup>
  import SignalsBox from '@/components/SignalsBox.vue';
  import StateSaver from '@/components/StateSaver.vue';

  import { ref } from 'vue';
  import { reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  let signals = ref([
    {id: 0, colorBack: 'red', expirationTime: 10, active: route.params.color === 'red'},
    {id: 1, colorBack: 'yellow', expirationTime: 3, active: route.params.color === 'yellow'},
    {id: 2, colorBack: 'green', expirationTime: 15, active: route.params.color === 'green'},
  ]);
  let direction = ref(0);

  if(JSON.parse(localStorage.getItem('saveMode')) && localStorage.getItem('id')) {
    const id = JSON.parse(localStorage.getItem('id'))
    const currentTime = JSON.parse(localStorage.getItem('currentTime'))
    const directions = JSON.parse(localStorage.getItem('direction'))
    signals.value = signals.value.map(s => {
      s.colorBack === route.params.color
        ? s.active = false
        : s
      return s
    })
    router.push(`/${signals.value[id].colorBack}`).catch(()=>{})
    signals.value[id].active = true
    signals.value[id].currentTime = currentTime
    direction.value = directions
  }

  const changeSignal = (id) => {
    if (id === 2 || id === 0) {
      direction.value = id
      JSON.parse(localStorage.getItem('saveMode')) && localStorage.setItem('direction', id)
    }
    const nextId = direction.value === 0 ? id + 1 : id - 1
    signals.value[id].active = false
    router.push(`/${signals.value[nextId].colorBack}`)
    signals.value[nextId].active = true
  };
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
</style>
