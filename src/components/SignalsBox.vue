<template>
  <ul class="traffic-light__box">
    <CircleSignal
    v-for="signal of store.lightSignals"
    :key="signal.id"
    :signal="signal"/>
  </ul>
</template>

<script setup>
import CircleSignal from '@/components/CircleSignal.vue';
import { useLightsStore } from '@/store/lights';

const store = useLightsStore();
</script>

<style>
.traffic-light__box {
  background:#333;
  width: 150px;
  height: 440px;
  border-radius: 10px;
  font-size: 70px;
  text-align: center;
  padding: 1px 0;
  border: 6px solid #000;
  margin: 0 auto;
  list-style: none;
}
</style>
