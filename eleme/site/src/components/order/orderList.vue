<template>
    <div id="myOrder">
        <div v-for="(item,i) in $store.state.allInfo" :key="i" class="list">
            <img :src="item.info[0].goodsPic | imgUrl" alt="">
            <div>
                <h3>{{item.info[0].goodsName}}</h3>
                <p>价格：<strong>￥{{item.info[0].goodsPrice}}</strong></p>
                <AddNum :info="item" :shopId="item.info[0].shopId" class="allNum"></AddNum>
                <p>总价：<strong>￥{{item.info[0].goodsPrice / 1 * item.num / 1}}</strong></p>
            </div>
        </div>
        <p><button @click="countNum">结算</button></p>
    </div>
</template>

<script>
import AddNum from "@/components/car/addNum"
export default {
    name : "myOrder",
    components : {
        AddNum
    },
    methods : {
        countNum(){
            this.$store.commit("CHANGE_SUM");
            localStorage.goldNum = (localStorage.goldNum / 1000 - this.$store.state.sum) * 1000;
            this.$store.dispatch("clearCar");
        }
    }
}
</script>

<style scoped>
    #myOrder img{
        width: 0.8rem;
        float: left;
    }
    .list{
        padding: 0.05rem;
        overflow: hidden;
        border-bottom: 1px solid #aaa;
        background: #fff;
    }
    .list h3{
        font-size: 0.12rem;
        font-weight: 900;
        line-height: 0.25rem;
    }
    .list>div{
        width: 2.2rem;
        font-size: 0.1rem;
        float: left;
        position: relative;
        margin-left: 0.05rem;
    }
    .list>div>p {
        height: 0.2rem;
        line-height: 0.2rem;
    }
    .list>div>p strong{
        color: #f00;
    }
    .allNum{
        position: absolute;
        top: 0.1rem;
        right: 0;
    }
    #myOrder>p{
        overflow: hidden;
        background: #fff;
    }
    #myOrder>p>button{
        display: block;
        width: 1rem;
        height: 0.3rem;
        border: 0;
        background: green;
        font-size: 0.14rem;
        color: #fff;
        margin: 0.1rem auto;
        border-radius: 5%;
    }
</style>
