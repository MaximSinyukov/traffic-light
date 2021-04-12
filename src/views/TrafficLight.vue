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

<script>
import SignalsBox from '@/components/SignalsBox'
import StateSaver from '@/components/StateSaver'
export default {
  name: 'app',
  data() {
    return {
      signals: [
        {id: 0, colorBack: 'red', expirationTime: 10, active: this.$route.params.color === 'red'},
        {id: 1, colorBack: 'yellow', expirationTime: 3, active: this.$route.params.color === 'yellow'},
        {id: 2, colorBack: 'green', expirationTime: 15, active: this.$route.params.color === 'green'},
      ],
      direction: 0
    }
  },
  created() {
    !localStorage.getItem('saveMode') && localStorage.setItem('direction', 0)
    if(JSON.parse(localStorage.getItem('saveMode')) && localStorage.getItem('id')) {
      const id = JSON.parse(localStorage.getItem('id'))
      const currentTime = JSON.parse(localStorage.getItem('currentTime'))
      const direction = JSON.parse(localStorage.getItem('direction'))
      this.signals = this.signals.map(s => {
        s.colorBack === this.$route.params.color
          ? s.active = false
          : s
        return s
      })
      this.$router.push(`/${this.signals[id].colorBack}`).catch(()=>{})
      this.signals[id].active = true
      this.signals[id].currentTime = currentTime
      this.direction = direction
    }
  },
  components: {
    SignalsBox,
    StateSaver
  },
  methods: {
    changeSignal(id) {
      if (id === 2 || id === 0) {
        this.direction = id
        JSON.parse(localStorage.getItem('saveMode')) && localStorage.setItem('direction', id)
      }
      const nextId = this.direction === 0 ? id + 1 : id - 1
      this.signals[id].active = false
      this.$router.push(`/${this.signals[nextId].colorBack}`)
      this.signals[nextId].active = true
    }
  }
}
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
