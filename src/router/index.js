import Vue from 'vue'
import VueRouter from 'vue-router'
import TrafficLight from '@/views/TrafficLight'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/:color',
      component: TrafficLight
    }
  ]
})
