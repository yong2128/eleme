<template>
    <div id="car">
        <span @click="show">&#xe62a;</span>
        <div>
            <p>
                <span :style="{color : $store.state.sum > 0 ? '#fff' : '#ccc'}">{{$store.state.sum > 0 ? '￥' + $store.state.sum : '未选购商品'}}</span>
                <span>另需配送费6元</span>
            </p>
            <button type="button" :style="{background : $store.state.sum > 0 ? 'rgb(56,202,115)' : '#666'}" @click="$router.push('/order')">￥20起送</button>
        </div>
        <CarList :isShow="isShow"></CarList>
    </div>
</template>

<script>
import CarList from "@/components/car/carList"
export default {
    name : "selectCar",
    data(){
        return {
            isShow : false
        }
    },
    components : {
        CarList
    },
    methods : {
        show(){
            this.isShow = !this.isShow;
            this.start();
        },
        start(){
            if(this.$store.state.allInfo){
                this.$store.dispatch("getCarListAllInfo");
                this.$store.commit("CHANGE_SUM");
            }
        }
    },
    watch : {
        '$store.state.allInfo' : {
            deep : true,
            handler(){
                this.start();
            }
        }
    },
    mounted(){
        this.start();
    }
}
</script>

<style scoped>
    #car{
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        height: 0.4rem;
    }
    #car>div{
        background: rgb(80,80,81);
        overflow: hidden;
    }
    #car>span{
        font-family: iconfont;
        font-size: 0.12rem;
        display: block;
        top: -0.1rem;
        left: 0.05rem;
        position: absolute;
        color: rgb(94,93,99);
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        background: rgb(80,80,81);
        border-radius : 50%;
        background-image: radial-gradient(circle,#444 0.12rem,rgb(94,93,99) 0);
    }
    #car>div>p{
        width: 0.8rem;
        float: left;
        margin: 0.1rem 0 0 0.4rem;
    }
    #car>div>p>span{
        display: block;
        font-size: 0.1rem;
        color: #ccc;
        line-height: 0.14rem;
    }
    #car>div>p>span:nth-of-type(1){
        font-size: 0.13rem;
    }
    #car>div>button{
        float: right;
        border: 0;
        height: 0.4rem;
        width: 0.8rem;
        background: #666;
        color: #fff;
    }
</style>
