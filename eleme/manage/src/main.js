// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Login from "./components/admin/Login"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import store from "./vuex"
import axios from "axios"
import filters from "@/filters"

Vue.config.productionTip = false

Vue.prototype.$ajax=axios;

Vue.use(ElementUI);

for(var key in filters){
    Vue.filter(key,filters[key]);
}

axios.interceptors.request.use((config)=>{
    config.url = "/ele" + config.url;
    return config;
})

axios.interceptors.response.use(({data})=>{
    return data;
})

router.beforeEach(function(to,from,next){    //---------全局拦截器：默认所有都拦截
    if(localStorage.adminId && localStorage.adminName){
        next();//---------所有都允许放行
    }else{
        store.commit("OUT_LOGIN");
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,Login },
  template : `<components :is="$store.state.admin.adminId ? 'App' : 'Login'" />`
})
