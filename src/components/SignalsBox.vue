<template>
  <ul class="traffic-light__box">
    <CircleSignal
      v-for="signal of signals" :key="signal.id"
      :signal="signal"
      @change-signal="changeSignal"
    />
  </ul>
</template>

<script setup>
import CircleSignal from '@/components/CircleSignal.vue';

import { toRefs } from 'vue';

const emit = defineEmits(['change-signal'])

const props = defineProps({
  signals: Array,
});

const { signals } = toRefs(props);

const changeSignal = (id) => {
  emit('change-signal', id);
};
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
