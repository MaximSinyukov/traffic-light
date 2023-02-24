<template>
  <li
  class="traffic-light__signal"
  :class="[
    signal.color && `traffic-light__signal_${signal.color}`,
    isActiveColor && 'traffic-light__signal_active'
  ]">
    <h2
    v-if="isVisibleText"
    class="traffic-light__counter">
      {{ store.lightTimer }}
    </h2>
  </li>
</template>

<script setup>
  import { toRefs, ref, watch, computed } from 'vue';
  import { useLightsStore } from '@/store/lights'
  import { useRoute, useRouter } from 'vue-router';

  const props = defineProps({
    signal: Object,
  });

  const { signal } = toRefs(props);
  const route = useRoute();
  const router = useRouter();
  const store = useLightsStore();

  const counter = ref(0);
  const isActiveBlink = ref(false);
  const blinkId = ref(null);
  const timerId = ref(null);

  const isActiveColor = computed(() => {
    return !isActiveBlink.value && route.params.color === signal.value.color;
  });

  const isVisibleText = computed(() => {
    return route.params.color === signal.value?.color;
  });

  const clearSignal = () => {
    clearInterval(timerId.value);
    timerId.value = null;
    counter.value = 0;
  };

  const startCounter = () => {
    clearSignal();
    if (route.params.color === signal.value.color) {
      timerId.value = setInterval(() => {
        counter.value++;

        if (store.saveMode) {
          localStorage.setItem('light', JSON.stringify({
            ...signal.value,
            expirationTime: signal.value.expirationTime - counter.value,
            direction: store.colorDirection,
          }));
        }

        store.changeLight({
          ...signal.value,
          expirationTime: signal.value.expirationTime - counter.value,
        });
      }, 1000);
    }
  };

  const changeBlink = () => {
    if (blinkId.value) {
      clearInterval(blinkId.value);
      blinkId.value = null;
      isActiveBlink.value = false;
      return;
    }

    blinkId.value = setInterval(() => {
      isActiveBlink.value = !isActiveBlink.value;
    }, 250);
  };

  watch(
    () => route.params.color,
    (newColor) => {
      if (newColor === 'red') {
        store.colorDirection = 0;
      }

      if (newColor === 'green') {
        store.colorDirection = 1;
      }

      startCounter();
    },
    {
      immediate: true,
    }
  );

  watch(
    () => store.lightTimer,
    (newTime) => {
      if (route.params.color !== signal.value.color) return;

      if (newTime === 3) {
        changeBlink();
        return;
      }

      if (newTime === 0) {
        changeBlink();
        router.push(`/${store.colorDirection
          ? store.colorsArray[signal.value.id - 1]
          : store.colorsArray[signal.value.id + 1]
        }`);
      }
    },
    {
      immediate: true,
    }
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
