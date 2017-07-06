// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
//import router from './router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';
import '@/common/stylus/index.styl';

Vue.config.productionTip = false;

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// });

const routes = [
    {
        path: '/goods',
        name: 'goods',
        component: goods
    },
    {
        path: '/ratings',
        name: 'ratings',
        component: ratings
    },
    {
        path: '/seller',
        name: 'seller',
        component: seller
    }
];
var router = new Router({
  linkActiveClass: 'active',
  routes: routes
});

Vue.use(Router);
var app = new Vue({
    router,
    template: '<App/>',
    components: { App }
});

router.push('/goods');

app.$mount("#app");



