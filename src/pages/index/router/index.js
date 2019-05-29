import Vue from 'vue'
import Router from 'vue-router'
import axios from '../../../util/http'
Vue.use(Router)
Vue.prototype.$ajax = axios;

const router = new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: () =>
      import('@/views/platform/layout/layout.vue'),
    children: [{
      path: 'operationService',
      name: 'operationService',
      component: () =>
        import('@/views/platform/operationService')
    }]
  }]
});
router.beforeEach((to, from, next) => {
  next();
})
export default router
