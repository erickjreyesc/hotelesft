import HotelForm from '@/views/HotelForm.vue'
import HotelView from '@/views/HotelView.vue'
import IndexView from '@/views/IndexView.vue'
import ResumenGeneralView from '@/views/ResumenGeneralView.vue'
import ResumenView from '@/views/ResumenView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    }, {
      path: '/hoteles',
      name: 'hotel',
      component: HotelView,
    }, {
      path: '/hoteles/formulario/:elementId?',
      name: 'hotel-form',
      component: HotelForm,
    }, {
      path: '/resumen-general',
      name: 'general-resumen',
      component: ResumenGeneralView,
    }, {
      path: '/resumen/:elementId',
      name: 'resumen',
      component: ResumenView,
    },
  ],
})

export default router
