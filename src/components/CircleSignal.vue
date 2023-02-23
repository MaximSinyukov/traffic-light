<template>
  <li
    class="traffic-light__signal"
    v-bind:class="[
      signal.colorBack && `traffic-light__signal_${signal.colorBack}`,
      signal.active && 'traffic-light__signal_active'
    ]"
  >
    <h2 class="traffic-light__counter">
      {{ counter }}
    </h2>
  </li>
</template>

<script setup>
  import { toRefs, ref, onMounted, watch, reactive } from 'vue';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    signal: Object,
  });

  const { signal } = toRefs(props);
  const route = useRoute();
  const emit = defineEmits(['change-signal']);

  let counter = ref(0);
  let blinkMode = ref(false);

  counter.value = JSON.parse(localStorage.getItem('id')) === signal.value.id && JSON.parse(localStorage.getItem('saveMode'))
    ? JSON.parse(localStorage.getItem('currentTime'))
    : signal.value.expirationTime;

  const startCounter = () => {
    if (route.params.color === signal.value.colorBack) {
      const interval = setInterval(() => {
        counter.value--;
        // сохраняем состояние только при включенном чекбоксе
        if (JSON.parse(localStorage.getItem('saveMode'))) {
          localStorage.setItem('id', signal.value.id)
          localStorage.setItem('currentTime', counter.value)
        }
        blink()
        if (counter.value <= 0) {
          clearInterval(interval)
          emit('change-signal', signal.value.id)
          counter.value = signal.value.expirationTime
        }
      }, 1000);
    }
  };

  const blink = () => { // todo check switch window problem for method
    if (counter.value <= 3 && !blinkMode.value && counter.value >= 1 && signal.value.colorBack !== 'yellow') {
      let blinkCounter = 0
      blinkMode.value = true
      // запоминаем вошедший счетчик
      const blinksCount = (counter.value * 4) - 1
      const blinkInterval = setInterval(() => {
        blinkCounter++
        signal.value.active = !signal.value.active
        if (blinkCounter === blinksCount) {
          clearInterval(blinkInterval)
          signal.value.active = true
          blinkMode.value = false
        }
      }, 250)
    }
  }

  onMounted(() => {
    startCounter();
  });

  watch(
    () => route.params,
    () => {
      startCounter();
    },
    // {
    //   deep:true
    // }
  );
</script>

<style>
.traffic-light__signal {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-left: 15px;
  margin-top: 20px;
  line-height: 120px;
  display: flex;
  justify-content: center;
  transition: opacity .4s ease-out;
  opacity: .5;
}

.traffic-light__signal_red {
  background-color: rgb(255, 0, 0);
}

.traffic-light__signal_yellow {
  background-color: rgb(255, 255, 0);
}

.traffic-light__signal_green {
  background-color: rgb(0, 255, 0);
}

.traffic-light__signal_active {
  opacity: 1;
}

.traffic-light__counter {
  display: block;
  margin: auto 0;
  line-height: 80px;
  font-size: 70px;
  font-weight: 500;
  color: black;
  visibility: hidden;
}

.traffic-light__signal_active .traffic-light__counter {
  visibility: visible;
}
</style>
