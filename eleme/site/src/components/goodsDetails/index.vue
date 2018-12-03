<template>
    <div v-if="$store.state.oneInfo" id="details">
        <p @click="$router.go(-1)">X</p>
        <img v-if="$store.state.oneInfo.goodsPic" :src="$store.state.oneInfo.goodsPic | imgUrl" alt="">
        <div>
            <h3>{{$store.state.oneInfo.goodsName}}</h3>
            <strong>￥{{$store.state.oneInfo.goodsPrice}}</strong>
        </div>
         <p v-if="$store.state.goodsInfo" class="p1">
            <AddNum class="right1" :info="$store.state.goodsInfo" :shopId="$store.state.oneInfo.shopId"></AddNum>
        </p>
        <i v-else @click="addCar($store.state.oneInfo._id,$store.state.oneInfo.shopId)">+</i>
        <Car></Car>
    </div>
</template>

<script>
import Car from "@/components/shopDetails/car"
import AddNum from "@/components/car/addNum"
export default {
    name : "goods",
    components : {
        Car,AddNum
    },
    methods : {
        addCar(id,shopId){
            this.$store.dispatch("addCar",{id,shopId});
        }
        
    },
    mounted(){
        //通过传递的商品id获取商品的信息
        this.$store.dispatch("getGoodsInfoById",{id : this.$route.params.id});
        this.$store.dispatch("getCarByGoodsId",{id : this.$route.params.id});
    }
}
</script>

<style scoped>
    #details{
        position: relative;
    }
    #details>p{
        position: absolute;
        top: 0.1rem;
        right: 0.15rem;
        font-size: 0.15rem;
    }
    img{
        display: block;
        width: 100%;
        height: 2.4rem;
    }
    h3{
        font-size: 0.15rem;
        font-weight: 900;
        line-height: 0.3rem;
        text-indent: 0.1rem;
        margin-top: 0.1rem;
    }
    strong{
        display: block;
        font-size: 0.16rem;
        color: #f00;
        line-height: 0.3rem;
        text-indent: 0.1rem;
    }
    i{
        position: absolute;
        display: block;
        width: 0.24rem;
        height: 0.24rem;
        background: #2396ff;
        border-radius : 50%;
        color : #fff;
        font-size: 0.13rem;
        font-style: normal;
        text-align: center;
        line-height: 0.24rem;
        bottom: 0.1rem;
        right: 0.1rem;
    }
    .right1{
        position: absolute;
        top: 2.6rem;
        right: 0;
    }
</style>
