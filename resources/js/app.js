
require('./bootstrap');

window.Vue = require('vue').default;

import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes.js"


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import common from './common.js';
Vue.mixin(common);

Vue.use(VueRouter);
Vue.use(ViewUI);
// 

Vue.use(VueRouter);
Vue.component('main-components', require('./components/main.vue').default);

const router = new VueRouter ({
    mode : 'history',
    routes : routes
});

const app = new Vue({
    el: '#app',
    router : router

});