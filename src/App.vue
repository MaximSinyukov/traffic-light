<template>
  <div id="app">
    <h1>Traffic light</h1>
    <TrafficLight
      v-bind:signals="signals"
    />
  </div>
</template>

<script>
import TrafficLight from '@/components/TrafficLight'

export default {
  name: 'app',
  data() {
    return {
      signals: [
        {id: 1, colorBack: 'red', expirationTime: 10, active: false},
        {id: 2, colorBack: 'yellow', expirationTime: 3, active: false},
        {id: 3, colorBack: 'green', expirationTime: 15, active: false},
      ]
    }
  },
  components: {
    TrafficLight
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 16px);
  min-height: 530px;
  justify-content: center;
}
</style>
