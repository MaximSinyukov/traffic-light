<template>
  <div
    class="circle-signal"
    v-bind:class="[
      signal.colorBack && `circle-signal_${signal.colorBack}`,
      signal.active && 'circle-signal_active'
    ]"
  >
    <h2 class="circle-signal__counter">
      {{ signal.expirationTime }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    signal: {
      type: Object,
      require: true
    }
  }
}
</script>

<style>
.circle-signal {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-left: 15px;
  margin-top: 20px;
  line-height: 120px;
  display: flex;
  justify-content: center;
  transition: background-color 0.5s ease-out;
  opacity: .5;
}

.circle-signal_red {
  background-color: rgb(255, 0, 0);
}

.circle-signal_yellow {
  background-color: rgb(255, 255, 0);
}

.circle-signal_green {
  background-color: rgb(0, 255, 0);
}

.circle-signal_active {
    opacity: 1;
}

.circle-signal__counter {
  display: block;
  margin: auto 0;
  line-height: 80px;
  font-size: 70px;
  font-weight: 500;
  color: black;
}
</style>
