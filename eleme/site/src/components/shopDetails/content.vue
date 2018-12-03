<template>
    <div id="content">
         <div class="con" v-if="$store.state.allGoodsInfo" v-for="(item,i) in $store.state.allGoodsInfo" :key="i" @click="goGoodsDetails(item._id)">
            <img :src="item.goodsPic | imgUrl" alt="">
            <div>
                <h3>{{item.goodsName}}</h3>
                <p>商品详情</p>
                <p><span>月售439份</span><span>好评率99%</span></p>
                <span>5折</span>
                <div>
                    <strong>￥{{item.goodsPrice}}</strong>
                    <p v-if="item.carInfo[0]">
                         <AddNum class="right" :info="item.carInfo[0]" :shopId="item.shopId"></AddNum>
                    </p>
                    <i v-else @click.stop="addCar(item._id,item.shopId)">+</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddNum from "@/components/car/addNum"
export default {
    name : "con",
    props : ["allInfo"],
    data(){
        return {
            // info : []
        }
    },
    methods : {
        addCar(id,shopId){
            this.$store.dispatch("addCar",{id,shopId});
            // this.$store.dispatch("getAllInfoByShopId",{id : shopId});
        },
        goGoodsDetails(id){   //跳转到商品详情页
            this.$router.push("/goodsdetails/" + id);
        }
    },
    components : {
        AddNum
    },
    mounted(){
        
    }
}
</script>


<style scoped>
    #cont #content{
        background: #fff;
        width: 2.1rem;
        margin-left: 1rem;
        position: absolute;
        overflow : auto;
        top: 0;
        bottom: 0;
    }
    .con{
        border-bottom: 1px solid #efefef;
        overflow: hidden;
        padding-bottom: 0.1rem;
    }
    img{
        width: 0.7rem;
        height: 0.7rem;
        float: left;
    }
    .con>div{
        float: left;
        width: 1.3rem;
        margin-left : 0.05rem;
    }
    h3{
        font-size: 0.13rem;
        font-weight: 900;
    }
    .con>div p{
        height: 0.18rem;
        font-size: 0.1rem;
        line-height: 0.18rem;
        color: #999;
    }
    .con>div p>span:nth-of-type(1){
        margin-right: 0.1rem;
    }
    .con>div>span{
        font-size: 0.1rem;
        display: block;
        width: 0.2rem;
        padding: 0.01rem 0;
        text-align: center;
        border: 1px solid #efefef;
        color: #ff5339;
        margin: 0.01rem 0;
    }
    .con>div>div>strong{
        display: block;
        color : #ff5339;
        font-size: 0.14rem;
        float: left;
    }
    .con>div>div>i{
        display: block;
        width: 0.15rem;
        height: 0.15rem;
        background: #2396ff;
        border-radius : 50%;
        color : #fff;
        font-size: 0.1rem;
        font-style: normal;
        text-align: center;
        line-height: 0.15rem;
        float: right;
        margin-top: 0.03rem;
    }
    .con .right{
        float: right;
        margin-top: -0.1rem;
    }
</style>
