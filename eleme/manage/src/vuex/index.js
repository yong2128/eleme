import Vue from "vue"
import Vuex from "vuex"
import admin from "./admin"
import shop from "./shop"

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        admin,
        shop
    }
})
