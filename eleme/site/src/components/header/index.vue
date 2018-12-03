<template>
    <div>
        <header>
            <a href="">
                <span>&#xe611;</span>地址<strong>&#xe614;</strong>
            </a>
            <form>
                <span>&#xe60a;</span><input type="text" placeholder="搜索饿了么商家、商品名称">
            </form>
        </header>
    </div>
</template>

<script>
export default {
    name : "Top",
    methods : {
        scrollFunction(){
            document.onscroll = function(){
                var scrollTop = document.documentElement.scrollTop;
                if(scrollTop > 100){
                    document.querySelector("header a").style.display = "none";
                    document.querySelector("header").style.height = "0.4rem";
                    document.querySelector("header form").style.marginTop = "0";
                }else{
                    document.querySelector("header a").style.display = "block";
                    document.querySelector("header").style.height = "0.72rem";
                    document.querySelector("header form").style.marginTop = "0.07rem";
                }
            }
        }
    },
    mounted(){
        this.scrollFunction();
    }
}
</script>

<style>

</style>


