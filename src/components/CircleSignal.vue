<template>
  <li
    class="traffic-light__signal"
    v-bind:class="[
      signal.colorBack && `traffic-light__signal_${signal.colorBack}`,
      signal.active && 'traffic-light__signal_active'
    ]"
  >
    <h2 class="traffic-light__counter">
      {{ this.counter }}
    </h2>
  </li>
</template>

<script>
export default {
  props: {
    signal: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      // проверяем включен ли мод на сохранение и есть ли информация для вывода
      counter: JSON.parse(localStorage.getItem('id')) === this.signal.id
      && JSON.parse(localStorage.getItem('saveMode'))
        ? JSON.parse(localStorage.getItem('currentTime'))
        : this.signal.expirationTime,
      blinkMode: false
    }
  },
  mounted() {
    this.startCounter()
  },
  watch: {
    '$route' (to, from) {
      this.startCounter()
    }
  },
  methods: {
    startCounter() {
      if (this.$route.params.color === this.signal.colorBack) {
      const interval = setInterval(() => {
        this.counter--
        // сохраняем состояние только при включенном чекбоксе
        if (JSON.parse(localStorage.getItem('saveMode'))) {
          localStorage.setItem('id', this.signal.id)
          localStorage.setItem('currentTime', this.counter)
        }
        this.blink()
        if (this.counter <= 0) {
          clearInterval(interval)
          this.$emit('change-signal', this.signal.id)
          this.counter = this.signal.expirationTime
        }
      }, 1000)
      }
    },
    blink() {
      // исключаем желтый сигнал, повторные вызовы setInterval и мигание при значениях меньше 1
      if (this.counter <= 3 && !this.blinkMode && this.counter >= 1 && this.signal.colorBack !== 'yellow') {
        let blinkCounter = 0
        this.blinkMode = true
        // запоминаем вошедший счетчик
        const blinksCount = (this.counter * 4) - 1
        const blinkInterval = setInterval(() => {
          blinkCounter++
          this.signal.active = !this.signal.active
          if (blinkCounter === blinksCount) {
            clearInterval(blinkInterval)
            this.signal.active = true
            this.blinkMode = false
          }
        }, 250)
      }
    }
  }
}
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
