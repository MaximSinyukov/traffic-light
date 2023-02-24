import { createRouter, createWebHistory } from 'vue-router'
const TrafficLight = () => import('@/views/TrafficLight.vue');

const routes =[
  {
    path: '/:color',
    component: TrafficLight
  },
  {
    path: '/',
    redirect: '/red'
  },
  {
    path: '/**',
    redirect: '/red'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
