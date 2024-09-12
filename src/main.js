import Vue from 'vue';
import App from './App.vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import VueApollo from 'vue-apollo';
import router from './router';
import './assets/tailwind.css';





const apolloClient = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache()
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.config.productionTip = false;
Vue.use(VueApollo);

new Vue({
  apolloProvider,
  router,
  render: h => h(App),
}).$mount('#app');
