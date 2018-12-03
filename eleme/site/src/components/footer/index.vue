<template>
    <div>
        <footer>
            <a href="javascript:;"  @click="indexHome(0)">
                <p>&#xe64e;</p>
                <span>首页</span>
            </a>
            <a href="javascript:;" @click="active(1)">
                <p>&#xe669;</p>
                <span>发现</span>
            </a>
            <a href="javascript:;" @click="goOrder(2)">
                <p>&#xe65d;</p>
                <span>订单</span>
            </a>
            <a href="javascript:;" @click="myHome(3)">
                <p>&#xe651;</p>
                <span>我的</span>
            </a>
        </footer>
    </div>
</template>

<script>
export default {
    name : "foot",
    data(){
        return {
            index : localStorage.index || 0
        }
    },
    methods : {
        active(n){
            this.index = localStorage.index = n;
            var a = document.querySelectorAll("footer>a");
            for(let i = 0;i < a.length;i ++){
                a[i].className = '';
            }
            a[this.index].className = 'a_active';
        },
        indexHome(n){
            this.active(n);
            this.$router.push("/");
        },
        goOrder(n){
            this.active(n);
            this.$router.push("/order");
            this.$store.dispatch("getCarListAllInfo");
        },
        myHome(n){
            this.active(n);
            this.$router.push("/my");
        }
    },
    mounted(){
        this.active(localStorage.index);
    }
}
</script>

<style>
    .icon{
        font-family: iconfont;
        font-size : 0.16rem;
        margin: 0.05rem 0;
    }
</style>


