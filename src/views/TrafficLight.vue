<template>
  <div class="traffic-light">
    <h1>Traffic light</h1>
    <SignalsBox
      v-bind:signals="signals"
      @change-signal="changeSignal"
    />
  </div>
</template>

<script>
import SignalsBox from '@/components/SignalsBox'
export default {
  name: 'app',
  data() {
    return {
      signals: [
        {id: 0, colorBack: 'red', expirationTime: 10, active: this.$route.params.color === 'red'},
        {id: 1, colorBack: 'yellow', expirationTime: 3, active: this.$route.params.color === 'yellow'},
        {id: 2, colorBack: 'green', expirationTime: 15, active: this.$route.params.color === 'green'},
      ],
      currentId: 0
    }
  },
  components: {
    SignalsBox
  },
  methods: {
    changeSignal(id) {
      if (id === 2 || id === 0) {
        this.currentId = id
      }
      const nextId = this.currentId === 0 ? id + 1 : id - 1
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
  min-height: 530px;
  justify-content: center;
}
</style>
