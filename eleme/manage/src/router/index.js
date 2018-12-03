import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import admin from "./admin"
import shop from "./shop"
import goods from "./goods"
import Login from "@/components/admin/Login"

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
      },
      {
          path : "/login",
          name : "Login",
          component : Login
      }
  ].concat(admin,shop,goods)
})
