<template>
    <div>
        <div class="sign">
            <div id="top" v-if="info.length > 0">
                <p @click="$router.go(-1)">&lt;</p>
                <img :src="info[0].shopGoodsTypeInfo[0].shopPic | imgUrl" class="big">
                <img :src="info[0].shopGoodsTypeInfo[0].shopPic | imgUrl" class="small">
            </div>
            <h3 v-if="info.length > 0">{{info[0].shopGoodsTypeInfo[0].shopName}}</h3>
        </div>
        <div id="cont">
            <ShopTypeTem :info="info" @getInfo="getInfo" v-if="info.length > 0"></ShopTypeTem>
            <!-- <Content v-if="allInfo.length > 0" :allInfo="allInfo"></Content> -->
            <Content v-if="$store.state.allGoodsInfo.length > 0" :allInfo="$store.state.allGoodsInfo"></Content>
        </div>
        <Car></Car>
    </div>
</template>

<script>
import ShopTypeTem from "./shopTypeTem"
import Content from "./content"
import Car from "./car"
export default {
    name : "shopDetails",
    data(){
        return {
            id : "",   //店铺id
            info : [],
            allInfo : []    //存储所有根据商品类别id查找到的数据
        }
    },
    components : {
        ShopTypeTem,Content,Car
    },
    methods : {
        getShopAndGoodsType(){
            this.$ajax.get("/getShopAndGoodsType",{
                params : {id : this.id}
            }).then(data=>{
                this.info = data.info;
            })
        },
        getInfo(id){    //通过商品类别的id获取商品
            this.$ajax.get("/getInfoByGoodsId",{
                params : {id}
            }).then(data=>{
                this.allInfo = this.allInfo.concat(data.info);
            });
        },
        //根据店铺id查找所有商品
        getAllInfoByShopId(){
            this.$store.dispatch("getAllInfoByShopId",{id : this.$route.params.id});
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        this.getShopAndGoodsType();
        this.getAllInfoByShopId();
    }
}
</script>

<style scoped>
    #top {
        position: relative;
        width: 100%;
        height: 1rem;
    }
    #top p{
        font-size: 0.18rem;
        color : #fff;
        position: absolute;
        line-height: 0.3rem;
        text-indent: 0.1rem;
        z-index: 999;
    }
    .big{
        width: 100%;
        height: 1rem;
        opacity: 0.7;
    }
    .small{
        width: 0.7rem;
        height: 0.7rem;
        position: absolute;
        top: 0.6rem;
        left: 0;
        right: 0;
        margin: auto;
        box-shadow: 0 0 5px rgb(102, 99, 221);
    }
    h3{
        font-size: 0.2rem;
        font-weight: 900;
        height: 0.5rem;
        line-height: 0.5rem;
        margin-top: 0.3rem;
        text-align: center;
    }
    #cont{
        position: absolute;
        top: 1.8rem;
        bottom: 0.5rem;
    }
</style>
