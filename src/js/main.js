import Vue from 'vue'
import Resource from 'vue-resource';
import Router from 'vue-router';
import App from './App.vue'
import HomeView from './components/HomeView.vue'

// Install the extensions
Vue.use(Resource);
Vue.use(Router);

/* eslint-disable no-new */
var router = new Router({
  history: true
});

router.map({
  '/': {
    name: 'index',
    component: HomeView
  }
});

router.redirect({
  '*': '/'
});

router.start(App, 'app');
