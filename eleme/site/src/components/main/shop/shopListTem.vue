<template>
    <div>
        <section v-if="shopAllInfo.length > 0"  v-for="(item,i) in shopAllInfo" :key="i" @click="details(item._id)">
            <div id="shopTop">
                <div id="img">
                    <img :src="item.shopPic | imgUrl" alt="烤肉拌饭">
                </div>
                <div id="topRight">
                    <h3>{{item.shopName}} <span>&#xe626;</span></h3>
                    <p>
                        <span>★★★★★</span>
                        <span>4.8</span>
                        <span>月售3749单</span>
                    </p>
                    <div>
                        <p>
                            <span>￥20起送</span>
                            <span>远距离配送费￥5.5元</span>
                        </p>
                        <p>
                            <span id="one">4.76km</span>
                            <span>38分钟</span>
                        </p>
                    </div>
                </div>
            </div>
            <div id="shopBottom">
                <div>
                    <span>{{item.shopTypeInfo[0].shopTypeName}}</span>
                </div>
                <div>
                    <div>
                        <div><span class="sign">首</span>新用户下单立减18元</div>
                        <div><span class="sign sign1">减</span>满300减1</div>
                    </div>
                    <p>18个活动 &#xe614;</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name : "temp",
    props : ["shopList","shopInfo"],
    data(){
        return {
            shopAllInfo : [],
        }
    },
    methods : {
        details(id){   //店铺的id
            this.$router.push("/shopDetails/" +id);
        }
    },
    mounted(){
        if(this.shopList){
            this.shopAllInfo = this.shopList;
        }
        if(this.shopInfo){
            this.shopAllInfo = this.shopInfo;
        }
    }
}
</script>

<style scoped>
     section{
        border-bottom : 1px solid #eee;
        padding: 0.06rem 0.04rem;
        overflow: hidden;
    }
    #shopTop{
        overflow: hidden;
    }
    img{
        width : 0.5rem;
        height: 0.5rem;
    }
    #img{
        width: 0.6rem;
        float: left;
    }
    #topRight{
        width: 2.4rem;
        float: left;
    }
    #topRight p:nth-of-type(1){
        font-size : 0.06rem;
    }
    #topRight>p:nth-of-type(1) span:nth-child(1){
        color : #ff0;
    }
    #topRight>p:nth-of-type(1) span:nth-child(2){
        margin: 0 0.06rem;
    }
    h3{
        font-size : 0.13rem;
    }
    h3 span{
        float: right;
        font-family: iconfont;
        line-height: 0.03rem;
    }
    #topRight>div{
        font-size : 0.06rem;
    }
    #topRight>div>p:nth-child(1){
        float: left;
    }
    #topRight>div>p:nth-child(2){
        float: right;
        margin-right: 0;
        color : #999;
    }
    #topRight #one{
        float: left;
    }
    #topRight>div>p:nth-child(2) span:nth-child(2):before{
        float: left;
        content: "";
        display : block;
        width : 0.01rem;
        height: 0.1rem;
        background: #999;
        margin: 0.03rem 0.05rem;
    }
    #shopBottom{
        margin-left : 0.6rem;
    }
    #shopBottom>div{
        font-size : 0.1rem;
    }
    #shopBottom>div:nth-of-type(1){
        margin: 0.05rem 0;
    }
    #shopBottom>div:nth-of-type(1) span{
        padding: 0.01rem 0.04rem;
        border : 1px solid #aaa;
    }
    #shopBottom>div:nth-of-type(2)>div{
        float : left;
    }
    #shopBottom>div:nth-of-type(2)>p{
        float: right;
        margin-right: 0.1rem;
        color: #999;
        font-family: iconfont;
    }
    .sign{
        display: inline-block;
        width : 0.12rem;
        height: 0.12rem;
        background: rgb(112, 188, 70);
        color:#fff;
        text-align: center;
        line-height: 0.12rem;
        margin-right: 0.05rem;
    }
    .sign1{
        background: rgb(240, 115, 115);
    }
</style>


