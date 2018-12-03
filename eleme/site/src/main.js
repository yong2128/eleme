// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from "axios"
import router from './router'
import filters from "./filters"
import Login from "./components/login"
import store from "./vuex"
import MintUI,{ Header, Cell,Swipe, SwipeItem  } from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI);

Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false

Vue.prototype.$ajax = axios;

for (var key in filters) {
    Vue.filter(key, filters[key]);
}

axios.interceptors.request.use((config) => {
    config.url = "/eleme" + config.url;
    return config;
})

axios.interceptors.response.use(({data}) => {
    return data;
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        session : localStorage.phoneNum,
    },
    store,
    router,
    components: { App,Login},
    template: `<components :is="true ? 'App' : 'Login'" />`
})
