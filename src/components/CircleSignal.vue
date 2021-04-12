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
      counter: JSON.parse(localStorage.getItem('id')) === this.signal.id
      && JSON.parse(localStorage.getItem('saveMode'))
        ? JSON.parse(localStorage.getItem('currentTime'))
        : this.signal.expirationTime
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
      if (this.counter === 3) {
        let blinkCounter = 0;
        const blinkInterval = setInterval(() => {
          blinkCounter++
          this.signal.active = !this.signal.active
          if (blinkCounter === 11) {
            clearInterval(blinkInterval)
            this.signal.active = true
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
