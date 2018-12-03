import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/index.vue'
import My from "@/components/my"
import Login from "@/components/login"
import ShopListDetails from "@/components/shopDetails/shopListDetails"
import ShopDetails from "@/components/shopDetails/shopDetails"
import Order from "@/components/order/index"
import GoodsDetails from "@/components/goodsDetails/index"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path : "/my",
      component : My
    },
    {
      path : "/login",
      component : Login
    },
    {
      path : "/shopListDetails/:id",
      component : ShopListDetails
    },
    {
      path : "/shopDetails/:id",
      component : ShopDetails
    },
    {
      path : "/order",
      component: Order
    },
    {
      path : "/goodsdetails/:id",
      component : GoodsDetails
    }
  ]
})
