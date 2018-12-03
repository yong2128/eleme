<template>
    <div id="my">
        <mt-header title="我的">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <div id="Mylogin">
            <img src="../../../static/logo.png" alt="">
            <div>
                <p>{{msg}}</p>
                <p>&#xe61d; 登录后享受更多特权</p>
            </div>
            <span id="right" @click="login">&#xe650;</span>
        </div>

        <div id="autoArea">
            <div id="nav">
                <a href="javascript:;">
                    <p class="a1">{{phoneNum ? '0.00元' : '&#xe702;'}}</p>
                    <span>钱包</span>
                </a>
                <a href="javascript:;">
                    <p class="a2">{{phoneNum ? '0个' : '&#xe623;'}}</p>
                    <span>红包</span>
                </a>
                <a href="javascript:;">
                    <p class="a3">{{phoneNum ? (goldNum + '个') : '&#xe702;'}}</p>
                    <span>金币</span>
                </a>
            </div>

            <p class="white"></p>

            <div id="cc">
                <div>
                    <p>
                        <i>&#xe60c;</i>
                        <span>我的地址</span>
                        <em>&#xe650;</em>
                    </p>
                </div>

                <p class="white"></p>

                <div>
                    <p>
                        <i class="i1">&#xe620;</i>
                        <span>金币商城</span>
                        <em>&#xe650;</em>
                    </p>
                    <p>
                        <i class="i2">&#xe60f;</i>
                        <span>分享拿10元现金</span>
                        <em>&#xe650;</em>
                    </p>
                </div>

                <p class="white"></p>

                <div>
                    <p>
                        <i class="i3">&#xe68b;</i>
                        <span>我的客服</span>
                        <em>&#xe650;</em>
                    </p>
                    <p>
                        <i class="i4">&#xe64e;</i>
                        <span>下载饿了么APP</span>
                        <em>&#xe650;</em>
                    </p>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/footer"
export default {
    name : "my",
    data(){
        return {
            phoneNum : localStorage.phoneNum,
            msg : "登录 / 注册",
            goldNum : 0
        }
    },
    components : {
        Footer
    },
    methods : {
        login(){
            localStorage.clear();
            this.$router.push('/login');
        }
    },
    mounted(){
        if(localStorage.phoneNum){
            this.msg = localStorage.phoneNum;
            this.goldNum = localStorage.goldNum;
        }
    }
}
</script>

<style scoped>
    .a1{
        color: rgb(255,153,0);
    }
    .a2{
        color: rgb(255,95,62);
    }
    .a3{
        color: rgb(106,194,11);
    }
    #cc i,#cc em{
        font-family : iconfont;
        font-style: normal;
        font-size: 0.13rem;
        float: left;
    }
    #cc .i1{
        color: rgb(148,217,74);
    }
    #cc .i2{
        color: rgb(252,123,83);
    }
    #cc .i3{
        color: rgb(77,166,240);
    }
    #cc .i4{
        color: rgb(77,166,240);
    }
    #cc>div{
        border: 1px solid #ddd;
        border-left: 0;
        border-right: 0;
    }
     #cc>div>p{
        overflow: hidden;
        height: 0.35rem;
        line-height: 0.35rem;
        background : #fff;
        border-bottom: 1px solid #ddd;
    }
    #cc>div>p span{
        font-size: 0.12rem;
    }
    #cc>div>p:nth-last-of-type(1){
        border: 0;
    }
    #cc i{
        margin: 0 0.1rem;
        color: rgb(74,165,240);
    }
    #cc span{
        float: left;
        font-size: 0.14rem;
    }
    #cc em{
        float: right;
        font-size:0.1rem;
        margin-right: 0.1rem;
        color: #ccc;
    }
    #my{
        width: 100%;
        background : rgb(241, 241, 244);
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .white{
        height: 0.1rem;
        background : rgb(241, 241, 244);
    }
    .icon{
        font-family: iconfont;
        float: left;
    }
    #nav{
        border-bottom : 1px solid rgb(241, 241, 244);
        overflow: hidden;
        background: #fff;
    }
    #nav a{
        width: 33%;
        height: 0.7rem;
        float: left;
        text-align: center;
        border-right: 1px solid rgb(241, 241, 244);
    }
     #nav a:nth-last-of-type(1){
         border: 0;
     }
    #nav a p{
        margin-top: 0.05rem;
        font-family: iconfont;
        font-size: 0.2rem;
        line-height: 0.4rem;
    }
    #nav a span{
        display: block;
        font-size:0.1rem;
        font-weight: 700;
    }
    #Mylogin{
        background : #26a2ff;
        height: 0.9rem;
    }
    #Mylogin img{
        width: 0.5rem;
        height: 0.5rem;
        border-radius : 50%;
        float: left;
        margin: 0.2rem 0.1rem;
    }
    #Mylogin div{
        float: left;
        margin-top: 0.25rem;
    }
    #Mylogin div p{
        font-family: iconfont;
    }
    #Mylogin div p:nth-of-type(1){
        font-size : 0.14rem;
        color : #fff;
        font-weight: 700;
        margin-bottom: 0.1rem;
    }
    #Mylogin div p:nth-of-type(2){
        font-size : 0.1rem;
        color : #fff;
    }
    #right{
        float: right;
        font-size : 0.15rem;
        color: #fff;
        font-family: iconfont;
        margin-top: 0.35rem;
        margin-right: 0.1rem;
    }
    #autoArea{
        overflow: auto;
        margin-bottom: 0.6rem;
    }
</style>

