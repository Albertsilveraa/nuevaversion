// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import CountryList from './components/CountryList.vue'; 
import ViewOne from './components/ViewOne.vue';       
import ViewTwo from './components/ViewTwo.vue';       

Vue.use(Router);

export default new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'CountryList',
      component: CountryList,
    },
    {
      path: '/about',
      name: 'ViewOne',
      component: ViewOne,
    },
    {
      path: '/contact',
      name: 'ViewTwo',
      component: ViewTwo,
    },
  ],
});
