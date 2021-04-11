<template>
  <div class="signals-box">
    <CircleSignal
      v-for="signal of signals" :key="signal.id"
      v-bind:signal="signal"
      @change-signal="changeSignal"
    />
  </div>
</template>

<script>
import CircleSignal from '@/components/CircleSignal'
export default {
  props: {
    signals: {
      type: Array,
      require: true
    }
  },
  components: {
    CircleSignal
  },
  methods: {
    changeSignal(id) {
      this.$emit('change-signal', id)
    }
  }
}
</script>

<style>
.signals-box {
  background:#333;
  width: 150px;
  height: 440px;
  border-radius: 10px;
  font-size: 70px;
  text-align: center;
  padding: 1px 0;
  border: 6px solid #000;
  margin: 0 auto;
}
</style>
