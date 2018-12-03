<template>
    <div>
        <mt-header title="订单">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <div id="main">
            <OrderList></OrderList>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/footer/index"
import OrderList from "./orderList"
export default {
    name : "order",
    components: { 
        Footer,OrderList
    }
}
</script>

<style scoped>
    #main{
        background: url("../../../static/logo.png") no-repeat 0.2rem 1rem/90%;
        position: absolute;
        top:0.32rem;
        bottom: 0.46rem;
        left: 0;
        right: 0;
        margin: auto;
    }
</style>
